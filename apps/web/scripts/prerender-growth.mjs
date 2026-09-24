import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ARTICLES } from '../src/lib/articles.ts';
import {
  GROWTH_SEO,
  SOLUTION_BY_SLUG,
  COMPARISON_BY_SLUG,
  GUIDE_BY_SLUG,
  TOOL_BY_SLUG,
  DEMONSTRATION_BY_SLUG,
} from '../src/lib/growth.ts';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const publicDirectory = join(projectRoot, 'public');
const distDirectory = join(projectRoot, 'dist');
const origin = 'https://reidasvendas.com.br';
const updateSource = process.argv.includes('--update-source');

const staticEntries = [
  {
    path: '/',
    title: 'Sites e Soluções Digitais Premium | Franca, SP e Brasil',
    description: 'Sites premium, e-commerce, apps, SaaS, automações e operação digital sob medida para negócios locais e empresas em todo o Brasil — a partir de Franca, SP.',
    heading: 'Seu cliente já está pesquisando. A questão é quem ele vai encontrar.',
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
    description: 'Condições gerais de uso e contratação dos serviços do Rei das Vendas para negócios locais e empresas em todo o Brasil.',
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

function bulletList(items) {
  const body = items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
  return body ? `<ul>${body}</ul>` : '';
}

function detailList(items) {
  const body = items
    .map((item) => `<li><h3>${escapeHtml(item.title)}</h3>${item.detail ? `<p>${escapeHtml(item.detail)}</p>` : ''}</li>`)
    .join('');
  return body ? `<ol>${body}</ol>` : '';
}

function faqList(questions) {
  const body = questions
    .map((item) => `<li><h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p></li>`)
    .join('');
  return body ? `<ol>${body}</ol>` : '';
}

function paragraphList(paragraphs) {
  return (paragraphs ?? []).map((text) => `<p>${escapeHtml(text)}</p>`).join('');
}

function relatedSolutions(slugs) {
  const body = (slugs ?? [])
    .map((slug) => SOLUTION_BY_SLUG.get(slug))
    .filter(Boolean)
    .map((item) => `<li><a href="/solucoes/${item.slug}">${escapeHtml(item.title)}</a><p>${escapeHtml(item.summary)}</p></li>`)
    .join('');
  return body ? `<ul>${body}</ul>` : '';
}

/**
 * Navegação explícita no HTML estático.
 *
 * Espelha a navegação que o React já oferece (header + rodapé), mas agora
 * também no HTML entregue sem execução de JS. Sem isto, os rastreadores que
 * não rodam JavaScript (GPTBot, ClaudeBot, OAI-SearchBot, PerplexityBot,
 * todos liberados no robots.txt) enxergavam um grafo praticamente sem arestas:
 * as páginas só eram alcançáveis pelo sitemap.
 *
 * Não é link farm: são os mesmos destinos reais da navegação do site, em uma
 * lista por seção. Fica atrás do `.rdv-boot` e é substituído pelo React.
 */
function siteNavigation() {
  const groups = [
    { label: 'Soluções', links: [['/solucoes', 'Todas as soluções'], ['/ferramentas', 'Ferramentas'], ['/demonstracoes', 'Demonstrações']] },
    { label: 'Comparativos', links: [...COMPARISON_BY_SLUG.values()].map((item) => [`/alternativas/${item.slug}`, item.title]) },
    { label: 'Guias de decisão', links: [...GUIDE_BY_SLUG.values()].map((item) => [`/${item.slug}`, item.title]) },
    { label: 'Publicações', links: [['/blog', 'Caderno de operação']] },
    { label: 'Institucional', links: [['/portfolio', 'Projetos publicados'], ['/planos', 'Planos'], ['/sobre', 'Sobre'], ['/contato', 'Contato'], ['/diagnostico', 'Diagnóstico'], ['/politica', 'Política de privacidade'], ['/termos', 'Termos de uso']] },
  ];
  const body = groups
    .map((group) => `<section><h3>${escapeHtml(group.label)}</h3><ul>${group.links
      .map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`)
      .join('')}</ul></section>`)
    .join('');
  return `<nav aria-label="Navegação do site"><h2>Navegação</h2>${body}</nav>`;
}

/**
 * Conteúdo real das páginas internas dentro do HTML entregue ao crawler.
 *
 * Por que existe: o site é uma SPA (Vite + React). Sem executar JS, o HTML
 * inicial trazia apenas <title>/<meta>/JSON-LD mais um esqueleto com títulos —
 * cerca de 70 a 125 palavras por página, contra 250 a 1.200 no DOM renderizado.
 * Os rastreadores liberados no robots.txt (GPTBot, ClaudeBot, OAI-SearchBot,
 * PerplexityBot) não executam JS, então liam a versão pobre.
 *
 * Por que é seguro: os blocos `initial-*` ficam DENTRO de #root e são
 * substituídos pelo React no mount. Enquanto o React não monta, ficam atrás de
 * `.rdv-boot` (position: fixed; inset: 0; z-index 2147483000; fundo #07090d
 * opaco). Nenhum humano vê este markup — enriquecê-lo não altera a experiência
 * visual, apenas o que o robô lê.
 *
 * Regra editorial: usar SOMENTE dado real já publicado em growth.ts e
 * articles.ts. Nada de preço, prazo, métrica, prêmio ou avaliação inventada.
 */
function detailBlocks(entry) {
  const { path } = entry;
  const tail = (prefix) => (path.startsWith(prefix) ? path.slice(prefix.length) : null);
  const blocks = [];

  if (path === '/') {
    const byCategory = new Map();
    for (const item of SOLUTION_BY_SLUG.values()) {
      if (!byCategory.has(item.category)) byCategory.set(item.category, []);
      byCategory.get(item.category).push(item);
    }
    const groups = [...byCategory.entries()]
      .map(([category, items]) => `<section><h2>${escapeHtml(category)}</h2><ul>${items
        .map((item) => `<li><a href="/solucoes/${item.slug}">${escapeHtml(item.title)}</a><p>${escapeHtml(item.summary)}</p></li>`)
        .join('')}</ul></section>`)
      .join('');
    blocks.push(`<section><h2>Soluções por segmento</h2>${groups}</section>`);
  } else if (path === '/solucoes') {
    const byCategory = new Map();
    for (const item of SOLUTION_BY_SLUG.values()) {
      if (!byCategory.has(item.category)) byCategory.set(item.category, []);
      byCategory.get(item.category).push(item);
    }
    blocks.push(`<section><h2>Soluções por segmento</h2>${[...byCategory.entries()]
      .map(([category, items]) => `<section><h3>${escapeHtml(category)}</h3><ul>${items
        .map((item) => `<li><a href="/solucoes/${item.slug}">${escapeHtml(item.title)}</a><p>${escapeHtml(item.summary)}</p></li>`)
        .join('')}</ul></section>`)
      .join('')}</section>`);
  } else if (path === '/ferramentas') {
    blocks.push(`<section><h2>Ferramentas disponíveis</h2><ul>${[...TOOL_BY_SLUG.values()]
      .map((tool) => `<li><a href="/ferramentas/${tool.slug}">${escapeHtml(tool.title)}</a><p>${escapeHtml(tool.summary)}</p>${tool.result ? `<p>${escapeHtml(tool.result)}</p>` : ''}</li>`)
      .join('')}</ul></section>`);
  } else if (path === '/demonstracoes') {
    blocks.push(`<section><h2>Demonstrações publicadas</h2><ul>${[...DEMONSTRATION_BY_SLUG.values()]
      .map((demo) => {
        const linked = SOLUTION_BY_SLUG.get(demo.solution);
        return `<li><a href="/demonstracoes/${demo.slug}">${escapeHtml(demo.title)}</a><p>${escapeHtml(demo.segment)}</p><p>${escapeHtml(demo.description)}</p>${linked ? `<p><a href="/solucoes/${linked.slug}">${escapeHtml(linked.title)}</a></p>` : ''}</li>`;
      })
      .join('')}</ul></section>`);
  } else if (path === '/blog') {
    blocks.push(`<section><h2>Publicações</h2><ul>${ARTICLES
      .map((article) => `<li><a href="/blog/${article.slug}">${escapeHtml(article.title)}</a><p>${escapeHtml(article.description)}</p><p>${escapeHtml(article.displayDate)} · ${escapeHtml(article.readTime)}</p></li>`)
      .join('')}</ul></section>`);
  } else {
    const solutionSlug = tail('/solucoes/');
    const comparisonSlug = tail('/alternativas/');
    const toolSlug = tail('/ferramentas/');
    const demoSlug = tail('/demonstracoes/');
    const articleSlug = tail('/blog/');

    if (solutionSlug) {
      const solution = SOLUTION_BY_SLUG.get(solutionSlug);
      if (solution) {
        blocks.push(`<section><h2>Quem atendemos</h2><p>${escapeHtml(solution.audience)}</p><p>${escapeHtml(solution.summary)}</p></section>`);
        blocks.push(`<section><h2>O problema que esta página resolve</h2><p>${escapeHtml(solution.pain)}</p></section>`);
        blocks.push(`<section><h2>O resultado esperado</h2><p>${escapeHtml(solution.outcome)}</p></section>`);
        if (solution.architecture?.length) blocks.push(`<section><h2>Como a solução se organiza</h2>${detailList(solution.architecture)}</section>`);
        if (solution.questions?.length) blocks.push(`<section><h2>Perguntas frequentes</h2>${faqList(solution.questions)}</section>`);
        const demo = solution.demonstration ? DEMONSTRATION_BY_SLUG.get(solution.demonstration) : null;
        if (demo) blocks.push(`<section><h2>Demonstração relacionada</h2><p><a href="/demonstracoes/${demo.slug}">${escapeHtml(demo.title)}</a></p><p>${escapeHtml(demo.description)}</p></section>`);
        if (solution.related?.length) blocks.push(`<section><h2>Soluções relacionadas</h2>${relatedSolutions(solution.related)}</section>`);
      }
    } else if (comparisonSlug) {
      const comparison = COMPARISON_BY_SLUG.get(comparisonSlug);
      if (comparison) {
        blocks.push(`<section><h2>Resumo da comparação</h2><p>${escapeHtml(comparison.summary)}</p></section>`);
        blocks.push(`<section><h2>O que ${escapeHtml(comparison.name)} entrega</h2><p>${escapeHtml(comparison.platformFit)}</p></section>`);
        blocks.push(`<section><h2>O que uma solução sob medida entrega</h2><p>${escapeHtml(comparison.customFit)}</p></section>`);
        if (comparison.considerations?.length) blocks.push(`<section><h2>Pontos de atenção antes de decidir</h2>${detailList(comparison.considerations)}</section>`);
        if (comparison.questions?.length) blocks.push(`<section><h2>Perguntas frequentes</h2>${faqList(comparison.questions)}</section>`);
        if (comparison.officialUrl) blocks.push(`<section><h2>Referência oficial</h2><p><a href="${escapeHtml(comparison.officialUrl)}" rel="noopener noreferrer nofollow">${escapeHtml(comparison.officialUrl)}</a></p></section>`);
      }
    } else if (toolSlug) {
      const tool = TOOL_BY_SLUG.get(toolSlug);
      if (tool) {
        blocks.push(`<section><h2>Sobre esta ferramenta</h2><p>${escapeHtml(tool.summary)}</p></section>`);
        if (tool.result) blocks.push(`<section><h2>O que você recebe</h2><p>${escapeHtml(tool.result)}</p></section>`);
      }
    } else if (demoSlug) {
      const demo = DEMONSTRATION_BY_SLUG.get(demoSlug);
      if (demo) {
        blocks.push(`<section><h2>Segmento</h2><p>${escapeHtml(demo.segment)}</p></section>`);
        blocks.push(`<section><h2>Sobre esta demonstração</h2><p>${escapeHtml(demo.description)}</p></section>`);
        const linked = SOLUTION_BY_SLUG.get(demo.solution);
        if (linked) blocks.push(`<section><h2>Solução aplicada</h2><p><a href="/solucoes/${linked.slug}">${escapeHtml(linked.title)}</a></p><p>${escapeHtml(linked.summary)}</p></section>`);
      }
    } else if (articleSlug) {
      const article = ARTICLES.find((item) => item.slug === articleSlug);
      if (article) {
        for (const section of article.sections ?? []) {
          blocks.push(`<section><h2>${escapeHtml(section.heading)}</h2>${paragraphList(section.paragraphs)}${section.bullets?.length ? bulletList(section.bullets) : ''}</section>`);
        }
      }
    } else {
      const guide = GUIDE_BY_SLUG.get(path.slice(1));
      if (guide) {
        blocks.push(`<section><h2>Resumo</h2><p>${escapeHtml(guide.summary)}</p></section>`);
        if (guide.sections?.length) blocks.push(`<section><h2>O que entra na análise</h2>${detailList(guide.sections)}</section>`);
        if (guide.questions?.length) blocks.push(`<section><h2>Perguntas frequentes</h2>${faqList(guide.questions)}</section>`);
        const linked = SOLUTION_BY_SLUG.get(guide.solution);
        if (linked) blocks.push(`<section><h2>Solução relacionada</h2><p><a href="/solucoes/${linked.slug}">${escapeHtml(linked.title)}</a></p><p>${escapeHtml(linked.summary)}</p></section>`);
        const tool = guide.tool ? TOOL_BY_SLUG.get(guide.tool) : null;
        if (tool) blocks.push(`<section><h2>Ferramenta relacionada</h2><p><a href="/ferramentas/${tool.slug}">${escapeHtml(tool.title)}</a></p><p>${escapeHtml(tool.summary)}</p></section>`);
      }
    }
  }

  // Páginas sem dado dedicado (ex.: /planos, /sobre, /portfolio) ainda entregam
  // as perguntas reais do próprio registro de SEO, que antes iam cortadas em 3.
  if (!blocks.length && entry.questions?.length) {
    blocks.push(`<section><h2>Perguntas frequentes</h2>${faqList(entry.questions)}</section>`);
  }

  return blocks.length ? `<div class="initial-detail">${blocks.join('')}</div>` : '';
}

function staticContent(entry) {
  const heading = entry.heading ?? entry.title.replace(/ \| Rei das Vendas$/, '');
  const sections = entry.headings.slice(0, 6).map((item, index) => {
    const separator = item.indexOf(': ');
    const title = separator >= 0 ? item.slice(0, separator) : item;
    const detail = separator >= 0 ? item.slice(separator + 2) : '';
    return `<li><h3><span>${String(index + 1).padStart(2, '0')}</span>${escapeHtml(title)}</h3>${detail ? `<p>${escapeHtml(detail)}</p>` : ''}</li>`;
  }).join('');

  const questions = entry.questions.slice(0, 3).map((item, index) => `<li><h3><span>Q${index + 1}</span>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p></li>`).join('');
  const list = sections || questions;
  const kicker = entry.category === 'Article' ? 'Caderno de operação' : 'Franca/SP · negócios locais e todo o Brasil';

  return `<main class="initial-home" id="main-content"><div class="initial-home__grid"><article><p class="initial-home__kicker">${kicker}</p><h1>${escapeHtml(heading)}</h1><p class="initial-home__lead">${escapeHtml(entry.description)}</p><a class="initial-home__action" href="/diagnostico">Mapear meu negócio →</a></article><aside class="initial-map" aria-label="Conteúdo desta página"><div class="initial-map__head"><p>Leitura inicial</p><span>RDV / 2026</span></div><h2>O que esta página organiza</h2><ol>${list}</ol></aside></div>${detailBlocks(entry)}${siteNavigation()}</main>`;
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

  // A HOME também recebe o conteúdo inicial (h1 + blocos). Antes ela ficava só
  // com o shell vazio: o HTML entregue ao crawler não tinha h1 nem texto, e a
  // home é justamente a página mais importante do site.
  // Atenção: não usamos prerenderDocument() aqui — ele injeta entre o #root e o
  // <noscript>, e na home isso engoliria o boot loader (o validador bloqueia).
  // O conteúdo entra DENTRO do #root, preservando o boot.
  const homeEntry = entries.find((item) => item.path === '/');
  if (homeEntry) {
    const homeHtml = template.replace(
      '<div id="root"></div>',
      `<div id="root">${staticContent(homeEntry)}</div>`,
    );
    if (homeHtml === template) {
      throw new Error('Não foi possível injetar o conteúdo inicial na home (div#root não encontrado)');
    }
    await writeFile(join(distDirectory, 'index.html'), homeHtml);
  }

  const count = await writeSitemap(join(distDirectory, 'sitemap.xml'));
  process.stdout.write(`Prerendered ${entries.length} canonical pages; sitemap contains ${count} URLs.\n`);
}
