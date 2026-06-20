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

// api/lead.ts
var lead_exports = {};
__export(lead_exports, {
  default: () => handler
});
module.exports = __toCommonJS(lead_exports);
var MAX_BODY_BYTES = 65536;
function isObject(value) {
  return typeof value === "object" && value !== null;
}
function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
function sanitizeString(value, maxLen = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}
function parseLeadBody(input) {
  if (!isObject(input)) return { ok: false, error: "invalid_body" };
  const nome = sanitizeString(input.nome || input.name);
  const email = sanitizeString(input.email);
  const whatsapp = sanitizeString(input.whatsapp || input.phone);
  const ramo = sanitizeString(input.ramo || input.company);
  const origem = sanitizeString(input.origem || input.source, 100) || "form";
  const visitorId = sanitizeString(input.visitorId, 100) || void 0;
  const consent = typeof input.consent === "boolean" ? input.consent : origem === "suporte-bot";
  const mensagem = sanitizeString(input.mensagem, 2e3) || void 0;
  const utmRaw = isObject(input.utm) ? input.utm : void 0;
  const utm = utmRaw ? Object.fromEntries(
    Object.entries(utmRaw).map(([k, v]) => [k, typeof v === "string" ? v : void 0])
  ) : void 0;
  if (!nome) return { ok: false, error: "nome_required" };
  if (!email) return { ok: false, error: "email_required" };
  if (!whatsapp) return { ok: false, error: "whatsapp_required" };
  return {
    ok: true,
    value: { nome, email, whatsapp, ramo, origem, visitorId, consent, mensagem, utm }
  };
}
function json(res, status, body) {
  res.statusCode = status;
  res.setHeader?.("Content-Type", "application/json; charset=utf-8");
  res.end?.(JSON.stringify(body));
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
  const parsed = parseLeadBody(bodyUnknown);
  if (!parsed.ok) {
    const err = parsed.error;
    return json(res, 400, { ok: false, error: err });
  }
  if (!isEmail(parsed.value.email)) return json(res, 400, { ok: false, error: "invalid_email" });
  const payload = {
    ...parsed.value,
    receivedAt: (/* @__PURE__ */ new Date()).toISOString(),
    page: req.headers?.["referer"] || ""
  };
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  const webhookResults = [];
  if (webhookUrl) {
    try {
      const r = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      webhookResults.push(`webhook:${r.ok ? "ok" : `fail_${r.status}`}`);
    } catch {
      webhookResults.push("webhook:error");
    }
  }
  const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (sheetsUrl?.startsWith("https://script.google.com/")) {
    void fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: payload.nome,
        email: payload.email,
        whatsapp: payload.whatsapp,
        ramo: payload.ramo ?? "",
        origem: payload.origem,
        receivedAt: payload.receivedAt
      })
    }).catch(() => void 0);
  }
  return json(res, 200, { ok: true, ref: payload.receivedAt });
}
