import { BRAND } from '@/lib/brand';
import { PEXELS } from '@/lib/media';

export type ProjectDefinition = {
  slug: string;
  niche: string;
  title: string;
  tagline: string;
  story: string;
  imageUrl: string;
  videoSrc: string;
  videoCaption: string;
  features: string[];
  testimonial: { quote: string; role: string };
  ctaLabel: string;
};

export const PROJECTS: ProjectDefinition[] = [
  {
    slug: 'clube-digital',
    niche: 'Saúde & Estética',
    title: 'Clube Digital',
    tagline: 'Agenda, WhatsApp e funil para clínica que não pode perder lead no silêncio.',
    story:
      'Paciente entra pelo site, recebe resposta no timing certo e cai no CRM com origem rastreada — você atende, o sistema sustenta a fila.',
    imageUrl: '/imagens/project-clube-digital.webp',
    videoSrc: PEXELS.profDoctor,
    videoCaption: 'Clínica · captação e follow-up',
    features: ['Landing por procedimento', 'WhatsApp integrado', 'SEO local'],
    testimonial: {
      quote: 'A agenda passou a encher com lead que já chega qualificado — sem depender só de indicação.',
      role: 'Gestora · clínica de estética',
    },
    ctaLabel: 'Quero dominar meu mercado',
  },
  {
    slug: 'advocacia-soberana',
    niche: 'Direito & Advocacia',
    title: 'Advocacia Soberana',
    tagline: 'Autoridade digital e filtro de lead antes da primeira consulta.',
    story:
      'Site que transmite confiança, formulário com consentimento LGPD e automação que separa curioso de cliente com perfil.',
    imageUrl: '/imagens/project-advocacia-soberana.webp',
    videoSrc: PEXELS.profService,
    videoCaption: 'Advocacia · prova e captação',
    features: ['Copy para decisor', 'Filtro de leads', 'CRM + n8n'],
    testimonial: {
      quote: 'Parou de perder tempo com contato fora do perfil — o funil faz a triagem inicial.',
      role: 'Sócio · escritório de advocacia',
    },
    ctaLabel: 'Garantir minha vaga',
  },
  {
    slug: 'vitrine-imobiliaria-3d',
    niche: 'Imóveis & Arquitetura',
    title: 'Vitrine Imobiliária 3D',
    tagline: 'Experiência premium para imóvel de alto padrão — do clique à visita.',
    story:
      'Galeria rápida, tour e CTA para corretor no WhatsApp — presença à altura do ticket do empreendimento.',
    imageUrl: '/imagens/project-vitrine-imobiliaria.webp',
    videoSrc: PEXELS.heroLifestyle,
    videoCaption: 'Imobiliário · vitrine digital',
    features: ['Galeria otimizada', 'Captação qualificada', 'Integração CRM'],
    testimonial: {
      quote: 'O visitante entende o imóvel antes da ligação — conversa mais curta e mais fechamento.',
      role: 'Corretor · alto padrão',
    },
    ctaLabel: 'Quero minha máquina de vendas',
  },
  {
    slug: 'maquina-de-varejo',
    niche: 'Varejo & E-commerce',
    title: 'Máquina de Varejo',
    tagline: 'Tráfego, vitrine e recuperação de carrinho no mesmo fluxo.',
    story:
      'Anúncio leva para página que converte, WhatsApp recupera abandono e você vê de onde veio cada venda.',
    imageUrl: '/imagens/project-maquina-varejo.webp',
    videoSrc: PEXELS.profRetail,
    videoCaption: 'Varejo · funil e métricas',
    features: ['Google/Meta ready', 'Recuperação WhatsApp', 'Relatório de conversão'],
    testimonial: {
      quote: 'Deixamos de mandar tráfego para página genérica — o ROI do anúncio ficou visível.',
      role: 'Dono · loja física + online',
    },
    ctaLabel: 'Falar com especialista',
  },
];

/** Slugs antigos → canônicos (SEO) */
export const PROJECT_LEGACY_REDIRECTS: Record<string, string> = {
  'hub-clinico': 'clube-digital',
  'imobiliario-premium': 'vitrine-imobiliaria-3d',
  'e-commerce-elite': 'maquina-de-varejo',
};

export function findProject(slug: string | undefined): ProjectDefinition | null {
  if (!slug) return null;
  const canonical = PROJECT_LEGACY_REDIRECTS[slug] ?? slug;
  return PROJECTS.find((p) => p.slug === canonical) ?? null;
}

export function getProjectCanonicalSlug(slug: string): string {
  return PROJECT_LEGACY_REDIRECTS[slug] ?? slug;
}

export const PLAN_DEMO_VIDEOS: Record<string, string> = {
  essencial: PEXELS.profCharts,
  crescimento: BRAND.inlineVideos.performance,
  escala: BRAND.inlineVideos.salesFunnel,
  'sob-medida': BRAND.inlineVideos.manifesto,
};
