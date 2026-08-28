import { access, readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MARKETPLACE_ITEMS } from '../src/lib/marketplace.ts';
import { SEO_BY_PATH } from '../src/lib/growth.ts';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const distDirectory = join(projectRoot, 'dist');
const origin = 'https://reidasvendas.com.br';
const forbiddenPublicPatterns = [
  /data-theme=["']light["']/i,
  /5516993333344/,
  /\bfarm[aá]cia\b/i,
  /drogalar/i,
  /home-hero-email/i,
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function exists(pathname) {
  try {
    await access(pathname);
    return true;
  } catch {
    return false;
  }
}

async function collectTextFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectTextFiles(path));
    else if (/\.(?:html|js|css|json|txt|xml|webmanifest)$/i.test(entry.name)) files.push(path);
  }
  return files;
}

const sitemap = await readFile(join(distDirectory, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert(urls.length >= 50, `Sitemap incompleto: ${urls.length} URLs.`);
assert(new Set(urls).size === urls.length, 'Sitemap contém URLs duplicadas.');

for (const url of urls) {
  assert(url.startsWith(origin), `Origem canônica inválida: ${url}`);
  const pathname = new URL(url).pathname;
  const htmlPath = pathname === '/'
    ? join(distDirectory, 'index.html')
    : join(distDirectory, `${pathname.slice(1)}.html`);
  assert(await exists(htmlPath), `HTML prerenderizado ausente: ${pathname}`);
  const html = await readFile(htmlPath, 'utf8');
  assert(/<html[^>]+data-theme=["']dark["']/i.test(html), `Tema inicial não é dark: ${pathname}`);
  assert(/<title>[^<]+<\/title>/i.test(html), `Title ausente: ${pathname}`);
  assert(html.includes(`<link rel="canonical" href="${url}"`), `Canonical divergente: ${pathname}`);
  assert(/<main\b/i.test(html), `Conteúdo inicial ausente: ${pathname}`);
  for (const pattern of forbiddenPublicPatterns) {
    assert(!pattern.test(html), `Conteúdo proibido em ${pathname}: ${pattern}`);
  }

  const assetPaths = [...html.matchAll(/(?:src|href)=["'](\/[^"']+\.[a-z0-9]+)(?:\?[^"']*)?["']/gi)]
    .map((match) => match[1]);
  for (const assetPath of assetPaths) {
    assert(await exists(join(distDirectory, assetPath.slice(1))), `Asset ausente em ${pathname}: ${assetPath}`);
  }
}

for (const item of MARKETPLACE_ITEMS) {
  assert(SEO_BY_PATH.has(`/solucoes/${item.solution}`), `Solução sem página canônica: ${item.solution}`);
}

const textFiles = await collectTextFiles(distDirectory);
const publicText = (await Promise.all(textFiles.map((file) => readFile(file, 'utf8')))).join('\n');
assert(publicText.includes('5516992333344'), 'WhatsApp oficial ausente no artefato.');
assert(publicText.includes('contato@reidasvendas.com.br'), 'E-mail oficial ausente no artefato.');
assert(!await exists(join(distDirectory, 'imagens/portfolio/drogalar.webp')), 'Asset de farmácia permaneceu no deploy.');
assert(!await exists(join(distDirectory, 'imagens/nichos')), 'Banco antigo de imagens permaneceu no deploy.');
assert(!await exists(join(distDirectory, 'imagens/services')), 'Banco antigo de imagens de serviço permaneceu no deploy.');
for (const pattern of forbiddenPublicPatterns) {
  assert(!pattern.test(publicText), `Conteúdo proibido no artefato: ${pattern}`);
}

process.stdout.write(`Production validation passed: ${urls.length} canonical pages, ${MARKETPLACE_ITEMS.length} marketplace entries.\n`);
