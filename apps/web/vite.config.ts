import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: 'hidden',
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('framer-motion')) return 'motion';
          if (id.includes('react-router')) return 'router';
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'react';
          if (id.includes('react-hook-form') || id.includes('/zod')) return 'form';
          if (id.includes('lucide-react')) return 'icons';
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
    {
      name: 'search-console-verification',
      transformIndexHtml() {
        const token = loadEnv(mode, process.cwd(), 'VITE_').VITE_GSC_VERIFICATION?.trim();
        return token && /^[A-Za-z0-9_-]{10,200}$/.test(token)
          ? [{ tag: 'meta', attrs: { name: 'google-site-verification', content: token }, injectTo: 'head' as const }]
          : [];
      },
    },
    react({
      babel: {
        plugins: mode === 'development' ? ['react-dev-locator'] : [],
      },
    }),
    tsconfigPaths(),
  ],
}));
