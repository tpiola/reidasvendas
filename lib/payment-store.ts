import 'server-only';
import { createHmac, randomUUID } from 'node:crypto';

export class PaymentStoreError extends Error {
  constructor() {
    super('Payment storage unavailable');
  }
}

export function paymentStoreReady(): boolean {
  try {
    const url = new URL(process.env.UPSTASH_REDIS_REST_URL || '');
    return (
      url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      !!process.env.UPSTASH_REDIS_REST_TOKEN &&
      (process.env.RATE_LIMIT_SALT?.length || 0) >= 16
    );
  } catch {
    return false;
  }
}

/** Server-only Redis REST adapter. Never caches credentials, PII or raw Stripe payloads. */
async function redis(command: (string | number)[]): Promise<unknown> {
  if (!paymentStoreReady()) throw new PaymentStoreError();
  try {
    const response = await fetch(process.env.UPSTASH_REDIS_REST_URL!, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN!}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
      signal: AbortSignal.timeout(3000),
      cache: 'no-store',
    });
    const result: unknown = await response.json();
    if (
      !response.ok ||
      !result ||
      typeof result !== 'object' ||
      'error' in result ||
      !('result' in result)
    )
      throw new PaymentStoreError();
    return result.result;
  } catch {
    throw new PaymentStoreError();
  }
}

function key(part: string, identifier: string) {
  if (!paymentStoreReady()) throw new PaymentStoreError();
  const digest = createHmac('sha256', process.env.RATE_LIMIT_SALT!)
    .update(identifier)
    .digest('hex');
  return `rdv:{payments}:${part}:${digest}`;
}

export interface CheckoutOperation {
  id: string;
  fingerprint: string;
  createdAt: number;
  sessionId?: string;
}
export async function reserveCheckout(
  requestId: string,
  fingerprint: string,
): Promise<{ operation: CheckoutOperation; created: boolean }> {
  const operation: CheckoutOperation = {
    id: randomUUID(),
    fingerprint,
    createdAt: Math.floor(Date.now() / 1000),
  };
  const operationKey = key('checkout', requestId);
  const reserved = await redis([
    'SET',
    operationKey,
    JSON.stringify(operation),
    'NX',
    'EX',
    86400,
  ]);
  if (reserved === 'OK') return { operation, created: true };
  const raw = await redis(['GET', operationKey]);
  if (typeof raw !== 'string') throw new PaymentStoreError();
  try {
    const saved: unknown = JSON.parse(raw);
    if (
      !saved ||
      typeof saved !== 'object' ||
      !('id' in saved) ||
      typeof saved.id !== 'string' ||
      !('fingerprint' in saved) ||
      typeof saved.fingerprint !== 'string' ||
      !('createdAt' in saved) ||
      typeof saved.createdAt !== 'number' ||
      ('sessionId' in saved && typeof saved.sessionId !== 'string')
    )
      throw new PaymentStoreError();
    return { operation: saved as CheckoutOperation, created: false };
  } catch {
    throw new PaymentStoreError();
  }
}
export async function saveCheckoutSession(
  requestId: string,
  operation: CheckoutOperation,
  sessionId: string,
) {
  const result = await redis([
    'EVAL',
    "local v=redis.call('GET',KEYS[1]);if not v then return 0 end;local o=cjson.decode(v);if o.id~=ARGV[1] then return 0 end;o.sessionId=ARGV[2];redis.call('SET',KEYS[1],cjson.encode(o),'KEEPTTL');return 1",
    1,
    key('checkout', requestId),
    operation.id,
    sessionId,
  ]);
  if (result !== 1) throw new PaymentStoreError();
}

export type PaymentEventClaim =
  | { status: 'duplicate' }
  | { status: 'busy' }
  | { status: 'claimed'; token: string };

/** Durable event ledger plus a short lease. An in-flight duplicate is retried, not acknowledged. */
export async function claimPaymentEvent(
  eventId: string,
): Promise<PaymentEventClaim> {
  const token = randomUUID();
  const result = await redis([
    'EVAL',
    "if redis.call('EXISTS',KEYS[1])==1 then return 'duplicate' end;if redis.call('SET',KEYS[2],ARGV[1],'NX','EX',120) then return 'claimed' end;return 'busy'",
    2,
    key('event', eventId),
    key('event-lock', eventId),
    token,
  ]);
  if (result === 'duplicate') return { status: 'duplicate' };
  if (result === 'busy') return { status: 'busy' };
  if (result === 'claimed') return { status: 'claimed', token };
  throw new PaymentStoreError();
}

interface PaymentStateBase {
  source: 'stripe';
  planId: string;
  cycle: string;
  eventCreated: number;
  checkedAt: number;
}
export interface SubscriptionState extends PaymentStateBase {
  axis: 'subscription';
  subscriptionStatus: string;
  cancelAtPeriodEnd: boolean;
  lifecycle: string;
  paymentStatus?: never;
}
export interface BillingState extends PaymentStateBase {
  axis: 'billing';
  paymentStatus: string;
  lifecycle: string;
  amountPaid?: number;
  currency: 'brl';
  subscriptionStatus?: never;
}
export interface CheckoutState extends PaymentStateBase {
  axis: 'checkout';
  paymentStatus: 'paid_pending_invoice' | 'unpaid';
  lifecycle: 'checkout_expired' | 'checkout_returned';
  subscriptionStatus?: never;
}
export type MinimalPaymentState =
  SubscriptionState | BillingState | CheckoutState;
export type PaymentStateWrite =
  | { kind: 'subscription'; id: string; state: SubscriptionState }
  | {
      kind: 'invoice' | 'subscription-billing';
      id: string;
      state: BillingState;
    }
  | { kind: 'checkout'; id: string; state: CheckoutState };

export interface PaymentResourceLease {
  id: string;
  token: string;
}
export async function claimPaymentResource(
  id: string,
): Promise<PaymentResourceLease | undefined> {
  const token = randomUUID();
  const result = await redis([
    'SET',
    key('resource-lock', id),
    token,
    'NX',
    'EX',
    120,
  ]);
  if (result === 'OK') return { id, token };
  if (result === null) return undefined;
  throw new PaymentStoreError();
}
export async function releasePaymentResource(lease: PaymentResourceLease) {
  const result = await redis([
    'EVAL',
    "if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end;return 0",
    1,
    key('resource-lock', lease.id),
    lease.token,
  ]);
  if (typeof result !== 'number') throw new PaymentStoreError();
}

/** Commit canonical facts while the resource lease is still owned. Event timestamps are metadata, not ordering. */
export async function completePaymentEvent(
  eventId: string,
  token: string,
  eventCreated: number,
  writes: PaymentStateWrite[],
  resource?: PaymentResourceLease,
) {
  if (writes.length && !resource) throw new PaymentStoreError();
  const stateKeys = writes.map((write) => key(write.kind, write.id));
  const states = writes.map((write) => JSON.stringify(write.state));
  const result = await redis([
    'EVAL',
    "if redis.call('GET',KEYS[2])~=ARGV[1] then return 0 end;if ARGV[4]~='' and redis.call('GET',KEYS[3])~=ARGV[4] then return 0 end;local states=cjson.decode(ARGV[3]);for i,s in ipairs(states) do redis.call('SET',KEYS[i+3],s,'EX',34560000) end;redis.call('SET',KEYS[1],ARGV[2],'EX',34560000);redis.call('DEL',KEYS[2]);return 1",
    3 + stateKeys.length,
    key('event', eventId),
    key('event-lock', eventId),
    key('resource-lock', resource?.id || 'ledger-only'),
    ...stateKeys,
    token,
    eventCreated,
    JSON.stringify(states),
    resource?.token || '',
  ]);
  if (result !== 1) throw new PaymentStoreError();
}
export async function releasePaymentEvent(eventId: string, token: string) {
  const result = await redis([
    'EVAL',
    "if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end;return 0",
    1,
    key('event-lock', eventId),
    token,
  ]);
  if (typeof result !== 'number') throw new PaymentStoreError();
}
