import { test, expect } from "@playwright/test";

test("58 rotas canônicas têm HTML, SEO, schema legível e navegam sem erro de runtime", async ({
  page,
  request,
}) => {
  test.setTimeout(300000);
  await page.addInitScript(() =>
    localStorage.setItem(
      "reidasvendas:consent-v2",
      JSON.stringify({
        version: "2026-10-22",
        necessary: true,
        analytics: false,
        marketing: false,
        updatedAt: "2026-10-22T00:00:00Z",
        expiresAt: "2099-01-01T00:00:00Z",
      }),
    ),
  );
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => new URL(m[1]).pathname,
  );
  expect(paths).toHaveLength(58);
  const errors: string[] = [];
  page.on("pageerror", (error) =>
    errors.push(`${page.url()}: ${error.message}`),
  );
  for (const path of paths) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    const html = await response.text();
    expect((html.match(/<h1\b/gi) || []).length, path).toBe(1);
    expect(html, path).not.toContain('id="rdv-boot"');
    for (const match of html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ))
      expect(() => JSON.parse(match[1]), path).not.toThrow();
    await page.goto(path, { waitUntil: "networkidle" });
    await expect(page.locator("header.rdv-header")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator("main")).toBeVisible();
    expect(await page.locator("link[rel=canonical]").getAttribute("href")).toBe(
      `https://reidasvendas.com.br${path}`,
    );
  }
  expect(errors).toEqual([]);
});

test("preços normais e promocionais permanecem coerentes", async ({ page }) => {
  await page.goto("/planos");
  for (const value of ["1.497", "3.297", "5.497"])
    await expect(page.locator("main")).toContainText(value);
  await page.goto("/black-friday");
  for (const value of ["1.048", "2.308", "3.848"])
    await expect(page.locator("main")).toContainText(value);
  await expect(page.locator("main")).toContainText("27 de novembro");
});

test("recusa de analytics não dispara tags de medição", async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "reidasvendas:consent-v2",
      JSON.stringify({
        version: "2026-10-22",
        necessary: true,
        analytics: false,
        marketing: false,
        updatedAt: "2026-10-22T00:00:00Z",
        expiresAt: "2099-01-01T00:00:00Z",
      }),
    ),
  );
  const calls: string[] = [];
  page.on("request", (request) => {
    if (/google-analytics|googletagmanager/.test(request.url()))
      calls.push(request.url());
  });
  await page.goto("/", { waitUntil: "networkidle" });
  expect(calls).toEqual([]);
});

test("conteúdo comercial permanece visível sem JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const path of [
    "/",
    "/planos",
    "/black-friday",
    "/portfolio",
    "/solucoes/site-para-clinicas",
  ]) {
    await page.goto(`http://127.0.0.1:4173${path}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("header.rdv-header")).toHaveCount(1);
  }
  await context.close();
});
