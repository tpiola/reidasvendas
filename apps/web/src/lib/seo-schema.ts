import { BRAND } from './brand';

const BASE = `https://${BRAND.domain}`;

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export function formatPhoneE164(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return '';
  return digits.startsWith('55') ? `+${digits}` : `+55${digits}`;
}

const KNOWS_ABOUT = [
  'Desenvolvimento de Software',
  'Inteligência Artificial',
  'Aceleração Comercial',
  'Engenharia de Funis de Vendas',
  'Automação de Marketing',
  'Core Web Vitals',
  'Generative Engine Optimization',
] as const;

function buildOrganizationNode() {
  const tel = formatPhoneE164(BRAND.phone);
  return {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${BASE}/#organization`,
    name: BRAND.name,
    url: `${BASE}/`,
    logo: `${BASE}/favicon.svg`,
    image: [`${BASE}/og-image.svg`, `${BASE}/logo.png`],
    email: BRAND.email,
    ...(tel ? { telephone: tel } : {}),
    description:
      'Fábrica Digital de Alta Velocidade e Performance: sites, aplicativos, extensões, funis de vendas e social media com inteligência artificial de ponta.',
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
      { '@type': 'Country', name: 'Brazil' },
    ],
    knowsAbout: [...KNOWS_ABOUT],
  };
}

function buildProfessionalServiceNode() {
  return {
    '@type': 'ProfessionalService',
    '@id': `${BASE}/#professional-service`,
    name: `${BRAND.name} — Fábrica Digital`,
    url: `${BASE}/`,
    provider: { '@id': `${BASE}/#organization` },
    description:
      'Desenvolvimento de software, engenharia de funis, automação comercial e aceleração de vendas com IA — para negócios que precisam validar e escalar sem caos operacional.',
    serviceType: [
      'Desenvolvimento de Software',
      'Inteligência Artificial aplicada a vendas',
      'Aceleração Comercial',
      'Engenharia de Funis de Vendas',
    ],
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
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
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

/** JSON-LD completo da Home: Organization + ProfessionalService + WebSite + FAQ */
export function buildHomeJsonLd(faq: readonly FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationNode(),
      buildProfessionalServiceNode(),
      buildWebSiteNode(),
      buildFaqPageJsonLd(faq),
    ],
  };
}

/** Fallback para páginas internas */
export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [buildOrganizationNode(), buildProfessionalServiceNode(), buildWebSiteNode()],
  };
}
