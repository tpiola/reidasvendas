import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ARTICLES } from '../src/lib/articles.ts';
import { GROWTH_SEO } from '../src/lib/growth.ts';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const publicDirectory = join(projectRoot, 'public');
const distDirectory = join(projectRoot, 'dist');
const origin = 'https://reidasvendas.com.br';
const updateSource = process.argv.includes('--update-source');

const staticEntries = [
  {
    path: '/',
    title: 'Sites, aplicativos e soluções digitais em Franca | Rei das Vendas',
    description: 'Sites premium, e-commerce, aplicativos, SaaS, automações e operação digital sob medida para negócios locais e profissionais liberais em Franca, SP.',
    category: 'WebPage',
    headings: ['Presença e autoridade', 'Venda e comércio', 'Produtos digitais', 'Operação e distribuição'],
    questions: [],
    lastModified: '2026-08-28',
  },
  {
    path: '/portfolio',
    title: 'Projetos publicados | Rei das Vendas',
    description: 'Sites, lojas e produtos digitais publicados, apresentados com contexto, escopo real e sem métricas inventadas.',
    category: 'CollectionPage',
    headings: ['Sentinela Saúde Ambiental', 'TKA Esportes', 'Keeus', 'Thiago Piola', 'SaúdeGPT'],
    questions: [],
    lastModified: '2026-08-28',
  },
  {
    path: '/planos',
    title: 'Projeto individual e operação contínua | Rei das Vendas',
    description: 'Compare entrega individual, assinatura operacional e ciclos de crescimento para sites, lojas, aplicativos, SaaS e automações.',
    category: 'WebPage',
    headings: ['Entrega individual', 'Operação contínua', 'Crescimento e capilaridade', 'Proposta sem surpresa'],
    questions: [],
    lastModified: '2026-08-28',
  },
  {
    path: '/contato',
    title: 'Contato | Rei das Vendas em Franca, SP',
    description: 'Fale pelo WhatsApp (16) 99233-3344 ou pelo e-mail contato@reidasvendas.com.br e organize o contexto do seu projeto digital.',
    category: 'ContactPage',
    headings: ['WhatsApp', 'E-mail', 'Diagnóstico guiado'],
    questions: [],
    lastModified: '2026-08-28',
  },
  {
    path: '/sobre',
    title: 'Sobre o Rei das Vendas | Franca, SP',
    description: 'Princípios, forma de trabalho e responsabilidade por projetos digitais conduzidos a partir de Franca, SP.',
    category: 'AboutPage',
    headings: ['Responsabilidade explícita', 'Critério de trabalho', 'Limite produtivo'],
    questions: [],
    lastModified: '2026-08-28',
  },
  {
    path: '/blog',
    title: 'Caderno de operação | Rei das Vendas',
    description: 'Leituras sobre publicação, busca, atendimento e continuidade para decidir antes de construir.',
    category: 'CollectionPage',
    headings: ARTICLES.map((article) => article.title),
    questions: [],
    lastModified: '2026-08-28',
  },
  {
    path: '/politica',
    title: 'Política de privacidade | Rei das Vendas',
    description: 'Como informações enviadas pelo diagnóstico e dados de medição são tratados.',
    category: 'WebPage',
    headings: ['Informações', 'Finalidade', 'Operadores', 'Conservação', 'Medição', 'Seus pedidos'],
    questions: [],
    lastModified: '2026-08-28',
  },
  {
    path: '/termos',
    title: 'Termos de uso | Rei das Vendas',
    description: 'Condições gerais de uso e contratação dos serviços do Rei das Vendas para negócios locais.',
    category: 'WebPage',
    headings: ['Modelos de relação', 'Pagamento', 'Propriedade', 'Responsabilidade', 'Cancelamento', 'Fronteiras do escopo'],
    questions: [],
    lastModified: '2026-08-28',
  },
];

const articleEntries = ARTICLES.map((article) => ({
  path: `/blog/${article.slug}`,
  title: `${article.title} | Rei das Vendas`,
  description: article.description,
  category: 'Article',
  headings: article.sections.map((section) => section.heading),
  questions: [],
  published: article.published,
  lastModified: article.published,
}));

const entryMap = new Map();
for (const entry of [...staticEntries, ...GROWTH_SEO.map((item) => ({ ...item, lastModified: '2026-08-28' })), ...articleEntries]) {
  entryMap.set(entry.path, entry);
}
const entries = [...entryMap.values()];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function updateMeta(document, attribute, name, value) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const expression = new RegExp(`(<meta\\s+${attribute}=["']${escapedName}["']\\s+content=["'])[^"']*(["'])`, 'i');
  return document.replace(expression, `$1${escapeHtml(value)}$2`);
}

function structuredData(entry, url) {
  const entity = {
    '@type': entry.category,
    name: entry.title,
    description: entry.description,
    url,
    inLanguage: 'pt-BR',
    ...(entry.category === 'Service' ? { provider: { '@id': `${origin}/#organization` }, areaServed: 'Brasil' } : {}),
    ...(entry.category === 'Article' ? {
      headline: entry.title.replace(/ \| Rei das Vendas$/, ''),
      author: { '@id': `${origin}/#founder` },
      publisher: { '@id': `${origin}/#organization` },
      ...(entry.published ? { datePublished: entry.published, dateModified: entry.lastModified } : {}),
    } : {}),
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

function initialHeader() {
  return `<header class="initial-header"><div class="initial-header__inner"><a class="initial-brand" href="/" aria-label="Rei das Vendas — página inicial"><b aria-hidden="true">R↗</b><span><strong>Rei das Vendas</strong><small>Negócios em movimento</small></span></a><a class="initial-header__action" href="/diagnostico">Mapear meu negócio</a></div></header>`;
}

function staticContent(entry) {
  const heading = entry.title.replace(/ \| Rei das Vendas$/, '');
  const sections = entry.headings.slice(0, 6).map((item, index) => {
    const separator = item.indexOf(': ');
    const title = separator >= 0 ? item.slice(0, separator) : item;
    const detail = separator >= 0 ? item.slice(separator + 2) : '';
    return `<li><h3><span>${String(index + 1).padStart(2, '0')}</span>${escapeHtml(title)}</h3>${detail ? `<p>${escapeHtml(detail)}</p>` : ''}</li>`;
  }).join('');

  const questions = entry.questions.slice(0, 3).map((item, index) => `<li><h3><span>Q${index + 1}</span>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p></li>`).join('');
  const list = sections || questions;
  const kicker = entry.category === 'Article' ? 'Caderno de operação' : 'Infraestrutura digital para negócios locais';

  return `<main class="initial-home" id="main-content"><div class="initial-home__grid"><article><p class="initial-home__kicker">${kicker}</p><h1>${escapeHtml(heading)}</h1><p class="initial-home__lead">${escapeHtml(entry.description)}</p><a class="initial-home__action" href="/diagnostico">Mapear meu negócio →</a></article><aside class="initial-map" aria-label="Conteúdo desta página"><div class="initial-map__head"><p>Leitura inicial</p><span>RDV / 2026</span></div><h2>O que esta página organiza</h2><ol>${list}</ol></aside></div></main>`;
}

function prerenderDocument(template, entry) {
  const url = `${origin}${entry.path}`;
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(entry.title)}</title>`);

  html = updateMeta(html, 'name', 'description', entry.description);
  html = updateMeta(html, 'name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large');
  html = updateMeta(html, 'name', 'googlebot', 'index, follow, max-snippet:-1, max-image-preview:large');
  html = updateMeta(html, 'name', 'twitter:title', entry.title);
  html = updateMeta(html, 'name', 'twitter:description', entry.description);
  html = updateMeta(html, 'property', 'og:type', entry.category === 'Article' ? 'article' : 'website');
  html = updateMeta(html, 'property', 'og:title', entry.title);
  html = updateMeta(html, 'property', 'og:description', entry.description);
  html = updateMeta(html, 'property', 'og:url', url);
  html = html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/i, `$1${escapeHtml(url)}$2`);
  html = html.replace('</head>', `    <script id="rdv-static-schema" data-path="${escapeHtml(entry.path)}" type="application/ld+json">${structuredData(entry, url)}</script>\n  </head>`);

  const rootOpening = '<div id="root">';
  const start = html.indexOf(rootOpening);
  const rootBody = start >= 0 ? html.slice(start + rootOpening.length) : '';
  const rootClosing = /\n\s*<\/div>\s*\n\s*(?=<noscript\b)/i.exec(rootBody);
  const end = rootClosing ? start + rootOpening.length + rootClosing.index : -1;
  if (start < 0 || end < 0) throw new Error(`Unable to locate application root while rendering ${entry.path}`);
  return `${html.slice(0, start + rootOpening.length)}\n      ${initialHeader()}${staticContent(entry)}${html.slice(end)}`;
}

async function writeSitemap(target) {
  const urls = entries
    .sort((a, b) => a.path.localeCompare(b.path, 'pt-BR'))
    .map((entry) => `  <url>\n    <loc>${escapeHtml(`${origin}${entry.path}`)}</loc>\n    <lastmod>${entry.lastModified}</lastmod>\n  </url>`)
    .join('\n');

  await writeFile(target, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  return entries.length;
}

if (updateSource) {
  const count = await writeSitemap(join(publicDirectory, 'sitemap.xml'));
  process.stdout.write(`Updated source sitemap with ${count} canonical URLs.\n`);
} else {
  const template = await readFile(join(distDirectory, 'index.html'), 'utf8');
  for (const entry of entries.filter((item) => item.path !== '/')) {
    const output = join(distDirectory, `${entry.path.slice(1)}.html`);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, prerenderDocument(template, entry));
  }
  const count = await writeSitemap(join(distDirectory, 'sitemap.xml'));
  process.stdout.write(`Prerendered ${entries.length - 1} canonical pages; sitemap contains ${count} URLs.\n`);
}
