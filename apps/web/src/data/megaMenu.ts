export type MenuPageCategory =
  | "SITE"
  | "COMÉRCIO"
  | "MARKETING"
  | "FERRAMENTAS DE NEGÓCIO"
  | "PARA EMPRESAS EM EXPANSÃO"
  | "PARA FREELANCERS E AGÊNCIAS";

export type MenuPage = {
  slug: string;
  title: string;
  category: MenuPageCategory;
  description: string;
  highlights: string[];
  ctaLabel: string;
  ctaTo: string;
};

export const MENU_PAGES: MenuPage[] = [
  {
    slug: "sites-da-web",
    title: "Sites da Web",
    category: "SITE",
    description:
      "Estrutura editorial premium com carregamento rápido, SEO limpo e páginas focadas em conversão.",
    highlights: [
      "Arquitetura de páginas",
      "Tipografia e hierarquia",
      "SEO técnico e performance",
    ],
    ctaLabel: "Ver templates",
    ctaTo: "/templates",
  },
  {
    slug: "modelos-de-sites",
    title: "Modelos de sites",
    category: "SITE",
    description:
      "Templates por nicho com estética premium e componentes reusáveis, prontos para sua oferta.",
    highlights: [
      "Catálogo por nicho",
      "Seções essenciais",
      "Galeria e prova social",
    ],
    ctaLabel: "Abrir catálogo",
    ctaTo: "/templates",
  },
  {
    slug: "construtor-de-sites-com-ia",
    title: "Construtor de Sites com IA",
    category: "SITE",
    description:
      "Um fluxo guiado para gerar estrutura, copy base e proposta, mantendo design consistente.",
    highlights: [
      "Checklist de páginas",
      "Copy base por nicho",
      "Entrega incremental",
    ],
    ctaLabel: "Abrir Template Builder",
    ctaTo: "/builder",
  },
  {
    slug: "inteligencia-de-design",
    title: "Inteligência de design",
    category: "SITE",
    description:
      "Sistema visual consistente: spacing, tipografia, cores e micro-interações com acabamento editorial.",
    highlights: [
      "Tokens e consistência",
      "A11y e legibilidade",
      "Motion sutil (sem exagero)",
    ],
    ctaLabel: "Começar agora",
    ctaTo: "/templates",
  },
  {
    slug: "portfolios",
    title: "Portfólios",
    category: "SITE",
    description:
      "Galerias com ritmo editorial para mostrar seu trabalho sem ruído e com alta qualidade visual.",
    highlights: ["Grid responsivo", "Hero com vídeo", "Detalhes de caso"],
    ctaLabel: "Ver um template",
    ctaTo: "/templates/estetica-lux",
  },
  {
    slug: "blogs",
    title: "Blogs",
    category: "SITE",
    description:
      "Camada editorial para autoridade e SEO, com leitura confortável e navegação clara.",
    highlights: [
      "Estrutura de tópicos",
      "Performance e indexação",
      "Padrões de conteúdo",
    ],
    ctaLabel: "Explorar recursos",
    ctaTo: "/recursos",
  },
  {
    slug: "analises",
    title: "Análises",
    category: "SITE",
    description:
      "Eventos e métricas do funil: do clique no preço até o lead convertido e o follow-up.",
    highlights: ["Eventos do funil", "UTM e origem", "Decisões rápidas"],
    ctaLabel: "Montar hub",
    ctaTo: "/builder",
  },
  {
    slug: "todas-as-funcionalidades",
    title: "Ver todas as funcionalidades",
    category: "SITE",
    description:
      "Mapa geral do sistema: templates, hub, captura, preço com gating, webhook e automações.",
    highlights: ["Templates", "Hub (módulos)", "Lead + webhook"],
    ctaLabel: "Ir para o catálogo",
    ctaTo: "/templates",
  },

  {
    slug: "comercio-eletronico",
    title: "Comércio eletrônico",
    category: "COMÉRCIO",
    description:
      "Estrutura para vender com clareza: oferta, checkout e follow-up, com medição do funil.",
    highlights: [
      "Oferta e páginas",
      "Checkout e pagamento",
      "Automação pós-compra",
    ],
    ctaLabel: "Ver preço (gating)",
    ctaTo: "/templates/odontologia-pro?intent=price",
  },
  {
    slug: "modelos-de-comercio-eletronico",
    title: "Modelos de comércio eletrônico",
    category: "COMÉRCIO",
    description:
      "Layouts prontos para catálogo, produto e prova social, com estética premium.",
    highlights: ["Página de produto", "Coleções", "Prova social"],
    ctaLabel: "Abrir catálogo",
    ctaTo: "/templates",
  },
  {
    slug: "lojas-online",
    title: "Lojas online",
    category: "COMÉRCIO",
    description:
      "Loja enxuta para converter com menos cliques, mantendo velocidade e design editorial.",
    highlights: ["Navegação clara", "Carrinho simples", "Métricas por etapa"],
    ctaLabel: "Começar",
    ctaTo: "/builder",
  },
  {
    slug: "servicos",
    title: "Serviços",
    category: "COMÉRCIO",
    description:
      "Página de serviço com narrativa e CTA consistente: diagnóstico, proposta e follow-up.",
    highlights: [
      "Oferta e objeções",
      "Prova e autoridade",
      "CTA de alta conversão",
    ],
    ctaLabel: "Ver templates",
    ctaTo: "/templates",
  },
  {
    slug: "faturamento",
    title: "Faturamento",
    category: "COMÉRCIO",
    description:
      "Estrutura para reduzir fricção: status, cobrança e recuperação de oportunidades.",
    highlights: ["Links de pagamento", "Status e tracking", "Recuperação"],
    ctaLabel: "Montar proposta",
    ctaTo: "/builder",
  },
  {
    slug: "agendamento",
    title: "Agendamento",
    category: "COMÉRCIO",
    description:
      "Agenda que reduz no-show com confirmação, lembretes e rotas claras no funil.",
    highlights: ["Slots e regras", "Lembretes", "Integração com follow-up"],
    ctaLabel: "Ver módulos",
    ctaTo: "/builder",
  },
  {
    slug: "conteudo-e-assinaturas",
    title: "Conteúdo e Assinaturas",
    category: "COMÉRCIO",
    description:
      "Camada de recorrência com área de membros e acesso controlado por perfil.",
    highlights: ["Acesso por plano", "Entrega premium", "Retenção"],
    ctaLabel: "Montar hub",
    ctaTo: "/builder",
  },
  {
    slug: "doacoes",
    title: "Doações",
    category: "COMÉRCIO",
    description:
      "Página de doação com confiança, clareza e acompanhamento do impacto.",
    highlights: ["Confiança e prova", "Processo simples", "Mensuração"],
    ctaLabel: "Ver templates",
    ctaTo: "/templates",
  },
  {
    slug: "solucoes-financeiras",
    title: "Soluções Financeiras",
    category: "COMÉRCIO",
    description:
      "Fluxos de pagamento e conciliação com clareza operacional e visão de métricas.",
    highlights: [
      "Pagamentos",
      "Conciliar e medir",
      "Crescer com previsibilidade",
    ],
    ctaLabel: "Abrir builder",
    ctaTo: "/builder",
  },

  {
    slug: "ferramentas-de-marketing",
    title: "Ferramentas de marketing",
    category: "MARKETING",
    description:
      "Automação de aquisição: eventos, segmentação e campanhas orientadas a resultado.",
    highlights: ["Campanhas", "Segmentação", "Tracking"],
    ctaLabel: "Ver preço (gating)",
    ctaTo: "/templates/personal-prime?intent=price",
  },
  {
    slug: "campanhas-de-email",
    title: "Campanhas de e-mail",
    category: "MARKETING",
    description:
      "Sequências para nutrir, reativar e converter com copy limpa e timing certo.",
    highlights: ["Sequências", "Segmentos", "Métricas"],
    ctaLabel: "Montar fluxo",
    ctaTo: "/builder",
  },
  {
    slug: "ferramentas-de-seo",
    title: "Ferramentas de SEO",
    category: "MARKETING",
    description:
      "SEO técnico + estrutura editorial para ranquear com consistência e velocidade.",
    highlights: [
      "Schema e indexação",
      "Core Web Vitals",
      "Arquitetura de páginas",
    ],
    ctaLabel: "Ver templates",
    ctaTo: "/templates",
  },
  {
    slug: "ferramentas-gratuitas",
    title: "Ferramentas gratuitas",
    category: "MARKETING",
    description:
      "Recursos para acelerar a decisão: checklists, modelos e páginas enxutas.",
    highlights: ["Checklists", "Modelos", "Padrões de copy"],
    ctaLabel: "Abrir catálogo",
    ctaTo: "/templates",
  },

  {
    slug: "busca-de-dominio",
    title: "Busca de domínio",
    category: "FERRAMENTAS DE NEGÓCIO",
    description:
      "Escolha um domínio memorável para reforçar marca e facilitar aquisição orgânica.",
    highlights: ["Nome e clareza", "Consistência", "Facilidade de lembrar"],
    ctaLabel: "Falar com a Rei das Vendas",
    ctaTo: "/contato",
  },
  {
    slug: "transferencia-de-dominio",
    title: "Transferência de domínio",
    category: "FERRAMENTAS DE NEGÓCIO",
    description:
      "Organize ativos digitais e centralize o controle para ganhar velocidade operacional.",
    highlights: ["Governança", "Organização", "Velocidade"],
    ctaLabel: "Ver funcionalidades",
    ctaTo: "/produtos/todas-as-funcionalidades",
  },
  {
    slug: "email-comercial",
    title: "E-mail comercial",
    category: "FERRAMENTAS DE NEGÓCIO",
    description:
      "Comunique com confiança: identidade de marca e entregabilidade.",
    highlights: ["Marca", "Entregabilidade", "Processos"],
    ctaLabel: "Montar proposta",
    ctaTo: "/builder",
  },

  {
    slug: "reidasvendas-premium",
    title: "Rei das Vendas Premium",
    category: "PARA EMPRESAS EM EXPANSÃO",
    description:
      "Recursos avançados, escopo maior e suporte prioritário para operação em crescimento.",
    highlights: ["Execução avançada", "Módulos completos", "Prioridade"],
    ctaLabel: "Solicitar proposta",
    ctaTo: "/diagnostico",
  },
  {
    slug: "reidasvendas-para-profissionais",
    title: "Rei das Vendas para profissionais",
    category: "PARA FREELANCERS E AGÊNCIAS",
    description:
      "Entrega premium com operação simples: forte para profissionais e fácil para clientes.",
    highlights: ["Modelo de entrega", "Padronização", "Escalabilidade"],
    ctaLabel: "Abrir builder",
    ctaTo: "/builder",
  },
  {
    slug: "circulo",
    title: "Círculo",
    category: "PARA FREELANCERS E AGÊNCIAS",
    description:
      "Parceria e padrões para acelerar entrega, qualidade e previsibilidade.",
    highlights: ["Padrões", "Velocidade", "Qualidade"],
    ctaLabel: "Falar com a Rei das Vendas",
    ctaTo: "/contato",
  },

  {
    slug: "pagamentos",
    title: "Pagamentos",
    category: "COMÉRCIO",
    description:
      "Camada de checkout e cobrança com rastreio e automações para reduzir abandono.",
    highlights: ["Checkout enxuto", "Recuperação", "Tracking de eventos"],
    ctaLabel: "Ver templates",
    ctaTo: "/templates",
  },
  {
    slug: "premium",
    title: "Premium",
    category: "PARA EMPRESAS EM EXPANSÃO",
    description:
      "Escopo maior, priorização e infraestrutura para operações em crescimento.",
    highlights: ["Padrão premium", "Execução acelerada", "Governança"],
    ctaLabel: "Solicitar proposta",
    ctaTo: "/diagnostico",
  },
  {
    slug: "lista-de-recursos",
    title: "Lista de recursos",
    category: "SITE",
    description:
      "Visão geral do que existe no hub: páginas, módulos, captura, SEO e automações.",
    highlights: ["Mapa do sistema", "Módulos do hub", "Captura e automações"],
    ctaLabel: "Ver funcionalidades",
    ctaTo: "/produtos/todas-as-funcionalidades",
  },
  {
    slug: "gerador-de-nomes",
    title: "Gerador de nomes",
    category: "MARKETING",
    description:
      "Gere nomes claros e memoráveis para reforçar posicionamento e facilitar aquisição.",
    highlights: ["Clareza", "Memorabilidade", "Consistência"],
    ctaLabel: "Solicitar diagnóstico",
    ctaTo: "/diagnostico",
  },
  {
    slug: "criador-de-logotipos",
    title: "Criador de logotipos",
    category: "MARKETING",
    description:
      "Direção de identidade visual com hierarquia, contraste e aplicação consistente.",
    highlights: ["Símbolo + wordmark", "Aplicações", "Legibilidade"],
    ctaLabel: "Solicitar diagnóstico",
    ctaTo: "/diagnostico",
  },
  {
    slug: "atualizacoes-de-produtos",
    title: "Atualizações de produtos",
    category: "MARKETING",
    description:
      "Notas de evolução: melhorias de UX, performance, SEO e automações.",
    highlights: ["Melhorias contínuas", "Qualidade", "Performance"],
    ctaLabel: "Explorar recursos",
    ctaTo: "/recursos",
  },
  {
    slug: "precos",
    title: "Preços",
    category: "COMÉRCIO",
    description:
      "Modelo de preço por base + módulos. O total cresce com o escopo.",
    highlights: ["Preço por módulo", "Transparência", "Proposta rápida"],
    ctaLabel: "Começar",
    ctaTo: "/comecar",
  },
  {
    slug: "exemplos-de-clientes",
    title: "Exemplos de clientes",
    category: "MARKETING",
    description: "Galeria de referências e padrões de execução.",
    highlights: ["Padrões", "Inspiração", "Execução"],
    ctaLabel: "Ver templates",
    ctaTo: "/templates",
  },
  {
    slug: "colecao-reidasvendas",
    title: "Coleção Rei das Vendas",
    category: "MARKETING",
    description:
      "Coleção curada de estruturas e layouts para operações digitais.",
    highlights: ["Curadoria", "Ritmo editorial", "Consistência"],
    ctaLabel: "Abrir catálogo",
    ctaTo: "/templates",
  },
  {
    slug: "extensoes",
    title: "Extensões",
    category: "FERRAMENTAS DE NEGÓCIO",
    description:
      "Integrações e módulos que ampliam o hub: CRM, automação, analytics e conteúdo.",
    highlights: ["Integrações", "Automação", "Medição"],
    ctaLabel: "Abrir builder",
    ctaTo: "/builder",
  },
  {
    slug: "blog-do-desenvolvedor",
    title: "Blog do desenvolvedor",
    category: "MARKETING",
    description: "Notas técnicas: performance, DX e arquitetura.",
    highlights: ["Padrões", "Performance", "Arquitetura"],
    ctaLabel: "Explorar recursos",
    ctaTo: "/recursos",
  },
  {
    slug: "plataforma-de-desenvolvedor",
    title: "Plataforma de desenvolvedor",
    category: "FERRAMENTAS DE NEGÓCIO",
    description: "Referência para integrações e automações do hub.",
    highlights: ["Webhooks", "Eventos", "Integrações"],
    ctaLabel: "Ver recursos",
    ctaTo: "/recursos",
  },
  {
    slug: "status-do-sistema",
    title: "Status do sistema",
    category: "FERRAMENTAS DE NEGÓCIO",
    description: "Transparência operacional e comunicação.",
    highlights: ["Transparência", "Operação", "Confiança"],
    ctaLabel: "Falar com a Rei das Vendas",
    ctaTo: "/contato",
  },
  {
    slug: "imprensa-e-midia",
    title: "Imprensa e mídia",
    category: "MARKETING",
    description: "Materiais institucionais e recursos de marca.",
    highlights: ["Institucional", "Marca", "Assets"],
    ctaLabel: "Ver recursos",
    ctaTo: "/recursos",
  },
  {
    slug: "contate-nos",
    title: "Contate-nos",
    category: "FERRAMENTAS DE NEGÓCIO",
    description:
      "Entre em contato para diagnóstico, proposta e próximos passos.",
    highlights: ["Diagnóstico", "Proposta", "Próximos passos"],
    ctaLabel: "Contato",
    ctaTo: "/contato",
  },
  {
    slug: "mapa-do-site",
    title: "Mapa do site",
    category: "SITE",
    description: "Mapa completo de páginas, templates e recursos.",
    highlights: ["Páginas", "Templates", "Recursos"],
    ctaLabel: "Explorar templates",
    ctaTo: "/templates",
  },
  {
    slug: "medidas-de-seguranca",
    title: "Medidas de segurança",
    category: "FERRAMENTAS DE NEGÓCIO",
    description: "Boas práticas de segurança: dados, webhooks e acesso.",
    highlights: ["Práticas", "Proteção", "Governança"],
    ctaLabel: "Ver política",
    ctaTo: "/politica",
  },
  {
    slug: "preferencias-de-cookies",
    title: "Preferências de cookies",
    category: "SITE",
    description: "Preferências e consentimento de cookies.",
    highlights: ["Consentimento", "LGPD", "Controle"],
    ctaLabel: "Ver política",
    ctaTo: "/politica",
  },
] as const;

export function findMenuPage(slug: string | undefined): MenuPage | null {
  if (!slug) return null;
  const page = MENU_PAGES.find((p) => p.slug === slug);
  return page ?? null;
}

export const MEGA_MENU = {
  site: {
    title: "SITE",
    slugs: [
      "sites-da-web",
      "modelos-de-sites",
      "construtor-de-sites-com-ia",
      "inteligencia-de-design",
      "portfolios",
      "blogs",
      "analises",
      "todas-as-funcionalidades",
      "lista-de-recursos",
      "mapa-do-site",
      "preferencias-de-cookies",
    ],
  },
  comercio: {
    title: "COMÉRCIO",
    slugs: [
      "comercio-eletronico",
      "modelos-de-comercio-eletronico",
      "lojas-online",
      "servicos",
      "faturamento",
      "agendamento",
      "conteudo-e-assinaturas",
      "doacoes",
      "solucoes-financeiras",
      "pagamentos",
      "precos",
    ],
  },
  marketing: {
    title: "MARKETING",
    slugs: [
      "ferramentas-de-marketing",
      "campanhas-de-email",
      "ferramentas-de-seo",
      "ferramentas-gratuitas",
      "atualizacoes-de-produtos",
      "exemplos-de-clientes",
      "colecao-reidasvendas",
      "blog-do-desenvolvedor",
      "imprensa-e-midia",
    ],
  },
  business: {
    title: "FERRAMENTAS DE NEGÓCIO",
    slugs: [
      "busca-de-dominio",
      "transferencia-de-dominio",
      "email-comercial",
      "extensoes",
      "plataforma-de-desenvolvedor",
      "status-do-sistema",
      "medidas-de-seguranca",
    ],
  },
  cards: {
    growthTitle: "PARA EMPRESAS EM EXPANSÃO",
    growthSlugs: ["reidasvendas-premium", "premium"],
    proTitle: "PARA FREELANCERS E AGÊNCIAS",
    proSlugs: ["reidasvendas-para-profissionais", "circulo"],
  },
} as const;

export type SolutionCategory = {
  slug: string;
  label: string;
  title: string;
  description: string;
  chips: string[];
  imageUrl: string;
};

export const SOLUTION_CATEGORIES: SolutionCategory[] = [
  {
    slug: "hub-clinico",
    label: "Hub Clínico Autônomo",
    title: "Hub Clínico Autônomo",
    description:
      "Triagem via IA, agendamento inteligente e funil de recuperação de pacientes. Ideal para médicos e dentistas.",
    chips: ["SaúdeGPT", "Agendamento IA", "WhatsApp Bot", "SEO Local"],
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-175737edbf78?auto=format&fit=crop&w=1600&h=2000&q=80",
  },
  {
    slug: "advocacia-soberana",
    label: "Advocacia Soberana",
    title: "Advocacia Soberana",
    description:
      "Autoridade instantânea. Captação de leads qualificados e qualificação via n8n para escritórios de advocacia.",
    chips: ["Filtro de Leads", "Google Ads Ready", "CRM", "Autoridade"],
    imageUrl:
      "https://images.unsplash.com/photo-1521791139204-a94e286c4c2e?auto=format&fit=crop&w=1600&h=2000&q=80",
  },
  {
    slug: "vitrine-imobiliaria",
    label: "Vitrine Imobiliária 3D",
    title: "Vitrine Imobiliária 3D",
    description:
      "Experiência imersiva, sites falantes e tour virtual para imóveis de alto padrão e arquitetura.",
    chips: ["Sites Falantes", "Tour 3D", "Avatares IA", "Premium"],
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&h=2000&q=80",
  },
  {
    slug: "maquina-de-varejo",
    label: "Máquina de Varejo",
    title: "Máquina de Varejo",
    description:
      "Integração Google Meu Negócio, tráfego pago e recuperação de carrinho via WhatsApp para e-commerce e farmácias.",
    chips: [
      "Farmacêutico.shop",
      "Google Shopping",
      "Recuperação WhatsApp",
      "Upsell",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1600&h=2000&q=80",
  },
  {
    slug: "automacao-whatsapp",
    label: "Automação de WhatsApp",
    title: "Automação de WhatsApp",
    description:
      "SaaS de infraestrutura de WhatsApp API. O motor de comunicação de baixo custo que sustenta a escala das PMEs.",
    chips: ["OpenZap", "n8n", "Chatbots", "Atendimento"],
    imageUrl:
      "https://images.unsplash.com/photo-1515165562835-c3b8b5b7f5df?auto=format&fit=crop&w=1600&h=2000&q=80",
  },
  {
    slug: "consultoria-performance",
    label: "Consultoria de Alta Performance",
    title: "Consultoria de Alta Performance",
    description:
      "Venda de consultoria High-Ticket, infraestrutura completa e implementação de agentes de IA por Thiago Piola.",
    chips: ["Thiago Piola", "High-Ticket", "Engenharia de Dados", "PNL"],
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&h=2000&q=80",
  },
];

export type ResourceItem = {
  slug: string;
  title: string;
  description: string;
};

export const RESOURCE_ITEMS: ResourceItem[] = [
  {
    slug: "central-de-ajuda",
    title: "Central de Ajuda",
    description:
      "Guias e vídeos detalhados sobre a plataforma, templates e como começar a usar.",
  },
  {
    slug: "blog",
    title: "Blog",
    description:
      "Histórias e soluções para o empreendedor moderno: estrutura, oferta e execução.",
  },
  {
    slug: "forum",
    title: "Fórum",
    description:
      "Uma comunidade para discutir boas práticas, padrões e evolução dos hubs.",
  },
  {
    slug: "contrate-um-especialista",
    title: "Contrate um especialista",
    description:
      "Conectamos você ao especialista certo para elevar design, copy e conversão.",
  },
  {
    slug: "webinarios",
    title: "Webinários",
    description:
      "Sessões online onde você aprende o básico e aprimora com exemplos reais.",
  },
];

export const RESOURCES_INSPIRE = {
  title: "Feito com Rei das Vendas",
  description:
    "Uma coleção de templates e hubs inspiradores criados para operações reais.",
  mediaUrl:
    "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=2400&h=1350&q=80",
  to: "/templates",
} as const;

export type FooterGroup = {
  title: string;
  slugs: string[];
};

export const FOOTER_GROUPS: FooterGroup[] = [
  {
    title: "Produtos",
    slugs: [
      "sites-da-web",
      "inteligencia-de-design",
      "comercio-eletronico",
      "servicos",
      "agendamento",
      "conteudo-e-assinaturas",
      "pagamentos",
      "ferramentas-de-marketing",
      "campanhas-de-email",
      "email-comercial",
      "premium",
      "lista-de-recursos",
      "atualizacoes-de-produtos",
      "precos",
    ],
  },
  {
    title: "Soluções",
    slugs: [
      "hub-clinico",
      "advocacia-soberana",
      "vitrine-imobiliaria",
      "maquina-de-varejo",
      "automacao-whatsapp",
      "consultoria-performance",
    ],
  },
  {
    title: "Recursos",
    slugs: [
      "exemplos-de-clientes",
      "colecao-reidasvendas",
      "extensoes",
      "blog-do-desenvolvedor",
      "ferramentas-gratuitas",
      "gerador-de-nomes",
      "criador-de-logotipos",
    ],
  },
  {
    title: "Apoiar",
    slugs: [
      "central-de-ajuda",
      "forum",
      "webinarios",
      "contrate-um-especialista",
      "plataforma-de-desenvolvedor",
      "status-do-sistema",
    ],
  },
  {
    title: "Empresa",
    slugs: ["imprensa-e-midia", "contate-nos", "mapa-do-site"],
  },
];

const COMPANY_SLUGS = new Set(
  FOOTER_GROUPS.find((g) => g.title === "Empresa")?.slugs ?? [],
);
const SUPPORT_SLUGS = new Set(
  FOOTER_GROUPS.find((g) => g.title === "Apoiar")?.slugs ?? [],
);
const RESOURCE_SLUGS = new Set([
  ...(FOOTER_GROUPS.find((g) => g.title === "Recursos")?.slugs ?? []),
  ...Array.from(SUPPORT_SLUGS),
]);

export function routeForSlug(slug: string): string | null {
  const solution = SOLUTION_CATEGORIES.find((c) => c.slug === slug);
  if (solution) return `/solucoes/${solution.slug}`;

  const resource = RESOURCE_ITEMS.find((r) => r.slug === slug);
  if (resource) return `/recursos/${resource.slug}`;

  const page = findMenuPage(slug);
  if (page) {
    if (COMPANY_SLUGS.has(slug)) return `/empresa/${slug}`;
    if (RESOURCE_SLUGS.has(slug) || SUPPORT_SLUGS.has(slug))
      return `/recursos/${slug}`;
    return `/produtos/${slug}`;
  }

  return null;
}
