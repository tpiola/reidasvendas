import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GROWTH_SEO } from '../src/lib/growth.ts';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const publicDirectory = join(projectRoot, 'public');
const distDirectory = join(projectRoot, 'dist');
const origin = 'https://reidasvendas.com.br';
const updateSource = process.argv.includes('--update-source');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function updateMeta(document, attribute, name, value) {
  const expression = new RegExp(`(<meta\\s+${attribute}=["']${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']\\s+content=["'])[^"']*(["'])`, 'i');
  return document.replace(expression, `$1${escapeHtml(value)}$2`);
}

function structuredData(entry, url) {
  const entity = {
    '@type': entry.category,
    name: entry.title,
    description: entry.description,
    url,
    ...(entry.category === 'Service' ? { provider: { '@id': `${origin}/#organization` }, areaServed: 'Brasil' } : {}),
    ...(entry.category === 'Article' ? { author: { '@id': `${origin}/#organization` }, publisher: { '@id': `${origin}/#organization` } } : {}),
    ...(entry.category === 'WebApplication' ? { applicationCategory: 'BusinessApplication', operatingSystem: 'Web' } : {}),
  };

  const graph = [
    entity,
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Rei das Vendas', item: `${origin}/` },
        { '@type': 'ListItem', position: 2, name: entry.title.replace(/ \| Rei das Vendas$/, ''), item: url },
      ],
    },
  ];

  if (entry.questions.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: entry.questions.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c');
}

function staticContent(entry) {
  const heading = entry.title.replace(/ \| Rei das Vendas$/, '');
  const sections = entry.headings.map((item) => {
    const separator = item.indexOf(': ');
    const title = separator >= 0 ? item.slice(0, separator) : item;
    const detail = separator >= 0 ? item.slice(separator + 2) : '';
    return `<section><h2>${escapeHtml(title)}</h2>${detail ? `<p>${escapeHtml(detail)}</p>` : ''}</section>`;
  }).join('');

  const questions = entry.questions.map((item) => `<section><h2>${escapeHtml(item.question)}</h2><p>${escapeHtml(item.answer)}</p></section>`).join('');

  return `<main class="initial-home" id="main-content"><div class="initial-home__grid"><article><p class="initial-home__kicker">Unidade Externa de Tecnologia e Governança de Resultados</p><h1>${escapeHtml(heading)}</h1><p class="initial-home__lead">${escapeHtml(entry.description)}</p><div class="initial-home__actions"><a href="/diagnostico">Mapear minha operação →</a><a href="/solucoes">Explorar arquiteturas ↗</a></div></article><aside class="initial-home__panel"><small>Arquitetura orientada ao contexto</small>${sections}${questions}</aside></div></main>`;
}

function prerenderDocument(template, entry) {
  const url = `${origin}${entry.path}`;
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(entry.title)}</title>`);

  html = updateMeta(html, 'name', 'description', entry.description);
  html = updateMeta(html, 'name', 'twitter:title', entry.title);
  html = updateMeta(html, 'name', 'twitter:description', entry.description);
  html = updateMeta(html, 'property', 'og:title', entry.title);
  html = updateMeta(html, 'property', 'og:description', entry.description);
  html = updateMeta(html, 'property', 'og:url', url);
  html = html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/i, `$1${escapeHtml(url)}$2`);
  html = html.replace('</head>', `    <script id="rdv-static-schema" type="application/ld+json">${structuredData(entry, url)}</script>\n  </head>`);

  const rootOpening = '<div id="root">';
  const start = html.indexOf(rootOpening);
  const endMarker = '\n    </div>\n    <noscript>';
  const end = html.indexOf(endMarker, start);
  if (start < 0 || end < 0) throw new Error(`Unable to locate application root while rendering ${entry.path}`);
  return `${html.slice(0, start + rootOpening.length)}\n      ${staticContent(entry)}${html.slice(end)}`;
}

async function writeSitemap(target) {
  const source = await readFile(join(publicDirectory, 'sitemap.xml'), 'utf8');
  const paths = new Set([...source.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replace(origin, '') || '/'));
  for (const entry of GROWTH_SEO) paths.add(entry.path);

  const today = new Date().toISOString().slice(0, 10);
  const urls = [...paths].map((path) => {
    const priority = path === '/' ? '1.0' : path.startsWith('/solucoes/') ? '0.9' : path.startsWith('/ferramentas') ? '0.8' : '0.7';
    return `  <url>\n    <loc>${escapeHtml(`${origin}${path}`)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  }).join('\n');

  await writeFile(target, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  return paths.size;
}

if (updateSource) {
  const count = await writeSitemap(join(publicDirectory, 'sitemap.xml'));
  process.stdout.write(`Updated source sitemap with ${count} canonical URLs.\n`);
} else {
  const template = await readFile(join(distDirectory, 'index.html'), 'utf8');
  for (const entry of GROWTH_SEO) {
    const output = join(distDirectory, entry.path.slice(1), 'index.html');
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, prerenderDocument(template, entry));
  }
  const count = await writeSitemap(join(distDirectory, 'sitemap.xml'));
  process.stdout.write(`Prerendered ${GROWTH_SEO.length} acquisition pages; sitemap contains ${count} canonical URLs.\n`);
}
