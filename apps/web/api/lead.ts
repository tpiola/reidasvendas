const LEAD_SOURCES = [
  'hero',
  'sticky',
  'exit',
  'footer',
  'pricing',
  'template_catalog',
  'template_page',
  'template_price',
  'template_builder',
] as const;

const MAX_BODY_BYTES = 32_768;

const AB_VARIANTS = ['A', 'B'] as const;

type LeadSource = (typeof LEAD_SOURCES)[number];
type AbVariant = (typeof AB_VARIANTS)[number];

type LeadPayload = {
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  city?: string;
  source: LeadSource;
  variant: AbVariant;
  consent: boolean;
  utm?: Record<string, string | undefined>;
  context?: Record<string, unknown>;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isLeadSource(value: unknown): value is LeadSource {
  return typeof value === 'string' && (LEAD_SOURCES as readonly string[]).includes(value);
}

function isAbVariant(value: unknown): value is AbVariant {
  return typeof value === 'string' && (AB_VARIANTS as readonly string[]).includes(value);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function parseLeadPayload(
  input: unknown,
): { ok: true; value: LeadPayload } | { ok: false; error: string } {
  if (!isObject(input)) return { ok: false, error: 'invalid_body' };

  const email = typeof input.email === 'string' ? input.email.trim() : '';
  const consent = typeof input.consent === 'boolean' ? input.consent : false;

  if (!email) return { ok: false, error: 'invalid_email' };
  if (!consent) return { ok: false, error: 'consent_required' };
  if (!isLeadSource(input.source)) return { ok: false, error: 'invalid_source' };
  if (!isAbVariant(input.variant)) return { ok: false, error: 'invalid_variant' };

  const utmRaw = isObject(input.utm) ? input.utm : undefined;
  const utm = utmRaw
    ? (Object.fromEntries(
        Object.entries(utmRaw).map(([k, v]) => [k, typeof v === 'string' ? v : undefined]),
      ) as Record<string, string | undefined>)
    : undefined;

  const context = isObject(input.context) ? input.context : undefined;

  return {
    ok: true,
    value: {
      email,
      name: typeof input.name === 'string' && input.name.trim() ? input.name.trim() : undefined,
      phone:
        typeof input.phone === 'string' && input.phone.trim() ? input.phone.trim() : undefined,
      company:
        typeof input.company === 'string' && input.company.trim() ? input.company.trim() : undefined,
      city: typeof input.city === 'string' && input.city.trim() ? input.city.trim() : undefined,
      source: input.source,
      variant: input.variant,
      consent,
      utm,
      context,
    },
  };
}

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  statusCode: number;
  setHeader: (name: string, value: string) => void;
  end: (body?: string) => void;
};

function json(res: ApiResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

export default async function handler(req: unknown, res: unknown) {
  const request = req as ApiRequest;
  const response = res as ApiResponse;

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return json(response, 405, { ok: false, error: 'method_not_allowed' });
  }

  let bodyUnknown: unknown = request.body;
  if (typeof request.body === 'string') {
    if (request.body.length > MAX_BODY_BYTES) {
      return json(response, 413, { ok: false, error: 'payload_too_large' });
    }
    try {
      bodyUnknown = JSON.parse(request.body) as unknown;
    } catch {
      return json(response, 400, { ok: false, error: 'invalid_json' });
    }
  } else if (request.body !== undefined && request.body !== null) {
    const serialized = JSON.stringify(request.body);
    if (serialized.length > MAX_BODY_BYTES) {
      return json(response, 413, { ok: false, error: 'payload_too_large' });
    }
    bodyUnknown = request.body;
  }

  const parsed = parseLeadPayload(bodyUnknown);
  if (parsed.ok === false) return json(response, 400, { ok: false, error: parsed.error });
  if (!isEmail(parsed.value.email)) return json(response, 400, { ok: false, error: 'invalid_email' });

  const payload = { ...parsed.value, receivedAt: new Date().toISOString() };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) return json(response, 500, { ok: false, error: 'missing_webhook' });

  const secret = process.env.LEAD_WEBHOOK_SECRET;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (secret) headers['X-Altiq-Webhook-Secret'] = secret;

  const r = await fetch(webhookUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!r.ok) return json(response, 502, { ok: false, error: 'webhook_failed' });
  return json(response, 200, { ok: true });
}

