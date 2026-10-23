import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // HTML noindex pages stay crawlable so search engines can read that directive.
      disallow: ['/api/', '/go/', '/csp-report'],
    },
    sitemap: SITE + '/sitemap.xml',
    host: SITE,
  };
}
