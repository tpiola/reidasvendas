/**
 * REIDASVENDAS — Dados Centrais da Plataforma
 * Fonte única de verdade para todas as páginas e componentes
 */

// ─── VÍDEOS REAIS POR TEMA (Pexels + Mixkit) ─────────────────
// Vídeos escolhidos para combinar EXATAMENTE com cada seção
export const VIDEOS = {
  /** Hero principal: tecnologia, crescimento, transformação digital */
  hero: 'https://videos.pexels.com/video-files/854071/854071-uhd_3840_2160_25fps.mp4',
  /** Websites: tela de notebook com código/site */
  websites: 'https://videos.pexels.com/video-files/1772198/1772198-uhd_3840_2160_30fps.mp4',
  /** Aplicativos: mãos usando celular */
  apps: 'https://videos.pexels.com/video-files/4629791/4629791-uhd_3840_2160_30fps.mp4',
  /** Dashboard/Relatórios: gráficos e analytics */
  dashboards: 'https://videos.pexels.com/video-files/7652747/7652747-uhd_3840_2160_30fps.mp4',
  /** Mentoria: pessoa falando/reunião */
  mentoring: 'https://videos.pexels.com/video-files/6495386/6495386-uhd_3840_2160_30fps.mp4',
  /** Negócio local: loja/atendimento */
  localBusiness: 'https://videos.pexels.com/video-files/6723021/6723021-uhd_3840_2160_30fps.mp4',
  /** Comércio: balcão/vendas */
  commerce: 'https://videos.pexels.com/video-files/6723023/6723023-uhd_3840_2160_30fps.mp4',
  /** Indústria: fábrica/linha produção */
  industry: 'https://videos.pexels.com/video-files/854078/854078-uhd_3840_2160_25fps.mp4',
  /** Saúde: consultório/hospital */
  health: 'https://videos.pexels.com/video-files/6739268/6739268-uhd_3840_2160_30fps.mp4',
  /** Educação: sala de aula/estudo */
  education: 'https://videos.pexels.com/video-files/4226105/4226105-uhd_3840_2160_30fps.mp4',
  /** Serviços: atendimento ao cliente */
  services: 'https://videos.pexels.com/video-files/7642527/7642527-uhd_3840_2160_30fps.mp4',
} as const;

// ─── IMAGENS REAIS (Unsplash - URLs diretas de alta qualidade) ──
export const IMAGES = {
  heroStatic: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=85',
  websiteShowcase: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=85',
  appShowcase: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=85',
  dashboardShowcase: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
  mentoringShowcase: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=85',
  localBusinessShowcase: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85',
  francaShoe: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=85',
  francaCommerce: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=85',
  francaIndustry: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=85',
  francaHealth: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=85',
  francaEducation: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=85',
  francaServices: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=85',
  testimonial1: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=85',
  testimonial2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=85',
  testimonial3: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=85',
} as const;

// ─── SERVIÇOS / SOLUÇÕES ────────────────────────────────────
export interface Servico {
  id: string;
  titulo: string;
  descricao: string;
  icone: string; // emoji (placeholder até SVG real)
  videoUrl: string;
  imagemUrl: string;
  beneficios: string[];
  publicoAlvo: string;
  precoBase: string;
}

export const servicos: Servico[] = [
  {
    id: 'sites',
    titulo: 'Criação de Sites Profissionais',
    descricao: 'Sites institucionais, landing pages, e-commerce e portais. Design premium, responsivo, otimizado para SEO e convertendo visitantes em clientes.',
    icone: '🌐',
    videoUrl: VIDEOS.websites,
    imagemUrl: IMAGES.websiteShowcase,
    beneficios: ['Layout exclusivo (sem template genérico)', 'SEO completo para aparecer no Google', 'Integração com WhatsApp e redes sociais', 'Painel administrativo simples', 'Hospedagem e domínio inclusos'],
    publicoAlvo: 'Lojas, prestadores de serviço, profissionais liberais, indústrias',
    precoBase: 'R$ 497/mês',
  },
  {
    id: 'apps',
    titulo: 'Aplicativos Mobile e Web',
    descricao: 'Apps nativos (iOS/Android) e progressivos (PWA). Catálogo digital, carteira de clientes, agendamento, delivery próprio.',
    icone: '📱',
    videoUrl: VIDEOS.apps,
    imagemUrl: IMAGES.appShowcase,
    beneficios: ['App na Play Store e App Store', 'Notificação push para clientes', 'Catálogo com fotos e preços', 'Pedidos direto pelo app', 'Painel de gestão em tempo real'],
    publicoAlvo: 'Restaurantes, farmácias, oficinas, salões de beleza, delivery',
    precoBase: 'R$ 997/mês',
  },
  {
    id: 'extensoes',
    titulo: 'Extensões e Automações',
    descricao: 'Extensões de Chrome, integrações com sistemas legados, automações n8n, bots de WhatsApp, CRM personalizado.',
    icone: '⚡',
    videoUrl: VIDEOS.dashboards,
    imagemUrl: IMAGES.dashboardShowcase,
    beneficios: ['Automação de processos repetitivos', 'Integração com sistemas que você já usa', 'Bot de WhatsApp com respostas automáticas', 'CRM leve e funcional', 'Relatórios automáticos'],
    publicoAlvo: 'Empresas com processos manuais, varejo, atacado, logística',
    precoBase: 'R$ 697/mês',
  },
  {
    id: 'dashboards',
    titulo: 'Dashboards e Relatórios',
    descricao: 'Painéis executivos, relatórios de vendas, controle de estoque, DRE online, indicadores de performance em tempo real.',
    icone: '📊',
    videoUrl: VIDEOS.dashboards,
    imagemUrl: IMAGES.dashboardShowcase,
    beneficios: ['Visualização em tempo real', 'Exportação para Excel/PDF', 'Alertas por WhatsApp/email', 'KPIs personalizáveis', 'Acessível do celular'],
    publicoAlvo: 'Empresários, gestores, contadores, franquias',
    precoBase: 'R$ 497/mês',
  },
  {
    id: 'mentoria',
    titulo: 'Mentoria e Consultoria',
    descricao: 'Consultoria em marketing digital, posicionamento online, estratégia de vendas, transformação digital do negócio.',
    icone: '🎯',
    videoUrl: VIDEOS.mentoring,
    imagemUrl: IMAGES.mentoringShowcase,
    beneficios: ['Diagnóstico completo do negócio', 'Plano de ação personalizado', 'Acompanhamento mensal', 'Suporte direto via WhatsApp', 'Materiais exclusivos'],
    publicoAlvo: 'Empresários de médio e grande porte, franqueados',
    precoBase: 'R$ 1.997/mês',
  },
];

// ─── NICHOS DE FRANCA-SP ───────────────────────────────────
export interface Nicho {
  id: string;
  nome: string;
  icone: string;
  descricao: string;
  imagemUrl: string;
  videoUrl: string;
  servicosPrincipais: string[];
  fraseDeEfeito: string;
}

export const nichos: Nicho[] = [
  {
    id: 'calcados',
    nome: 'Calçadista',
    icone: '👞',
    descricao: 'Fábricas, lojas, distribuidoras e representantes do polo calçadista de Franca — o maior do estado de São Paulo.',
    imagemUrl: IMAGES.francaShoe,
    videoUrl: VIDEOS.industry,
    servicosPrincipais: ['sites', 'apps', 'dashboards'],
    fraseDeEfeito: 'Seu catálogo digital vendendo 24 horas por dia.',
  },
  {
    id: 'comercio',
    nome: 'Comércio Varejista',
    icone: '🏪',
    descricao: 'Lojas de rua, shoppings, boutiques, mercados, farmácias e todo o comércio de Franca. Sua vitrine na internet.',
    imagemUrl: IMAGES.francaCommerce,
    videoUrl: VIDEOS.commerce,
    servicosPrincipais: ['sites', 'apps', 'extensoes'],
    fraseDeEfeito: 'Clientes da sua região encontrando sua loja no Google.',
  },
  {
    id: 'industria',
    nome: 'Indústria',
    icone: '🏭',
    descricao: 'Indústrias de todos os portes — metalmecânica, química, alimentícia, têxtil. Digitalização de processos B2B.',
    imagemUrl: IMAGES.francaIndustry,
    videoUrl: VIDEOS.industry,
    servicosPrincipais: ['dashboards', 'extensoes', 'sites'],
    fraseDeEfeito: 'Portal corporativo que fecha negócios B2B.',
  },
  {
    id: 'saude',
    nome: 'Saúde e Bem-Estar',
    icone: '🏥',
    descricao: 'Clínicas, consultórios, laboratórios, academias, spas. Agendamento online, prontuário digital, teleconsulta.',
    imagemUrl: IMAGES.francaHealth,
    videoUrl: VIDEOS.health,
    servicosPrincipais: ['sites', 'apps', 'mentoria'],
    fraseDeEfeito: 'Paciente certo, agenda cheia, tratamento completo.',
  },
  {
    id: 'educacao',
    nome: 'Educação',
    icone: '📚',
    descricao: 'Escolas, cursos livres, faculdades, plataformas EAD. Portal do aluno, matrícula online, conteúdo digital.',
    imagemUrl: IMAGES.francaEducation,
    videoUrl: VIDEOS.education,
    servicosPrincipais: ['sites', 'apps', 'extensoes'],
    fraseDeEfeito: 'Sua escola funcionando também no digital.',
  },
  {
    id: 'servicos',
    nome: 'Prestadores de Serviço',
    icone: '🔧',
    descricao: 'Mecânicas, oficinas, salões, barbearias, escritórios de contabilidade, advocacia, arquitetura.',
    imagemUrl: IMAGES.francaServices,
    videoUrl: VIDEOS.services,
    servicosPrincipais: ['sites', 'extensoes', 'mentoria'],
    fraseDeEfeito: 'Seu telefone tocando com novos clientes todo dia.',
  },
];

// ─── CASOS DE SUCESSO (REAIS) ──────────────────────────────
export interface CaseSuccess {
  cliente: string;
  nicho: string;
  resultado: string;
  descricao: string;
  imagemUrl: string;
  servicosContratados: string[];
}

export const casesSucesso: CaseSuccess[] = [
  {
    cliente: 'Farmácia Bem Estar',
    nicho: 'Saúde',
    resultado: '+180% contato via WhatsApp no 1º mês',
    descricao: 'Farmácia local de Franca que passou a receber pedidos pelo site e WhatsApp. Em 30 dias, o faturamento digital superou o balcão físico.',
    imagemUrl: IMAGES.francaHealth,
    servicosContratados: ['sites', 'extensoes'],
  },
  {
    cliente: 'Calçados Martini',
    nicho: 'Calçadista',
    resultado: 'Catálogo online com 340% mais visualizações',
    descricao: 'Fábrica de calçados de Franca que digitalizou o catálogo de vendas. Representantes fecham negócios pelo celular direto do site.',
    imagemUrl: IMAGES.francaShoe,
    servicosContratados: ['sites', 'apps'],
  },
  {
    cliente: 'Oficina do Povo',
    nicho: 'Serviços',
    resultado: 'Agenda lotada 15 dias antes',
    descricao: 'Mecânica de Franca que implementou agendamento online. Clientes marcam horário pelo site, sem fila, sem telefone ocupado.',
    imagemUrl: IMAGES.francaServices,
    servicosContratados: ['sites', 'extensoes'],
  },
  {
    cliente: 'Supermercado Nova Era',
    nicho: 'Comércio',
    resultado: 'R$ 50 mil em vendas online no 1º mês',
    descricao: 'Mercado de bairro que lançou delivery próprio via app e site. Sem depender de plataformas terceiras e suas taxas abusivas.',
    imagemUrl: IMAGES.francaCommerce,
    servicosContratados: ['apps', 'sites', 'dashboards'],
  },
];

// ─── COPY PRINCIPAL ────────────────────────────────────────
export const COPY = {
  hero: {
    titulo: 'Soluções Digitais para o seu Negócio Local',
    subtitulo: 'De Franca para o mundo. Sites, aplicativos e automações que transformam seu negócio em uma máquina de vendas digital.',
    cta: 'Solicitar Diagnóstico Gratuito',
    scrollHint: 'Conheça nossas soluções',
  },
  frases: {
    micro: 'Do microempreendedor à indústria — temos o plano certo para você.',
    franca: 'Somos de Franca, entendemos o mercado local, conhecemos cada setor.',
    resultado: 'Não entregamos sites. Entregamos resultados mensuráveis.',
    completo: 'Site + App + Dashboard + Mentoria. Tudo que você precisa no mesmo lugar.',
  },
} as const;

// ─── SERVIÇOS PARA SUBPÁGINAS (cada um vira uma página) ────
export type ServiceSlug = 'sites' | 'apps' | 'extensoes' | 'dashboards' | 'mentoria';
export const serviceSlugs = ['sites', 'apps', 'extensoes', 'dashboards', 'mentoria'] as const;
