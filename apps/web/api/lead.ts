/* ═══════════════════════════════════════════
   API LEAD.TS — Rei das Vendas
   Captura leads de formulários e SuporteBot
   Encaminha para webhook (Notion → Make)
═══════════════════════════════════════════ */

const MAX_BODY_BYTES = 65_536;

type LeadPayload = {
  nome: string;
  email: string;
  whatsapp: string;
  ramo?: string;
  origem: string;
  visitorId?: string;
  consent?: boolean;
  mensagem?: string;
  utm?: Record<string, string | undefined>;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function sanitizeString(value: unknown, maxLen = 500): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

function parseLeadBody(input: unknown): { ok: true; value: LeadPayload } | { ok: false; error: string } {
  if (!isObject(input)) return { ok: false, error: 'invalid_body' };

  const nome = sanitizeString(input.nome || input.name);
  const email = sanitizeString(input.email);
  const whatsapp = sanitizeString(input.whatsapp || input.phone);
  const ramo = sanitizeString(input.ramo || input.company);
  const origem = sanitizeString(input.origem || input.source, 100) || 'form';
  const visitorId = sanitizeString(input.visitorId, 100) || undefined;
  const consent = typeof input.consent === 'boolean' ? input.consent : origem === 'suporte-bot';
  const mensagem = sanitizeString(input.mensagem, 2000) || undefined;
  const utmRaw = isObject(input.utm) ? input.utm : undefined;
  const utm = utmRaw
    ? (Object.fromEntries(
        Object.entries(utmRaw).map(([k, v]) => [k, typeof v === 'string' ? v : undefined]),
      ) as Record<string, string | undefined>)
    : undefined;

  if (!nome) return { ok: false, error: 'nome_required' };
  if (!email) return { ok: false, error: 'email_required' };
  if (!whatsapp) return { ok: false, error: 'whatsapp_required' };

  return {
    ok: true,
    value: { nome, email, whatsapp, ramo, origem, visitorId, consent, mensagem, utm },
  };
}

interface ApiRequest {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
}

interface ApiResponse {
  statusCode: number;
  setHeader?(name: string, value: string): void;
  end?(chunk?: string): void;
}

function json(res: ApiResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader?.('Content-Type', 'application/json; charset=utf-8');
  res.end?.(JSON.stringify(body));
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  /* ─── CORS ─────────────────────────────── */
  res.setHeader?.('Access-Control-Allow-Origin', '*');
  res.setHeader?.('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader?.('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return json(res, 204, {});

  if (req.method !== 'POST') {
    res.setHeader?.('Allow', 'POST');
    return json(res, 405, { ok: false, error: 'method_not_allowed' });
  }

  /* ─── Parse body ───────────────────────── */
  let bodyUnknown: unknown = req.body;
  if (typeof req.body === 'string') {
    if (req.body.length > MAX_BODY_BYTES) {
      return json(res, 413, { ok: false, error: 'payload_too_large' });
    }
    try { bodyUnknown = JSON.parse(req.body); }
    catch { return json(res, 400, { ok: false, error: 'invalid_json' }); }
  }

  const parsed = parseLeadBody(bodyUnknown);
  if (!parsed.ok) {
    const err = (parsed as { ok: false; error: string }).error;
    return json(res, 400, { ok: false, error: err });
  }
  if (!isEmail(parsed.value.email)) return json(res, 400, { ok: false, error: 'invalid_email' });

  const payload = {
    ...parsed.value,
    receivedAt: new Date().toISOString(),
    page: req.headers?.['referer'] || '',
  };

  /* ─── Webhook principal ────────────────── */
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  const webhookResults: string[] = [];

  if (webhookUrl) {
    try {
      const r = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      webhookResults.push(`webhook:${r.ok ? 'ok' : `fail_${r.status}`}`);
    } catch {
      webhookResults.push('webhook:error');
    }
  }

  /* ─── Google Sheets (fallback) ─────────── */
  const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (sheetsUrl?.startsWith('https://script.google.com/')) {
    void fetch(sheetsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: payload.nome,
        email: payload.email,
        whatsapp: payload.whatsapp,
        ramo: payload.ramo ?? '',
        origem: payload.origem,
        receivedAt: payload.receivedAt,
      }),
    }).catch(() => undefined);
  }

  return json(res, 200, { ok: true, ref: payload.receivedAt });
}
