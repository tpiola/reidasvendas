import { parseLeadPayload } from '@altiq/types';
import { isEmail } from '@altiq/utils';

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

  const parsed = parseLeadPayload(request.body);
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

