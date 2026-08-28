import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const deprecatedPublicArtifacts = [
  'imagens/portfolio/drogalar.webp',
  'imagens/nichos',
  'imagens/services',
  'imagens/rei-das-vendas-hero.webp',
  'logo-original.png',
  'logo-sovereign.png',
  'videos/hero-noaudio.mp4',
  'videos/hero-preview.jpg',
  'videos/sentinela',
];

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: 'hidden',
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          router: ['react-router-dom'],
          motion: ['framer-motion'],
          form: ['react-hook-form', 'zod'],
        },
      },
    },
  },
  optimizeDeps: {
    // esbuild 0.28 no longer downlevels destructuring for Vite's legacy dev target.
    // Production already ships `esnext`; keep dependency pre-bundling aligned.
    esbuildOptions: {
      target: 'esnext',
    },
  },
  plugins: [
    react({
      babel: {
        plugins: mode === 'development' ? ['react-dev-locator'] : [],
      },
    }),
    tsconfigPaths(),
    {
      name: 'strip-deprecated-public-artifacts',
      apply: 'build',
      async closeBundle() {
        await Promise.all(deprecatedPublicArtifacts.map((artifact) =>
          rm(join(projectRoot, 'dist', artifact), { recursive: true, force: true })));
      },
    },
  ],
}));
