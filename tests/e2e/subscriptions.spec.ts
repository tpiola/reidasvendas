import { test, expect, type Page, type Locator } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// These checks run against the reviewed build with payment activation disabled.
// No test pays, creates a customer, sends a message or submits a real lead.
async function rejectOptionalCookies(page: Page) {
  const choice = page.getByRole('button', {
    name: 'Rejeitar opcionais',
    exact: true,
  });
  await choice.waitFor({ state: 'visible' });
  await choice.click();
  await expect(choice).toBeHidden();
}
const card = (page: Page, name: string) =>
  page.locator('.pricing-card').filter({
    has: page.getByRole('heading', { name, exact: true }),
  });

async function expectVisibleBillingCycle(
  planCard: Locator,
  cycle: 'mensal' | 'anual',
) {
  const opposite = cycle === 'mensal' ? 'anual' : 'mensal';
  // Both cycles exist in SSR HTML. textContent alone cannot prove the selected price is shown.
  for (const group of [
    '.pricing-amount strong',
    '.pricing-amount > span',
    '.pricing-payment',
    '.pricing-year strong',
  ]) {
    await expect(
      planCard.locator(`${group} [data-cycle="${cycle}"]`),
    ).toBeVisible();
    await expect(
      planCard.locator(`${group} [data-cycle="${opposite}"]`),
    ).toBeHidden();
  }
  await expect(
    planCard.locator(`a.pricing-select[data-cycle="${cycle}"]`),
  ).toBeVisible();
  await expect(
    planCard.locator(`a.pricing-select[data-cycle="${opposite}"]`),
  ).toBeHidden();
}

async function expectNoRootOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  const outside = await page
    .locator('main a, main button, main input, main select')
    .evaluateAll((elements) =>
      elements
        .filter((element) => {
          // The comparison table is deliberately horizontally scrollable.
          if (element.closest('.plan-comparison-scroll, .proof-feed'))
            return false;
          const box = element.getBoundingClientRect();
          return (
            box.width > 0 &&
            (box.left < -1 || box.right > window.innerWidth + 1)
          );
        })
        .map((element) => element.textContent?.trim().slice(0, 90)),
    );
  expect(outside).toEqual([]);
  const clippedButtons = await page
    .locator('main .button')
    .evaluateAll((elements) =>
      elements
        .filter((element) => element.scrollWidth > element.clientWidth + 1)
        .map((element) => element.textContent?.trim().slice(0, 90)),
    );
  expect(clippedButtons).toEqual([]);
}

test('monthly offer separates recurring price, setup, limits and proposal status', async ({
  page,
}) => {
  await page.goto('/planos');
  await rejectOptionalCookies(page);
  await expect(
    page.getByRole('radio', { name: 'Mensal', exact: true }),
  ).toBeChecked();
  for (const plan of [
    {
      name: 'Essencial',
      monthly: '497',
      setup: '1.497',
      pages: '5',
      adjustments: '2',
    },
    {
      name: 'Profissional',
      monthly: '997',
      setup: '2.497',
      pages: '10',
      adjustments: '4',
    },
    {
      name: 'Escala',
      monthly: '1.997',
      setup: '3.997',
      pages: '15',
      adjustments: '8',
    },
  ]) {
    const planCard = card(page, plan.name);
    await expectVisibleBillingCycle(planCard, 'mensal');
    await expect(
      planCard.locator('.pricing-amount strong [data-cycle="mensal"]'),
    ).toHaveText(`R$ ${plan.monthly}`);
    await expect(planCard.locator('.pricing-setup')).toContainText(plan.setup);
    await planCard.locator('summary').click();
    await expect(planCard.locator('.pricing-limits')).toContainText(
      `Até ${plan.pages} páginas`,
    );
    await expect(planCard.locator('.pricing-limits')).toContainText(
      `Até ${plan.adjustments} ajustes`,
    );
    await expect(planCard.locator('.pricing-limits')).toContainText(
      '20 minutos',
    );
  }
  await expect(page.locator('.pricing-proposal-note')).toContainText(
    'não ativa assinatura nem cobrança',
  );
  await expect(page.locator('.pricing-bottom-note')).toContainText(
    'verba de anúncios',
  );
  await page
    .locator('.subscription-faq details')
    .filter({
      hasText: 'Como ficam o domínio, o cancelamento e meus materiais?',
    })
    .locator('summary')
    .click();
  await expect(page.locator('.subscription-faq')).toContainText(
    'efeitos do cancelamento',
  );
  await expect(
    page.getByRole('button', { name: /pagar|assinar agora/i }),
  ).toHaveCount(0);
});

test('annual comparison shows full yearly amounts and does not discount setup', async ({
  page,
}) => {
  await page.goto('/planos');
  await rejectOptionalCookies(page);
  await page
    .locator('.billing-switch label')
    .filter({ hasText: 'Anual' })
    .click();
  await expect(page.getByRole('radio', { name: /Anual/ })).toBeChecked();
  for (const plan of [
    {
      name: 'Essencial',
      equivalent: '457,24',
      annual: '5.486,88',
      setup: '1.497',
      firstYear: '6.983,88',
    },
    {
      name: 'Profissional',
      equivalent: '917,24',
      annual: '11.006,88',
      setup: '2.497',
      firstYear: '13.503,88',
    },
    {
      name: 'Escala',
      equivalent: '1.837,24',
      annual: '22.046,88',
      setup: '3.997',
      firstYear: '26.043,88',
    },
  ]) {
    const planCard = card(page, plan.name);
    await expectVisibleBillingCycle(planCard, 'anual');
    await expect(
      planCard.locator('.pricing-amount strong [data-cycle="anual"]'),
    ).toHaveText(`R$ ${plan.equivalent}`);
    await expect(
      planCard.locator('.pricing-payment [data-cycle="anual"]'),
    ).toContainText(plan.annual);
    await expect(
      planCard.locator('.pricing-payment [data-cycle="anual"]'),
    ).toContainText('não parcela');
    await expect(planCard.locator('.pricing-setup')).toContainText(plan.setup);
    await expect(
      planCard.locator('.pricing-year strong [data-cycle="anual"]'),
    ).toContainText(plan.firstYear);
    await expect(
      planCard.getByRole('link', { name: `Pedir proposta do ${plan.name}` }),
    ).toHaveAttribute(
      'href',
      `/diagnostico?plano=${plan.name.toLowerCase()}&ciclo=anual`,
    );
  }
  await expect(
    page.locator('.plan-comparison caption [data-cycle="anual"]'),
  ).toBeVisible();
  await expect(
    page.locator('.plan-comparison caption [data-cycle="mensal"]'),
  ).toBeHidden();
  await expect(
    page.locator('.plan-comparison caption [data-cycle="anual"]'),
  ).toHaveText('anual');
});

test('plan interest opens a reviewable proposal directly, preserving cycle and without compulsory intake', async ({
  page,
  request,
}) => {
  await page.goto('/planos');
  await rejectOptionalCookies(page);
  await page
    .locator('.billing-switch label')
    .filter({ hasText: 'Anual' })
    .click();
  await card(page, 'Profissional')
    .getByRole('link', { name: 'Pedir proposta do Profissional' })
    .click();
  await expect(page).toHaveURL(
    /\/diagnostico\?plano=profissional&ciclo=anual$/,
  );
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Revise a proposta do Profissional.',
  );
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.locator('main form, main select')).toHaveCount(0);
  await expect(page.locator('.checkout-totals')).toContainText('11.006,88');
  await expect(page.locator('.checkout-totals')).toContainText('2.497');
  await expect(page.locator('.checkout-totals')).toContainText('13.503,88');
  await expect(page.locator('main')).toContainText(
    'A contratação é feita por proposta',
  );
  await expect(
    page.getByRole('button', { name: 'Ir ao pagamento seguro' }),
  ).toHaveCount(0);
  const preview = page.locator('.proposal-message p');
  await expect(preview).toContainText('plano Profissional, no ciclo anual');
  const cta = page.getByRole('link', { name: /Pedir proposta no WhatsApp/ });
  await expect(cta).toHaveAttribute('href', /plano=profissional.*ciclo=anual/);
  // Resolve only the site's redirect; never submit a real message to WhatsApp.
  const response = await request.get((await cta.getAttribute('href'))!, {
    maxRedirects: 0,
  });
  expect(response.status()).toBe(302);
  const destination = new URL(response.headers().location);
  expect(destination.origin + destination.pathname).toBe(
    'https://wa.me/5516992333344',
  );
  expect(destination.searchParams.get('text')).toBe(
    await preview.textContent(),
  );
  expect(
    await page.evaluate(() =>
      sessionStorage.getItem('rdv-subscription-intake'),
    ),
  ).toBeNull();
  await expect(page.locator('.whatsapp-float')).toBeHidden();
  await page.screenshot({
    path: 'test-results/proposal-desktop.png',
    fullPage: true,
  });
});

test('checkout endpoint unavailable returns 503 and never a fake success or payment URL', async ({
  request,
}) => {
  const response = await request.post('/api/checkout', {
    headers: { origin: 'https://www.reidasvendas.com.br' },
    data: {
      planId: 'profissional',
      cycle: 'annual',
      requestId: 'c1ff638f-08cb-4fd5-bd84-0b90ef0d75e4',
      termsAccepted: true,
      website: '',
    },
  });
  expect(response.status()).toBe(503);
  expect(response.headers()['cache-control']).toContain('no-store');
  const body = await response.json();
  expect(body.error).toBeTruthy();
  expect(body).not.toHaveProperty('url');
  expect(body).not.toHaveProperty('subscriptionId');
  expect(body.ok).not.toBe(true);
});

test('missing or invalid selection asks for a plan without confirming a purchase', async ({
  page,
}) => {
  for (const route of [
    '/checkout',
    '/checkout?plano=inexistente&ciclo=anual',
  ]) {
    await page.goto(route);
    await expect(
      page.getByRole('heading', { name: 'Escolha um plano para continuar.' }),
    ).toBeVisible();
    await expect(page.locator('main')).toContainText(
      'Não há pedido ou pagamento confirmado',
    );
    await expect(
      page.getByRole('link', { name: 'Comparar planos', exact: true }),
    ).toHaveAttribute('href', '/planos');
  }
});

test('customer entry and onboarding disclose limits and do not expose a fake private portal', async ({
  page,
}) => {
  await page.goto('/area-do-cliente?session_id=cs_test_fake');
  await expect(page.locator('main')).toContainText(
    'não disponibiliza um painel público com dados ou faturas de clientes',
  );
  await expect(
    page.locator(
      'main input[type="password"], main [data-customer-id], main table',
    ),
  ).toHaveCount(0);
  await expect(page.locator('main')).toContainText('verifica a titularidade');
  await page
    .getByRole('link', { name: /Ver checklist de implantação/ })
    .click();
  await expect(page).toHaveURL(/\/onboarding$/);
  await expect(page.locator('main')).toContainText(
    'Abrir esta página não confirma assinatura, pagamento',
  );
  await expect(page.locator('main')).toContainText(
    'Não envie senha, token ou cartão',
  );
  await expect(page.locator('main input, main textarea')).toHaveCount(0);
  const urls = await page
    .locator('main a[href]')
    .evaluateAll((elements) =>
      elements.map((element) => (element as HTMLAnchorElement).href),
    );
  for (const href of urls) {
    const query = new URL(href).searchParams;
    expect(
      [...query.keys()].some((key) =>
        /nome|name|email|phone|telefone|whatsapp|senha|password|token|cartao|card/i.test(
          key,
        ),
      ),
    ).toBe(false);
  }
});

test('deep-flow metadata has stable canonical paths and transactional pages remain noindex', async ({
  request,
}) => {
  for (const item of [
    { path: '/planos', route: '/planos', noindex: false },
    {
      path: '/diagnostico?plano=profissional&ciclo=anual',
      route: '/diagnostico',
      noindex: false,
    },
    {
      path: '/checkout?plano=profissional&ciclo=anual',
      route: '/checkout',
      noindex: true,
    },
    { path: '/area-do-cliente', route: '/area-do-cliente', noindex: true },
    { path: '/onboarding', route: '/onboarding', noindex: true },
  ]) {
    const response = await request.get(item.path);
    expect(response.status(), item.path).toBe(200);
    const html = await response.text();
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    expect(canonical).toBe(`https://www.reidasvendas.com.br${item.route}`);
    expect((html.match(/<h1(?:\s|>)/g) || []).length).toBe(1);
    const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1];
    expect(robots?.includes('noindex')).toBe(item.noindex);
  }
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('https://www.reidasvendas.com.br/planos');
  for (const path of ['/checkout', '/area-do-cliente', '/onboarding'])
    expect(sitemap).not.toContain(path);
});

for (const width of [320, 390]) {
  test(`subscription and checkout controls fit ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/planos');
    await rejectOptionalCookies(page);
    await expectNoRootOverflow(page);
    await page
      .locator('.billing-switch label')
      .filter({ hasText: 'Anual' })
      .click();
    await expectNoRootOverflow(page);
    await page.goto('/diagnostico?plano=profissional&ciclo=anual');
    await expectNoRootOverflow(page);
    await page.goto('/checkout?plano=profissional&ciclo=anual');
    await expectNoRootOverflow(page);
    const contact = page.getByRole('link', {
      name: /Pedir proposta no WhatsApp/,
    });
    await expect(contact).toBeVisible();
    expect((await contact.boundingBox())?.height).toBeGreaterThanOrEqual(44);
    await page.goto('/');
    await expectNoRootOverflow(page);
    await expect(page.locator('.commercial-flow')).toBeVisible();
    await expect(page.locator('.before-after')).toBeVisible();
  });
}

for (const route of ['/planos', '/checkout?plano=profissional&ciclo=anual']) {
  test(`subscription accessibility baseline ${route}`, async ({ page }) => {
    await page.goto(route);
    await rejectOptionalCookies(page);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(
      result.violations.map((item) => ({
        id: item.id,
        impact: item.impact,
        nodes: item.nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  });
}

test('conceptual flow and comparison work with keyboard and announce the selected content', async ({
  page,
}) => {
  await page.goto('/');
  await rejectOptionalCookies(page);
  const flow = page.locator('.commercial-flow');
  const steps = flow.getByRole('button');
  await expect(steps).toHaveCount(4);
  await expect(flow).toContainText('Não representa leads reais');
  await steps.nth(0).focus();
  await steps.nth(0).press('ArrowRight');
  await expect(steps.nth(1)).toBeFocused();
  await expect(steps.nth(1)).toHaveAttribute('aria-pressed', 'true');
  await steps.nth(1).press('End');
  await expect(steps.nth(3)).toBeFocused();
  await expect(flow.locator('[aria-live="polite"]')).toContainText(
    'Etapa 4 de 4',
  );
  await steps.nth(3).press('Home');
  await expect(steps.nth(0)).toHaveAttribute('aria-pressed', 'true');
  await steps.nth(2).focus();
  await steps.nth(2).press('Enter');
  await expect(steps.nth(2)).toHaveAttribute('aria-pressed', 'true');
  await steps.nth(3).focus();
  await steps.nth(3).press('Space');
  await expect(steps.nth(3)).toHaveAttribute('aria-pressed', 'true');
  const comparison = page.locator('.before-after');
  const before = comparison.getByRole('button', {
    name: 'Página sem caminho',
    exact: true,
  });
  const after = comparison.getByRole('button', {
    name: 'Presença acompanhada',
    exact: true,
  });
  await before.focus();
  await before.press('Enter');
  await expect(before).toHaveAttribute('aria-pressed', 'true');
  await expect(after).toHaveAttribute('aria-pressed', 'false');
  await after.press('Space');
  await expect(after).toHaveAttribute('aria-pressed', 'true');
  await expect(comparison.locator('[aria-live="polite"]')).toContainText(
    'Cada parte ajuda a continuar a conversa',
  );
  await expect(comparison).toContainText('Não é um antes e depois de cliente');
  for (const svg of await page
    .locator('.commercial-flow svg, .before-after svg')
    .all()) {
    await expect(svg).toHaveAttribute('aria-hidden', 'true');
    await expect(svg).toHaveAttribute('focusable', 'false');
  }
});

test('reduced motion keeps the offer readable and pauses decorative spatial transitions', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/');
  await rejectOptionalCookies(page);
  await page.locator('.commercial-flow').getByRole('button').nth(3).click();
  await expect(page.locator('.flow-copy')).toContainText(
    'O site continua sendo acompanhado',
  );
  const transitions = await page
    .locator('.flow-illustration-node, .flow-step-arrow')
    .evaluateAll((elements) =>
      elements.map((element) => getComputedStyle(element).transitionDuration),
    );
  expect(
    transitions.every((value) =>
      value
        .split(',')
        .every((duration) => Number.parseFloat(duration) <= 0.001),
    ),
  ).toBe(true);
  await expectNoRootOverflow(page);
  await page.goto('/planos');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expectNoRootOverflow(page);
});

test('monthly checkout keeps the one-time setup in the first charge', async ({
  page,
}) => {
  for (const plan of [
    { id: 'essencial', total: '1.994', recurring: '497' },
    { id: 'profissional', total: '3.494', recurring: '997' },
    { id: 'escala', total: '5.994', recurring: '1.997' },
  ]) {
    await page.goto(`/checkout?plano=${plan.id}&ciclo=mensal`);
    const totals = page.locator('.checkout-totals');
    await expect(totals).toContainText('Assinatura mensal');
    await expect(totals).toContainText(plan.recurring);
    await expect(totals).toContainText(plan.total);
    await expect(page.locator('.checkout-review')).toContainText(
      'renovações mensais',
    );
  }
});

test.describe('server-rendered pricing without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('native annual radio shows annual prices and the matching plan link without JavaScript', async ({
    page,
  }) => {
    await page.goto('/planos');
    // No hydration means no cookie banner; the two native radios and CSS remain functional.
    await expect(
      page.getByRole('radio', { name: 'Mensal', exact: true }),
    ).toBeChecked();
    for (const plan of [
      { name: 'Essencial', monthly: '497' },
      { name: 'Profissional', monthly: '997' },
      { name: 'Escala', monthly: '1.997' },
    ]) {
      const planCard = card(page, plan.name);
      await expectVisibleBillingCycle(planCard, 'mensal');
      await expect(
        planCard.locator('.pricing-amount strong [data-cycle="mensal"]'),
      ).toHaveText(`R$ ${plan.monthly}`);
    }

    await page
      .locator('.billing-switch label')
      .filter({ hasText: 'Anual' })
      .click();
    await expect(page.getByRole('radio', { name: /Anual/ })).toBeChecked();
    for (const plan of [
      {
        name: 'Essencial',
        equivalent: '457,24',
        annual: '5.486,88',
        firstYear: '6.983,88',
      },
      {
        name: 'Profissional',
        equivalent: '917,24',
        annual: '11.006,88',
        firstYear: '13.503,88',
      },
      {
        name: 'Escala',
        equivalent: '1.837,24',
        annual: '22.046,88',
        firstYear: '26.043,88',
      },
    ]) {
      const planCard = card(page, plan.name);
      await expectVisibleBillingCycle(planCard, 'anual');
      await expect(
        planCard.locator('.pricing-amount strong [data-cycle="anual"]'),
      ).toHaveText(`R$ ${plan.equivalent}`);
      await expect(
        planCard.locator('.pricing-payment [data-cycle="anual"]'),
      ).toContainText(plan.annual);
      await expect(
        planCard.locator('.pricing-year strong [data-cycle="anual"]'),
      ).toContainText(plan.firstYear);
      await expect(
        planCard.locator('a.pricing-select[data-cycle="anual"]'),
      ).toHaveAttribute(
        'href',
        `/diagnostico?plano=${plan.name.toLowerCase()}&ciclo=anual`,
      );
    }
    await card(page, 'Profissional')
      .locator('a.pricing-select[data-cycle="anual"]')
      .click();
    await expect(page).toHaveURL(
      /\/diagnostico\?plano=profissional&ciclo=anual$/,
    );
    await expect(page.locator('.checkout-review')).toContainText(
      'Profissional',
    );
  });
});
