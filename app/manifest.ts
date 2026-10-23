import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rei das Vendas — Marketing e Tecnologia',
    short_name: 'Rei das Vendas',
    description: 'Sites, marketing e operação comercial em Franca/SP.',
    lang: 'pt-BR',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#F5F1E8',
    theme_color: '#101920',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
