import { readTextLimit, BodyTooLargeError } from './request-body';
import { after, NextRequest, NextResponse } from 'next/server';
import {
  cleanText,
  rateLimit,
  sendMetaConversion,
  serverConsent,
  validOrigin,
} from './server-events';
export const runtime = 'nodejs';
export async function POST(request: NextRequest) {
  if (!validOrigin(request))
    return NextResponse.json(
      { error: 'Origem não permitida.' },
      { status: 403 },
    );
  if (!request.headers.get('content-type')?.includes('application/json'))
    return NextResponse.json({ error: 'Formato inválido.' }, { status: 415 });
  const length = Number(request.headers.get('content-length') || 0);
  if (length > 12000)
    return NextResponse.json(
      { error: 'Formulário muito grande.' },
      { status: 413 },
    );
  const limit = await rateLimit(request, 'lead');
  if (limit !== 'allowed')
    return NextResponse.json(
      {
        error:
          limit === 'limited'
            ? 'Muitas tentativas. Aguarde alguns minutos ou fale pelo WhatsApp.'
            : 'Formulário temporariamente indisponível. Fale pelo WhatsApp.',
      },
      {
        status: limit === 'limited' ? 429 : 503,
        headers: {
          'Cache-Control': 'no-store',
          ...(limit === 'limited' ? { 'Retry-After': '600' } : {}),
        },
      },
    );
  let body: Record<string, unknown>;
  try {
    const text = await readTextLimit(request, 12000);
    if (text.length > 12000)
      return NextResponse.json(
        { error: 'Formulário muito grande.' },
        { status: 413 },
      );
    const data: unknown = JSON.parse(text);
    if (!data || typeof data !== 'object' || Array.isArray(data))
      throw new Error();
    body = data as Record<string, unknown>;
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof BodyTooLargeError
            ? 'Formulário muito grande.'
            : 'Confira os dados do formulário.',
      },
      { status: error instanceof BodyTooLargeError ? 413 : 400 },
    );
  }
  const name = cleanText(body.name, 90),
    company = cleanText(body.company, 120),
    challenge = cleanText(body.challenge, 600);
  const phone = cleanText(body.phone, 25).replace(/\D/g, '');
  const eventId = cleanText(body.eventId, 80);
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = 'Informe seu nome.';
  if (!/^(?:55)?[1-9]{2}9?\d{8}$/.test(phone))
    errors.phone = 'Informe um WhatsApp com DDD.';
  if (company.length < 2) errors.company = 'Informe sua empresa.';
  if (challenge.length < 5)
    errors.challenge = 'Conte brevemente seu principal desafio.';
  if (body.contactConsent !== true)
    errors.contactConsent = 'Autorize o contato para receber o diagnóstico.';
  if (!/^[A-Za-z0-9_-]{16,80}$/.test(eventId))
    errors.eventId = 'Recarregue o formulário e tente novamente.';
  if (body.website)
    return NextResponse.json(
      { error: 'Não foi possível validar este envio.' },
      { status: 400 },
    );
  if (Object.keys(errors).length)
    return NextResponse.json({ errors }, { status: 422 });
  const crm = process.env.CRM_API_URL,
    key = process.env.CRM_API_KEY;
  if (!crm || !key)
    return NextResponse.json(
      {
        error:
          'O formulário está indisponível no momento. Envie seu pedido pelo WhatsApp.',
      },
      { status: 503 },
    );
  try {
    if (new URL(crm).protocol !== 'https:') throw new Error();
  } catch {
    return NextResponse.json(
      { error: 'Canal indisponível. Fale pelo WhatsApp.' },
      { status: 503 },
    );
  }
  const consent = serverConsent(request);
  const page = cleanText(body.page, 200);
  const safePage = /^\/(?!\/)[a-zA-Z0-9\-/_]*$/.test(page)
    ? page
    : '/diagnostico';
  const attribution =
    consent.analytics &&
    body.attribution &&
    typeof body.attribution === 'object'
      ? Object.fromEntries(
          Object.entries(body.attribution)
            .filter(([k]) => ['source', 'medium', 'campaign'].includes(k))
            .map(([k, v]) => [k, cleanText(v, 100)]),
        )
      : {};
  try {
    const response = await fetch(crm, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': eventId,
      },
      body: JSON.stringify({
        name,
        phone: phone.length > 11 ? phone : `55${phone}`,
        company,
        challenge,
        page: safePage,
        attribution,
        consent: {
          contact: true,
          analytics: consent.analytics,
          marketing: consent.marketing,
          purpose: 'Responder ao pedido de diagnóstico comercial',
          policyVersion: '2026-10-23',
          at: new Date().toISOString(),
        },
        eventId,
        status: 'new',
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(6000),
    });
    // Contract: the configured CRM must return {id} or {lead_id}; 2xx alone is not proof of creation.
    const data: unknown = await response.json();
    const createdId =
      data && typeof data === 'object'
        ? 'id' in data
          ? data.id
          : 'lead_id' in data
            ? data.lead_id
            : undefined
        : undefined;
    if (
      !response.ok ||
      !(
        (typeof createdId === 'string' && createdId.trim().length > 0) ||
        (typeof createdId === 'number' && Number.isFinite(createdId))
      )
    )
      throw new Error('CRM did not confirm creation');
    after(async () => {
      await sendMetaConversion(request, 'Lead', eventId, safePage);
    });
    return NextResponse.json(
      { ok: true, eventId, next: '/obrigado' },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch {
    return NextResponse.json(
      {
        error:
          'Seu pedido não foi confirmado. Tente novamente ou fale pelo WhatsApp.',
      },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
