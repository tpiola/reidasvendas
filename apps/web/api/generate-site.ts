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
const OMNIROUTE_URL = 'http://localhost:20128/v1/chat/completions';
const OMNIROUTE_MODEL = 'oc/deepseek-v4-flash-free';

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
  res.statusCode = status;
  res.setHeader?.('Content-Type', 'application/json; charset=utf-8');
  res.end?.(JSON.stringify(body));
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
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'unknown');
    throw new Error(`OmniRoute error: ${response.status} — ${errorText}`);
  }

  const data = (await response.json()) as {
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
  structure: Record<string, unknown>;
  copy: Record<string, unknown>;
  palette: Record<string, unknown>;
  sections: Array<Record<string, unknown>>;
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
    try {
      bodyUnknown = JSON.parse(req.body);
    } catch {
      return json(res, 400, { ok: false, error: 'invalid_json' });
    }
  }

  const parsed = parseGenerateSiteBody(bodyUnknown);
  if (!parsed.ok) {
    const err = (parsed as { ok: false; error: string }).error;
    return json(res, 400, { ok: false, error: err });
  }

  /* ─── Call DeepSeek via OmniRoute ───────── */
  try {
    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(parsed.value);
    const rawContent = await callDeepSeek(systemPrompt, userPrompt);
    const data = extractJsonFromResponse(rawContent);

    if (!validateSiteData(data)) {
      return json(res, 502, { ok: false, error: 'invalid_ai_response' });
    }

    return json(res, 200, {
      ok: true,
      site: data,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown_error';
    return json(res, 502, { ok: false, error: message });
  }
}
