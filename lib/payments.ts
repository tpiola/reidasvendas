import 'server-only';
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import {
  subscriptionPlans,
  isSubscriptionOfferApproved,
  type SubscriptionBillingCycle,
  type SubscriptionPlan,
} from '@/data/subscription-plans';
import { siteOrigin } from './server-events';
import {
  paymentStoreReady,
  reserveCheckout,
  saveCheckoutSession,
  type BillingState,
  type PaymentResourceLease,
  claimPaymentResource,
  releasePaymentResource,
  type PaymentStateWrite,
} from './payment-store';

export class PaymentError extends Error {
  constructor(
    public readonly code: 'unavailable' | 'invalid' | 'conflict' | 'provider',
    public readonly status = 503,
  ) {
    super(`Payment operation ${code}`);
  }
}
interface StripeConfiguration {
  key: string;
  version: string;
  live: boolean;
}
type StripeObject = Record<string, unknown>;
const uuid =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const priceId = /^price_[A-Za-z0-9]{5,180}$/;
const stripeId = (value: unknown, prefix: string): value is string =>
  typeof value === 'string' &&
  new RegExp(`^${prefix}_[A-Za-z0-9_]{3,200}$`).test(value);
const record = (value: unknown): StripeObject | undefined =>
  value && typeof value === 'object' && !Array.isArray(value)
    ? (value as StripeObject)
    : undefined;
const isCycle = (value: unknown): value is SubscriptionBillingCycle =>
  value === 'monthly' || value === 'annual';
const getPlan = (value: unknown) =>
  subscriptionPlans.find((plan) => plan.id === value);

/** API version is operator-pinned; do not silently follow Stripe's account default. */
function stripeConfiguration(): StripeConfiguration | undefined {
  const key = process.env.STRIPE_SECRET_KEY || '';
  const version = process.env.STRIPE_API_VERSION || '';
  const mode = process.env.STRIPE_MODE;
  if (
    !/^(?:sk|rk)_(test|live)_[A-Za-z0-9]+$/.test(key) ||
    !/^\d{4}-\d{2}-\d{2}(?:\.[a-z]+)?$/.test(version) ||
    (mode !== 'test' && mode !== 'live') ||
    (!key.startsWith(`sk_${mode}_`) && !key.startsWith(`rk_${mode}_`)) ||
    (process.env.VERCEL_ENV === 'production' && mode !== 'live') ||
    (process.env.VERCEL_ENV === 'preview' && mode !== 'test')
  )
    return undefined;
  return { key, version, live: mode === 'live' };
}
function prices(plan: SubscriptionPlan, cycle: SubscriptionBillingCycle) {
  const stem = `STRIPE_PRICE_${plan.id.toUpperCase()}`;
  return {
    recurring: process.env[`${stem}_${cycle.toUpperCase()}`] || '',
    setup: process.env[`${stem}_SETUP`] || '',
  };
}
function offerApproved() {
  return (
    isSubscriptionOfferApproved() &&
    process.env.SUBSCRIPTIONS_OFFER_APPROVED === 'true' &&
    process.env.SUBSCRIPTIONS_TERMS_APPROVED === 'true' &&
    !!process.env.SUBSCRIPTIONS_TERMS_VERSION?.trim() &&
    !!process.env.BUSINESS_LEGAL_NAME?.trim() &&
    /^[A-Z0-9]{12}\d{2}$/.test(
      (process.env.BUSINESS_CNPJ || '').toUpperCase().replace(/[.\/\-\s]/g, ''),
    ) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.PRIVACY_CONTACT_EMAIL || '')
  );
}

/** Read only in a Server Component. This reveals availability, never a credential or price ID. */
export function isCheckoutConfigured(planId: string, cycle: string): boolean {
  const plan = getPlan(planId);
  if (!plan || !isCycle(cycle)) return false;
  const configured = prices(plan, cycle);
  return (
    offerApproved() &&
    !!stripeConfiguration() &&
    /^whsec_[A-Za-z0-9]+$/.test(process.env.STRIPE_WEBHOOK_SECRET || '') &&
    paymentStoreReady() &&
    priceId.test(configured.recurring) &&
    priceId.test(configured.setup)
  );
}

async function stripeRequest(
  path: string,
  configuration: StripeConfiguration,
  body?: URLSearchParams,
  idempotencyKey?: string,
): Promise<StripeObject> {
  try {
    const response = await fetch(`https://api.stripe.com/v1/${path}`, {
      method: body ? 'POST' : 'GET',
      headers: {
        Authorization: `Bearer ${configuration.key}`,
        'Stripe-Version': configuration.version,
        ...(body
          ? { 'Content-Type': 'application/x-www-form-urlencoded' }
          : {}),
        ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
      },
      body: body?.toString(),
      signal: AbortSignal.timeout(6500),
      cache: 'no-store',
    });
    // Never put Stripe's response, keys, customer details or messages in logs or public errors.
    if (!response.ok) {
      throw new PaymentError(
        response.status === 409 ? 'conflict' : 'provider',
        response.status === 409 ? 409 : 502,
      );
    }
    const data: unknown = await response.json();
    const result = record(data);
    if (!result || 'error' in result) throw new PaymentError('provider', 502);
    return result;
  } catch (error) {
    if (error instanceof PaymentError) throw error;
    throw new PaymentError('provider', 502);
  }
}

function assertPrice(
  value: StripeObject,
  id: string,
  amount: number,
  live: boolean,
  cycle?: SubscriptionBillingCycle,
) {
  const recurring = record(value.recurring);
  if (
    value.id !== id ||
    value.active !== true ||
    value.currency !== 'brl' ||
    value.unit_amount !== amount ||
    value.livemode !== live ||
    value.billing_scheme !== 'per_unit' ||
    value.custom_unit_amount != null ||
    value.transform_quantity != null ||
    (cycle
      ? value.type !== 'recurring' ||
        recurring?.interval !== (cycle === 'monthly' ? 'month' : 'year') ||
        recurring.interval_count !== 1 ||
        recurring.usage_type !== 'licensed'
      : value.type !== 'one_time' || value.recurring != null)
  )
    throw new PaymentError('unavailable');
}

function hostedSession(
  value: StripeObject,
  configuration: StripeConfiguration,
) {
  if (
    !stripeId(value.id, 'cs') ||
    value.mode !== 'subscription' ||
    value.livemode !== configuration.live
  )
    throw new PaymentError('provider', 502);
  if (
    value.status !== 'open' ||
    typeof value.expires_at !== 'number' ||
    value.expires_at <= Math.floor(Date.now() / 1000)
  )
    throw new PaymentError('conflict', 409);
  let url: URL;
  try {
    url = new URL(typeof value.url === 'string' ? value.url : '');
  } catch {
    throw new PaymentError('provider', 502);
  }
  if (
    url.protocol !== 'https:' ||
    url.hostname !== 'checkout.stripe.com' ||
    url.port ||
    url.username ||
    url.password
  )
    throw new PaymentError('provider', 502);
  return { id: value.id, url: url.href };
}

export interface CheckoutInput {
  planId: string;
  cycle: SubscriptionBillingCycle;
  requestId: string;
  termsAccepted: true;
  website?: string;
}
export function parseCheckoutInput(value: unknown): CheckoutInput {
  const body = record(value);
  if (
    !body ||
    Object.keys(body).some(
      (name) =>
        !['planId', 'cycle', 'requestId', 'termsAccepted', 'website'].includes(
          name,
        ),
    ) ||
    typeof body.planId !== 'string' ||
    !getPlan(body.planId) ||
    !isCycle(body.cycle) ||
    typeof body.requestId !== 'string' ||
    !uuid.test(body.requestId) ||
    body.termsAccepted !== true ||
    (body.website !== undefined && body.website !== '')
  )
    throw new PaymentError('invalid', 422);
  return body as unknown as CheckoutInput;
}

/** Checkout is only created by this path, after explicit offer/terms approval and a durable reservation. */
export async function createSubscriptionCheckout(input: CheckoutInput) {
  if (!isCheckoutConfigured(input.planId, input.cycle))
    throw new PaymentError('unavailable');
  const plan = getPlan(input.planId)!;
  const configuration = stripeConfiguration()!;
  const configured = prices(plan, input.cycle);
  const termsVersion = process.env
    .SUBSCRIPTIONS_TERMS_VERSION!.trim()
    .slice(0, 100);
  const expectedRecurring =
    input.cycle === 'annual' ? plan.annualTotalCents : plan.monthlyPriceCents;
  const fingerprint = createHash('sha256')
    .update(
      JSON.stringify([
        plan.id,
        input.cycle,
        configured.recurring,
        configured.setup,
        expectedRecurring,
        plan.setupPriceCents,
        termsVersion,
      ]),
    )
    .digest('hex');
  const { operation } = await reserveCheckout(input.requestId, fingerprint);
  if (operation.fingerprint !== fingerprint)
    throw new PaymentError('conflict', 409);
  if (operation.sessionId) {
    const session = hostedSession(
      await stripeRequest(
        `checkout/sessions/${encodeURIComponent(operation.sessionId)}`,
        configuration,
      ),
      configuration,
    );
    return { url: session.url, checkoutId: operation.id };
  }
  // Stable expiration makes every Stripe retry use exactly the same parameters.
  if (operation.createdAt < Math.floor(Date.now() / 1000) - 1800)
    throw new PaymentError('conflict', 409);
  const [recurring, setup] = await Promise.all([
    stripeRequest(`prices/${configured.recurring}`, configuration),
    stripeRequest(`prices/${configured.setup}`, configuration),
  ]);
  assertPrice(
    recurring,
    configured.recurring,
    expectedRecurring,
    configuration.live,
    input.cycle,
  );
  assertPrice(
    setup,
    configured.setup,
    plan.setupPriceCents,
    configuration.live,
  );
  const origin = siteOrigin();
  if (new URL(origin).protocol !== 'https:')
    throw new PaymentError('unavailable');
  const body = new URLSearchParams({
    mode: 'subscription',
    locale: 'pt-BR',
    success_url: new URL('/obrigado?checkout=retorno', origin).href,
    cancel_url: new URL('/planos?checkout=cancelado', origin).href,
    'line_items[0][price]': configured.recurring,
    'line_items[0][quantity]': '1',
    'line_items[1][price]': configured.setup,
    'line_items[1][quantity]': '1',
    'payment_method_types[0]': 'card',
    allow_promotion_codes: 'false',
    'automatic_tax[enabled]': 'false',
    expires_at: String(operation.createdAt + 3600),
    client_reference_id: operation.id,
  });
  for (const [name, value] of Object.entries({
    rdv_app: 'reidasvendas',
    rdv_plan: plan.id,
    rdv_cycle: input.cycle,
    rdv_checkout: operation.id,
    rdv_terms: termsVersion,
    rdv_terms_accepted_at: String(operation.createdAt),
    rdv_recurring_cents: String(expectedRecurring),
    rdv_setup_cents: String(plan.setupPriceCents),
    rdv_recurring_price: configured.recurring,
    rdv_setup_price: configured.setup,
  })) {
    body.set(`metadata[${name}]`, value);
    body.set(`subscription_data[metadata][${name}]`, value);
  }
  const session = hostedSession(
    await stripeRequest(
      'checkout/sessions',
      configuration,
      body,
      `rdv-subscription-${operation.id}`,
    ),
    configuration,
  );
  await saveCheckoutSession(input.requestId, operation, session.id);
  return { url: session.url, checkoutId: operation.id };
}

/** Verify the unparsed, unmodified UTF-8 payload before JSON.parse. Supports rotating v1 signatures. */
export function verifyStripeSignature(
  raw: string,
  header: string | null,
  secret: string,
  now = Math.floor(Date.now() / 1000),
): boolean {
  if (!header || header.length > 2048 || !/^whsec_[A-Za-z0-9]+$/.test(secret))
    return false;
  const fields = header.split(',').map((part) => part.trim().split('='));
  const timestamps = fields
    .filter(([name]) => name === 't')
    .map(([, value]) => value);
  const signatures = fields
    .filter(([name]) => name === 'v1')
    .map(([, value]) => value);
  if (timestamps.length !== 1 || !/^\d{1,12}$/.test(timestamps[0] || ''))
    return false;
  const timestamp = Number(timestamps[0]);
  if (!Number.isSafeInteger(timestamp) || Math.abs(now - timestamp) > 300)
    return false;
  const expected = createHmac('sha256', secret)
    .update(`${timestamp}.${raw}`)
    .digest();
  return signatures.some((candidate) => {
    if (!/^[a-f\d]{64}$/i.test(candidate || '')) return false;
    const actual = Buffer.from(candidate, 'hex');
    return (
      actual.length === expected.length && timingSafeEqual(expected, actual)
    );
  });
}

export interface StripePaymentEvent {
  id: string;
  object: 'event';
  type: string;
  created: number;
  livemode: boolean;
  api_version: string;
  data: { object: StripeObject };
}
export function webhookConfiguration() {
  const configuration = stripeConfiguration();
  const secret = process.env.STRIPE_WEBHOOK_SECRET || '';
  // Keep legitimate webhooks processing if checkout is paused or the offer is no longer sold.
  return configuration &&
    /^whsec_[A-Za-z0-9]+$/.test(secret) &&
    paymentStoreReady()
    ? { ...configuration, secret }
    : undefined;
}
export function parseStripePaymentEvent(value: unknown): StripePaymentEvent {
  const event = record(value);
  const data = record(event?.data);
  const configuration = stripeConfiguration();
  if (
    !configuration ||
    !event ||
    !stripeId(event.id, 'evt') ||
    event.object !== 'event' ||
    typeof event.type !== 'string' ||
    event.type.length > 120 ||
    typeof event.created !== 'number' ||
    !Number.isSafeInteger(event.created) ||
    event.created <= 0 ||
    event.livemode !== configuration.live ||
    event.api_version !== configuration.version ||
    !data ||
    !record(data.object) ||
    event.account != null
  )
    throw new PaymentError('invalid', 400);
  return event as unknown as StripePaymentEvent;
}

function referenceId(value: unknown, prefix: string) {
  const candidate = typeof value === 'string' ? value : record(value)?.id;
  return stripeId(candidate, prefix) ? candidate : undefined;
}
function subscriptionFromInvoice(invoice: StripeObject) {
  const parent = record(invoice.parent);
  const details = record(parent?.subscription_details);
  return referenceId(details?.subscription ?? invoice.subscription, 'sub');
}
function subscriptionIdentity(subscription: StripeObject) {
  const metadata = record(subscription.metadata);
  const plan = getPlan(metadata?.rdv_plan);
  const cycle = metadata?.rdv_cycle;
  const cents = (value: unknown) =>
    typeof value === 'string' &&
    /^\d{1,12}$/.test(value) &&
    Number.isSafeInteger(Number(value)) &&
    Number(value) > 0
      ? Number(value)
      : undefined;
  const recurringCents = cents(metadata?.rdv_recurring_cents);
  const setupCents = cents(metadata?.rdv_setup_cents);
  if (
    metadata?.rdv_app !== 'reidasvendas' ||
    !plan ||
    !isCycle(cycle) ||
    recurringCents === undefined ||
    setupCents === undefined ||
    !priceId.test(String(metadata.rdv_recurring_price || '')) ||
    !priceId.test(String(metadata.rdv_setup_price || '')) ||
    typeof metadata.rdv_terms !== 'string' ||
    !metadata.rdv_terms.trim()
  )
    return undefined;
  return {
    plan,
    cycle,
    recurringCents,
    setupCents,
    recurringPrice: String(metadata.rdv_recurring_price),
    setupPrice: String(metadata.rdv_setup_price),
  };
}
function knownSubscriptionStatus(value: unknown): string {
  return typeof value === 'string' &&
    [
      'incomplete',
      'incomplete_expired',
      'trialing',
      'active',
      'past_due',
      'canceled',
      'unpaid',
      'paused',
    ].includes(value)
    ? value
    : 'unknown';
}
const checkoutEvents = [
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
  'checkout.session.async_payment_failed',
  'checkout.session.expired',
];
const invoiceEvents = [
  'invoice.paid',
  'invoice.payment_failed',
  'invoice.payment_action_required',
  'invoice.finalization_failed',
];
function relevantResourceId(event: StripePaymentEvent) {
  if (event.type.startsWith('customer.subscription.'))
    return referenceId(event.data.object, 'sub');
  if (invoiceEvents.includes(event.type))
    return referenceId(event.data.object, 'in');
  if (checkoutEvents.includes(event.type))
    return referenceId(event.data.object, 'cs');
  return undefined;
}

/** Discover only the lock key here. All authoritative reads happen again inside the resource lease. */
async function subscriptionResource(
  event: StripePaymentEvent,
): Promise<string | undefined> {
  const configuration = stripeConfiguration();
  if (!configuration) throw new PaymentError('unavailable');
  const resource = relevantResourceId(event);
  if (!resource) return undefined;
  if (event.type.startsWith('customer.subscription.')) return resource;
  if (invoiceEvents.includes(event.type)) {
    const preliminary = await stripeRequest(
      `invoices/${resource}`,
      configuration,
    );
    return subscriptionFromInvoice(preliminary) || resource;
  }
  const preliminary = await stripeRequest(
    `checkout/sessions/${resource}`,
    configuration,
  );
  return referenceId(preliminary.subscription, 'sub') || resource;
}

/** Serialize refetch + durable commit per subscription. Event.created is not a resource version. */
export async function processPaymentEvent(
  event: StripePaymentEvent,
  commit: (
    writes: PaymentStateWrite[],
    lease?: PaymentResourceLease,
  ) => Promise<void>,
) {
  const id = await subscriptionResource(event);
  if (!id) return commit([]);
  const lease = await claimPaymentResource(id);
  if (!lease) throw new PaymentError('conflict', 409);
  try {
    const writes = await paymentEventWrites(event, id);
    await commit(writes, lease);
  } finally {
    try {
      await releasePaymentResource(lease);
    } catch {
      /* The short lease expires; commit itself checks ownership before writing. */
    }
  }
}

async function billingState(
  invoice: StripeObject,
  identity: NonNullable<ReturnType<typeof subscriptionIdentity>>,
  event: StripePaymentEvent,
): Promise<BillingState> {
  if (
    invoice.livemode !== stripeConfiguration()!.live ||
    invoice.currency !== 'brl'
  )
    throw new PaymentError('invalid', 400);
  const paid =
    invoice.status === 'paid' &&
    typeof invoice.amount_paid === 'number' &&
    invoice.amount_paid > 0;
  const expectedAmount =
    invoice.billing_reason === 'subscription_create'
      ? identity.recurringCents + identity.setupCents
      : invoice.billing_reason === 'subscription_cycle'
        ? identity.recurringCents
        : undefined;
  const amountConfirmed =
    paid &&
    expectedAmount !== undefined &&
    invoice.amount_paid === expectedAmount &&
    invoice.amount_due === expectedAmount;
  const settled = invoice.status === 'paid' && invoice.amount_paid === 0;
  const paymentStatus = settled
    ? 'settled_without_charge'
    : paid
      ? amountConfirmed
        ? 'paid'
        : 'paid_amount_review_required'
      : invoice.status === 'void'
        ? 'void'
        : 'unpaid';
  const isEventInvoice = invoice.id === event.data.object.id;
  const lifecycle = settled
    ? 'invoice_settled_without_charge'
    : paid
      ? !amountConfirmed
        ? 'amount_review_required'
        : invoice.billing_reason === 'subscription_cycle'
          ? 'renewed'
          : 'initial_payment_confirmed'
      : invoice.status === 'void'
        ? 'invoice_voided'
        : invoice.status === 'uncollectible'
          ? 'uncollectible'
          : isEventInvoice && event.type === 'invoice.payment_action_required'
            ? 'authentication_required'
            : invoice.last_finalization_error != null
              ? 'finalization_failed'
              : invoice.attempted === true
                ? 'payment_failed'
                : 'payment_pending';
  return {
    source: 'stripe',
    axis: 'billing',
    paymentStatus,
    lifecycle,
    planId: identity.plan.id,
    cycle: identity.cycle,
    ...(paid ? { amountPaid: invoice.amount_paid as number } : {}),
    currency: 'brl',
    eventCreated: event.created,
    checkedAt: Math.floor(Date.now() / 1000),
  };
}

/** Build independent resource facts. Production callers must use processPaymentEvent to retain the resource lease through commit. */
export async function paymentEventWrites(
  event: StripePaymentEvent,
  expectedResourceId?: string,
): Promise<PaymentStateWrite[]> {
  const configuration = stripeConfiguration();
  if (!configuration) throw new PaymentError('unavailable');
  const id = relevantResourceId(event);
  if (!id) return [];
  let subscriptionId: string | undefined;
  let eventInvoice: StripeObject | undefined;
  const writes: PaymentStateWrite[] = [];
  if (checkoutEvents.includes(event.type)) {
    const checkout = await stripeRequest(
      `checkout/sessions/${id}`,
      configuration,
    );
    if (
      checkout.id !== id ||
      checkout.mode !== 'subscription' ||
      checkout.livemode !== configuration.live
    )
      throw new PaymentError('invalid', 400);
    const metadata = record(checkout.metadata);
    const plan = getPlan(metadata?.rdv_plan),
      cycle = metadata?.rdv_cycle;
    if (metadata?.rdv_app !== 'reidasvendas' || !plan || !isCycle(cycle))
      return [];
    subscriptionId = referenceId(checkout.subscription, 'sub');
    writes.push({
      kind: 'checkout',
      id,
      state: {
        source: 'stripe',
        axis: 'checkout',
        paymentStatus:
          checkout.payment_status === 'paid'
            ? 'paid_pending_invoice'
            : 'unpaid',
        lifecycle:
          checkout.status === 'expired'
            ? 'checkout_expired'
            : 'checkout_returned',
        planId: plan.id,
        cycle,
        eventCreated: event.created,
        checkedAt: Math.floor(Date.now() / 1000),
      },
    });
  } else if (invoiceEvents.includes(event.type)) {
    eventInvoice = await stripeRequest(`invoices/${id}`, configuration);
    if (eventInvoice.id !== id) throw new PaymentError('invalid', 400);
    subscriptionId = subscriptionFromInvoice(eventInvoice);
  } else subscriptionId = id;
  if (!subscriptionId) return writes;
  if (expectedResourceId && subscriptionId !== expectedResourceId)
    throw new PaymentError('conflict', 409);
  const subscription = await stripeRequest(
    `subscriptions/${subscriptionId}`,
    configuration,
  );
  if (
    subscription.id !== subscriptionId ||
    subscription.livemode !== configuration.live
  )
    throw new PaymentError('invalid', 400);
  const identity = subscriptionIdentity(subscription);
  if (!identity) return [];
  // Read the frozen approved Stripe Prices, rather than today's editable catalog, for legacy renewals.
  const [recurring, setup] = await Promise.all([
    stripeRequest(`prices/${identity.recurringPrice}`, configuration),
    stripeRequest(`prices/${identity.setupPrice}`, configuration),
  ]);
  assertPrice(
    { ...recurring, active: true },
    identity.recurringPrice,
    identity.recurringCents,
    configuration.live,
    identity.cycle,
  );
  assertPrice(
    { ...setup, active: true },
    identity.setupPrice,
    identity.setupCents,
    configuration.live,
  );
  if (eventInvoice)
    writes.push({
      kind: 'invoice',
      id: eventInvoice.id as string,
      state: await billingState(eventInvoice, identity, event),
    });
  // Latest means Stripe's latest_invoice reference, never the timestamp/order of the delivered event.
  const latestId = referenceId(subscription.latest_invoice, 'in');
  if (latestId) {
    const latest =
      eventInvoice?.id === latestId
        ? eventInvoice
        : await stripeRequest(`invoices/${latestId}`, configuration);
    if (
      latest.id !== latestId ||
      subscriptionFromInvoice(latest) !== subscriptionId
    )
      throw new PaymentError('invalid', 400);
    writes.push({
      kind: 'subscription-billing',
      id: subscriptionId,
      state: await billingState(latest, identity, event),
    });
  }
  const status = knownSubscriptionStatus(subscription.status);
  const cancelAtPeriodEnd = subscription.cancel_at_period_end === true;
  writes.push({
    kind: 'subscription',
    id: subscriptionId,
    state: {
      source: 'stripe',
      axis: 'subscription',
      subscriptionStatus: status,
      cancelAtPeriodEnd,
      lifecycle:
        status === 'canceled'
          ? 'canceled'
          : cancelAtPeriodEnd
            ? 'cancellation_scheduled'
            : 'subscription_updated',
      planId: identity.plan.id,
      cycle: identity.cycle,
      eventCreated: event.created,
      checkedAt: Math.floor(Date.now() / 1000),
    },
  });
  return writes;
}
