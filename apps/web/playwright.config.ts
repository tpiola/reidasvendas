import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://127.0.0.1:4173",
    locale: "pt-BR",
    launchOptions: process.env.RDV_BROWSER_EXECUTABLE
      ? {
          executablePath: process.env.RDV_BROWSER_EXECUTABLE,
          args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
        }
      : {},
    reducedMotion: "reduce",
  },
  webServer: {
    command: process.env.RDV_SKIP_BUILD
      ? "corepack pnpm preview --port 4173 --strictPort --host 127.0.0.1"
      : "corepack pnpm build && corepack pnpm preview --port 4173 --strictPort --host 127.0.0.1",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
