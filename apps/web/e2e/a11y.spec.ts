import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("a11y: jornadas públicas sem violações sérias ou críticas", async ({
  page,
}) => {
  // 6 rotas x (goto + axe) estoura 60s em container apertado (>=6s por axe).
  // O teto aqui e so folga de relogio: a assercao de violacoes nao muda.
  test.setTimeout(180000);
  const routes = [
    "/",
    "/solucoes",
    "/planos",
    "/portfolio",
    "/contato",
    "/diagnostico",
  ];
  const blocking: Array<{
    route: string;
    id: string;
    impact: string | null;
    nodes: Array<{ target: string[]; html: string }>;
  }> = [];

  for (const route of routes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toBeVisible();
    await page.addStyleTag({
      content:
        "*{animation-duration:0.001ms !important;animation-iteration-count:1 !important;transition-duration:0.001ms !important;scroll-behavior:auto !important;}",
    });
    await page.waitForTimeout(400);
    const results = await new AxeBuilder({ page }).analyze();
    blocking.push(
      ...results.violations
        .filter(
          (violation) =>
            violation.impact === "critical" || violation.impact === "serious",
        )
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

test("a11y: o mockup mantém contraste com movimento normal no celular", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".obs-notification")).toHaveCSS("opacity", "1");
  expect(
    await page
      .locator("body")
      .evaluate((el) => getComputedStyle(el, "::before").display),
  ).toBe("none");
  expect(
    await page
      .locator("body")
      .evaluate((el) => getComputedStyle(el, "::after").display),
  ).toBe("none");
  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    ),
  ).toEqual([]);
});
