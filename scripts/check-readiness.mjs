/** Readiness report: metadata only; never prints configured values or secrets. */
const groups = {
  "Site and domain": ["NEXT_PUBLIC_SITE_URL"],
  "Google measurement": ["NEXT_PUBLIC_GA4_ID"],
  "Search Console verification": ["NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION"],
  "Meta browser measurement": ["NEXT_PUBLIC_META_PIXEL_ID"],
  "Meta domain verification": ["NEXT_PUBLIC_META_DOMAIN_VERIFICATION"],
  "Meta server measurement": ["META_CAPI_ACCESS_TOKEN", "META_GRAPH_VERSION"],
  "Lead delivery": ["CRM_API_URL", "CRM_API_KEY"],
  "Durable rate limiting": ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "RATE_LIMIT_SALT"],
  "Controller identity": ["BUSINESS_LEGAL_NAME", "BUSINESS_CNPJ", "BUSINESS_ADDRESS", "PRIVACY_CONTACT_EMAIL"],
};
let incomplete = false;
for (const [group, variables] of Object.entries(groups)) {
  const missing = variables.filter((name) => !process.env[name]?.trim());
  incomplete ||= missing.length > 0;
  console.log(`${missing.length ? "PENDING" : "CONFIGURED"}: ${group}${missing.length ? ` — ${missing.join(", ")}` : ""}`);
}
console.log("CONFIGURED means present only. Validate provider ownership, consent, deduplication, delivery and retention in each provider.");
if (process.argv.includes("--strict") && incomplete) process.exitCode = 1;
