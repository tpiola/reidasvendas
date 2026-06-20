/* ═══════════════════════════════════════════
   API CHAT.TS — Rei das Vendas
   Chat IA via OmniRoute (DeepSeek)
═══════════════════════════════════════════ */

type ApiRequest = {
  method?: string;
  body?: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on?: (event: string, cb: (...args: any[]) => void) => void;
};

type ApiResponse = {
  statusCode: number;
  setHeader: (name: string, value: string) => void;
  end: (body?: string) => void;
};

const MAX_BODY_BYTES = 16_384;

function json(res: ApiResponse, status: number, body: unknown) {
  try { res.statusCode = status; } catch { /* ignore */ }
  try { res.setHeader('Content-Type', 'application/json; charset=utf-8'); } catch { /* ignore */ }
  try { res.setHeader('Access-Control-Allow-Origin', '*'); } catch { /* ignore */ }
  try { res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); } catch { /* ignore */ }
  try { res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); } catch { /* ignore */ }
  try { res.end(JSON.stringify(body)); } catch { /* ignore */ }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export default async function handler(req: unknown, res: unknown) {
  const request = req as ApiRequest;
  const response = res as ApiResponse;

  if (request.method === 'OPTIONS') return json(response, 204, {});
  if (request.method !== 'POST') {
    try { response.setHeader('Allow', 'POST'); } catch { /* ignore */ }
    return json(response, 405, { ok: false, error: 'method_not_allowed' });
  }

  /* ─── Parse body from stream ─── */
  let bodyStr = '';
  if (typeof request.body === 'string') {
    bodyStr = request.body;
  } else if (isObject(request.body)) {
    bodyStr = JSON.stringify(request.body);
  } else if (typeof request.on === 'function') {
    try {
      bodyStr = await new Promise<string>((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const chunks: any[] = [];
        request.on('data', (chunk: Buffer) => chunks.push(chunk));
        request.on('end', () => resolve(Buffer.concat(chunks).toString()));
        request.on('error', reject);
        setTimeout(() => reject(new Error('timeout')), 10_000);
      });
    } catch {
      return json(response, 400, { ok: false, error: 'body_read_error' });
    }
  }

  if (bodyStr.length > MAX_BODY_BYTES) {
    return json(response, 413, { ok: false, error: 'payload_too_large' });
  }

  let bodyParsed: Record<string, unknown>;
  try {
    bodyParsed = JSON.parse(bodyStr || '{}');
  } catch {
    return json(response, 400, { ok: false, error: 'invalid_json' });
  }

  const message = typeof bodyParsed.message === 'string' ? bodyParsed.message.trim() : '';
  if (!message) return json(response, 400, { ok: false, error: 'missing_message' });

  /* ─── Call OmniRoute ─── */
  const OMNIROUTE_URL = process.env.OMNIROUTE_URL || 'http://localhost:20128/v1/chat/completions';
  const OMNIROUTE_MODEL = process.env.OMNIROUTE_MODEL || 'oc/deepseek-v4-flash-free';

  try {
    const r = await fetch(OMNIROUTE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OMNIROUTE_MODEL,
        messages: [
          {
            role: 'system',
            content: 'Você é o assistente do Rei das Vendas. Tom: formal, conciso, focado em decisão. Responda em português brasileiro. Máximo 120 palavras.',
          },
          { role: 'user', content: message },
        ],
        max_tokens: 500,
        stream: false,
      }),
    });

    if (!r.ok) {
      return json(response, 502, { ok: false, error: 'omniroute_failed' });
    }

    const data = (await r.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const text = data?.choices?.[0]?.message?.content || 'Obrigado. Como posso ajudar?';
    return json(response, 200, { ok: true, text: text.trim() });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown_error';
    return json(response, 502, { ok: false, error: message });
  }
}
