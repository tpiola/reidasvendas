/** Copy da Home — mínima, CTA rápido */

export const HOME_FAQ = [
  {
    id: 'prazo',
    question: 'Prazo da primeira versão?',
    answer: 'Landing e funil: em geral até 72h após o orçamento aprovado. Escopo maior com marcos definidos.',
  },
  {
    id: 'projeto',
    question: 'É cópia de template?',
    answer: 'Não. Amostras mostram nível visual. Cada entrega é exclusiva para o seu nicho.',
  },
] as const;

export const TRUST_STATS = [
  { value: '72h', label: '1ª versão' },
  { value: '4.8×', label: 'Retorno médio' },
  { value: '24h', label: 'Resposta' },
] as const;

export const CINEMATIC_BAND = {
  eyebrow: 'Evolução',
  title: 'Do clique à venda',
  titleAccent: 'no mesmo fluxo.',
  subtitle: 'Site, captura, WhatsApp e métricas — o que seu cliente leva para o mercado.',
  ctaLabel: 'Solicitar orçamento',
  ctaTo: '/diagnostico',
} as const;

export const MID_VIDEO = {
  eyebrow: 'Na prática',
  title: 'Funil rodando',
  titleAccent: 'enquanto você atende.',
  subtitle: 'Automação e follow-up sem lead esquecido.',
  ctaLabel: 'Ver projetos',
  ctaTo: '/projetos',
} as const;

export const HOME_CTA = {
  title: 'Próximo passo:',
  titleAccent: 'orçamento sob medida.',
  subtitle: 'Nome, e-mail e WhatsApp. Proposta com escopo e investimento.',
  bullets: ['Resposta em 24h', 'Sem fidelidade obrigatória'] as const,
} as const;

export const PRODUCT_DEMO = {
  eyebrow: 'Preview',
  title: 'Sua máquina',
  titleAccent: 'em 60 segundos.',
  subtitle: 'Página, WhatsApp e CRM no mesmo painel.',
  steps: ['Lead entra com mensagem certa', 'WhatsApp no timing', 'Origem no CRM', 'Métrica sem planilha'],
} as const;

export const HOW_IT_WORKS = {
  eyebrow: 'Processo',
  title: 'Três passos.',
  titleAccent: 'Do orçamento ao ar.',
  subtitle: 'Rota clara. Execução rápida.',
  steps: [
    { num: '01', title: 'Orçamento', desc: 'Entendemos nicho, meta e investimento.' },
    { num: '02', title: 'Obra', desc: 'Site, funil e integrações no ar.' },
    { num: '03', title: 'Ritmo', desc: 'Automação e relatório do que converte.' },
  ],
} as const;

export const PROJECTS_HOME_SECTION = {
  eyebrow: 'Projetos',
  title: 'Um funil',
  titleAccent: 'por segmento.',
  subtitle: 'Exclusivo. Nunca cópia. Investimento em /planos.',
} as const;

export const HERO_COPY = {
  subhead: 'Site, funil e WhatsApp integrados. Venda com previsibilidade.',
  ctaPrimary: 'Quero minha máquina de vendas',
  ctaSecondary: 'Ver projetos',
} as const;

export const TESTIMONIALS_SECTION = {
  eyebrow: 'Resultados',
  title: 'Quem já',
  titleAccent: 'escalou.',
  disclaimer: 'Perfis reais — resultados variam por nicho e investimento.',
} as const;

export const TESTIMONIALS = [
  {
    quote: 'Landing no ar com lead qualificado no WhatsApp.',
    role: 'Clínica · Franca',
    segment: '',
  },
  {
    quote: 'Escopo fechado e primeira versão em dias.',
    role: 'B2B · Interior SP',
    segment: '',
  },
] as const;

/** Legado — evita imports quebrados em blocos removidos da Home */
export const TECH_STACK = ['GA4', 'N8N', 'VERCEL', 'WHATSAPP'] as const;
export const FUNNEL_MOCK_TASKS = [
  { label: 'Landing no ar', done: true },
  { label: 'WhatsApp no funil', done: true },
  { label: 'CRM ativo', done: false },
] as const;

export const PAIN_POINTS = [
  { title: 'Lead esfria', desc: 'Resposta fora do timing.' },
  { title: 'Tráfego sem página', desc: 'Clique que não vira conversa.' },
] as const;

export const DELIVERY_PILLARS = [
  { num: '01', title: 'Raio-X', desc: 'Onde a receita escapa.' },
  { num: '02', title: 'Obra', desc: 'Site e funil no ar.' },
] as const;

export const DELIVERABLES = {
  eyebrow: 'Entrega',
  title: 'O que montamos',
  titleAccent: 'para você.',
  subtitle: 'Site, funil e automação.',
  categories: [
    { tag: 'Construir', title: 'Presença', items: ['Landing sob medida', 'Copy do nicho'] },
    { tag: 'Operar', title: 'Funil', items: ['WhatsApp integrado', 'CRM + métricas'] },
  ],
} as const;

export const COMPARISON_SECTION = {
  eyebrow: 'Comparativo',
  title: 'Agência comum',
  titleAccent: 'vs Rei das Vendas.',
} as const;

export const COMPARISON_ROWS = [
  { label: 'Prazo', generic: 'Semanas', rdv: 'Até 72h (landing)' },
  { label: 'Integração', generic: 'Site isolado', rdv: 'Funil completo' },
] as const;

export const STATS_BAND = {
  title: 'Métricas',
  subtitle: 'O que medimos.',
  extra: { value: '0', label: 'Fidelidade obrigatória' },
} as const;

export const PAIN_SECTION = {
  eyebrow: 'Foco',
  title: 'Onde trava',
  subtitle: 'Fechamos no orçamento.',
} as const;

export const PRICING_PREVIEW = {
  eyebrow: 'Planos',
  title: 'Investimento',
  titleAccent: 'claro.',
  subtitle: 'Cada plano com página própria.',
} as const;
