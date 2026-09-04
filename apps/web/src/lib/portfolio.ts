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
    name: 'Sentinela Saúde Ambiental',
    type: 'Serviço local · Franca/SP',
    description: 'Serviços, áreas atendidas, critérios de diagnóstico e orçamento reunidos em uma jornada própria.',
    image: '/imagens/portfolio/sentinela.webp',
    scope: ['Arquitetura local', 'Páginas de serviço', 'Contato contextual', 'Domínio próprio'],
    href: 'https://sentinelasaudeambiental.com.br',
  },
  {
    name: 'TKA Esportes',
    type: 'Comércio · e-commerce',
    description: 'Uma operação comercial com catálogo por categoria, história de marca e jornada de compra móvel.',
    image: '/imagens/portfolio/tka.webp',
    scope: ['E-commerce', 'Catálogo', 'Marca e conteúdo', 'Experiência mobile'],
    href: 'https://tkaesportes.com.br',
  },
];

export const OTHER_WORK: [string, string, string, string, string][] = [
  ['Thiago Piola', 'Presença autoral', 'Trajetória, projetos e serviços organizados em uma narrativa própria.', 'https://thiagopiola.com.br', '/imagens/portfolio/thiagopiola.webp'],
  ['SaúdeGPT', 'Produto conversacional', 'Produto web guiado, com histórico e limites institucionais explícitos.', 'https://saudegpt.com', '/imagens/portfolio/saudegpt.webp'],
];
