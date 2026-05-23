/** Planos e slugs de vendas — cada botão abre sua própria página */

export const PLAN_SLUGS = ['essencial', 'crescimento', 'escala', 'sob-medida'] as const;
export type PlanSlug = (typeof PLAN_SLUGS)[number];

export type PlanHubCard = {
  slug: PlanSlug;
  name: string;
  tagline: string;
  priceLabel: string;
  ctaLabel: string;
  highlights: string[];
};

export const PLANS_HUB: PlanHubCard[] = [
  {
    slug: 'essencial',
    name: 'Essencial',
    tagline: 'Presença digital sólida para começar a captar com método.',
    priceLabel: 'A partir de R$ 497/mês',
    ctaLabel: 'Ver plano Essencial',
    highlights: ['Site sob medida', 'WhatsApp integrado', 'SEO técnico base'],
  },
  {
    slug: 'crescimento',
    name: 'Crescimento',
    tagline: 'Funil, automação e follow-up para não perder lead.',
    priceLabel: 'A partir de R$ 997/mês',
    ctaLabel: 'Ver plano Crescimento',
    highlights: ['Funil completo', 'n8n + CRM', 'Relatório semanal'],
  },
  {
    slug: 'escala',
    name: 'Escala',
    tagline: 'Tráfego, IA e operação para quem quer volume com controle.',
    priceLabel: 'A partir de R$ 1.997/mês',
    ctaLabel: 'Ver plano Escala',
    highlights: ['Mídia paga alinhada', 'IA no atendimento', 'Dashboard executivo'],
  },
  {
    slug: 'sob-medida',
    name: 'Sob medida',
    tagline: 'Monte site, app, treinamento ou consultoria no mesmo contrato.',
    priceLabel: 'Proposta personalizada',
    ctaLabel: 'Montar meu pacote',
    highlights: ['Escolha módulos', 'App ou site', 'Mentoria e equipe'],
  },
];

export type PlanDetail = {
  slug: PlanSlug;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  subhead: string;
  priceLabel: string;
  billingNote: string;
  includes: string[];
  idealFor: string;
  notIncluded: string[];
};

export const PLAN_DETAILS: Record<PlanSlug, PlanDetail> = {
  essencial: {
    slug: 'essencial',
    seoTitle: 'Plano Essencial — Rei das Vendas',
    seoDescription:
      'Assinatura com site feito do zero, WhatsApp e SEO para negócio local captar leads com previsibilidade.',
    headline: 'Essencial',
    subhead: 'Sua vitrine premium no ar, com mensagem clara e canal de contato que responde.',
    priceLabel: 'R$ 497/mês',
    billingNote: 'Setup inicial sob consulta · sem fidelidade obrigatória',
    includes: [
      'Site institucional ou landing feito do zero para o seu nicho',
      'Copy orientada à conversão do seu público',
      'Integração WhatsApp com mensagem de boas-vindas',
      'SEO técnico (meta, velocidade, sitemap)',
      'Hospedagem e SSL inclusos na operação',
      'Suporte por e-mail em dias úteis',
    ],
    idealFor: 'Negócio local que precisa sair do “só Instagram” e ter página que passa confiança.',
    notIncluded: ['Tráfego pago', 'CRM avançado', 'Automações complexas'],
  },
  crescimento: {
    slug: 'crescimento',
    seoTitle: 'Plano Crescimento — Rei das Vendas',
    seoDescription:
      'Funil, automação n8n, CRM e relatórios para transformar visita em conversa e conversa em venda.',
    headline: 'Crescimento',
    subhead: 'Do clique ao WhatsApp qualificado — com ritmo e sem lead esquecido.',
    priceLabel: 'R$ 997/mês',
    billingNote: 'Inclui tudo do Essencial · upgrade de módulos sob demanda',
    includes: [
      'Tudo do plano Essencial',
      'Funil multi-etapas com eventos de conversão (GA4)',
      'Automação n8n: resposta, etiquetas e lembretes',
      'CRM leve ou integração com o seu',
      'Testes A/B de CTA e formulário',
      'Relatório quinzenal do que converteu',
    ],
    idealFor: 'Quem já gasta com anúncio ou indicação e quer previsibilidade no follow-up.',
    notIncluded: ['Gestão completa de mídia', 'Produção de vídeo em escala'],
  },
  escala: {
    slug: 'escala',
    seoTitle: 'Plano Escala — Rei das Vendas',
    seoDescription:
      'Operação digital completa: tráfego, IA no atendimento, dashboards e otimização contínua.',
    headline: 'Escala',
    subhead: 'Time enxuto, operação de empresa grande — sem contratar dez ferramentas soltas.',
    priceLabel: 'R$ 1.997/mês',
    billingNote: 'Escopo de mídia e IA alinhado no diagnóstico',
    includes: [
      'Tudo do plano Crescimento',
      'Estratégia e criativos para Google e Meta (setup + otimização)',
      'IA no primeiro contato (triagem e FAQ)',
      'Dashboard executivo (origem, custo, conversão)',
      'Reunião mensal de performance',
      'Prioridade no suporte',
    ],
    idealFor: 'Operação que já validou oferta e quer escalar com controle de CAC e LTV.',
    notIncluded: ['Orçamento de mídia (pago direto às plataformas)'],
  },
  'sob-medida': {
    slug: 'sob-medida',
    seoTitle: 'Plano Sob Medida — Rei das Vendas',
    seoDescription:
      'Monte site, aplicativo, treinamento, mentoria ou consultoria — projeto único para o seu cliente final.',
    headline: 'Sob medida',
    subhead: 'Você escolhe o que entra: digital, pessoas e estratégia — nós desenhamos e executamos.',
    priceLabel: 'Proposta após diagnóstico',
    billingNote: 'Projeto e assinatura podem ser combinados',
    includes: [
      'Arquitetura feita do zero (não é template replicado)',
      'Escopo fechado por entregável e marco',
      'Site, app PWA ou ferramenta interna',
      'Treinamento de equipe comercial ou atendimento',
      'Mentoria e consultoria estratégica',
      'Integrações sob demanda (ERP, agendas, pagamentos)',
    ],
    idealFor: 'Marcas que precisam de solução específica para o cliente deles converter mais.',
    notIncluded: ['Pacote fechado sem diagnóstico prévio'],
  },
};

export const CUSTOM_BUILD_OPTIONS = [
  { id: 'site', label: 'Site ou landing premium', description: 'Páginas rápidas, SEO e copy para o seu público.' },
  { id: 'app', label: 'Aplicativo ou PWA', description: 'Experiência mobile para pedidos, área do cliente ou operação.' },
  { id: 'automacao', label: 'Automação e integrações', description: 'n8n, CRM, WhatsApp API e fluxos sem retrabalho manual.' },
  { id: 'treinamento', label: 'Treinamento de equipe', description: 'Scripts, objeções e ritmo comercial para o time vender mais.' },
  { id: 'mentoria', label: 'Mentoria', description: 'Acompanhamento recorrente com metas e revisão de funil.' },
  { id: 'consultoria', label: 'Consultoria estratégica', description: 'Raio-X da operação, rota e priorização de investimento.' },
] as const;
