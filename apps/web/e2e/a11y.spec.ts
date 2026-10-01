import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('a11y: jornadas públicas sem violações sérias ou críticas', async ({ page }) => {
  // 6 rotas x (goto + axe) estoura 60s em container apertado (>=6s por axe).
  // O teto aqui e so folga de relogio: a assercao de violacoes nao muda.
  test.setTimeout(180000);
  const routes = ['/', '/solucoes', '/planos', '/portfolio', '/contato', '/diagnostico'];
  const blocking: Array<{
    route: string;
    id: string;
    impact: string | null;
    nodes: Array<{ target: string[]; html: string }>;
  }> = [];

  for (const route of routes) {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main')).toBeVisible();
    await page.addStyleTag({
      content:
        '*{animation-duration:0.001ms !important;animation-iteration-count:1 !important;transition-duration:0.001ms !important;scroll-behavior:auto !important;}',
    });
    await page.waitForTimeout(400);
    const results = await new AxeBuilder({ page }).analyze();
    blocking.push(
      ...results.violations
        .filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')
        .map((violation) => ({
          route,
          id: violation.id,
          impact: violation.impact,
          nodes: violation.nodes.map((node) => ({
            target: node.target.map(String),
            html: node.html,
          })),
        })),
    );
  }

  expect(blocking).toEqual([]);
});
