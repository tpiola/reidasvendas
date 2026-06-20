var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// api/generate-site.ts
var generate_site_exports = {};
__export(generate_site_exports, {
  default: () => handler
});
module.exports = __toCommonJS(generate_site_exports);
var MAX_BODY_BYTES = 65536;
var OMNIROUTE_URL = "http://localhost:20128/v1/chat/completions";
var OMNIROUTE_MODEL = "oc/deepseek-v4-flash-free";
function isObject(value) {
  return typeof value === "object" && value !== null;
}
function sanitizeString(value, maxLen = 2e3) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}
function parseGenerateSiteBody(input) {
  if (!isObject(input)) return { ok: false, error: "invalid_body" };
  const brandName = sanitizeString(input.brandName, 200);
  const industry = sanitizeString(input.industry, 200);
  const colors = sanitizeString(input.colors, 500) || void 0;
  const tone = sanitizeString(input.tone, 200) || void 0;
  const description = sanitizeString(input.description, 2e3);
  const logoUrl = sanitizeString(input.logoUrl, 500) || void 0;
  if (!brandName) return { ok: false, error: "brandName_required" };
  if (!industry) return { ok: false, error: "industry_required" };
  if (!description) return { ok: false, error: "description_required" };
  return {
    ok: true,
    value: { brandName, industry, colors, tone, description, logoUrl }
  };
}
function json(res, status, body) {
  res.statusCode = status;
  res.setHeader?.("Content-Type", "application/json; charset=utf-8");
  res.end?.(JSON.stringify(body));
}
function buildSystemPrompt() {
  return `Voc\xEA \xE9 um especialista em cria\xE7\xE3o de sites e copywriting. Sua fun\xE7\xE3o \xE9 gerar a estrutura completa de um site institucional/saas baseado nas informa\xE7\xF5es da marca fornecidas pelo usu\xE1rio.

Voc\xEA DEVE retornar APENAS um JSON v\xE1lido (sem markdown, sem explica\xE7\xF5es extras) com o seguinte formato:

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
- Gere conte\xFAdo original e profissional em portugu\xEAs brasileiro
- As cores sugeridas devem complementar a paleta informada pelo usu\xE1rio (se houver)
- Hero CTA action deve ser "#contato" ou "#planos"
- M\xEDnimo de 3 features, m\xE1ximo de 6
- M\xEDnimo de 3 sections, m\xE1ximo de 8
- Links do footer devem usar "#" como url
- A copy deve ser persuasiva e focada em convers\xE3o`;
}
function buildUserPrompt(payload) {
  let prompt = `Marca: ${payload.brandName}
Ind\xFAstria: ${payload.industry}
Descri\xE7\xE3o: ${payload.description}
`;
  if (payload.tone) {
    prompt += `Tom/Estilo: ${payload.tone}
`;
  }
  if (payload.colors) {
    prompt += `Cores informadas: ${payload.colors}
`;
  }
  if (payload.logoUrl) {
    prompt += `URL do logo: ${payload.logoUrl}
`;
  }
  prompt += `
Gere a estrutura completa do site para esta marca seguindo estritamente o formato JSON solicitado.`;
  return prompt;
}
async function callDeepSeek(systemPrompt, userPrompt) {
  const response = await fetch(OMNIROUTE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OMNIROUTE_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 3e3
    })
  });
  if (!response.ok) {
    const errorText = await response.text().catch(() => "unknown");
    throw new Error(`OmniRoute error: ${response.status} \u2014 ${errorText}`);
  }
  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OmniRoute returned empty response");
  }
  return content;
}
function extractJsonFromResponse(text) {
  const trimmed = text.trim();
  if (trimmed.startsWith("{")) {
    try {
      return JSON.parse(trimmed);
    } catch {
    }
  }
  const jsonMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[1].trim());
    } catch {
    }
  }
  const braceStart = trimmed.indexOf("{");
  const braceEnd = trimmed.lastIndexOf("}");
  if (braceStart !== -1 && braceEnd > braceStart) {
    try {
      return JSON.parse(trimmed.slice(braceStart, braceEnd + 1));
    } catch {
    }
  }
  throw new Error("Could not parse JSON from AI response");
}
function validateSiteData(data) {
  if (!isObject(data)) return false;
  return isObject(data.structure) && isObject(data.copy) && isObject(data.palette) && Array.isArray(data.sections);
}
async function handler(req, res) {
  res.setHeader?.("Access-Control-Allow-Origin", "*");
  res.setHeader?.("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader?.("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return json(res, 204, {});
  if (req.method !== "POST") {
    res.setHeader?.("Allow", "POST");
    return json(res, 405, { ok: false, error: "method_not_allowed" });
  }
  let bodyUnknown = req.body;
  if (typeof req.body === "string") {
    if (req.body.length > MAX_BODY_BYTES) {
      return json(res, 413, { ok: false, error: "payload_too_large" });
    }
    try {
      bodyUnknown = JSON.parse(req.body);
    } catch {
      return json(res, 400, { ok: false, error: "invalid_json" });
    }
  }
  const parsed = parseGenerateSiteBody(bodyUnknown);
  if (!parsed.ok) {
    const err = parsed.error;
    return json(res, 400, { ok: false, error: err });
  }
  try {
    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(parsed.value);
    const rawContent = await callDeepSeek(systemPrompt, userPrompt);
    const data = extractJsonFromResponse(rawContent);
    if (!validateSiteData(data)) {
      return json(res, 502, { ok: false, error: "invalid_ai_response" });
    }
    const d = data;
    const s = d.structure;
    const hero = s.hero;
    const extracted = {
      hero: {
        title: d.copy?.heroTitle || hero?.headline || parsed.value.brandName,
        subtitle: d.copy?.heroSubtitle || hero?.subheadline || "Site Profissional",
        cta: hero?.cta?.text || "Fale Conosco"
      },
      sections: d.sections.map((sec) => ({
        title: sec.title || "",
        description: sec.content || ""
      })),
      palette: {
        primary: d.palette?.primary || "#D6A84F",
        secondary: d.palette?.secondary || "#0A2540",
        accent: d.palette?.accent || "#F97316",
        background: d.palette?.background || "#030303"
      },
      summary: d.copy?.ctaDescription || d.copy?.featuresIntro || `Site profissional para ${parsed.value.brandName} no setor de ${parsed.value.industry}.`
    };
    return json(res, 200, extracted);
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown_error";
    return json(res, 502, { ok: false, error: message });
  }
}
