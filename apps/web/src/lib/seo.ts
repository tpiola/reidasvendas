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

  applyJsonLd('page', input.jsonLd ?? buildOrganizationJsonLd());

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
