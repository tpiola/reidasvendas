/* ═══════════════════════════════════════════
   Stripe Config — Rei das Vendas
   Mapeamento de planos para preços no Stripe
   ════════════════════════════════════════════ */

export const STRIPE_PRICES: Record<string, string> = {
  digital: process.env.VITE_STRIPE_PRICE_DIGITAL || 'price_digital',
  profissional: process.env.VITE_STRIPE_PRICE_PROFISSIONAL || 'price_profissional',
  enterprise: process.env.VITE_STRIPE_ENTERPRISE || 'price_enterprise',
};

export const STRIPE_CONFIG = {
  publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
  mode: 'subscription' as const,
  successUrl: `${window.location.origin}/obrigado?session_id={CHECKOUT_SESSION_ID}`,
  cancelUrl: `${window.location.origin}/planos`,
};

export const PLAN_NAMES: Record<string, string> = {
  digital: 'Digital',
  profissional: 'Profissional',
  enterprise: 'Enterprise',
};

export const PLAN_PRICES: Record<string, number> = {
  digital: 97,
  profissional: 247,
  enterprise: 597,
};
