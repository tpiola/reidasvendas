import { BRAND } from './brand';
import { HERO_POSTER_HD } from './media';

const BASE = `https://${BRAND.domain}`;

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type ReviewInput = {
  id: string;
  author: string;
  reviewBody: string;
  ratingValue: number;
  datePublished?: string;
};

export function formatPhoneE164(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return '';
  return digits.startsWith('55') ? `+${digits}` : `+55${digits}`;
}

const KNOWS_ABOUT = [
  'Desenvolvimento web',
  'Funil de vendas',
  'Automação comercial',
  'Marketing digital',
  'WhatsApp Business',
] as const;

const OPENING_HOURS = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: 'Saturday',
    opens: '09:00',
    closes: '13:00',
  },
] as const;

function buildOrganizationNode() {
  const tel = formatPhoneE164(BRAND.phone);
  return {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${BASE}/#organization`,
    name: BRAND.name,
    url: `${BASE}/`,
    logo: `${BASE}/logo.svg`,
    image: [HERO_POSTER_HD, `${BASE}/og-image.svg`, `${BASE}/logo.svg`],
    email: BRAND.email,
    ...(tel ? { telephone: tel } : {}),
    priceRange: '$$',
    description:
      'Engenharia digital para negócios locais: site rápido, funil, WhatsApp, automação e tráfego com mensuração.',
    inLanguage: 'pt-BR',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Franca',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -20.5383,
      longitude: -47.4008,
    },
    areaServed: [
      { '@type': 'City', name: 'Franca' },
      { '@type': 'State', name: 'São Paulo' },
      { '@type': 'Country', name: 'Brazil' },
    ],
    openingHoursSpecification: OPENING_HOURS,
    knowsAbout: [...KNOWS_ABOUT],
  };
}

function buildAggregateRatingNode(reviews: readonly ReviewInput[]) {
  if (reviews.length === 0) return null;
  const sum = reviews.reduce((acc, r) => acc + r.ratingValue, 0);
  const ratingValue = Math.round((sum / reviews.length) * 10) / 10;
  return {
    '@type': 'AggregateRating',
    '@id': `${BASE}/#aggregate-rating`,
    ratingValue,
    bestRating: 5,
    worstRating: 1,
    ratingCount: reviews.length,
    reviewCount: reviews.length,
  };
}

function buildReviewNodes(reviews: readonly ReviewInput[]) {
  return reviews.map((r) => ({
    '@type': 'Review',
    '@id': `${BASE}/#review-${r.id}`,
    author: { '@type': 'Person', name: r.author },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: r.ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: r.reviewBody,
    datePublished: r.datePublished ?? '2025-01-15',
    itemReviewed: { '@id': `${BASE}/#organization` },
  }));
}

function buildProfessionalServiceNode() {
  return {
    '@type': 'ProfessionalService',
    '@id': `${BASE}/#professional-service`,
    name: BRAND.name,
    url: `${BASE}/`,
    provider: { '@id': `${BASE}/#organization` },
    description:
      'Sites, funis de venda, integração WhatsApp/CRM e automação para empresas em Franca-SP e Brasil.',
    serviceType: ['Desenvolvimento web', 'Funil de vendas', 'Automação comercial'],
    knowsAbout: [...KNOWS_ABOUT],
    areaServed: { '@type': 'Country', name: 'Brazil' },
  };
}

function buildWebSiteNode() {
  return {
    '@type': 'WebSite',
    '@id': `${BASE}/#website`,
    name: BRAND.name,
    url: `${BASE}/`,
    inLanguage: 'pt-BR',
    publisher: { '@id': `${BASE}/#organization` },
  };
}

export function buildFaqPageJsonLd(faq: readonly FaqItem[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${BASE}/#faq`,
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      '@id': `${BASE}/#faq-${item.id}`,
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/** JSON-LD completo da Home: LocalBusiness + FAQ + Reviews */
export function buildHomeJsonLd(faq: readonly FaqItem[], reviews: readonly ReviewInput[] = []) {
  const org = buildOrganizationNode();
  const aggregate = buildAggregateRatingNode(reviews);
  const orgWithRating =
    aggregate !== null
      ? {
          ...org,
          aggregateRating: { '@id': `${BASE}/#aggregate-rating` },
        }
      : org;

  const graph: Record<string, unknown>[] = [
    orgWithRating,
    buildProfessionalServiceNode(),
    buildWebSiteNode(),
    buildFaqPageJsonLd(faq),
    ...buildReviewNodes(reviews),
  ];

  if (aggregate) graph.push(aggregate);

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

/** Fallback para páginas internas */
export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [buildOrganizationNode(), buildProfessionalServiceNode(), buildWebSiteNode()],
  };
}

type PlanProductInput = {
  slug: string;
  headline: string;
  seoDescription: string;
  priceLabel: string;
  coverImageUrl: string;
};

/** Product + Offer para páginas de plano */
export function buildPlanProductJsonLd(plan: PlanProductInput) {
  const path = `/planos/${plan.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationNode(),
      {
        '@type': 'Product',
        '@id': `${BASE}${path}#product`,
        name: `Plano ${plan.headline} — ${BRAND.name}`,
        description: plan.seoDescription,
        image: plan.coverImageUrl,
        brand: { '@type': 'Brand', name: BRAND.name },
        offers: {
          '@type': 'Offer',
          url: `${BASE}${path}`,
          priceCurrency: 'BRL',
          availability: 'https://schema.org/InStock',
          description: plan.priceLabel,
          seller: { '@id': `${BASE}/#organization` },
        },
      },
      {
        '@type': 'Service',
        '@id': `${BASE}${path}#service`,
        name: `Assinatura ${plan.headline}`,
        description: plan.seoDescription,
        provider: { '@id': `${BASE}/#organization` },
        areaServed: { '@type': 'Country', name: 'Brazil' },
      },
    ],
  };
}
