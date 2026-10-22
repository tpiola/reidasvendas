import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem("reidasvendas:cookie-consent", "rejected"),
  );
});

test("home serve a mesma proposta no HTML e no navegador, sem cortina", async ({
  page,
  request,
}) => {
  const response = await request.get("/");
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  expect(html).not.toContain('id="rdv-boot"');
  expect(html).toContain("Seu negócio merece ser encontrado.");
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /seu negócio merece ser encontrado/i,
    }),
  ).toBeVisible();
  await expect(page.locator("header nav")).toHaveCount(1);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("link", { name: "Quero receber mais contatos" }).click();
  await expect(page.locator("#comecar")).toBeInViewport();
});

test("duas portas diferenciam implantação e auditoria", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("tabpanel")).toContainText("R$ 1.497");
  await page.getByRole("tab", { name: /já tenho tráfego/i }).click();
  await expect(page.getByRole("tabpanel")).toContainText("R$ 1.500–2.500");
  await expect(
    page
      .getByRole("tabpanel")
      .getByRole("link", { name: /solicitar diagnóstico/i }),
  ).toHaveAttribute("href", "/diagnostico?estagio=triagem");
});

test("simulador calcula contatos e fechamento com premissas visíveis", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".obs-calculator-total")).toContainText("R$ 600");
  await page
    .getByRole("slider", { name: "Visita → contato desejada" })
    .fill("3");
  await expect(page.locator(".obs-calculator-total")).toContainText("R$ 1.200");
  await expect(page.locator(".obs-simulator")).toContainText("Não é previsão");
});

test("plano passa direto para três escolhas e preserva preço no WhatsApp", async ({
  page,
}) => {
  await page.goto("/planos");
  await page
    .locator("article")
    .filter({
      has: page.getByRole("heading", {
        name: "Site profissional",
        exact: true,
      }),
    })
    .getByRole("link", { name: /quero este/i })
    .click();
  await expect(page).toHaveURL(/plano=site-profissional/);
  await expect(page.getByLabel("Faturamento mensal aproximado")).toHaveCount(0);
  await page.getByRole("button", { name: /serviços locais/i }).click();
  await page.getByRole("button", { name: /criar meu site/i }).click();
  await page.getByRole("button", { name: /^agora/i }).click();
  const link = page.getByRole("link", { name: /continuar no whatsapp/i });
  await expect(link).toBeVisible();
  expect(
    new URL((await link.getAttribute("href"))!).searchParams
      .get("text")
      ?.replace(/\s/g, " "),
  ).toContain("Site profissional · R$ 3.297");
});

test("rotas estratégicas, catálogo e vertical mantêm conteúdo e navegação", async ({
  page,
}) => {
  for (const route of [
    "/solucoes",
    "/planos",
    "/black-friday",
    "/portfolio",
    "/diagnostico?estagio=triagem",
    "/solucoes/site-para-clinicas",
  ]) {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  }
  await page.getByRole("button", { name: /clínica ou consultório/i }).click();
  await page.getByRole("button", { name: /receber mais contatos/i }).click();
  await page.getByRole("button", { name: /^agora/i }).click();
  const href = await page
    .getByRole("link", { name: /continuar no whatsapp/i })
    .getAttribute("href");
  expect(new URL(href!).searchParams.get("text")).toContain(
    "/solucoes/site-para-clinicas",
  );
});

for (const viewport of [
  { width: 320, height: 812 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 414, height: 896 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
]) {
  test(`home sem overflow e menu acessível em ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      ),
    ).toBeLessThanOrEqual(1);
    await page.screenshot({
      path: `/tmp/rdv-home-${viewport.width}.png`,
      fullPage: true,
    });
    if (viewport.width < 900) {
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await page
        .locator("header nav")
        .getByRole("link", { name: "Planos" })
        .click();
      await expect(page).toHaveURL(/\/planos/);
    }
  });
}

test("brief da abertura chega à qualificação com o contexto preservado", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByLabel("O que você quer construir?")
    .fill("Quero um catálogo para minha loja em Franca");
  await page.getByRole("button", { name: "Começar meu projeto" }).click();
  await expect(page).toHaveURL(/modo=implantacao/);
  expect(new URL(page.url()).searchParams.get("objetivo")).toBe(
    "Quero um catálogo para minha loja em Franca",
  );
  await page.getByRole("button", { name: /loja ou restaurante/i }).click();
  await page.getByRole("button", { name: /organizar catálogo/i }).click();
  await page.getByRole("button", { name: /^agora/i }).click();
  const href = await page
    .getByRole("link", { name: /continuar no whatsapp/i })
    .getAttribute("href");
  expect(new URL(href!).searchParams.get("text")).toContain(
    "Objetivo: Quero um catálogo para minha loja em Franca",
  );
});
