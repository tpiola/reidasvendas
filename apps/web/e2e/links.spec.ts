import { expect, test } from '@playwright/test';

function isInternalHref(href: string): boolean {
  if (!href) return false;
  if (href.startsWith('#')) return false;
  if (href.startsWith('mailto:')) return false;
  if (href.startsWith('tel:')) return false;
  if (href.startsWith('http://') || href.startsWith('https://')) return false;
  return href.startsWith('/');
}

test('links internos navegam sem 404', async ({ page, context }) => {
  test.setTimeout(120000);
  await page.goto('/');

  const hrefs = await page.$$eval('a[href]', (els) =>
    Array.from(els)
      .map((a) => a.getAttribute('href') ?? '')
      .filter(Boolean),
  );

  const unique = Array.from(new Set(hrefs)).filter(isInternalHref);
  await page.close();

  // Uma aba nova a cada N rotas: navegar ~56 rotas deste SPA na MESMA aba acumula
  // memória do renderer até ele ser morto ("Target crashed"), falhando de forma
  // intermitente e em pontos diferentes a cada execução. Em container apertado isso
  // derruba o job e2e sem que exista rota quebrada.
  const CHUNK = 8;
  for (let i = 0; i < unique.length; i += CHUNK) {
    const tab = await context.newPage();
    for (const href of unique.slice(i, i + CHUNK)) {
      // Rotas legadas (12: /templates, /projetos, /builder…) redirecionam no CLIENTE
      // via <Navigate replace>. Se o goto seguinte chega enquanto o router troca de
      // rota, o Chromium aborta a navegação dura com ERR_ABORTED — efeito do redirect
      // desejado, não rota quebrada.
      let status: number | undefined;
      try {
        const r = await tab.goto(href, { waitUntil: 'domcontentloaded' });
        status = r?.status();
      } catch (error) {
        if (!/ERR_ABORTED/.test(String(error))) throw error;
        await tab.waitForLoadState('domcontentloaded').catch(() => undefined);
        status = 200;
      }
      expect(status, `status para ${href}`).not.toBe(404);
      const notFoundCount = await tab.getByRole('heading', { name: 'Página não encontrada' }).count();
      expect(notFoundCount, `rota inválida: ${href}`).toBe(0);
    }
    await tab.close();
  }
});
