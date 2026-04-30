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

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function extractText(data: unknown): string {
  if (!isObject(data)) return '';
  const output = data.output;
  if (!Array.isArray(output)) return '';

  const parts: string[] = [];
  for (const item of output) {
    if (!isObject(item)) continue;
    const content = item.content;
    if (!Array.isArray(content)) continue;
    for (const c of content) {
      if (!isObject(c)) continue;
      const t = c.text;
      if (typeof t === 'string' && t.trim()) parts.push(t);
    }
  }
  return parts.join('\n');
}

export default async function handler(req: unknown, res: unknown) {
  const request = req as ApiRequest;
  const response = res as ApiResponse;

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return json(response, 405, { ok: false, error: 'method_not_allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return json(response, 500, { ok: false, error: 'missing_openai_key' });

  const body = request.body;
  const message =
    isObject(body) && typeof body.message === 'string' ? body.message.trim() : '';

  if (!message) return json(response, 400, { ok: false, error: 'missing_message' });

  const model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

  const r = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: 'system',
          content:
            'You are Rei das Vendas Assistant. Tone: formal, concise, decision-grade. Never claim integrations are live. Ask one clarifying question when needed. Keep responses under 120 words.',
        },
        { role: 'user', content: message },
      ],
    }),
  });

  if (!r.ok) return json(response, 502, { ok: false, error: 'openai_failed' });

  const data = (await r.json()) as unknown;
  const text = extractText(data);

  return json(response, 200, { ok: true, text: text || 'Obrigado. Como posso ajudar?' });
}
