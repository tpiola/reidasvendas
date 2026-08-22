/* ═══════════════════════════════════════════
   API LEAD.TS — Rei das Vendas
   Captura leads via n8n webhook
═══════════════════════════════════════════ */

type RequestListener = (value?: unknown) => void;

type Req = {
  method?: string;
  headers?: Record<string, string | undefined>;
  body?: unknown;
  on?: (event: string, listener: RequestListener) => void;
};

type Res = {
  statusCode?: number;
  setHeader?: (key: string, value: string) => void;
  end?: (data?: string) => void;
  status?: (code: number) => { json: (body: unknown) => void };
};

const MAX_BODY_BYTES = 16_384;

type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message?: string;
  source?: string;
  service?: string;
  problem?: string;
  investment?: string;
  landingPage?: string;
  consent?: boolean;
  utm?: Record<string, string>;
};

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

function parseLeadBody(input: unknown): { ok: true; value: LeadPayload } | { ok: false; error: string } {
  if (!isObject(input)) return { ok: false, error: 'invalid_body' };

  const name = sanitizeString(input.name || input.nome, 200);
  const email = sanitizeString(input.email, 320);
  const phone = sanitizeString(input.phone || input.whatsapp, 30);
  const company = sanitizeString(input.company || input.ramo, 200) || undefined;
  const message = sanitizeString(input.message || input.mensagem, 2000) || undefined;
  const source = sanitizeString(input.source || input.origem, 100) || 'reidasvendas.com.br';
  const service = sanitizeString(input.service, 150) || undefined;
  const problem = sanitizeString(input.problem, 1000) || undefined;
  const investment = sanitizeString(input.investment, 100) || undefined;
  const landingPage = sanitizeString(input.landingPage, 300) || undefined;
  const consent = typeof input.consent === 'boolean' ? input.consent : undefined;
  const attributionInput = isObject(input.utm) ? input.utm : undefined;
  const utm = attributionInput
    ? Object.fromEntries(
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'landing_page', 'referrer']
        .map((key) => [key, sanitizeString(attributionInput[key], 200)] as const)
        .filter(([, value]) => Boolean(value)),
    )
    : undefined;

  if (!name) return { ok: false, error: 'name_required' };
  if (!email) return { ok: false, error: 'email_required' };
  if (!isEmail(email)) return { ok: false, error: 'invalid_email' };
  if (!phone) return { ok: false, error: 'phone_required' };

  return {
    ok: true,
    value: {
      name,
      email,
      phone,
      company,
      message,
      source,
      service,
      problem,
      investment,
      landingPage,
      consent,
      ...(utm && Object.keys(utm).length ? { utm } : {}),
    },
  };
}

function json(res: Res, status: number, body: unknown) {
  if (res.status) {
    res.status(status).json(body);
    return;
  }

  res.statusCode = status;
  res.setHeader?.('Content-Type', 'application/json; charset=utf-8');
  res.setHeader?.('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader?.('Access-Control-Allow-Headers', 'Content-Type');
  res.end?.(JSON.stringify(body));
}

export default async function handler(req: Req, res: Res) {
  /* ─── CORS ─────────────────────────────── */
  if (req.method === 'OPTIONS') {
    json(res, 204, {});
    return;
  }

  if (req.method !== 'POST') {
    json(res, 405, { ok: false, error: 'method_not_allowed' });
    return;
  }

  /* ─── Parse body (Vercel runtime: read from stream) ─── */
  let bodyStr = '';
  if (typeof req.body === 'string') {
    bodyStr = req.body;
  } else if (isObject(req.body)) {
    bodyStr = JSON.stringify(req.body);
  } else if (typeof req.on === 'function') {
    const on = req.on;
    try {
      bodyStr = await new Promise<string>((resolve, reject) => {
        const chunks: Buffer[] = [];
        on('data', (chunk) => {
          if (Buffer.isBuffer(chunk)) chunks.push(chunk);
          else if (chunk !== undefined) chunks.push(Buffer.from(String(chunk)));
        });
        on('end', () => resolve(Buffer.concat(chunks).toString()));
        on('error', (error) => reject(error));
        setTimeout(() => reject(new Error('body_read_timeout')), 10000);
      });
    } catch {
      json(res, 400, { ok: false, error: 'body_read_error' });
      return;
    }
  }

  if (bodyStr.length > MAX_BODY_BYTES) {
    json(res, 413, { ok: false, error: 'payload_too_large' });
    return;
  }

  let bodyUnknown: unknown;
  try {
    bodyUnknown = JSON.parse(bodyStr);
  } catch {
    json(res, 400, { ok: false, error: 'invalid_json' });
    return;
  }

  const parsed = parseLeadBody(bodyUnknown);
  if (parsed.ok === false) {
    json(res, 400, { ok: false, error: parsed.error });
    return;
  }

  /* ─── Send to n8n webhook ──────────────── */
  const n8nUrl = process.env.LEAD_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL;
  const webhookSecret = process.env.LEAD_WEBHOOK_SECRET || process.env.N8N_API_KEY || '';

  if (!n8nUrl) {
    console.error('[lead] webhook is not configured');
    json(res, 503, { ok: false, error: 'lead_service_unavailable' });
    return;
  }

  try {
    const webhookRes = await fetch(n8nUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(webhookSecret ? { 'Authorization': `Bearer ${webhookSecret}` } : {}),
      },
      body: JSON.stringify(parsed.value),
    });

    if (!webhookRes.ok) {
      console.error('[lead] webhook rejected request:', webhookRes.status);
      json(res, 502, { ok: false, error: 'lead_delivery_failed' });
      return;
    }

    json(res, 202, {
      ok: true,
      message: 'Lead recebido para processamento',
    });
  } catch (err) {
    console.error('[lead] webhook request failed:', err);
    json(res, 502, { ok: false, error: 'lead_delivery_failed' });
  }
}
