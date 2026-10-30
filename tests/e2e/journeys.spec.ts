import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import content from '../../data/content.json';
import subscriptionArticles from '../../data/subscription-articles.json';
import { subscriptionSolutions } from '../../data/subscription-solutions';
const mainRoutes = [
  '/',
  '/metodo',
  '/diagnostico',
  '/servicos',
  '/resultados',
  '/cases',
  '/blog',
  '/faq',
  '/sobre',
  '/contato',
  '/privacidade',
  '/termos',
  '/obrigado',
  '/planos',
  '/simulador',
  '/casos',
  '/checkout',
  '/onboarding',
  '/area-do-cliente',
];
const serviceRoutes = content.services.map(
  (service) => `/servicos/${service.slug}`,
);
const articleRoutes = [...content.articles, ...subscriptionArticles].map(
  (article) => article.route,
);
const allRoutes = [
  ...mainRoutes,
  ...serviceRoutes,
  ...articleRoutes,
  ...subscriptionSolutions.map((solution) => '/' + solution.slug),
];
const rejectCookies = async (page: import('@playwright/test').Page) => {
  const reject = page.getByRole('button', {
    name: 'Rejeitar opcionais',
    exact: true,
  });
  await reject.waitFor({ state: 'visible' });
  await reject.click();
  await expect(reject).toBeHidden();
};

test('all public routes render unique metadata, one H1 and valid structured data', async ({
  request,
}) => {
  const titles = new Set<string>();
  for (const route of allRoutes) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
    const html = await response.text();
    expect((html.match(/<h1(?:\s|>)/g) || []).length, route).toBe(1);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    expect(title, route).toBeTruthy();
    expect(titles.has(title!), route).toBe(false);
    titles.add(title!);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    expect(canonical, route).toBeTruthy();
    expect(new URL(canonical!).href, route).toBe(
      new URL(route, 'https://www.reidasvendas.com.br').href,
    );
    for (const match of html.matchAll(
      /<script type="application\/ld\+json">(.*?)<\/script>/gs,
    ))
      expect(() => JSON.parse(match[1]), route).not.toThrow();
    if (route === '/obrigado') expect(html).toContain('noindex');
  }
  expect((await request.get('/pagina-que-nao-existe')).status()).toBe(404);
  expect((await request.get('/cases/caso-nao-publicado')).status()).toBe(404);
});

test('sitemap, robots, manifest and WhatsApp redirect stay consistent', async ({
  request,
}) => {
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('https://www.reidasvendas.com.br/servicos');
  expect(sitemap).not.toContain('/obrigado');
  expect(await (await request.get('/robots.txt')).text()).toContain(
    'sitemap.xml',
  );
  const manifest = await (await request.get('/manifest.webmanifest')).json();
  expect(manifest.name).toContain('Rei das Vendas');
  const response = await request.get(
    '/go/whatsapp?src=diagnostico&page=//evil.test&redirect=https://evil.test',
    { maxRedirects: 0 },
  );
  expect(response.status()).toBe(302);
  const location = new URL(response.headers().location);
  expect(location.origin).toBe('https://wa.me');
  expect(location.pathname).toBe('/5516992333344');
});

for (const width of [320, 375, 390, 414, 768, 1440])
  test(`responsive ${width}px: navigation, content and controls stay within viewport`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await rejectCookies(page);
    if (width === 1440 || width === 390) {
      await page.screenshot({
        path: `test-results/home-${width === 1440 ? 'desktop' : 'mobile'}.png`,
        fullPage: true,
      });
      await page.screenshot({
        path: `test-results/home-${width === 1440 ? 'desktop' : 'mobile'}-viewport.png`,
        fullPage: false,
      });
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const oversized = await page
      .locator('button, input, textarea, main a')
      .evaluateAll((elements) =>
        elements
          .filter((element) => {
            if (element.closest('.proof-feed')) return false;
            const box = element.getBoundingClientRect();
            return (
              box.width > 0 &&
              (box.left < -1 || box.right > window.innerWidth + 1)
            );
          })
          .map((element) => element.textContent?.trim().slice(0, 70)),
      );
    expect(oversized).toEqual([]);
    await page.goto('/diagnostico');
    await expect(page.getByLabel('Seu nome', { exact: true })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });

for (const route of [
  '/',
  '/diagnostico',
  '/servicos',
  '/metodo',
  '/faq',
  '/privacidade',
])
  test(`accessibility AA baseline ${route}`, async ({ page }) => {
    await page.goto(route);
    await rejectCookies(page);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(
      result.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  });

test('privacy: default denied, independent categories and reopening are functional', async ({
  page,
}) => {
  const requests: string[] = [];
  page.on('request', (request) => {
    if (
      /googletagmanager|google-analytics|facebook\.com|vercel-scripts/.test(
        request.url(),
      )
    )
      requests.push(request.url());
  });
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Você escolhe o que medir.' }),
  ).toBeVisible();
  expect(requests).toEqual([]);
  await page.getByRole('button', { name: 'Configurar', exact: true }).click();
  const analytics = page.getByRole('checkbox', {
    name: 'Análise de uso (Google Analytics)',
    exact: true,
  });
  const marketing = page.getByRole('checkbox', {
    name: 'Publicidade (Meta e sinais de anúncios Google)',
    exact: true,
  });
  await expect(analytics).not.toBeChecked();
  await expect(marketing).not.toBeChecked();
  await analytics.check();
  await page
    .getByRole('button', { name: 'Salvar preferências', exact: true })
    .click();
  const saved = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('rdv-consent-v1') || '{}'),
  );
  expect(saved.analytics).toBe(true);
  expect(saved.marketing).toBe(false);
  await page
    .getByRole('button', { name: 'Preferências de cookies', exact: true })
    .click();
  await expect(analytics).toBeChecked();
  await expect(marketing).not.toBeChecked();
  await page
    .getByRole('button', { name: 'Rejeitar opcionais', exact: true })
    .click();
  await page.waitForLoadState('domcontentloaded');
  const rejected = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('rdv-consent-v1') || '{}'),
  );
  expect(rejected.analytics).toBe(false);
  expect(rejected.marketing).toBe(false);
});

test('micro-conversions: quiz, calculator and accessible validation preserve honest outcomes', async ({
  page,
}) => {
  await page.goto('/simulador');
  await rejectCookies(page);
  const calculator = page.getByLabel('Contatos no mês', { exact: true });
  await calculator.fill('100');
  await page.getByLabel('Fechamento atual (%)', { exact: true }).fill('20');
  await page
    .getByLabel('Fechamento no cenário (%)', { exact: true })
    .fill('30');
  await page.getByLabel('Ticket médio (R$)', { exact: true }).fill('100');
  await expect(page.locator('.calculator-result output')).toContainText(
    '1.000',
  );
  await page.getByRole('button', { name: 'Ainda não', exact: true }).click();
  await page
    .getByRole('button', { name: 'Depende da memória', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Ainda não medimos', exact: true })
    .click();
  await expect(
    page.getByRole('heading', {
      name: '0/3 fundamentos presentes',
      exact: true,
    }),
  ).toBeVisible();
  await page.goto('/diagnostico');
  await page.locator('form button[type="submit"]').click();
  await expect(page.getByLabel('Seu nome', { exact: true })).toBeFocused();
  await expect(
    page.getByText('Informe seu nome.', { exact: true }),
  ).toBeVisible();
  await page.goto('/obrigado');
  await expect(page.getByRole('status')).toContainText('não confirma envio');
});

test('keyboard and reduced motion keep navigation and reading available', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await rejectCookies(page);
  await page.reload();
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: /(?:Ir|Pular) para o conteúdo/i }),
  ).toBeFocused();
  const intents = page.getByRole('tablist', {
    name: 'Seu principal desafio',
    exact: true,
  });
  await expect(intents.getByRole('tab')).toHaveCount(5);
  const first = intents.getByRole('tab', {
    name: 'Não recebo contatos',
    exact: true,
  });
  const second = intents.getByRole('tab', {
    name: 'Site não converte',
    exact: true,
  });
  const last = intents.getByRole('tab', {
    name: 'Quero continuidade',
    exact: true,
  });
  await first.focus();
  await first.press('ArrowRight');
  await expect(second).toBeFocused();
  await expect(second).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText(
    'Visita sem próximo passo vira oportunidade perdida.',
  );
  await second.press('ArrowLeft');
  await expect(first).toBeFocused();
  await first.press('End');
  await expect(last).toBeFocused();
  await expect(last).toHaveAttribute('aria-selected', 'true');
  await expect(
    page
      .getByRole('tabpanel')
      .getByRole('link', { name: /Comparar os planos/ }),
  ).toHaveAttribute('href', '/planos');
  await last.press('Home');
  await expect(first).toBeFocused();
  await expect(first).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

for (const route of [
  '/servicos/criacao-de-sites-franca',
  '/servicos/social-media-franca',
]) {
  test(`service conversion controls fit at 320px ${route}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto(route);
    await rejectCookies(page);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    const outside = await page
      .locator('main a, main button, main input, main textarea')
      .evaluateAll((elements) =>
        elements
          .filter((element) => {
            const box = element.getBoundingClientRect();
            return (
              box.width > 0 &&
              (box.left < -1 || box.right > window.innerWidth + 1)
            );
          })
          .map((element) => element.textContent?.trim().slice(0, 80)),
      );
    expect(outside).toEqual([]);
    const contact = page.locator('main a[href^="/go/whatsapp"]');
    await expect(contact).toBeVisible();
    const box = await contact.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });
}
