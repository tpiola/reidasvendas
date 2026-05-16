import { BRAND } from './brand';
import { buildOrganizationJsonLd } from './seo-schema';

type SeoInput = {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  robots?: string;
  jsonLd?: unknown;
};

export function applyJsonLd(id: string, json: unknown) {
  const scriptId = `ld-json-${id}`;
  const existing = document.getElementById(scriptId);
  if (existing) existing.remove();
  const el = document.createElement('script');
  el.id = scriptId;
  el.type = 'application/ld+json';
  el.text = JSON.stringify(json);
  document.head.appendChild(el);
}

function setMetaBy(name: string, value: string, content: string) {
  let el = document.querySelector(`meta[${name}="${value}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(name, value);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function applySeo(input: SeoInput) {
  document.title = input.title;
  setMetaBy('name', 'description', input.description);

  // Default JSON-LD for LocalBusiness and DigitalMarketingAgency (GEO optimized)
  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "DigitalMarketingAgency"],
        "@id": `https://${BRAND.domain}/#organization`,
        "name": BRAND.name,
        "url": `https://${BRAND.domain}/`,
        "logo": `https://${BRAND.domain}/favicon.svg`,
        "email": BRAND.email,
        "description": "Rei das Vendas | Engenharia de Crescimento e IA para Negócios Locais. Democratizando a Inteligência Artificial com tecnologia e design das maiores empresas do mundo.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Franca",
          "addressRegion": "SP",
          "addressCountry": "BR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-20.5383",
          "longitude": "-47.4008"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Brazil"
        },
        "priceRange": "$$",
        "telephone": "+5516999999999"
      }
    ]
  };

  applyJsonLd('page', input.jsonLd || defaultJsonLd);

  if (input.robots) {
    setMetaBy('name', 'robots', input.robots);
  }

  const canonicalHref = input.canonicalPath
    ? new URL(input.canonicalPath, window.location.origin).toString()
    : null;

  if (input.canonicalPath) {
    let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
      document.head.appendChild(el);
    }
    el.setAttribute('href', canonicalHref ?? window.location.href);
  }

  const url = canonicalHref ?? window.location.href;
  const ogImage = input.ogImage ?? `https://${BRAND.domain}/og-image.svg`;

  setMetaBy('property', 'og:type', 'website');
  setMetaBy('property', 'og:site_name', BRAND.name);
  setMetaBy('property', 'og:title', input.title);
  setMetaBy('property', 'og:description', input.description);
  setMetaBy('property', 'og:url', url);
  setMetaBy('property', 'og:image', ogImage);

  setMetaBy('name', 'twitter:card', 'summary_large_image');
  setMetaBy('name', 'twitter:title', input.title);
  setMetaBy('name', 'twitter:description', input.description);
  setMetaBy('name', 'twitter:image', ogImage);
}
