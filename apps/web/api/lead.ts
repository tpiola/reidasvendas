/* ═══════════════════════════════════════════
   API LEAD.TS — Rei das Vendas
   Captura leads via n8n webhook
═══════════════════════════════════════════ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Req = { method?: string; headers?: Record<string, string | undefined>; body?: unknown; on?: (event: string, cb: (...args: any[]) => void) => void };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Res = { statusCode?: number; setHeader?: (k: string, v: string) => void; end?: (d: unknown) => void };

const MAX_BODY_BYTES = 16_384;

type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message?: string;
  source?: string;
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

  const name = sanitizeString(input.name, 200);
  const email = sanitizeString(input.email, 320);
  const phone = sanitizeString(input.phone, 30);
  const company = sanitizeString(input.company, 200) || undefined;
  const message = sanitizeString(input.message, 2000) || undefined;
  const source = sanitizeString(input.source, 100) || 'reidasvendas.com.br';

  if (!name) return { ok: false, error: 'name_required' };
  if (!email) return { ok: false, error: 'email_required' };
  if (!isEmail(email)) return { ok: false, error: 'invalid_email' };
  if (!phone) return { ok: false, error: 'phone_required' };

  return {
    ok: true,
    value: { name, email, phone, company, message, source },
  };
}

function json(res: Res, status: number, body: unknown) {
  try { if (typeof (res as any).status === 'function') { (res as any).status(status).json(body); return; } } catch { /* ignore */ }
  try { res.statusCode = status; } catch { /* ignore */ }
  try { (res as any).setHeader?.('Content-Type', 'application/json; charset=utf-8'); } catch { /* ignore */ }
  try { (res as any).setHeader?.('Access-Control-Allow-Origin', '*'); } catch { /* ignore */ }
  try { (res as any).setHeader?.('Access-Control-Allow-Methods', 'POST, OPTIONS'); } catch { /* ignore */ }
  try { (res as any).setHeader?.('Access-Control-Allow-Headers', 'Content-Type'); } catch { /* ignore */ }
  try { res.end?.(JSON.stringify(body)); } catch { /* ignore */ }
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
    try {
      bodyStr = await new Promise<string>((resolve, reject) => {
        const chunks: Buffer[] = [];
        req.on('data', (chunk: Buffer) => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks).toString()));
        req.on('error', reject);
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
  if (!parsed.ok) {
    json(res, 400, { ok: false, error: (parsed as { error: string }).error });
    return;
  }

  /* ─── Send to n8n webhook ──────────────── */
  const n8nUrl = process.env.N8N_WEBHOOK_URL || 'https://n8n.thiagolab.com/webhook/lead';
  const apiKey = process.env.N8N_API_KEY || '';

  try {
    const webhookRes = await fetch(n8nUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify(parsed.value),
    });

    json(res, 200, {
      ok: true,
      message: 'Lead capturado com sucesso',
      data: parsed.value,
      webhookStatus: webhookRes.status,
    });
  } catch (err) {
    // n8n offline — still accept the lead
    console.error('[lead] n8n webhook error:', err);
    json(res, 200, {
      ok: true,
      message: 'Lead capturado (webhook offline)',
      data: parsed.value,
    });
  }
}
