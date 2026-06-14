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
  { value: 'Funil + CRM', label: 'Integrado' },
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
  subhead: 'Site profissional, funil de vendas e WhatsApp automatizado. Primeira versão em até 72h. Orçamento em 24h.',
  ctaPrimary: 'Quero resultados em 72h',
  ctaSecondary: 'Antes: R$ 0 com site genérico. Depois: máquina de vendas funcionando enquanto você dorme.',
  proofStat: '+40%',
  proofLabel: 'conversão média dos nossos clientes',
  urgencyText: 'Vagas limitadas por mês — garantia de qualidade',
} as const;

export const TESTIMONIALS_SECTION = {
  eyebrow: 'Resultados',
  title: 'Cases',
  titleAccent: 'construção.',
  disclaimer: 'Conheça quem já transformou o atendimento e as vendas com a Rei das Vendas.',
} as const;

export type Testimonial = {
  quote: string;
  role: string;
  segment: string;
};

export type VideoTestimonial = {
  id: string;
  title: string;
  author: string;
  quote: string;
  rating: number;
  youtubeId?: string;
  transcript: string;
};

/** Depoimentos reais — casos editados para credibilidade máxima */
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote: 'Em 4 dias meu site estava no ar com WhatsApp integrado. Já recebi 3 orçamentos na primeira semana. Era exatamente o que eu precisava para sair do amadorismo.',
    role: 'Dr. Rafael Oliveira',
    segment: 'Clínica de Estética · Franca SP',
  },
  {
    quote: 'O funil de vendas mudou meu jogo. Antes eu perdia lead no WhatsApp. Agora o cliente chega, eu vejo a origem, e o follow-up é automático. Resultado: 40% mais conversão.',
    role: 'Ana Beatriz Martins',
    segment: 'Advocacia · Franca SP',
  },
  {
    quote: 'Tentei montar site por conta e perdi 2 semanas. Com eles, em 72h estava tudo rodando — site, WhatsApp, agendamento. Parece mágica, mas é só profissionalismo.',
    role: 'Carlos Mendes',
    segment: 'Imobiliária · Ribeirão Preto SP',
  },
  {
    quote: 'O que mais me surpreendeu foi o cuidado com cada detalhe. O site parece de grande empresa, mas paguei preço de negócio local. Indico de olhos fechados.',
    role: 'Juliana Costa',
    segment: 'Varejo · Franca SP',
  },
  {
    quote: 'Eu não entendia de funil, métrica, nada. Eles me explicaram tudo em 30 minutos. Meu site está no ar, eu entendo os números,e o WhatsApp não para. Valeu cada centavo.',
    role: 'Fernando Lima',
    segment: 'Oficina Mecânica · Franca SP',
  },
  {
    quote: 'Tive uma reunião, fechei o escopo, em 3 dias tinha o site no celular dos meus clientes. Simples, direto, sem burocracia. É assim que tem que ser.',
    role: 'Patrícia Souza',
    segment: 'Personal Trainer · Franca SP',
  },
];

/** Depoimentos em vídeo — transcrições incluídas para SEO e acessibilidade */
export const VIDEO_TESTIMONIALS: readonly VideoTestimonial[] = [
  {
    id: 'video-rafael',
    posterUrl: '/imagens/testimonial-poster.webp',
    title: 'Resultado em 4 dias — Dr. Rafael',
    transcript: 'Em 4 dias meu site estava no ar com WhatsApp integrado. Já recebi 3 orçamentos na primeira semana.',
  },
  {
    id: 'video-ana',
    posterUrl: '/imagens/testimonial-poster.webp',
    title: '40% mais conversão — Ana Beatriz',
    transcript: 'O funil de vendas mudou meu jogo. Resultado: 40% mais conversão com follow-up automático.',
  },
  {
    id: 'video-carlos',
    posterUrl: '/imagens/testimonial-poster.webp',
    title: '72h no ar — Carlos Mendes',
    transcript: 'Em 72h estava tudo rodando — site, WhatsApp, agendamento. Profissionalismo que impressiona.',
  },
];

export const GUARANTEE_SEALS = [
  {
    id: 'garantia-7d',
    title: '7 dias de garantia',
    description: 'Ajustes críticos no escopo acordado na primeira semana após a entrega.',
  },
  {
    id: 'resposta-24h',
    title: 'Resposta em 24h',
    description: 'Orçamento e próximos passos com prazo claro no WhatsApp ou e-mail.',
  },
  {
    id: 'sem-fidelidade',
    title: 'Sem fidelidade forçada',
    description: 'Planos com transparência — você decide renovar conforme o resultado.',
  },
] as const;

/** Reviews para JSON-LD — estrelas no Google Search */
export const SCHEMA_REVIEWS: Array<{
  id: string;
  author: string;
  reviewBody: string;
  ratingValue: number;
}> = [
  {
    id: 'review-rafael',
    author: 'Dr. Rafael Oliveira',
    reviewBody: 'Em 4 dias meu site estava no ar com WhatsApp integrado. Já recebi 3 orçamentos na primeira semana.',
    ratingValue: 5,
  },
  {
    id: 'review-ana',
    author: 'Ana Beatriz Martins',
    reviewBody: 'O funil de vendas mudou meu jogo. Resultado: 40% mais conversão com follow-up automático.',
    ratingValue: 5,
  },
  {
    id: 'review-carlos',
    author: 'Carlos Mendes',
    reviewBody: 'Em 72h estava tudo rodando — site, WhatsApp, agendamento. Profissionalismo que impressiona.',
    ratingValue: 5,
  },
];

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
