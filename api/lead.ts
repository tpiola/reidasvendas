/* ═══════════════════════════════════════════
   API LEAD.TS — Rei das Vendas
   Captura leads via n8n webhook
═══════════════════════════════════════════ */

// A função publicada na raiz precisa ser autônoma: apps/web usa ESM e
// importar seu handler pelo runtime CommonJS da Vercel quebra a execução.

type RequestListener = (value?: unknown) => void;

type Req = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
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
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 6;
const IDEMPOTENCY_TTL_MS = 30 * 60 * 1000;

const requestBuckets = new Map<string, number[]>();
const processedRequests = new Map<string, { expiresAt: number; delivery: 'webhook' | 'whatsapp_handoff' }>();

function pruneRequestState(now: number) {
  if (requestBuckets.size > 1_000) {
    for (const [key, timestamps] of requestBuckets) {
      const recent = timestamps.filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
      if (recent.length) requestBuckets.set(key, recent);
      else requestBuckets.delete(key);
    }
  }

  if (processedRequests.size > 1_000) {
    for (const [key, record] of processedRequests) {
      if (record.expiresAt <= now) processedRequests.delete(key);
    }
  }
}

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

function headerValue(req: Req, name: string): string {
  const value = req.headers?.[name] ?? req.headers?.[name.toLowerCase()];
  return Array.isArray(value) ? value[0] || '' : value || '';
}

function requestOriginAllowed(req: Req): boolean {
  const origin = headerValue(req, 'origin');
  if (!origin) return true;

  try {
    const hostname = new URL(origin).hostname.toLowerCase();
    return hostname === 'reidasvendas.com.br'
      || hostname === 'www.reidasvendas.com.br'
      || hostname === 'localhost'
      || hostname.endsWith('.vercel.app');
  } catch {
    return false;
  }
}

function requestAllowedByRate(req: Req): boolean {
  const forwardedFor = headerValue(req, 'x-forwarded-for').split(',')[0]?.trim();
  const key = forwardedFor || 'unknown';
  const now = Date.now();
  pruneRequestState(now);
  const recent = (requestBuckets.get(key) || []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    requestBuckets.set(key, recent);
    return false;
  }

  recent.push(now);
  requestBuckets.set(key, recent);
  return true;
}

function getProcessedRequest(key: string): 'webhook' | 'whatsapp_handoff' | undefined {
  const record = processedRequests.get(key);
  if (!record) return undefined;
  if (record.expiresAt <= Date.now()) {
    processedRequests.delete(key);
    return undefined;
  }
  return record.delivery;
}

function rememberProcessedRequest(key: string, delivery: 'webhook' | 'whatsapp_handoff') {
  if (!key) return;
  processedRequests.set(key, { delivery, expiresAt: Date.now() + IDEMPOTENCY_TTL_MS });
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
  const honeypot = sanitizeString(input.website, 200);
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
  if (phone.replace(/\D/g, '').length < 10) return { ok: false, error: 'invalid_phone' };
  if (consent !== true) return { ok: false, error: 'consent_required' };
  if (honeypot) return { ok: false, error: 'request_rejected' };

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
  res.setHeader?.('Access-Control-Allow-Headers', 'Content-Type, X-Idempotency-Key');
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

  if (!requestOriginAllowed(req)) {
    json(res, 403, { ok: false, error: 'origin_not_allowed' });
    return;
  }

  if (!requestAllowedByRate(req)) {
    res.setHeader?.('Retry-After', '600');
    json(res, 429, { ok: false, error: 'rate_limit_exceeded' });
    return;
  }

  const contentType = headerValue(req, 'content-type');
  if (contentType && !contentType.toLowerCase().startsWith('application/json')) {
    json(res, 415, { ok: false, error: 'unsupported_media_type' });
    return;
  }

  const contentLength = Number(headerValue(req, 'content-length'));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    json(res, 413, { ok: false, error: 'payload_too_large' });
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
        let totalBytes = 0;
        const timer = setTimeout(() => reject(new Error('body_read_timeout')), 10_000);
        on('data', (chunk) => {
          const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk ?? ''));
          totalBytes += buffer.byteLength;
          if (totalBytes > MAX_BODY_BYTES) {
            clearTimeout(timer);
            reject(new Error('payload_too_large'));
            return;
          }
          chunks.push(buffer);
        });
        on('end', () => {
          clearTimeout(timer);
          resolve(Buffer.concat(chunks).toString());
        });
        on('error', (error) => {
          clearTimeout(timer);
          reject(error);
        });
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'body_read_error';
      json(res, message === 'payload_too_large' ? 413 : 400, { ok: false, error: message });
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

  const idempotencyKey = sanitizeString(headerValue(req, 'x-idempotency-key'), 120);
  const previousDelivery = idempotencyKey ? getProcessedRequest(idempotencyKey) : undefined;
  if (previousDelivery) {
    json(res, 202, {
      ok: true,
      delivery: previousDelivery,
      duplicate: true,
      message: 'Solicitação já registrada.',
    });
    return;
  }

  /* ─── Send to n8n webhook ──────────────── */
  const n8nUrl = process.env.LEAD_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL;
  const webhookSecret = process.env.LEAD_WEBHOOK_SECRET || process.env.N8N_API_KEY || '';

  if (!n8nUrl) {
    rememberProcessedRequest(idempotencyKey, 'whatsapp_handoff');
    json(res, 202, {
      ok: true,
      delivery: 'whatsapp_handoff',
      message: 'Diagnóstico validado. Finalize o envio pelo WhatsApp.',
    });
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
      signal: AbortSignal.timeout(8_000),
    });

    if (!webhookRes.ok) {
      console.error(JSON.stringify({ level: 'error', event: 'lead_webhook_rejected', status: webhookRes.status }));
      json(res, 502, { ok: false, error: 'lead_delivery_failed' });
      return;
    }

    rememberProcessedRequest(idempotencyKey, 'webhook');
    json(res, 202, {
      ok: true,
      delivery: 'webhook',
      message: 'Lead recebido para processamento',
    });
  } catch (err) {
    console.error(JSON.stringify({
      level: 'error',
      event: 'lead_webhook_failed',
      message: err instanceof Error ? err.message : 'unknown_error',
    }));
    json(res, 502, { ok: false, error: 'lead_delivery_failed' });
  }
}
