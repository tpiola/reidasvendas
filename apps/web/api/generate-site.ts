/* ═══════════════════════════════════════════
   API GENERATE-SITE.TS — Rei das Vendas
   Gera estrutura e copy de site com DeepSeek
   via OmniRoute (localhost:20128)
═══════════════════════════════════════════ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Req = { method?: string; headers?: Record<string, string | undefined>; body?: unknown };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Res = { statusCode?: number; setHeader?: (k: string, v: string) => void; end?: (d: unknown) => void };

const MAX_BODY_BYTES = 65_536;
const OMNIROUTE_URL = process.env.OMNIROUTE_URL || 'http://localhost:20128/v1/chat/completions';
const OMNIROUTE_MODEL = process.env.OMNIROUTE_MODEL || 'oc/deepseek-v4-flash-free';

type GenerateSitePayload = {
  brandName: string;
  industry: string;
  colors?: string;
  tone?: string;
  description: string;
  logoUrl?: string;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function sanitizeString(value: unknown, maxLen = 2000): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

function parseGenerateSiteBody(input: unknown): { ok: true; value: GenerateSitePayload } | { ok: false; error: string } {
  if (!isObject(input)) return { ok: false, error: 'invalid_body' };

  const brandName = sanitizeString(input.brandName, 200);
  const industry = sanitizeString(input.industry, 200);
  const colors = sanitizeString(input.colors, 500) || undefined;
  const tone = sanitizeString(input.tone, 200) || undefined;
  const description = sanitizeString(input.description, 2000);
  const logoUrl = sanitizeString(input.logoUrl, 500) || undefined;

  if (!brandName) return { ok: false, error: 'brandName_required' };
  if (!industry) return { ok: false, error: 'industry_required' };
  if (!description) return { ok: false, error: 'description_required' };

  return {
    ok: true,
    value: { brandName, industry, colors, tone, description, logoUrl },
  };
}

function json(res: Res, status: number, body: unknown) {
  if (typeof (res as any).status === 'function') {
    // Express/Vercel style
    (res as any).status(status).json(body);
    return;
  }
  // Raw Node.js style
  try { res.statusCode = status; } catch { /* ignore */ }
  try { (res as any).setHeader?.('Content-Type', 'application/json; charset=utf-8'); } catch { /* ignore */ }
  try { (res as any).setHeader?.('Access-Control-Allow-Origin', '*'); } catch { /* ignore */ }
  try { (res as any).setHeader?.('Access-Control-Allow-Methods', 'POST, OPTIONS'); } catch { /* ignore */ }
  try { (res as any).setHeader?.('Access-Control-Allow-Headers', 'Content-Type'); } catch { /* ignore */ }
  try { res.end?.(JSON.stringify(body)); } catch { /* ignore */ }
}

function parseBody(req: Req, rawBody?: string): unknown {
  // Already parsed by Vercel helpers or body is an object
  if (isObject(req.body)) return req.body;

  // String body that needs parsing
  if (typeof req.body === 'string') {
    if (req.body.length > MAX_BODY_BYTES) return null;
    try { return JSON.parse(req.body); } catch { return null; }
  }

  // Raw body buffer/string from request
  if (typeof rawBody === 'string') {
    if (rawBody.length > MAX_BODY_BYTES) return null;
    try { return JSON.parse(rawBody); } catch { return null; }
  }

  return null;
}

function buildSystemPrompt(): string {
  return `Você é um especialista em criação de sites e copywriting. Sua função é gerar a estrutura completa de um site institucional/saas baseado nas informações da marca fornecidas pelo usuário.

Você DEVE retornar APENAS um JSON válido (sem markdown, sem explicações extras) com o seguinte formato:

{
  "structure": {
    "hero": { "headline": "string", "subheadline": "string", "cta": { "text": "string", "action": "string" } },
    "features": [
      { "icon": "string", "title": "string", "description": "string" }
    ],
    "cta": { "headline": "string", "subheadline": "string", "buttonText": "string" },
    "footer": { "tagline": "string", "links": [{ "label": "string", "url": "string" }] }
  },
  "copy": {
    "heroTitle": "string",
    "heroSubtitle": "string",
    "aboutDescription": "string",
    "featuresIntro": "string",
    "ctaTitle": "string",
    "ctaDescription": "string"
  },
  "palette": {
    "primary": "string (hex)",
    "secondary": "string (hex)",
    "accent": "string (hex)",
    "background": "string (hex)",
    "text": "string (hex)"
  },
  "sections": [
    { "type": "hero|features|about|testimonials|cta|footer", "title": "string", "content": "string" }
  ]
}

Regras:
- Gere conteúdo original e profissional em português brasileiro
- As cores sugeridas devem complementar a paleta informada pelo usuário (se houver)
- Hero CTA action deve ser "#contato" ou "#planos"
- Mínimo de 3 features, máximo de 6
- Mínimo de 3 sections, máximo de 8
- Links do footer devem usar "#" como url
- A copy deve ser persuasiva e focada em conversão`;
}

function buildUserPrompt(payload: GenerateSitePayload): string {
  let prompt = `Marca: ${payload.brandName}\nIndústria: ${payload.industry}\nDescrição: ${payload.description}\n`;

  if (payload.tone) {
    prompt += `Tom/Estilo: ${payload.tone}\n`;
  }
  if (payload.colors) {
    prompt += `Cores informadas: ${payload.colors}\n`;
  }
  if (payload.logoUrl) {
    prompt += `URL do logo: ${payload.logoUrl}\n`;
  }

  prompt += `\nGere a estrutura completa do site para esta marca seguindo estritamente o formato JSON solicitado.`;

  return prompt;
}

async function callDeepSeek(systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await fetch(OMNIROUTE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OMNIROUTE_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 3000,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'unknown');
    throw new Error(`OmniRoute error: ${response.status} — ${errorText}`);
  }

  const data = (await response.json()) as {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('OmniRoute returned empty response');
  }

  return content;
}

function extractJsonFromResponse(text: string): unknown {
  // Try parsing directly
  const trimmed = text.trim();
  if (trimmed.startsWith('{')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      // fall through
    }
  }

  // Try extracting from markdown code block
  const jsonMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[1].trim());
    } catch {
      // fall through
    }
  }

  // Try finding first { ... } block
  const braceStart = trimmed.indexOf('{');
  const braceEnd = trimmed.lastIndexOf('}');
  if (braceStart !== -1 && braceEnd > braceStart) {
    try {
      return JSON.parse(trimmed.slice(braceStart, braceEnd + 1));
    } catch {
      // fall through
    }
  }

  throw new Error('Could not parse JSON from AI response');
}

function validateSiteData(data: unknown): data is {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  structure: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  copy: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  palette: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sections: Array<Record<string, any>>;
} {
  if (!isObject(data)) return false;
  return (
    isObject(data.structure) &&
    isObject(data.copy) &&
    isObject(data.palette) &&
    Array.isArray(data.sections)
  );
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
  } else if (typeof (req as any).on === 'function') {
    // Read from stream
    try {
      bodyStr = await new Promise<string>((resolve, reject) => {
        const chunks: Buffer[] = [];
        (req as any).on('data', (chunk: Buffer) => chunks.push(chunk));
        (req as any).on('end', () => resolve(Buffer.concat(chunks).toString()));
        (req as any).on('error', reject);
        // Timeout safety
        setTimeout(() => reject(new Error('body_read_timeout')), 10000);
      });
    } catch {
      json(res, 400, { ok: false, error: 'body_read_error' });
      return;
    }
  }

  let bodyUnknown: unknown;
  if (bodyStr.length > MAX_BODY_BYTES) {
    json(res, 413, { ok: false, error: 'payload_too_large' });
    return;
  }
  try {
    bodyUnknown = JSON.parse(bodyStr);
  } catch {
    json(res, 400, { ok: false, error: 'invalid_json' });
    return;
  }

  const parsed = parseGenerateSiteBody(bodyUnknown);
  if (!parsed.ok) {
    json(res, 400, { ok: false, error: (parsed as { error: string }).error });
    return;
  }

  /* ─── Call DeepSeek via OmniRoute ───────── */
  try {
    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(parsed.value);
    const rawContent = await callDeepSeek(systemPrompt, userPrompt);
    const data = extractJsonFromResponse(rawContent);

    if (!validateSiteData(data)) {
      json(res, 502, { ok: false, error: 'invalid_ai_response' });
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = data as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const s = d.structure;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hero = s.hero as Record<string, any> | undefined;
    const extracted = {
      hero: {
        title: (d.copy?.heroTitle as string) || (hero?.headline as string) || parsed.value.brandName,
        subtitle: (d.copy?.heroSubtitle as string) || (hero?.subheadline as string) || 'Site Profissional',
        cta: (hero?.cta as Record<string, string> | undefined)?.text || 'Fale Conosco',
      },
      sections: d.sections.map((sec: Record<string, string>) => ({
        title: sec.title || '',
        description: sec.content || '',
      })),
      palette: {
        primary: (d.palette?.primary as string) || '#D6A84F',
        secondary: (d.palette?.secondary as string) || '#0A2540',
        accent: (d.palette?.accent as string) || '#F97316',
        background: (d.palette?.background as string) || '#030303',
      },
      summary: (d.copy?.ctaDescription as string) ||
               (d.copy?.featuresIntro as string) ||
               `Site profissional para ${parsed.value.brandName} no setor de ${parsed.value.industry}.`,
    };

    json(res, 200, extracted);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown_error';
    json(res, 502, { ok: false, error: message });
  }
}
