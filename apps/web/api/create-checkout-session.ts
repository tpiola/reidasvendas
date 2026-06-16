/* ═══════════════════════════════════════════
   API CREATE-CHECKOUT-SESSION — Rei das Vendas
   Cria sessão de checkout no Stripe via API REST
   ════════════════════════════════════════════ */

interface ApiRequest {
  method?: string;
  body?: unknown;
}

interface ApiResponse {
  statusCode: number;
  setHeader: (name: string, value: string) => void;
  end: (body?: string) => void;
}

function json(res: ApiResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.end(JSON.stringify(body));
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function sanitizeString(value: unknown, maxLen = 500): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/* ─── Preços Stripe ─── */
const STRIPE_PRICE_IDS: Record<string, string> = {
  digital: process.env.STRIPE_PRICE_DIGITAL ?? '',
  profissional: process.env.STRIPE_PRICE_PROFISSIONAL ?? '',
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE ?? '',
};

export default async function handler(req: unknown, res: unknown) {
  const request = req as ApiRequest;
  const response = res as ApiResponse;

  /* ─── CORS ─────────────────────────────── */
  if (request.method === 'OPTIONS') return json(response, 204, {});

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return json(response, 405, { ok: false, error: 'method_not_allowed' });
  }

  /* ─── Validar body ─────────────────────── */
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return json(response, 500, { ok: false, error: 'missing_stripe_key' });
  }

  const body = isObject(request.body) ? request.body : {};
  const planId = sanitizeString(body.planId);
  const email = sanitizeString(body.email);
  const name = sanitizeString(body.name);

  if (!planId) return json(response, 400, { ok: false, error: 'planId_required' });
  if (!email) return json(response, 400, { ok: false, error: 'email_required' });
  if (!isEmail(email)) return json(response, 400, { ok: false, error: 'invalid_email' });
  if (!name) return json(response, 400, { ok: false, error: 'name_required' });

  const priceId = STRIPE_PRICE_IDS[planId];
  if (!priceId) {
    return json(response, 400, { ok: false, error: `invalid_plan: ${planId}` });
  }

  /* ─── Criar Checkout Session via Stripe API ─── */
  const origin = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:5173';

  try {
    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'success_url': `${origin}/obrigado?session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': `${origin}/planos`,
        'mode': 'subscription',
        'line_items[0][price]': priceId,
        'line_items[0][quantity]': '1',
        'customer_email': email,
        'client_reference_id': email,
        'metadata[plan_id]': planId,
        'metadata[customer_name]': name,
      }).toString(),
    });

    const data = await stripeRes.json() as Record<string, unknown>;

    if (!stripeRes.ok) {
      console.error('[Stripe API error]', data);
      return json(response, 502, {
        ok: false,
        error: 'stripe_api_error',
        message: typeof data.error === 'object' ? (data.error as Record<string, unknown>)?.message : 'Erro ao criar checkout',
      });
    }

    return json(response, 200, {
      ok: true,
      url: data.url,
      sessionId: data.id,
    });
  } catch (err) {
    console.error('[Stripe fetch error]', err);
    return json(response, 502, { ok: false, error: 'stripe_connection_error' });
  }
}
