import { NextRequest, NextResponse } from 'next/server';
import { BodyTooLargeError, readTextLimit } from '@/lib/request-body';
import {
  parseStripePaymentEvent,
  processPaymentEvent,
  PaymentError,
  verifyStripeSignature,
  webhookConfiguration,
} from '@/lib/payments';
import {
  claimPaymentEvent,
  completePaymentEvent,
  releasePaymentEvent,
} from '@/lib/payment-store';

export const runtime = 'nodejs';
const headers = { 'Cache-Control': 'private, no-store' };

export async function POST(request: NextRequest) {
  const configuration = webhookConfiguration();
  if (!configuration)
    return NextResponse.json(
      { error: 'Webhook indisponível.' },
      { status: 503, headers },
    );
  // Provider callbacks have no browser Origin. HMAC is the trust boundary, not CORS or a public API key.
  let raw: string;
  try {
    raw = await readTextLimit(request, 262144);
  } catch (error) {
    return NextResponse.json(
      { error: 'Corpo inválido.' },
      {
        status: error instanceof BodyTooLargeError ? 413 : 400,
        headers,
      },
    );
  }
  if (
    !verifyStripeSignature(
      raw,
      request.headers.get('stripe-signature'),
      configuration.secret,
    )
  )
    return NextResponse.json(
      { error: 'Assinatura inválida.' },
      { status: 400, headers },
    );
  let event;
  try {
    event = parseStripePaymentEvent(JSON.parse(raw));
  } catch {
    return NextResponse.json(
      { error: 'Evento inválido ou versão incompatível.' },
      { status: 400, headers },
    );
  }
  let token: string | undefined;
  try {
    const claim = await claimPaymentEvent(event.id);
    if (claim.status === 'duplicate')
      return NextResponse.json(
        { received: true, duplicate: true },
        { headers },
      );
    if (claim.status === 'busy')
      return NextResponse.json(
        { error: 'Evento em processamento.' },
        { status: 503, headers: { ...headers, 'Retry-After': '3' } },
      );
    token = claim.token;
    const ownedToken = token;
    await processPaymentEvent(event, async (writes, resource) => {
      await completePaymentEvent(
        event.id,
        ownedToken,
        event.created,
        writes,
        resource,
      );
    });
    // No purchase/advertising event here: Stripe's request does not prove a visitor's optional consent.
    // No provisioning, real messages or CRM writes are implied by storing provider status.
    return NextResponse.json({ received: true }, { headers });
  } catch (error) {
    if (token) {
      try {
        await releasePaymentEvent(event.id, token);
      } catch {
        /* Lease expiry permits a retry; never acknowledge a failed durable commit. */
      }
    }
    return NextResponse.json(
      { error: 'Não foi possível processar o evento.' },
      {
        status:
          error instanceof PaymentError && error.status === 400 ? 400 : 503,
        headers: { ...headers, 'Retry-After': '10' },
      },
    );
  }
}
