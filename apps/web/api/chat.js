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

// api/chat.ts
var chat_exports = {};
__export(chat_exports, {
  default: () => handler
});
module.exports = __toCommonJS(chat_exports);
function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}
function isObject(value) {
  return typeof value === "object" && value !== null;
}
function extractText(data) {
  if (!isObject(data)) return "";
  const output = data.output;
  if (!Array.isArray(output)) return "";
  const parts = [];
  for (const item of output) {
    if (!isObject(item)) continue;
    const content = item.content;
    if (!Array.isArray(content)) continue;
    for (const c of content) {
      if (!isObject(c)) continue;
      const t = c.text;
      if (typeof t === "string" && t.trim()) parts.push(t);
    }
  }
  return parts.join("\n");
}
async function handler(req, res) {
  const request = req;
  const response = res;
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return json(response, 405, { ok: false, error: "method_not_allowed" });
  }
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return json(response, 500, { ok: false, error: "missing_openai_key" });
  const body = request.body;
  const message = isObject(body) && typeof body.message === "string" ? body.message.trim() : "";
  if (!message) return json(response, 400, { ok: false, error: "missing_message" });
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const r = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: "You are Rei das Vendas Assistant. Tone: formal, concise, decision-grade. Never claim integrations are live. Ask one clarifying question when needed. Keep responses under 120 words."
        },
        { role: "user", content: message }
      ]
    })
  });
  if (!r.ok) return json(response, 502, { ok: false, error: "openai_failed" });
  const data = await r.json();
  const text = extractText(data);
  return json(response, 200, { ok: true, text: text || "Obrigado. Como posso ajudar?" });
}
