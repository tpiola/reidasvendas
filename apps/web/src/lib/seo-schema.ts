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
  'Desenvolvimento web',
  'Funil de vendas',
  'Automação comercial',
  'Marketing digital',
  'WhatsApp Business',
] as const;

function buildOrganizationNode() {
  const tel = formatPhoneE164(BRAND.phone);
  return {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${BASE}/#organization`,
    name: BRAND.name,
    url: `${BASE}/`,
    logo: `${BASE}/favicon.svg`,
    image: [`${BASE}/og-image.svg`, `${BASE}/logo.svg`],
    email: BRAND.email,
    ...(tel ? { telephone: tel } : {}),
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
      { '@type': 'Country', name: 'Brazil' },
    ],
    knowsAbout: [...KNOWS_ABOUT],
  };
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
