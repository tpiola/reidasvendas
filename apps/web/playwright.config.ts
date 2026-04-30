import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:4173',
    reducedMotion: 'reduce',
  },
  webServer: {
    command: 'pnpm preview --port 4173 --strictPort --host localhost',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});

