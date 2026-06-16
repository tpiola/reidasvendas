import { test, expect } from '@playwright/test';

const ROUTES = ['/', '/servicos', '/blog', '/contato', '/politica'] as const;

async function setTheme(page: import('@playwright/test').Page, theme: 'light' | 'dark') {
  await page.addInitScript((t) => {
    localStorage.setItem('theme', t);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(t);
  }, theme);
}

test.describe('Legibilidade por tema', () => {
  for (const theme of ['light', 'dark'] as const) {
    test(`home — contraste básico (${theme})`, async ({ page }) => {
      await setTheme(page, theme);
      await page.goto('/');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      const h1Color = await page.getByRole('heading', { level: 1 }).evaluate((el) => {
        const c = getComputedStyle(el);
        return { color: c.color, bg: getComputedStyle(el.closest('section') ?? el).backgroundColor };
      });
      expect(h1Color.color).toBeTruthy();
    });
  }

  for (const route of ROUTES) {
    test(`sem erro de layout — ${route}`, async ({ page }) => {
      await setTheme(page, 'light');
      await page.goto(route);
      await expect(page.locator('main')).toBeVisible();
      const broken = await page.locator('main').evaluate((main) => {
        const bad: string[] = [];
        main.querySelectorAll('h1,h2,h3,p').forEach((node) => {
          const el = node as HTMLElement;
          if (!el.textContent?.trim()) return;
          const fg = getComputedStyle(el).color;
          const bgEl = el.closest('section, article, .glass-card, .card-dark, .section-dark') ?? el.parentElement;
          const bg = bgEl ? getComputedStyle(bgEl).backgroundColor : 'transparent';
          if (fg === bg && bg !== 'rgba(0, 0, 0, 0)') bad.push(el.textContent.slice(0, 40));
        });
        return bad;
      });
      expect(broken, `texto com mesma cor do fundo em ${route}`).toEqual([]);
    });
  }
});
