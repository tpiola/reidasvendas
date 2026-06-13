import { catalogCover, catalogThumb, catalogGallery, catalogGallery2 } from '@/lib/catalog-images';

export type TemplateDefinition = {
  slug: string;
  name: string;
  niche: string;
  tagline: string;
  coverImageUrl: string;
  thumbImageUrl: string;
  galleryImageUrls: string[];
  basePriceCents: number;
  includedModuleIds: string[];
  featured?: boolean;
};

const P = {
  estetica: 'estetica',
  estetica2: 'estetica',
  odonto: 'odonto',
  odonto2: 'odonto',
  fitness: 'fitness',
  fitness2: 'fitness',
  restaurante: 'restaurante',
  restaurante2: 'restaurante',
  varejo: 'varejo',
  varejo2: 'varejo',
  imob: 'imob',
  imob2: 'imob',
  advocacia: 'advocacia',
  advocacia2: 'advocacia',
  educacao: 'educacao',
  educacao2: 'educacao',
} as const;

export const TEMPLATES: TemplateDefinition[] = [
  {
    slug: 'estetica-lux',
    name: 'Estética Lux',
    niche: 'Clínica de estética',
    tagline: 'Editorial minimal com conversão em dois cliques.',
    coverImageUrl: catalogCover(P.estetica),
    thumbImageUrl: catalogThumb(P.estetica),
    galleryImageUrls: [catalogGallery(P.estetica), catalogGallery2(P.estetica)],
    basePriceCents: 490_000,
    includedModuleIds: ['crm-inbox', 'analytics'],
    featured: true,
  },
  {
    slug: 'odontologia-pro',
    name: 'Odonto Pro',
    niche: 'Clínica odontológica',
    tagline: 'Prova social, confiança e agenda cheia.',
    coverImageUrl: catalogCover(P.odonto),
    thumbImageUrl: catalogThumb(P.odonto),
    galleryImageUrls: [catalogGallery(P.odonto), catalogGallery2(P.odonto)],
    basePriceCents: 490_000,
    includedModuleIds: ['crm-inbox', 'seo'],
    featured: true,
  },
  {
    slug: 'personal-prime',
    name: 'Personal Prime',
    niche: 'Personal trainer',
    tagline: 'Oferta clara e follow-up automático.',
    coverImageUrl: catalogCover(P.fitness),
    thumbImageUrl: catalogThumb(P.fitness),
    galleryImageUrls: [catalogGallery(P.fitness), catalogGallery2(P.fitness)],
    basePriceCents: 390_000,
    includedModuleIds: ['analytics'],
    featured: true,
  },
  {
    slug: 'restaurante-chef',
    name: 'Restaurante Chef',
    niche: 'Restaurante & bar',
    tagline: 'Cardápio, reserva e WhatsApp na mesma experiência.',
    coverImageUrl: catalogCover(P.restaurante),
    thumbImageUrl: catalogThumb(P.restaurante),
    galleryImageUrls: [catalogGallery(P.restaurante), catalogGallery2(P.restaurante)],
    basePriceCents: 450_000,
    includedModuleIds: ['crm-inbox'],
    featured: true,
  },
  {
    slug: 'varejo-prime',
    name: 'Varejo Prime',
    niche: 'Loja & e-commerce local',
    tagline: 'Vitrine que vende e recupera carrinho.',
    coverImageUrl: catalogCover(P.varejo),
    thumbImageUrl: catalogThumb(P.varejo),
    galleryImageUrls: [catalogGallery(P.varejo), catalogGallery2(P.varejo)],
    basePriceCents: 520_000,
    includedModuleIds: ['analytics', 'seo'],
    featured: true,
  },
  {
    slug: 'imobiliaria-gold',
    name: 'Imobiliária Gold',
    niche: 'Imobiliário',
    tagline: 'Imóveis de alto padrão com tour e captura qualificada.',
    coverImageUrl: catalogCover(P.imob),
    thumbImageUrl: catalogThumb(P.imob),
    galleryImageUrls: [catalogGallery(P.imob), catalogGallery2(P.imob)],
    basePriceCents: 590_000,
    includedModuleIds: ['crm-inbox', 'seo'],
    featured: true,
  },
  {
    slug: 'advocacia-soberana',
    name: 'Advocacia Soberana',
    niche: 'Advocacia',
    tagline: 'Autoridade e leads filtrados por área de atuação.',
    coverImageUrl: catalogCover(P.advocacia),
    thumbImageUrl: catalogThumb(P.advocacia),
    galleryImageUrls: [catalogGallery(P.advocacia), catalogGallery2(P.advocacia)],
    basePriceCents: 550_000,
    includedModuleIds: ['crm-inbox'],
    featured: false,
  },
  {
    slug: 'educacao-master',
    name: 'Educação Master',
    niche: 'Cursos & escolas',
    tagline: 'Matrícula, prova social e funil de recuperação.',
    coverImageUrl: catalogCover(P.educacao),
    thumbImageUrl: catalogThumb(P.educacao),
    galleryImageUrls: [catalogGallery(P.educacao), catalogGallery2(P.educacao)],
    basePriceCents: 480_000,
    includedModuleIds: ['analytics'],
    featured: false,
  },
  {
    slug: 'servicos-b2b',
    name: 'Serviços B2B',
    niche: 'Serviços & consultoria',
    tagline: 'Proposta clara para decisor ocupado.',
    coverImageUrl: catalogCover('servicos'),
    thumbImageUrl: catalogThumb('servicos'),
    galleryImageUrls: [catalogGallery('servicos'), catalogGallery2('servicos')],
    basePriceCents: 470_000,
    includedModuleIds: ['seo', 'analytics'],
    featured: false,
  },
];

/** Amostras na Home — 4 profissões; catálogo completo em /templates */
export const HOME_FEATURED_TEMPLATE_SLUGS = [
  'estetica-lux',
  'odontologia-pro',
  'varejo-prime',
  'restaurante-chef',
] as const;

export function findTemplate(slug: string | undefined): TemplateDefinition | null {
  if (!slug) return null;
  return TEMPLATES.find((x) => x.slug === slug) ?? null;
}

export function getFeaturedTemplates(): TemplateDefinition[] {
  return HOME_FEATURED_TEMPLATE_SLUGS.map((slug) => findTemplate(slug)).filter(
    (t): t is TemplateDefinition => t !== null,
  );
}
