import { test, expect } from "@playwright/test";
test("preferências opcionais, registro e revogação estão disponíveis", async ({
  page,
}) => {
  await page.goto("/");
  const banner = page.getByRole("complementary", {
    name: "Preferências de privacidade",
  });
  await expect(banner).toBeVisible();
  expect(
    await page.evaluate(() =>
      sessionStorage.getItem("rdv-acquisition-attribution"),
    ),
  ).toBeNull();
  await banner
    .getByRole("button", { name: "Personalizar", exact: true })
    .click();
  await expect(
    banner.getByRole("checkbox", { name: /Medição:/ }),
  ).not.toBeChecked();
  await banner.getByRole("checkbox", { name: /Medição:/ }).check();
  await banner.getByRole("button", { name: "Salvar preferências" }).click();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("reidasvendas:consent-v2")!).analytics,
    ),
  ).toBe(true);
  await page
    .getByRole("button", { name: "Preferências de cookies", exact: true })
    .click();
  await banner.getByRole("button", { name: "Rejeitar não essenciais" }).click();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("reidasvendas:consent-v2")!).analytics,
    ),
  ).toBe(false);
});
test("sticky aparece depois do hero e sai no rodapé", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Rejeitar não essenciais" }).click();
  const sticky = page.getByTestId("sticky-mobile-cta");
  await expect(sticky).toBeHidden();
  await page.locator("#method-title").scrollIntoViewIfNeeded();
  await expect(sticky).toBeVisible();
  const href = await sticky.getByRole("link").getAttribute("href");
  expect(new URL(href!).pathname).toBe("/5516992333344");
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(sticky).toBeHidden();
});
test("FAQ nativo funciona com teclado e sem JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  const summary = page.locator(".commercial-faq summary").first();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".commercial-faq details").first()).toHaveAttribute(
    "open",
    "",
  );
  await expect(page.locator(".commercial-faq details").first()).toContainText(
    "R$ 1.497",
  );
  await context.close();
});
test("canonical ignora campanha e schema não inventa localização física", async ({
  page,
}) => {
  await page.goto(
    "/?utm_source=teste&gclid=click&gbraid=braid&_gl=linker&_up=1&_gs=1",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://reidasvendas.com.br/",
  );
  await expect(page.locator("link[hreflang]")).toHaveCount(0);
  const schema = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  expect(schema.join("")).not.toContain('"latitude"');
  expect(schema.join("")).not.toContain('"LocalBusiness"');
});
test("reflow equivalente a 200% mantém leitura e navegação", async ({
  page,
}) => {
  await page.setViewportSize({ width: 640, height: 480 });
  await page.goto("/");
  await page.getByRole("button", { name: "Rejeitar não essenciais" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(
    page
      .locator("header nav")
      .getByRole("link", { name: "Planos", exact: true }),
  ).toBeVisible();
});
