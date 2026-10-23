import { NextRequest, NextResponse } from 'next/server';
import { BodyTooLargeError, readTextLimit } from '@/lib/request-body';
import { rateLimit, validOrigin } from '@/lib/server-events';
import {
  createSubscriptionCheckout,
  parseCheckoutInput,
  PaymentError,
} from '@/lib/payments';

export const runtime = 'nodejs';
const noStore = { 'Cache-Control': 'private, no-store' };

export async function POST(request: NextRequest) {
  if (!validOrigin(request))
    return NextResponse.json(
      { error: 'Origem não permitida.' },
      { status: 403, headers: noStore },
    );
  if (!request.headers.get('content-type')?.includes('application/json'))
    return NextResponse.json(
      { error: 'Formato inválido.' },
      { status: 415, headers: noStore },
    );
  let input;
  try {
    input = parseCheckoutInput(JSON.parse(await readTextLimit(request, 3000)));
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof BodyTooLargeError
            ? 'Solicitação muito grande.'
            : 'Confira o plano, o ciclo e a concordância com as condições.',
      },
      {
        status: error instanceof BodyTooLargeError ? 413 : 422,
        headers: noStore,
      },
    );
  }
  const limit = await rateLimit(request, 'checkout', 5, 600);
  if (limit !== 'allowed')
    return NextResponse.json(
      {
        error:
          limit === 'limited'
            ? 'Muitas tentativas. Aguarde alguns minutos.'
            : 'A contratação online ainda não está disponível. Fale com a equipe pelo WhatsApp.',
      },
      {
        status: limit === 'limited' ? 429 : 503,
        headers: {
          ...noStore,
          ...(limit === 'limited' ? { 'Retry-After': '600' } : {}),
        },
      },
    );
  try {
    const checkout = await createSubscriptionCheckout(input);
    return NextResponse.json(checkout, { headers: noStore });
  } catch (error) {
    const status = error instanceof PaymentError ? error.status : 503;
    return NextResponse.json(
      {
        error:
          status === 409
            ? 'Esta tentativa está em processamento ou expirou. Aguarde e tente novamente; se já pagou, fale com a equipe antes de iniciar outra contratação.'
            : 'Não foi possível abrir o pagamento. Nenhuma contratação foi confirmada neste site. Tente novamente ou fale pelo WhatsApp.',
      },
      {
        status,
        headers: {
          ...noStore,
          ...(status === 409 ? { 'Retry-After': '3' } : {}),
        },
      },
    );
  }
}
