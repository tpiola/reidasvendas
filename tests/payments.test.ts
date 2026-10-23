import { createHmac } from 'node:crypto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('server-only', () => ({}));
const catalog = vi.hoisted(() => ({ approved: true }));
vi.mock('../data/subscription-plans', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../data/subscription-plans')>()),
  isSubscriptionOfferApproved: () => catalog.approved,
}));
const stores = vi.hoisted(() => ({
  paymentStoreReady: vi.fn(),
  reserveCheckout: vi.fn(),
  saveCheckoutSession: vi.fn(),
  claimPaymentEvent: vi.fn(),
  completePaymentEvent: vi.fn(),
  releasePaymentEvent: vi.fn(),
  claimPaymentResource: vi.fn(),
  releasePaymentResource: vi.fn(),
}));
const boundaries = vi.hoisted(() => ({
  validOrigin: vi.fn(),
  rateLimit: vi.fn(),
}));
vi.mock('../lib/payment-store', () => stores);
vi.mock('../lib/server-events', () => ({
  ...boundaries,
  siteOrigin: () => 'https://www.reidasvendas.com.br',
}));

import {
  createSubscriptionCheckout,
  isCheckoutConfigured,
  parseCheckoutInput,
  parseStripePaymentEvent,
  paymentEventWrites,
  processPaymentEvent,
  verifyStripeSignature,
} from '../lib/payments';
import { POST as checkoutPost } from '../app/api/checkout/route';
import { POST as webhookPost } from '../app/api/payments/webhook/route';

const VERSION = '2026-09-30.clover'; // Shape fixture only; operator must pin the real account API version.
const SECRET = 'whsec_unitonly';
const ORIGIN = 'https://www.reidasvendas.com.br';
const input = {
  planId: 'essencial',
  cycle: 'monthly' as const,
  requestId: '3a2b1c00-1234-4abc-8123-123456789abc',
  termsAccepted: true as const,
  website: '',
};
const operation = {
  id: '6a2b1c00-1234-4abc-8123-123456789abc',
  fingerprint: '',
  createdAt: Math.floor(Date.now() / 1000),
};
const event = () => ({
  id: 'evt_unittest123',
  object: 'event',
  type: 'invoice.paid',
  created: Math.floor(Date.now() / 1000),
  livemode: false,
  api_version: VERSION,
  data: { object: { id: 'in_unittest123' } },
});
const signature = (raw: string, timestamp = Math.floor(Date.now() / 1000)) =>
  `t=${timestamp},v1=${createHmac('sha256', SECRET).update(`${timestamp}.${raw}`).digest('hex')}`;
const webhookRequest = (
  raw = JSON.stringify(event()),
  signed = signature(raw),
) =>
  new NextRequest(`${ORIGIN}/api/payments/webhook`, {
    method: 'POST',
    headers: { 'stripe-signature': signed, 'content-type': 'application/json' },
    body: raw,
  });
const checkoutRequest = (
  body: unknown = input,
  headers: Record<string, string> = {},
) =>
  new NextRequest(`${ORIGIN}/api/checkout`, {
    method: 'POST',
    headers: { origin: ORIGIN, 'content-type': 'application/json', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
const price = (setup = false, amount?: number) => ({
  id: setup ? 'price_setup123' : 'price_month123',
  object: 'price',
  active: true,
  currency: 'brl',
  unit_amount: amount ?? (setup ? 149700 : 49700),
  livemode: false,
  billing_scheme: 'per_unit',
  type: setup ? 'one_time' : 'recurring',
  recurring: setup
    ? null
    : { interval: 'month', interval_count: 1, usage_type: 'licensed' },
});
const session = () => ({
  id: 'cs_test_unittest123',
  mode: 'subscription',
  livemode: false,
  status: 'open',
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  url: 'https://checkout.stripe.com/c/pay/cs_test_unittest123',
});
const subscription = () => ({
  id: 'sub_unittest123',
  livemode: false,
  status: 'active',
  cancel_at_period_end: false,
  latest_invoice: 'in_unittest123',
  metadata: {
    rdv_app: 'reidasvendas',
    rdv_plan: 'essencial',
    rdv_cycle: 'monthly',
    rdv_recurring_cents: '49700',
    rdv_setup_cents: '149700',
    rdv_recurring_price: 'price_month123',
    rdv_setup_price: 'price_setup123',
    rdv_terms: 'test-v1',
  },
});
const invoice = () => ({
  id: 'in_unittest123',
  livemode: false,
  status: 'paid',
  currency: 'brl',
  amount_paid: 49700,
  amount_due: 49700,
  billing_reason: 'subscription_cycle',
  attempted: true,
  parent: { subscription_details: { subscription: 'sub_unittest123' } },
});
function providerMock(
  overrides: {
    recurring?: unknown;
    setup?: unknown;
    session?: unknown;
    invoice?: unknown;
    subscription?: unknown;
  } = {},
) {
  return vi.fn(async (target: string | URL | Request) => {
    const url = String(target);
    if (url.endsWith('/prices/price_month123'))
      return Response.json(overrides.recurring ?? price());
    if (url.endsWith('/prices/price_setup123'))
      return Response.json(overrides.setup ?? price(true));
    if (url.includes('/checkout/sessions'))
      return Response.json(overrides.session ?? session());
    if (url.endsWith('/invoices/in_unittest123'))
      return Response.json(overrides.invoice ?? invoice());
    if (url.endsWith('/subscriptions/sub_unittest123'))
      return Response.json(overrides.subscription ?? subscription());
    throw new Error('Unexpected provider request');
  });
}
beforeEach(() => {
  vi.clearAllMocks();
  catalog.approved = true;
  vi.stubEnv('SUBSCRIPTIONS_OFFER_APPROVED', 'true');
  vi.stubEnv('SUBSCRIPTIONS_TERMS_APPROVED', 'true');
  vi.stubEnv('SUBSCRIPTIONS_TERMS_VERSION', 'unit-test-v1');
  vi.stubEnv('BUSINESS_LEGAL_NAME', 'Empresa de Teste');
  vi.stubEnv('BUSINESS_CNPJ', '00000000000191');
  vi.stubEnv('PRIVACY_CONTACT_EMAIL', 'privacidade@example.test');
  vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_unit123');
  vi.stubEnv('STRIPE_WEBHOOK_SECRET', SECRET);
  vi.stubEnv('STRIPE_API_VERSION', VERSION);
  vi.stubEnv('STRIPE_MODE', 'test');
  vi.stubEnv('VERCEL_ENV', 'preview');
  vi.stubEnv('STRIPE_PRICE_ESSENCIAL_MONTHLY', 'price_month123');
  vi.stubEnv('STRIPE_PRICE_ESSENCIAL_ANNUAL', 'price_year123');
  vi.stubEnv('STRIPE_PRICE_ESSENCIAL_SETUP', 'price_setup123');
  stores.paymentStoreReady.mockReturnValue(true);
  stores.reserveCheckout.mockImplementation(async (_id, fingerprint) => ({
    operation: {
      ...operation,
      fingerprint,
      createdAt: Math.floor(Date.now() / 1000),
    },
    created: true,
  }));
  stores.saveCheckoutSession.mockResolvedValue(undefined);
  stores.claimPaymentEvent.mockResolvedValue({
    status: 'claimed',
    token: 'unit-lease',
  });
  stores.completePaymentEvent.mockResolvedValue(undefined);
  stores.releasePaymentEvent.mockResolvedValue(undefined);
  stores.claimPaymentResource.mockImplementation(async (id) => ({
    id,
    token: 'resource-lease',
  }));
  stores.releasePaymentResource.mockResolvedValue(undefined);
  boundaries.validOrigin.mockReturnValue(true);
  boundaries.rateLimit.mockResolvedValue('allowed');
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('checkout authority and safe degradation', () => {
  it('rejects arbitrary prices, destinations, unknown plans and missing agreement', () => {
    for (const body of [
      { ...input, price: 1 },
      { ...input, success_url: 'https://attacker.test' },
      { ...input, planId: 'fake' },
      { ...input, termsAccepted: false },
      { ...input, requestId: 'guessable' },
      { ...input, website: 'spam' },
    ])
      expect(() => parseCheckoutInput(body)).toThrow();
  });
  it('never starts checkout without approval, identity, proper environment or durable storage', async () => {
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);
    catalog.approved = false;
    expect(isCheckoutConfigured('essencial', 'monthly')).toBe(false);
    catalog.approved = true;
    vi.stubEnv('SUBSCRIPTIONS_OFFER_APPROVED', 'false');
    expect(isCheckoutConfigured('essencial', 'monthly')).toBe(false);
    await expect(createSubscriptionCheckout(input)).rejects.toThrow();
    vi.stubEnv('SUBSCRIPTIONS_OFFER_APPROVED', 'true');
    vi.stubEnv('SUBSCRIPTIONS_TERMS_APPROVED', 'false');
    expect(isCheckoutConfigured('essencial', 'monthly')).toBe(false);
    vi.stubEnv('SUBSCRIPTIONS_TERMS_APPROVED', 'true');
    vi.stubEnv('VERCEL_ENV', 'production');
    expect(isCheckoutConfigured('essencial', 'monthly')).toBe(false);
    vi.stubEnv('VERCEL_ENV', 'preview');
    stores.paymentStoreReady.mockReturnValue(false);
    expect(isCheckoutConfigured('essencial', 'monthly')).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });
  it('checks Stripe amounts and recurring cycle before creating the hosted session', async () => {
    const fetch = providerMock({ recurring: price(false, 100) });
    vi.stubGlobal('fetch', fetch);
    await expect(createSubscriptionCheckout(input)).rejects.toThrow();
    expect(
      fetch.mock.calls.some(([url]) =>
        String(url).endsWith('/checkout/sessions'),
      ),
    ).toBe(false);
    expect(stores.saveCheckoutSession).not.toHaveBeenCalled();
  });
  it('sets recurring and setup prices server-side with an opaque idempotency key', async () => {
    const fetch = providerMock();
    vi.stubGlobal('fetch', fetch);
    const checkout = await createSubscriptionCheckout(input);
    expect(checkout.url).toBe(session().url);
    const post = fetch.mock.calls.find(([url]) =>
      String(url).endsWith('/checkout/sessions'),
    )!;
    const options = (post as unknown as [string, RequestInit])[1];
    const body = new URLSearchParams(options.body as string);
    expect(body.get('mode')).toBe('subscription');
    expect(body.get('line_items[0][price]')).toBe('price_month123');
    expect(body.get('line_items[1][price]')).toBe('price_setup123');
    expect(body.get('success_url')).toBe(`${ORIGIN}/obrigado?checkout=retorno`);
    expect(JSON.stringify(options)).not.toContain('customer_email');
    expect((options.headers as Record<string, string>)['Idempotency-Key']).toBe(
      `rdv-subscription-${operation.id}`,
    );
    expect(stores.saveCheckoutSession).toHaveBeenCalledOnce();
  });
  it('charges annual recurring total separately from the undiscounted setup', async () => {
    const base = providerMock();
    const fetch = vi.fn(async (target: string | URL | Request) => {
      if (String(target).endsWith('/prices/price_year123'))
        return Response.json({
          ...price(),
          id: 'price_year123',
          unit_amount: 548688,
          recurring: {
            interval: 'year',
            interval_count: 1,
            usage_type: 'licensed',
          },
        });
      return base(target);
    });
    vi.stubGlobal('fetch', fetch);
    await createSubscriptionCheckout({ ...input, cycle: 'annual' });
    const call = base.mock.calls.find(([target]) =>
      String(target).endsWith('/checkout/sessions'),
    );
    expect(call).toBeDefined();
    expect(stores.saveCheckoutSession).toHaveBeenCalledOnce();
  });

  it('rejects unexpected provider redirect hosts instead of forwarding visitors', async () => {
    vi.stubGlobal(
      'fetch',
      providerMock({
        session: {
          ...session(),
          url: 'https://checkout.stripe.com.attacker.test/pay',
        },
      }),
    );
    await expect(createSubscriptionCheckout(input)).rejects.toThrow();
    expect(stores.saveCheckoutSession).not.toHaveBeenCalled();
  });
  it('reuses confirmed sessions and rejects request-id reuse for a different offer', async () => {
    const fetch = providerMock();
    vi.stubGlobal('fetch', fetch);
    stores.reserveCheckout.mockImplementation(async (_id, fingerprint) => ({
      operation: {
        ...operation,
        fingerprint,
        sessionId: 'cs_test_unittest123',
      },
      created: false,
    }));
    await createSubscriptionCheckout(input);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(String(fetch.mock.calls[0][0])).toContain(
      '/checkout/sessions/cs_test_unittest123',
    );
    stores.reserveCheckout.mockResolvedValue({
      operation: { ...operation, fingerprint: 'another-plan' },
      created: false,
    });
    await expect(createSubscriptionCheckout(input)).rejects.toThrow();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('enforces origin, bounded body and durable rate limits at the public endpoint', async () => {
    boundaries.validOrigin.mockReturnValue(false);
    expect((await checkoutPost(checkoutRequest())).status).toBe(403);
    boundaries.validOrigin.mockReturnValue(true);
    expect((await checkoutPost(checkoutRequest('x'.repeat(3001)))).status).toBe(
      413,
    );
    expect(
      (
        await checkoutPost(
          checkoutRequest(input, { 'content-type': 'text/plain' }),
        )
      ).status,
    ).toBe(415);
    boundaries.rateLimit.mockResolvedValue('unavailable');
    expect((await checkoutPost(checkoutRequest())).status).toBe(503);
    boundaries.rateLimit.mockResolvedValue('limited');
    const limited = await checkoutPost(checkoutRequest());
    expect(limited.status).toBe(429);
    expect(limited.headers.get('retry-after')).toBe('600');
  });
});

describe('Stripe callback authenticity and state', () => {
  it('accepts raw signatures, supports rotation, and rejects mutated, stale, future and malformed inputs', () => {
    const raw = JSON.stringify(event());
    const now = Math.floor(Date.now() / 1000);
    expect(verifyStripeSignature(raw, signature(raw, now), SECRET, now)).toBe(
      true,
    );
    expect(
      verifyStripeSignature(
        raw,
        `${signature(raw, now)},v1=${'0'.repeat(64)}`,
        SECRET,
        now,
      ),
    ).toBe(true);
    expect(
      verifyStripeSignature(raw + ' ', signature(raw, now), SECRET, now),
    ).toBe(false);
    expect(
      verifyStripeSignature(raw, signature(raw, now - 301), SECRET, now),
    ).toBe(false);
    expect(
      verifyStripeSignature(raw, signature(raw, now + 301), SECRET, now),
    ).toBe(false);
    for (const header of [
      null,
      't=abc,v1=x',
      `t=${now},t=${now},v1=x`,
      `t=${now},v1=abc`,
    ])
      expect(verifyStripeSignature(raw, header, SECRET, now)).toBe(false);
  });
  it('rejects unsupported API versions and mixed live/test events', () => {
    expect(() =>
      parseStripePaymentEvent({ ...event(), api_version: '2020-08-27' }),
    ).toThrow();
    expect(() =>
      parseStripePaymentEvent({ ...event(), livemode: true }),
    ).toThrow();
    expect(() =>
      parseStripePaymentEvent({ ...event(), object: 'v2.core.event' }),
    ).toThrow();
  });
  it('does not acknowledge an event whose signature is invalid or whose durable commit failed', async () => {
    expect(
      (await webhookPost(webhookRequest(JSON.stringify(event()), 't=0,v1=bad')))
        .status,
    ).toBe(400);
    expect(stores.claimPaymentEvent).not.toHaveBeenCalled();
    vi.stubGlobal('fetch', providerMock());
    stores.completePaymentEvent.mockRejectedValue(new Error('Redis failure'));
    expect((await webhookPost(webhookRequest())).status).toBe(503);
    expect(stores.releasePaymentEvent).toHaveBeenCalledWith(
      'evt_unittest123',
      'unit-lease',
    );
  });
  it('acknowledges durable duplicates without provider calls and retries concurrent in-flight events', async () => {
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);
    stores.claimPaymentEvent.mockResolvedValue({ status: 'duplicate' });
    const duplicate = await webhookPost(webhookRequest());
    expect(duplicate.status).toBe(200);
    expect((await duplicate.json()).duplicate).toBe(true);
    expect(fetch).not.toHaveBeenCalled();
    expect(stores.completePaymentEvent).not.toHaveBeenCalled();
    stores.claimPaymentEvent.mockResolvedValue({ status: 'busy' });
    expect((await webhookPost(webhookRequest())).status).toBe(503);
  });
  it('refetches canonical objects and records a verified renewal without PII or purchase telemetry', async () => {
    const fetch = providerMock({
      invoice: {
        ...invoice(),
        customer_email: 'private@example.test',
        customer_name: 'Private',
      },
    });
    vi.stubGlobal('fetch', fetch);
    expect((await webhookPost(webhookRequest())).status).toBe(200);
    const writes = stores.completePaymentEvent.mock.calls[0][3];
    expect(writes).toHaveLength(3);
    expect(writes[0].state.lifecycle).toBe('renewed');
    expect(writes[0].state.amountPaid).toBe(49700);
    expect(JSON.stringify(writes)).not.toContain('private@example.test');
    expect(
      fetch.mock.calls.every(([url]) =>
        String(url).startsWith('https://api.stripe.com/'),
      ),
    ).toBe(true);
  });
  it('routes unexpected paid amounts to review and distinguishes dunning and cancellation', async () => {
    vi.stubGlobal(
      'fetch',
      providerMock({ invoice: { ...invoice(), amount_paid: 1 } }),
    );
    const anomaly = await paymentEventWrites(parseStripePaymentEvent(event()));
    expect(anomaly[0].state.lifecycle).toBe('amount_review_required');
    vi.stubGlobal(
      'fetch',
      providerMock({
        invoice: { ...invoice(), status: 'open', amount_paid: 0 },
        subscription: { ...subscription(), status: 'past_due' },
      }),
    );
    const failed = await paymentEventWrites(
      parseStripePaymentEvent({ ...event(), type: 'invoice.payment_failed' }),
    );
    expect(failed[0].state.lifecycle).toBe('payment_failed');
    expect(
      failed.find((write) => write.kind === 'subscription')!.state
        .subscriptionStatus,
    ).toBe('past_due');
    vi.stubGlobal(
      'fetch',
      providerMock({ subscription: { ...subscription(), status: 'canceled' } }),
    );
    const canceled = await paymentEventWrites(
      parseStripePaymentEvent({
        ...event(),
        type: 'customer.subscription.deleted',
        data: { object: { id: 'sub_unittest123' } },
      }),
    );
    expect(
      canceled.find((write) => write.kind === 'subscription')!.state.lifecycle,
    ).toBe('canceled');
  });
  it.each(['invoice-first', 'subscription-first'] as const)(
    'keeps billing and subscription axes independently in %s order, including the same event second',
    async (order) => {
      vi.stubGlobal('fetch', providerMock());
      const paid = parseStripePaymentEvent(event());
      const updated = parseStripePaymentEvent({
        ...event(),
        id: 'evt_updated123',
        type: 'customer.subscription.updated',
        data: { object: { id: 'sub_unittest123' } },
      });
      const events =
        order === 'invoice-first' ? [paid, updated] : [updated, paid];
      const facts = new Map<string, Record<string, unknown>>();
      for (const incoming of events) {
        await processPaymentEvent(incoming, async (writes, lease) => {
          expect(lease?.id).toBe('sub_unittest123');
          for (const write of writes)
            facts.set(`${write.kind}:${write.id}`, { ...write.state });
        });
      }
      expect(
        facts.get('subscription-billing:sub_unittest123')?.paymentStatus,
      ).toBe('paid');
      expect(facts.get('subscription-billing:sub_unittest123')?.lifecycle).toBe(
        'renewed',
      );
      expect(
        facts.get('subscription:sub_unittest123')?.subscriptionStatus,
      ).toBe('active');
      expect(facts.get('subscription:sub_unittest123')).not.toHaveProperty(
        'paymentStatus',
      );
      expect(stores.releasePaymentResource).toHaveBeenCalledTimes(2);
    },
  );

  it('retains frozen approved recurring amounts when the public catalog has a different current price', async () => {
    vi.stubGlobal(
      'fetch',
      providerMock({
        recurring: price(false, 39700),
        invoice: { ...invoice(), amount_paid: 39700, amount_due: 39700 },
        subscription: {
          ...subscription(),
          metadata: {
            ...subscription().metadata,
            rdv_recurring_cents: '39700',
          },
        },
      }),
    );
    const writes = await paymentEventWrites(parseStripePaymentEvent(event()));
    expect(
      writes.find((write) => write.kind === 'subscription-billing')!.state
        .paymentStatus,
    ).toBe('paid');
    const frozen = writes.find(
      (write) => write.kind === 'subscription-billing',
    );
    expect(
      frozen?.state.axis === 'billing' ? frozen.state.amountPaid : undefined,
    ).toBe(39700);
  });

  it('refuses a concurrent resource lease and releases it only after the durable callback', async () => {
    vi.stubGlobal('fetch', providerMock());
    const commit = vi.fn();
    stores.claimPaymentResource.mockResolvedValue(undefined);
    await expect(
      processPaymentEvent(parseStripePaymentEvent(event()), commit),
    ).rejects.toThrow();
    expect(commit).not.toHaveBeenCalled();
    stores.claimPaymentResource.mockResolvedValue({
      id: 'sub_unittest123',
      token: 'resource-lease',
    });
    await processPaymentEvent(parseStripePaymentEvent(event()), async () => {
      expect(stores.releasePaymentResource).not.toHaveBeenCalled();
    });
    expect(stores.releasePaymentResource).toHaveBeenCalledOnce();
  });

  it('ignores unrelated Stripe subscriptions instead of attributing them to this offer', async () => {
    vi.stubGlobal(
      'fetch',
      providerMock({ subscription: { ...subscription(), metadata: {} } }),
    );
    expect(await paymentEventWrites(parseStripePaymentEvent(event()))).toEqual(
      [],
    );
  });
});

describe('durable ledger adapter contract', () => {
  it('uses one atomic Redis script for claim, and fails closed on storage errors', async () => {
    const actual = await vi.importActual<typeof import('../lib/payment-store')>(
      '../lib/payment-store',
    );
    vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://redis.example.test');
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'unit-only');
    vi.stubEnv('RATE_LIMIT_SALT', 'unit-only-long-salt-123');
    const fetch = vi
      .fn()
      .mockResolvedValue(Response.json({ result: 'claimed' }));
    vi.stubGlobal('fetch', fetch);
    expect((await actual.claimPaymentEvent('evt_unittest123')).status).toBe(
      'claimed',
    );
    const command = JSON.parse(fetch.mock.calls[0][1].body);
    expect(command[0]).toBe('EVAL');
    expect(command[1]).toContain("'NX','EX',120");
    expect(command[1]).toContain("'duplicate'");
    expect(JSON.stringify(command)).not.toContain('evt_unittest123');
    fetch.mockResolvedValue(
      Response.json({ error: 'backend unavailable' }, { status: 500 }),
    );
    await expect(actual.claimPaymentEvent('evt_unittest123')).rejects.toThrow();
  });
});
