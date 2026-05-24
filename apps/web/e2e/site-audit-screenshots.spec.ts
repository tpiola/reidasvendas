import { test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '../optimizations/audit-screenshots');

const ROUTES = ['/', '/planos', '/projetos', '/blog', '/diagnostico', '/contato', '/governanca'] as const;

const HOME_BLOCKS = [
  { slug: 'hero', selector: '.hero-dark' },
  { slug: 'demo', selector: '#demo' },
  { slug: 'evolucao', selector: '#evolucao' },
  { slug: 'como-funciona', selector: '#como-funciona' },
  { slug: 'projetos', selector: '#projetos' },
  { slug: 'faq', selector: '#faq' },
  { slug: 'cta-final', selector: '#diagnostico-form' },
] as const;

async function setTheme(page: import('@playwright/test').Page, theme: 'light' | 'dark') {
  await page.addInitScript((t) => {
    localStorage.setItem('theme', t);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(t);
  }, theme);
}

function ensureOutDir() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

test.describe('Auditoria visual — capturas bloco a bloco', () => {
  test.beforeAll(() => {
    ensureOutDir();
  });

  for (const theme of ['light', 'dark'] as const) {
    for (const route of ROUTES) {
      test(`rota ${route} (${theme})`, async ({ page }) => {
        await setTheme(page, theme);
        await page.goto(route, { waitUntil: 'networkidle' });
        await page.waitForTimeout(400);
        const slug = route === '/' ? 'home-full' : route.slice(1).replace(/\//g, '-');
        await page.screenshot({
          path: path.join(OUT_DIR, `${slug}-${theme}.png`),
          fullPage: true,
        });
      });
    }
  }

  for (const theme of ['light', 'dark'] as const) {
    for (const block of HOME_BLOCKS) {
      test(`home · ${block.slug} (${theme})`, async ({ page }) => {
        await setTheme(page, theme);
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        const el = page.locator(block.selector).first();
        await el.scrollIntoViewIfNeeded();
        await page.waitForTimeout(350);
        await el.screenshot({
          path: path.join(OUT_DIR, `home-${block.slug}-${theme}.png`),
        });
      });
    }
  }

  test('blog post — capa', async ({ page }) => {
    await setTheme(page, 'light');
    await page.goto('/blog/funil-whatsapp-negocio-local', { waitUntil: 'networkidle' });
    await page.locator('.media-band img').first().screenshot({
      path: path.join(OUT_DIR, 'blog-post-cover-light.png'),
    });
  });
});
