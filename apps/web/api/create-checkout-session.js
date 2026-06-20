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

// api/create-checkout-session.ts
var create_checkout_session_exports = {};
__export(create_checkout_session_exports, {
  default: () => handler
});
module.exports = __toCommonJS(create_checkout_session_exports);
function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.end(JSON.stringify(body));
}
function isObject(value) {
  return typeof value === "object" && value !== null;
}
function sanitizeString(value, maxLen = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}
function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
var STRIPE_PRICE_IDS = {
  digital: process.env.STRIPE_PRICE_DIGITAL ?? "",
  profissional: process.env.STRIPE_PRICE_PROFISSIONAL ?? "",
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE ?? ""
};
async function handler(req, res) {
  const request = req;
  const response = res;
  if (request.method === "OPTIONS") return json(response, 204, {});
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return json(response, 405, { ok: false, error: "method_not_allowed" });
  }
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return json(response, 500, { ok: false, error: "missing_stripe_key" });
  }
  const body = isObject(request.body) ? request.body : {};
  const planId = sanitizeString(body.planId);
  const email = sanitizeString(body.email);
  const name = sanitizeString(body.name);
  if (!planId) return json(response, 400, { ok: false, error: "planId_required" });
  if (!email) return json(response, 400, { ok: false, error: "email_required" });
  if (!isEmail(email)) return json(response, 400, { ok: false, error: "invalid_email" });
  if (!name) return json(response, 400, { ok: false, error: "name_required" });
  const priceId = STRIPE_PRICE_IDS[planId];
  if (!priceId) {
    return json(response, 400, { ok: false, error: `invalid_plan: ${planId}` });
  }
  const origin = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:5173";
  try {
    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        "success_url": `${origin}/obrigado?session_id={CHECKOUT_SESSION_ID}`,
        "cancel_url": `${origin}/planos`,
        "mode": "subscription",
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": "1",
        "customer_email": email,
        "client_reference_id": email,
        "metadata[plan_id]": planId,
        "metadata[customer_name]": name
      }).toString()
    });
    const data = await stripeRes.json();
    if (!stripeRes.ok) {
      console.error("[Stripe API error]", data);
      return json(response, 502, {
        ok: false,
        error: "stripe_api_error",
        message: typeof data.error === "object" ? data.error?.message : "Erro ao criar checkout"
      });
    }
    return json(response, 200, {
      ok: true,
      url: data.url,
      sessionId: data.id
    });
  } catch (err) {
    console.error("[Stripe fetch error]", err);
    return json(response, 502, { ok: false, error: "stripe_connection_error" });
  }
}
