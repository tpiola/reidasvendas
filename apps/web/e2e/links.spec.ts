import { expect, test } from '@playwright/test';

function isInternalHref(href: string): boolean {
  if (!href) return false;
  if (href.startsWith('#')) return false;
  if (href.startsWith('mailto:')) return false;
  if (href.startsWith('tel:')) return false;
  if (href.startsWith('http://') || href.startsWith('https://')) return false;
  return href.startsWith('/');
}

test('links internos navegam sem 404', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('/');

  const hrefs = await page.$$eval('a[href]', (els) =>
    Array.from(els)
      .map((a) => a.getAttribute('href') ?? '')
      .filter(Boolean),
  );

  const unique = Array.from(new Set(hrefs)).filter(isInternalHref);

  for (const href of unique) {
    const r = await page.goto(href, { waitUntil: 'domcontentloaded' });
    expect(r?.status(), `status para ${href}`).not.toBe(404);
    const notFoundCount = await page.getByRole('heading', { name: 'Página não encontrada' }).count();
    expect(notFoundCount, `rota inválida: ${href}`).toBe(0);
  }
});
