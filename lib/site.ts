import type { Metadata } from 'next';
export const SITE = 'https://www.reidasvendas.com.br';
export const NAME = 'Rei das Vendas';
export function metadata(
  title: string,
  description: string,
  path = '/',
  noindex = false,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: SITE + path },
    robots: { index: !noindex, follow: true },
    openGraph: {
      title: `${title} | ${NAME}`,
      description,
      url: SITE + path,
      siteName: NAME,
      locale: 'pt_BR',
      type: 'website',
      images: [
        {
          url: SITE + '/og/og-1200x630.png',
          width: 1200,
          height: 630,
          alt: 'Rei das Vendas — marketing e operação na mesma direção',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SITE + '/og/og-1200x630.png'],
    },
  };
}
export const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': SITE + '/#organization',
  name: NAME,
  url: SITE,
  logo: SITE + '/logo/simbolo.svg',
  telephone: '+5516992333344',
  description:
    'Agência de marketing digital e tecnologia comercial em Franca/SP.',
  areaServed: [
    { '@type': 'City', name: 'Franca' },
    { '@type': 'Country', name: 'Brasil' },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+5516992333344',
    contactType: 'sales',
    availableLanguage: 'Portuguese',
  },
};
export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Início', path: '/' }, ...items].map((x, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: x.name,
      item: SITE + x.path,
    })),
  };
}
