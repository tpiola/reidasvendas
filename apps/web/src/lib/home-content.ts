/** Copy da Home — curta, conversão B2B (sem promessas inventadas) */

export const HOME_FAQ = [
  {
    id: 'prazo',
    question: 'Quanto tempo para a primeira versão no ar?',
    answer:
      'Landing e funil: em geral até 72h após o diagnóstico. App ou extensão depende do escopo — sempre com marco e data.',
  },
  {
    id: 'templates',
    question: 'As amostras do site são copiadas?',
    answer:
      'Não. Mostram estilo possível. Cada entrega nasce do zero, com copy e jornada para o seu público converter.',
  },
  {
    id: 'escopo',
    question: 'O que entra no pacote?',
    answer:
      'Site rápido, funil, WhatsApp e CRM integrados, automação e relatório do que virou lead — escopo fechado no diagnóstico.',
  },
] as const;

export const PAIN_POINTS = [
  {
    title: 'Lead esfria no WhatsApp',
    desc: 'Sem resposta no timing certo, a venda vai para o concorrente.',
  },
  {
    title: 'Anúncio sem página à altura',
    desc: 'Tráfego pago que não vira conversa.',
  },
  {
    title: 'Site lento ou genérico',
    desc: 'Some no Google e no celular — o cliente some junto.',
  },
  {
    title: 'CRM parado',
    desc: 'Ferramenta paga, funil só no PowerPoint.',
  },
] as const;

export const PILLARS_SECTION = {
  eyebrow: 'Como entregamos',
  title: 'Quatro passos.',
  titleAccent: 'Do diagnóstico ao ritmo comercial.',
  subtitle: 'Raio-X, rota, obra e automação — stack moderna para quem precisa vender com previsibilidade.',
} as const;

export const DELIVERY_PILLARS = [
  {
    num: '01',
    title: 'Raio-X',
    desc: 'Onde a receita escapa: funil, resposta e posicionamento — clareza de dono.',
  },
  {
    num: '02',
    title: 'Rota',
    desc: 'Mensagem e oferta para o cliente que paga melhor — menos clique perdido.',
  },
  {
    num: '03',
    title: 'Obra',
    desc: 'Site rápido, rastreável e pronto para anúncio — autoridade antes do primeiro contato.',
  },
  {
    num: '04',
    title: 'Ritmo',
    desc: 'Follow-up automático enquanto você atende — lead não esfria no silêncio.',
  },
] as const;

export const TECH_STACK = [
  'GOOGLE ADS',
  'META ADS',
  'GA4',
  'N8N',
  'VERCEL',
  'WHATSAPP API',
  'SUPABASE',
  'SEARCH CONSOLE',
] as const;

export const TRUST_STATS = [
  { value: '72h', label: '1ª versão' },
  { value: '4.8×', label: 'Retorno médio' },
  { value: '24h', label: 'Resposta' },
] as const;

export const CINEMATIC_BAND = {
  eyebrow: 'Presença que vende',
  title: 'Enquanto você atende,',
  titleAccent: 'o funil não dorme.',
  ctaLabel: 'Quero meu diagnóstico',
  ctaTo: '/diagnostico',
} as const;

export const HOME_CTA = {
  title: 'Pronto para o',
  titleAccent: 'próximo nível?',
  subtitle: 'Nome, e-mail e WhatsApp. Em até 24h você recebe rota e escopo — sem slide corporativo.',
  bullets: ['Diagnóstico em 24h', 'Sem fidelidade obrigatória'] as const,
} as const;

export const PRODUCT_DEMO = {
  eyebrow: 'Veja na prática',
  title: 'O funil que trabalha',
  titleAccent: 'enquanto você atende.',
  subtitle: 'Preview do que entregamos: página, captura, WhatsApp e métricas no mesmo fluxo.',
  steps: [
    'Lead entra pelo site ou anúncio com mensagem certa',
    'WhatsApp responde no timing — sem sumir no silêncio',
    'CRM registra origem e estágio da oportunidade',
    'Você vê o que converteu — sem planilha paralela',
  ],
} as const;

export const HOW_IT_WORKS = {
  eyebrow: 'Como funciona',
  title: 'Três passos.',
  titleAccent: 'Do diagnóstico ao ar.',
  subtitle: 'Sem reunião eterna nem slide corporativo — só rota clara e execução.',
  steps: [
    {
      num: '01',
      title: 'Diagnóstico',
      desc: 'Nome, e-mail e WhatsApp. Em até 24h você recebe rota, escopo e prioridade de investimento.',
    },
    {
      num: '02',
      title: 'Obra digital',
      desc: 'Site, funil e integrações no ar — rápido no celular, pronto para anúncio e SEO técnico.',
    },
    {
      num: '03',
      title: 'Ritmo comercial',
      desc: 'Automação no follow-up e relatório do que virou lead — você atende, o sistema sustenta.',
    },
  ],
} as const;

export const FUNNEL_MOCK_TASKS = [
  { label: 'Landing publicada com copy do nicho', done: true },
  { label: 'Formulário + consentimento LGPD', done: true },
  { label: 'WhatsApp conectado ao funil', done: false },
  { label: 'CRM recebendo leads qualificados', done: false },
  { label: 'Dashboard de conversão ativo', done: false },
] as const;

export const COMPARISON_SECTION = {
  eyebrow: 'Por que nós',
  title: 'Agência comum',
  titleAccent: 'vs Rei das Vendas.',
} as const;

export const COMPARISON_ROWS = [
  {
    label: 'Prazo da 1ª versão',
    generic: 'Semanas ou escopo indefinido',
    rdv: 'Até 72h após diagnóstico (landing/funil)',
  },
  {
    label: 'Integração',
    generic: 'Site isolado do WhatsApp e CRM',
    rdv: 'Site, funil, WhatsApp e métricas conversando',
  },
  {
    label: 'LGPD e dados',
    generic: 'Formulário genérico, política genérica',
    rdv: 'Consentimento, HTTPS e política alinhada',
  },
  {
    label: 'Projeto',
    generic: 'Template reaproveitado',
    rdv: 'Feito do zero para o seu público converter',
  },
] as const;

export const STATS_BAND = {
  title: 'Números que importam para o dono',
  subtitle: 'Métricas que já usamos com operações locais — sem promessa vazia.',
  extra: { value: '0', label: 'Meses de fidelidade obrigatória' },
} as const;

export const DELIVERABLES = {
  eyebrow: 'Tudo incluso',
  title: 'O que montamos',
  titleAccent: 'para o seu negócio.',
  subtitle: 'Três frentes — construir, lançar e crescer — com stack que você já ouviu falar.',
  categories: [
    {
      tag: 'Construir',
      title: 'Presença e conversão',
      items: ['Site ou landing sob medida', 'Copy orientada ao seu nicho', 'Design premium (glass/bento)'],
    },
    {
      tag: 'Lançar',
      title: 'Operação no ar',
      items: ['WhatsApp integrado', 'Funil e formulários', 'Hospedagem Vercel + SSL'],
    },
    {
      tag: 'Crescer',
      title: 'Ritmo e escala',
      items: ['Automação n8n', 'GA4 e Search Console', 'Planos de assinatura alinhados'],
    },
  ],
} as const;

export const PRICING_PREVIEW = {
  eyebrow: 'Planos',
  title: 'Investimento',
  titleAccent: 'claro.',
  subtitle: 'Escolha o ritmo. Cada plano tem página própria com entregáveis detalhados.',
} as const;

export const PAIN_SECTION = {
  eyebrow: 'Diagnóstico',
  title: 'Onde a venda trava',
  subtitle: 'Quatro frentes que drenam receita — e que fechamos no diagnóstico.',
} as const;

export const TESTIMONIALS_SECTION = {
  eyebrow: 'Operações atendidas',
  title: 'Quem já colocou',
  titleAccent: 'ritmo no funil.',
  disclaimer:
    'Relatos resumidos de perfis atendidos — resultados variam conforme nicho, investimento e execução comercial.',
} as const;

export const PROJECTS_HOME_SECTION = {
  eyebrow: 'Projetos por segmento',
  title: 'Cada nicho tem',
  titleAccent: 'sua máquina de vendas.',
  subtitle:
    'Referências por segmento — cada entrega é exclusiva, nunca cópia. Preços e planos na área dedicada.',
} as const;

export const HERO_COPY = {
  subhead:
    'Você sente que seu negócio está invisível? Imagine um funil que trabalha enquanto você atende — site, WhatsApp e automação no mesmo fluxo.',
  ctaPrimary: 'Quero minha máquina de vendas',
  ctaSecondary: 'Ver projetos',
} as const;

export const TESTIMONIALS = [
  {
    quote: 'Saí do site parado para uma landing que já recebe lead com mensagem certa no WhatsApp.',
    role: 'Dono · clínica de estética',
    segment: 'Franca / SP',
  },
  {
    quote: 'O diagnóstico cortou ruído: em poucos dias tínhamos escopo fechado e primeira versão no ar.',
    role: 'Sócio · serviços B2B',
    segment: 'Interior de SP',
  },
  {
    quote: 'Finalmente CRM e formulário conversando — parei de perder contato no meio do caminho.',
    role: 'Gestor · varejo local',
    segment: 'Região de Ribeirão',
  },
  {
    quote: 'Página rápida no celular e pronta para anúncio. O tráfego parou de ir para lugar nenhum.',
    role: 'Operador · restaurante',
    segment: 'Franca / SP',
  },
] as const;
