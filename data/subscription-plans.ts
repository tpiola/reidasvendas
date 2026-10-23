/**
 * Proposta de oferta recorrente para PME, sujeita a validação comercial.
 * Não ativa cobrança, não altera serviços avulsos e não constitui contrato.
 * Valores de apresentação em BRL; integrações devem preferir campos em centavos.
 */
export type SubscriptionPlanId = 'essencial' | 'profissional' | 'escala';
export type SubscriptionBillingCycle = 'monthly' | 'annual';

export type SubscriptionOfferStatus = 'proposal' | 'approved';
export const subscriptionOfferStatus: SubscriptionOfferStatus = 'proposal';
export function isSubscriptionOfferApproved(
  status: SubscriptionOfferStatus = subscriptionOfferStatus,
): boolean {
  return status === 'approved';
}
export const annualDiscount = 0.08;
export const annualDiscountPercent = 8;
export const adjustmentUnitMinutes = 20;

export interface AnnualSubscriptionPrice {
  annualTotal: number;
  annualTotalCents: number;
  effectiveMonthlyPrice: number;
  effectiveMonthlyPriceCents: number;
  savings: number;
  savingsCents: number;
}

/** Annual total = 12 × monthly price × 0.92; setup is separate. */
export function calculateAnnualPrice(
  monthlyPrice: number,
): AnnualSubscriptionPrice {
  if (!Number.isFinite(monthlyPrice) || monthlyPrice < 0) {
    throw new RangeError('O valor mensal deve ser um número não negativo.');
  }
  const monthlyCents = Math.round(monthlyPrice * 100);
  const annualTotalCents = Math.round((monthlyCents * 12 * 92) / 100);
  const effectiveMonthlyPriceCents = Math.round(annualTotalCents / 12);
  const savingsCents = monthlyCents * 12 - annualTotalCents;
  return {
    annualTotal: annualTotalCents / 100,
    annualTotalCents,
    effectiveMonthlyPrice: effectiveMonthlyPriceCents / 100,
    effectiveMonthlyPriceCents,
    savings: savingsCents / 100,
    savingsCents,
  };
}

export interface SubscriptionPlan extends AnnualSubscriptionPrice {
  id: SubscriptionPlanId;
  name: string;
  description: string;
  monthlyPrice: number;
  monthlyPriceCents: number;
  setupPrice: number;
  setupPriceCents: number;
  annualDiscountPercent: number;
  pageLimit: number;
  articlesPerMonth: number;
  adjustmentsPerMonth: number;
  adjustmentUnitMinutes: number;
  features: string[];
  limits: string[];
  exclusions: string[];
  support: string;
  seoScope: string;
  recommended: boolean;
  status: SubscriptionOfferStatus;
}

const sharedFeatures = [
  'Site responsivo com contato pelo WhatsApp',
  'Revisão técnica de funcionamento e atualizações compatíveis com o projeto',
  'Relatório mensal de entregas e indicadores disponíveis',
  'Medição condicionada a acessos, integrações e escolhas de privacidade',
];

const sharedExclusions = [
  'Verba e gestão de anúncios, produção de redes sociais e captação de fotos ou vídeos',
  'Domínio, licenças, ferramentas externas e integrações sob medida, salvo inclusão na proposta',
  'Loja virtual, aplicativo, área autenticada, migração complexa e novas funcionalidades fora do escopo',
  'Garantia de venda, tráfego, posição em busca ou citação por inteligência artificial',
];

type PlanInput = Omit<
  SubscriptionPlan,
  | keyof AnnualSubscriptionPrice
  | 'monthlyPriceCents'
  | 'setupPriceCents'
  | 'annualDiscountPercent'
  | 'adjustmentUnitMinutes'
  | 'status'
>;

function definePlan(input: PlanInput): SubscriptionPlan {
  return {
    ...input,
    ...calculateAnnualPrice(input.monthlyPrice),
    monthlyPriceCents: Math.round(input.monthlyPrice * 100),
    setupPriceCents: Math.round(input.setupPrice * 100),
    annualDiscountPercent,
    adjustmentUnitMinutes,
    status: subscriptionOfferStatus,
  };
}

export const subscriptionPlans: readonly SubscriptionPlan[] = [
  definePlan({
    id: 'essencial',
    name: 'Essencial',
    description:
      'Uma base clara para apresentar seu negócio e receber contatos.',
    monthlyPrice: 497,
    setupPrice: 1497,
    pageLimit: 5,
    articlesPerMonth: 0,
    adjustmentsPerMonth: 2,
    features: [
      ...sharedFeatures,
      'Até 5 páginas de conteúdo no escopo inicial',
      '2 unidades de ajuste por mês, de até 20 minutos cada',
      'SEO técnico de base: títulos, descrições, sitemap e indexação elegível',
    ],
    limits: [
      'Até 5 páginas de conteúdo; páginas legais operacionais ficam fora dessa contagem.',
      'Nenhum artigo mensal incluído.',
      'Até 2 ajustes por mês; cada ajuste corresponde a uma unidade de até 20 minutos.',
    ],
    exclusions: [...sharedExclusions],
    support:
      'Atendimento em dias úteis pela fila regular, sem prazo de resposta contratual definido nesta proposta.',
    seoScope:
      'Configuração técnica inicial e revisão de integridade. Não inclui produção editorial mensal nem campanha contínua de SEO.',
    recommended: false,
  }),
  definePlan({
    id: 'profissional',
    name: 'Profissional',
    description: 'Presença digital com conteúdo e revisão contínua da oferta.',
    monthlyPrice: 997,
    setupPrice: 2497,
    pageLimit: 10,
    articlesPerMonth: 1,
    adjustmentsPerMonth: 4,
    features: [
      ...sharedFeatures,
      'Até 10 páginas de conteúdo no escopo inicial',
      '1 artigo por mês com pauta e aprovação combinadas',
      '4 unidades de ajuste por mês, de até 20 minutos cada',
      'Revisão mensal de uma página prioritária e links internos',
    ],
    limits: [
      'Até 10 páginas de conteúdo; páginas legais operacionais ficam fora dessa contagem.',
      'Até 1 artigo original por mês, com pauta e uma rodada de revisão combinadas.',
      'Até 4 ajustes por mês; cada ajuste corresponde a uma unidade de até 20 minutos.',
    ],
    exclusions: [...sharedExclusions],
    support:
      'Atendimento em dias úteis com prioridade sobre a fila regular, sem SLA numérico prometido.',
    seoScope:
      'Base técnica, um conteúdo mensal e revisão de metadados e links internos de uma página prioritária. Publicação depende de informações e aprovação.',
    recommended: true,
  }),
  definePlan({
    id: 'escala',
    name: 'Escala',
    description:
      'Mais frentes de conteúdo e ajustes para uma operação com demanda recorrente.',
    monthlyPrice: 1997,
    setupPrice: 3997,
    pageLimit: 15,
    articlesPerMonth: 2,
    adjustmentsPerMonth: 8,
    features: [
      ...sharedFeatures,
      'Até 15 páginas de conteúdo no escopo inicial',
      '2 artigos por mês com pauta e aprovação combinadas',
      '8 unidades de ajuste por mês, de até 20 minutos cada',
      'Revisão mensal de até duas páginas prioritárias e links internos',
    ],
    limits: [
      'Até 15 páginas de conteúdo; páginas legais operacionais ficam fora dessa contagem.',
      'Até 2 artigos originais por mês, com pauta e uma rodada de revisão combinadas.',
      'Até 8 ajustes por mês; cada ajuste corresponde a uma unidade de até 20 minutos.',
    ],
    exclusions: [...sharedExclusions],
    support:
      'Atendimento em dias úteis com prioridade sobre a fila regular, sem disponibilidade imediata ou SLA numérico prometidos.',
    seoScope:
      'Base técnica, dois conteúdos mensais e revisão de metadados e links internos de até duas páginas prioritárias. Não inclui posições garantidas nem SEO ilimitado.',
    recommended: false,
  }),
];

export const subscriptionCommercialNotes = [
  'Proposta de oferta a validar. Não há cobrança ativa nesta apresentação.',
  'Setup separado da mensalidade. O desconto anual de 8% incide somente sobre 12 mensalidades.',
  'O valor mensal equivalente do anual é uma comparação; forma de pagamento, renovação e cancelamento serão definidos no contrato.',
  'Ajustes são alterações pequenas de texto, imagem ou configuração existente. Nova página ou funcionalidade exige avaliação de escopo.',
  'Unidades mensais não são banco ilimitado de horas; acumulação, reposição e regras de aprovação dependem do contrato a validar.',
  'Resultados comerciais e posições em mecanismos de busca não são garantidos.',
] as const;
