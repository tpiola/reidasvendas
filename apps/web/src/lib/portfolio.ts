export type PortfolioProject = {
  name: string;
  type: string;
  description: string;
  image: string;
  scope: string[];
  href?: string;
};

export const PROJECTS: PortfolioProject[] = [
  {
    name: "Sentinela Saúde Ambiental",
    type: "Serviço local · Franca/SP",
    description:
      "Serviços, áreas atendidas, critérios de diagnóstico e orçamento reunidos em uma jornada própria.",
    image: "/imagens/portfolio/sentinela.webp",
    scope: [
      "Arquitetura local",
      "Páginas de serviço",
      "Contato contextual",
      "Domínio próprio",
    ],
    href: "https://sentinelasaudeambiental.com.br",
  },
  {
    name: "TKA Esportes",
    type: "Comércio · e-commerce",
    description:
      "Uma operação comercial com catálogo por categoria, história de marca e jornada de compra móvel.",
    image: "/imagens/portfolio/tka.webp",
    scope: ["E-commerce", "Catálogo", "Marca e conteúdo", "Experiência mobile"],
    href: "https://tkaesportes.com.br",
  },
];

export const OTHER_WORK: [string, string, string, string, string][] = [
  [
    "Thiago Piola",
    "Presença autoral",
    "Trajetória, projetos e serviços organizados em uma narrativa própria.",
    "https://thiagopiola.com.br",
    "/imagens/portfolio/thiagopiola.webp",
  ],
  [
    "SaúdeGPT",
    "Plataforma de aprendizagem",
    "Formação online com currículo organizado, conteúdo pedagógico e experiência guiada.",
    "https://saudegpt.com",
    "/imagens/portfolio/saudegpt.webp",
  ],
];

/** Evidências públicas conferidas no GitHub em 22/10/2026. */
export const PROJECT_EVIDENCE = [
  {
    name: "Sentinela Saúde Ambiental",
    repo: "https://github.com/tpiola/sentinela-saude-ambiental",
    detail:
      "Presença local com páginas de serviços, regiões atendidas e caminhos para agendamento.",
    proof:
      "site/src/app/servicos/page.tsx e site/src/app/locais/[slug]/page.tsx",
  },
  {
    name: "SaúdeGPT",
    repo: "https://github.com/tpiola/saudegpt",
    detail:
      "Plataforma de aprendizagem com currículo e conteúdo organizados para formação profissional.",
    proof: "README.md e src/content",
  },
  {
    name: "Thiago Piola",
    repo: "https://github.com/tpiola/thiagopiola",
    detail:
      "Presença autoral com conteúdo, contatos e integrações documentadas para continuidade.",
    proof: "README.md",
  },
  {
    name: "SPES",
    repo: "https://github.com/tpiola/spes",
    detail:
      "Portal editorial com navegação móvel, conteúdo próprio e entrada contextual para a comunidade.",
    proof: "README.md",
  },
];
