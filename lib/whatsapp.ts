/** Shared, deterministic WhatsApp context. Never accepts an arbitrary redirect URL. */
export const WHATSAPP_NUMBER = '5516992333344';
export const PLAN_IDS = ['essencial', 'profissional', 'escala'] as const;
export type PlanId = (typeof PLAN_IDS)[number];
export type BillingCycle = 'mensal' | 'anual';
export type Attribution = Partial<
  Record<'source' | 'medium' | 'campaign', string>
>;
export function sanitizePlanId(value: unknown): PlanId | undefined {
  return typeof value === 'string' && PLAN_IDS.includes(value as PlanId)
    ? (value as PlanId)
    : undefined;
}
export function sanitizeBillingCycle(value: unknown): BillingCycle | undefined {
  return value === 'mensal' || value === 'monthly'
    ? 'mensal'
    : value === 'anual' || value === 'annual'
      ? 'anual'
      : undefined;
}
export function sanitizePath(value: unknown): string {
  return typeof value === 'string' &&
    /^\/(?!\/)[A-Za-z0-9/_-]{0,199}$/.test(value) &&
    !/\d{7,}/.test(value)
    ? value
    : '/';
}
export function sanitizeMachineValue(
  value: unknown,
  max = 80,
): string | undefined {
  // Attribution is a campaign label, never a phone, email, search phrase or form field.
  return typeof value === 'string' &&
    value.length <= max &&
    /^[A-Za-z][A-Za-z0-9_-]*$/.test(value) &&
    !/\d{7,}/.test(value)
    ? value
    : undefined;
}
export function sanitizeAttribution(
  value: Record<string, unknown>,
): Attribution {
  const result: Attribution = {};
  for (const key of ['source', 'medium', 'campaign'] as const) {
    const safe = sanitizeMachineValue(value[key]);
    if (safe) result[key] = safe;
  }
  return result;
}
export function validEventId(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    )
  );
}
export type WhatsAppContext = {
  src?: string;
  page?: string;
  plan?: unknown;
  cycle?: unknown;
  score?: string | null;
} & Attribution;
const planNames: Record<PlanId, string> = {
  essencial: 'Essencial',
  profissional: 'Profissional',
  escala: 'Escala',
};
export function whatsappMessage(context: WhatsAppContext = {}): string {
  const plan = sanitizePlanId(context.plan),
    cycle = sanitizeBillingCycle(context.cycle);
  const src = sanitizeMachineValue(context.src) || '';
  const page = sanitizePath(context.page);
  let intent =
    'Quero conversar sobre um site para apresentar meu negócio e facilitar o contato dos clientes.';
  if (plan)
    intent = `Quero receber uma proposta do plano ${planNames[plan]}${cycle ? `, no ciclo ${cycle}` : ''}. Gostaria de confirmar o escopo, o prazo e as condições antes de contratar.`;
  else if (src === 'quiz' && /^[0-3]$/.test(context.score || ''))
    intent = `Fiz a autoavaliação: ${context.score}/3 fundamentos presentes. Quero entender o que priorizar para ter um site que gere leads e vendas.`;
  else if (src.includes('diagnostico') || page === '/diagnostico')
    intent =
      'Quero avaliar o diagnóstico da minha presença digital e do caminho até a venda.';
  else if (src.includes('trafego') || page.includes('trafego'))
    intent =
      'Quero avaliar gestão de tráfego e um site preparado para converter os anúncios.';
  else if (src.includes('social') || page.includes('social-media'))
    intent =
      'Quero conversar sobre social media integrado ao site e ao atendimento.';
  else if (page === '/planos' || src.includes('planos'))
    intent =
      'Quero comparar os planos de assinatura para ter um site que gere leads e vendas.';
  else if (page === '/obrigado' || src.includes('obrigado'))
    intent =
      'Quero confirmar o próximo passo para o site da minha empresa. Ainda preciso validar minha contratação com a equipe.';
  else if (page.includes('seo') || src.includes('seo'))
    intent =
      'Quero ser encontrado nas buscas locais e ter um site preparado para transformar visitas em contatos.';
  // Only fixed, human-readable channel labels may enter the message. No raw campaign/URL/PII.
  const channel =
    context.source === 'meta' ||
    context.source === 'facebook' ||
    context.source === 'instagram'
      ? ' Conheci o trabalho por um anúncio na Meta.'
      : context.source === 'google'
        ? ' Conheci o trabalho pelo Google.'
        : '';
  return `Olá! Vim pelo site Rei das Vendas. ${intent}${channel}`;
}
export function whatsappDestination(context: WhatsAppContext = {}): URL {
  const target = new URL(`https://wa.me/${WHATSAPP_NUMBER}`);
  target.searchParams.set('text', whatsappMessage(context));
  return target;
}
