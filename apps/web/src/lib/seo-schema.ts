import { BRAND } from './brand';

const BASE = `https://${BRAND.domain}`;

export function formatPhoneE164(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return '';
  return digits.startsWith('55') ? `+${digits}` : `+55${digits}`;
}

export function buildOrganizationJsonLd() {
  const tel = formatPhoneE164(BRAND.phone);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness', 'ProfessionalService', 'DigitalMarketingAgency'],
        '@id': `${BASE}/#organization`,
        name: BRAND.name,
        url: `${BASE}/`,
        logo: `${BASE}/logo.svg`,
        image: [`${BASE}/og-image.svg`, `${BASE}/logo.png`],
        email: BRAND.email,
        ...(tel ? { telephone: tel } : {}),
        description:
          'Engenharia de crescimento digital e automação com IA em Franca-SP e Brasil. Sites, funis, n8n e mensuração orientados a conversão.',
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
        priceRange: '$$',
        knowsAbout: [
          'Marketing digital',
          'Automação de vendas',
          'Inteligência artificial para negócios',
          'SEO técnico',
          'Geração de leads',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE}/#website`,
        name: BRAND.name,
        url: `${BASE}/`,
        inLanguage: 'pt-BR',
        publisher: { '@id': `${BASE}/#organization` },
      },
    ],
  };
}
