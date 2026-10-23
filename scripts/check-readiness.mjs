/** Readiness report: metadata only; never prints configured values or secrets. */
const groups = {
  'Site and domain': ['NEXT_PUBLIC_SITE_URL'],
  'Google measurement': ['NEXT_PUBLIC_GA4_ID'],
  'Search Console verification': ['NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION'],
  'Meta browser measurement': ['NEXT_PUBLIC_META_PIXEL_ID'],
  'Meta domain verification': ['NEXT_PUBLIC_META_DOMAIN_VERIFICATION'],
  'Meta server measurement': ['META_CAPI_ACCESS_TOKEN', 'META_GRAPH_VERSION'],
  'Lead delivery': ['CRM_API_URL', 'CRM_API_KEY'],
  'Durable rate limiting': [
    'UPSTASH_REDIS_REST_URL',
    'UPSTASH_REDIS_REST_TOKEN',
    'RATE_LIMIT_SALT',
  ],
  'Hosted subscription checkout': [
    'SUBSCRIPTIONS_OFFER_APPROVED',
    'SUBSCRIPTIONS_TERMS_APPROVED',
    'SUBSCRIPTIONS_TERMS_VERSION',
    'STRIPE_SECRET_KEY',
    'STRIPE_API_VERSION',
    'STRIPE_MODE',
  ],
  'Subscription webhook': ['STRIPE_WEBHOOK_SECRET'],
  'Subscription price catalog': [
    'STRIPE_PRICE_ESSENCIAL_MONTHLY',
    'STRIPE_PRICE_ESSENCIAL_ANNUAL',
    'STRIPE_PRICE_ESSENCIAL_SETUP',
    'STRIPE_PRICE_PROFISSIONAL_MONTHLY',
    'STRIPE_PRICE_PROFISSIONAL_ANNUAL',
    'STRIPE_PRICE_PROFISSIONAL_SETUP',
    'STRIPE_PRICE_ESCALA_MONTHLY',
    'STRIPE_PRICE_ESCALA_ANNUAL',
    'STRIPE_PRICE_ESCALA_SETUP',
  ],
  'Controller identity': [
    'BUSINESS_LEGAL_NAME',
    'BUSINESS_CNPJ',
    'BUSINESS_ADDRESS',
    'PRIVACY_CONTACT_EMAIL',
  ],
};
let incomplete = false;
for (const [group, variables] of Object.entries(groups)) {
  const missing = variables.filter(
    (name) =>
      !process.env[name]?.trim() ||
      (name.endsWith('_APPROVED') && process.env[name] !== 'true'),
  );
  incomplete ||= missing.length > 0;
  console.log(
    `${missing.length ? 'PENDING' : 'CONFIGURED'}: ${group}${missing.length ? ` — ${missing.join(', ')}` : ''}`,
  );
}
console.log(
  'CONFIGURED means present only. Validate provider ownership, consent, deduplication, delivery and retention in each provider.',
);
if (process.argv.includes('--strict') && incomplete) process.exitCode = 1;
