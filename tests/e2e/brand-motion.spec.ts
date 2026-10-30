import { test, expect } from '@playwright/test';

test('brand motion can be paused with the keyboard and respects a changed motion preference', async ({
  page,
}) => {
  await page.goto('/');
  await page
    .getByRole('button', { name: 'Rejeitar opcionais', exact: true })
    .click();
  const scene = page.locator('.royal-scene');
  await scene.scrollIntoViewIfNeeded();
  const control = scene.getByRole('button');
  const animationState = () =>
    page
      .locator('.royal-ring-outer')
      .evaluate((node) => getComputedStyle(node).animationPlayState);
  await expect.poll(animationState).toBe('running');
  await control.focus();
  await control.press('Enter');
  await expect(control).toHaveAccessibleName('Retomar animação');
  await expect.poll(animationState).toBe('paused');
  await control.press('Space');
  await expect(control).toHaveAccessibleName('Pausar animação');
  await expect.poll(animationState).toBe('running');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(control).toBeHidden();
  await expect(page.locator('.royal-ring-outer')).toHaveCSS(
    'animation-name',
    'none',
  );
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Solicitar Análise Estratégica' }),
  ).toHaveAttribute('href', '/diagnostico');
});
