import type { MetadataRoute } from 'next';
import content from '@/data/content.json';
import { articles } from '@/lib/editorial';
import { SITE } from '@/lib/site';
import { subscriptionSolutions } from '@/data/subscription-solutions';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/planos',
    '/simulador',
    '/casos',
    ...subscriptionSolutions.map((item) => '/' + item.slug),
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
    ...articles.map((a) => a.route),
  ].map((path) => ({
    url: SITE + path,
    lastModified: new Date('2026-10-23T12:00:00-03:00'),
    changeFrequency: path === '/blog' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.startsWith('/servicos') ? 0.8 : 0.6,
  }));
}
