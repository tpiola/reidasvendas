import type { MetadataRoute } from 'next';
import content from '@/data/content.json';
import { SITE } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/metodo',
    '/diagnostico',
    '/servicos',
    '/resultados',
    '/cases',
    '/blog',
    '/faq',
    '/sobre',
    '/contato',
    '/privacidade',
    '/termos',
    ...content.services.map((s) => '/servicos/' + s.slug),
    ...content.articles.map((a) => a.route),
  ].map((path) => ({
    url: SITE + path,
    lastModified: new Date('2026-10-23T12:00:00-03:00'),
    changeFrequency: path === '/blog' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.startsWith('/servicos') ? 0.8 : 0.6,
  }));
}
