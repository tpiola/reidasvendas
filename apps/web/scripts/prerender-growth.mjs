import { build } from "esbuild";
import { mkdir, readFile, writeFile, readdir, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ARTICLES } from "../src/lib/articles.ts";
import { GROWTH_SEO } from "../src/lib/growth.ts";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const publicDirectory = join(projectRoot, "public");
const distDirectory = join(projectRoot, "dist");
const origin = "https://reidasvendas.com.br";
const updateSource = process.argv.includes("--update-source");

const staticEntries = [
  {
    path: "/",
    title: "Sites para negócios locais em Franca, SP | Rei das Vendas",
    description:
      "Sites, catálogos e atendimento conectados para transformar a procura pelo seu negócio em conversas de venda. Implantação direta ou auditoria profissional.",
    heading:
      "Seu negócio merece ser encontrado.",
    category: "WebPage",
    headings: [
      "Patologia de funil",
      "Protocolo de auditoria",
      "Laudos publicados",
      "Esteira de contratação",
      "Limite de escopo",
    ],
    questions: [],
    lastModified: "2026-10-05",
  },
  {
    path: "/portfolio",
    title: "Projetos publicados | Rei das Vendas",
    description:
      "Sites, lojas e produtos digitais publicados, apresentados com contexto, escopo real e sem métricas inventadas.",
    category: "CollectionPage",
    headings: [
      "Sentinela Saúde Ambiental",
      "TKA Esportes",
      "Keeus",
      "Thiago Piola",
      "SaúdeGPT",
    ],
    questions: [],
    lastModified: "2026-08-28",
  },
  {
    path: "/contato",
    title: "Contato | Rei das Vendas em Franca, SP",
    description:
      "Fale pelo WhatsApp (16) 99233-3344 ou pelo e-mail contato@reidasvendas.com.br e organize o contexto do seu projeto digital.",
    category: "ContactPage",
    headings: ["WhatsApp", "E-mail", "Diagnóstico guiado"],
    questions: [],
    lastModified: "2026-08-28",
  },
  {
    path: "/sobre",
    title: "Sobre o Rei das Vendas | Franca, SP",
    description:
      "Princípios, forma de trabalho e responsabilidade por projetos digitais conduzidos a partir de Franca, SP.",
    category: "AboutPage",
    headings: [
      "Responsabilidade explícita",
      "Critério de trabalho",
      "Limite produtivo",
    ],
    questions: [],
    lastModified: "2026-08-28",
  },
  {
    path: "/blog",
    title: "Caderno de operação | Rei das Vendas",
    description:
      "Leituras sobre publicação, busca, atendimento e continuidade para decidir antes de construir.",
    category: "CollectionPage",
    headings: ARTICLES.map((article) => article.title),
    questions: [],
    lastModified: "2026-08-28",
  },
  {
    path: "/politica",
    title: "Política de privacidade | Rei das Vendas",
    description:
      "Como informações enviadas pelo diagnóstico e dados de medição são tratados.",
    category: "WebPage",
    headings: [
      "Informações",
      "Finalidade",
      "Operadores",
      "Conservação",
      "Medição",
      "Seus pedidos",
    ],
    questions: [],
    lastModified: "2026-10-05",
  },
  {
    path: "/termos",
    title: "Termos de uso | Rei das Vendas",
    description:
      "Condições gerais de uso e contratação dos serviços do Rei das Vendas para negócios locais e empresas em todo o Brasil.",
    category: "WebPage",
    headings: [
      "Modelos de relação",
      "Pagamento",
      "Propriedade",
      "Responsabilidade",
      "Cancelamento",
      "Fronteiras do escopo",
    ],
    questions: [],
    lastModified: "2026-08-28",
  },
];

const articleEntries = ARTICLES.map((article) => ({
  path: `/blog/${article.slug}`,
  title: `${article.title} | Rei das Vendas`,
  description: article.description,
  category: "Article",
  headings: article.sections.map((section) => section.heading),
  questions: [],
  published: article.published,
  lastModified: article.published,
}));

const entryMap = new Map();
// /planos e /black-friday vêm de GROWTH_SEO (fonte única, lida também pelo App).
// A data fica aqui porque só estas duas páginas foram publicadas agora; as
// demais entradas de GROWTH_SEO continuam com a data-base do acervo.
const DATA_GROWTH = {
  "/planos": "2026-10-05",
  "/diagnostico": "2026-10-05",
  "/black-friday": "2026-10-05",
};

for (const entry of [
  ...staticEntries,
  ...GROWTH_SEO.map((item) => ({
    ...item,
    lastModified: DATA_GROWTH[item.path] ?? "2026-08-28",
  })),
  ...articleEntries,
]) {
  entryMap.set(entry.path, entry);
}
// /obrigado é rota do app desde o começo, mas nunca teve HTML próprio. Sem arquivo
// pré-renderizado e sem rewrite de SPA a Vercel devolve 404 (medido em 05/10/2026),
// quebrando quem chega pelo comprovante, por e-mail antigo ou por link salvo.
// É página de confirmação: entra no build com noindex e fica fora do sitemap.
entryMap.set("/obrigado", {
  path: "/obrigado",
  title: "Próximos passos | Rei das Vendas",
  description:
    "Confira como confirmar seu contato, receber a proposta e aprovar o projeto. Esta página não confirma pagamento.",
  category: "WebPage",
  headings: [
    "Confirmação: comprovante e cronograma enviados por e-mail",
    "Próximo passo: retorno em até 24 horas úteis",
    "Construção: atualizações semanais até a entrega",
    "Entrega: no ar, testado e com treinamento",
  ],
  questions: [],
  lastModified: "2026-10-05",
  noIndex: true,
});

const entries = [...entryMap.values()];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function updateMeta(document, attribute, name, value) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const expression = new RegExp(
    `(<meta\\s+${attribute}=["']${escapedName}["']\\s+content=["'])[^"']*(["'])`,
    "i",
  );
  return document.replace(expression, `$1${escapeHtml(value)}$2`);
}

function structuredData(entry, url) {
  const entity = {
    "@type": entry.category,
    name: entry.title,
    description: entry.description,
    url,
    inLanguage: "pt-BR",
    ...(entry.category === "Service"
      ? { provider: { "@id": `${origin}/#organization` }, areaServed: "Brasil" }
      : {}),
    ...(entry.category === "Article"
      ? {
          headline: entry.title.replace(/ \| Rei das Vendas$/, ""),
          author: { "@id": `${origin}/#founder` },
          publisher: { "@id": `${origin}/#organization` },
          ...(entry.published
            ? {
                datePublished: entry.published,
                dateModified: entry.lastModified,
              }
            : {}),
        }
      : {}),
    ...(entry.category === "WebApplication"
      ? { applicationCategory: "BusinessApplication", operatingSystem: "Web" }
      : {}),
  };

  const graph = [
    entity,
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Rei das Vendas",
          item: `${origin}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: entry.title.replace(/ \| Rei das Vendas$/, ""),
          item: url,
        },
      ],
    },
  ];

  if (entry.questions.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: entry.questions.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replaceAll("<", "\\u003c");
}

function prerenderDocument(template, entry, markup) {
  const url = `${origin}${entry.path}`;
  let html = template.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(entry.title)}</title>`,
  );

  html = updateMeta(html, "name", "description", entry.description);
  // Página marcada como noIndex no app (App.tsx) precisa dizer o mesmo no HTML
  // estático — senão o arquivo entregue ao rastreador contradiz a aplicação.
  const robotsValue = entry.noIndex
    ? "noindex, follow"
    : "index, follow, max-snippet:-1, max-image-preview:large";
  html = updateMeta(html, "name", "robots", robotsValue);
  html = updateMeta(html, "name", "googlebot", robotsValue);
  html = updateMeta(html, "name", "twitter:title", entry.title);
  html = updateMeta(html, "name", "twitter:description", entry.description);
  html = updateMeta(
    html,
    "property",
    "og:type",
    entry.category === "Article" ? "article" : "website",
  );
  html = updateMeta(html, "property", "og:title", entry.title);
  html = updateMeta(html, "property", "og:description", entry.description);
  html = updateMeta(html, "property", "og:url", url);
  html = html.replace(
    /(<link\s+rel="canonical"\s+href=")[^"]*(")/i,
    `$1${escapeHtml(url)}$2`,
  );
  html = html.replace(
    /(<link\s+rel="alternate"\s+hreflang="(?:pt-BR|x-default)"\s+href=")[^"]*(")/gi,
    `$1${escapeHtml(url)}$2`,
  );
  html = html.replace(
    "</head>",
    `    <script id="rdv-static-schema" data-path="${escapeHtml(entry.path)}" type="application/ld+json">${structuredData(entry, url)}</script>\n  </head>`,
  );

  const rootTag = '<div id="root"></div>';
  if (!html.includes(rootTag))
    throw new Error(`Application root missing: ${entry.path}`);
  return html.replace(rootTag, `<div id="root">${markup}</div>`);
}

async function writeSitemap(target) {
  const listed = entries.filter((entry) => !entry.noIndex);
  const urls = listed
    .sort((a, b) => a.path.localeCompare(b.path, "pt-BR"))
    .map(
      (entry) =>
        `  <url>\n    <loc>${escapeHtml(`${origin}${entry.path}`)}</loc>\n    <lastmod>${entry.lastModified}</lastmod>\n  </url>`,
    )
    .join("\n");

  await writeFile(
    target,
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
  return listed.length;
}

if (updateSource) {
  const count = await writeSitemap(join(publicDirectory, "sitemap.xml"));
  process.stdout.write(
    `Updated source sitemap with ${count} canonical URLs.\n`,
  );
} else {
  const template = await readFile(join(distDirectory, "index.html"), "utf8");
  const output = join(projectRoot, ".prerender-pages.mjs");
  await build({
    entryPoints: [join(projectRoot, "src/prerender.tsx")],
    outfile: output,
    bundle: true,
    platform: "node",
    format: "esm",
    packages: "external",
    alias: { "@": join(projectRoot, "src") },
    jsx: "automatic",
    define: { "import.meta.env": "{}" },
  });
  const { renderPage } = await import(output);
  const growthCss = (await readdir(join(distDirectory, "assets"))).find(
    (name) => /^GrowthEngine-.*\.css$/.test(name),
  );
  for (const entry of entries) {
    const target = join(
      distDirectory,
      entry.path === "/" ? "index.html" : `${entry.path.slice(1)}.html`,
    );
    await mkdir(dirname(target), { recursive: true });
    let html = prerenderDocument(template, entry, renderPage(entry.path));
    if (growthCss && entry.path !== "/")
      html = html.replace(
        "</head>",
        `<link rel="stylesheet" href="/assets/${growthCss}" /></head>`,
      );
    await writeFile(target, html);
  }
  const notFound = {
    path: "/404",
    title: "Página não encontrada | Rei das Vendas",
    description:
      "Encontre os projetos, planos e formas de contato do Rei das Vendas.",
    category: "WebPage",
    headings: [],
    questions: [],
    noIndex: true,
    lastModified: "2026-10-22",
  };
  await writeFile(
    join(distDirectory, "404.html"),
    prerenderDocument(template, notFound, renderPage("/404")),
  );
  await unlink(output);
  await unlink(output.replace(/\.mjs$/, ".css")).catch(() => undefined);
  const count = await writeSitemap(join(distDirectory, "sitemap.xml"));
  process.stdout.write(
    `Prerendered ${entries.length} canonical pages; sitemap contains ${count} URLs.\n`,
  );
}
