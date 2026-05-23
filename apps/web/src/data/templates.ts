import { catalogCover, catalogThumb } from '@/lib/catalog-images';

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
  estetica: 'photo-1522337360788-8b13dee7a37e',
  estetica2: 'photo-1556228578-0d85b1a4d571',
  odonto: 'photo-1606811841689-23dfddce3e95',
  odonto2: 'photo-1629909613654-28e377c37b09',
  fitness: 'photo-1517836357463-d25dfeac3438',
  fitness2: 'photo-1554284126-aa88f22d8b74',
  restaurante: 'photo-1517248135467-4c7edcad34c4',
  restaurante2: 'photo-1555396273-367ea4eb4db5',
  varejo: 'photo-1441986300917-64674bd600d8',
  varejo2: 'photo-1555529669-2269763671c0',
  imob: 'photo-1560518883-ce09059eeffa',
  imob2: 'photo-1618221195710-dd6b41faaea6',
  advocacia: 'photo-1589829545856-d10d557cf95f',
  advocacia2: 'photo-1450101499163-c8848c66ca85',
  educacao: 'photo-1524178232363-1fb2b075b655',
  educacao2: 'photo-1503676260728-1c00da094a0b',
} as const;

export const TEMPLATES: TemplateDefinition[] = [
  {
    slug: 'estetica-lux',
    name: 'Estética Lux',
    niche: 'Clínica de estética',
    tagline: 'Editorial minimal com conversão em dois cliques.',
    coverImageUrl: catalogCover(P.estetica),
    thumbImageUrl: catalogThumb(P.estetica),
    galleryImageUrls: [catalogCover(P.estetica2, 1600, 1200), catalogCover(P.estetica, 1600, 1200)],
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
    galleryImageUrls: [catalogCover(P.odonto2, 1600, 1200)],
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
    galleryImageUrls: [catalogCover(P.fitness2, 1600, 1200)],
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
    galleryImageUrls: [catalogCover(P.restaurante2, 1600, 1200)],
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
    galleryImageUrls: [catalogCover(P.varejo2, 1600, 1200)],
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
    galleryImageUrls: [catalogCover(P.imob2, 1600, 1200)],
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
    galleryImageUrls: [catalogCover(P.advocacia2, 1600, 1200)],
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
    galleryImageUrls: [catalogCover(P.educacao2, 1600, 1200)],
    basePriceCents: 480_000,
    includedModuleIds: ['analytics'],
    featured: false,
  },
  {
    slug: 'servicos-b2b',
    name: 'Serviços B2B',
    niche: 'Serviços & consultoria',
    tagline: 'Proposta clara para decisor ocupado.',
    coverImageUrl: catalogCover('photo-1552664730-d307ca884978'),
    thumbImageUrl: catalogThumb('photo-1552664730-d307ca884978'),
    galleryImageUrls: [catalogCover('photo-1521737604893-d14cc237f11d', 1600, 1200)],
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
