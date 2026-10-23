import type { NextConfig } from 'next';

const reportOnlyPolicy = [
  "default-src 'self'",
  "script-src 'self' https://www.googletagmanager.com https://connect.facebook.net https://va.vercel-scripts.com https://vercel.live",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://www.facebook.com",
  "font-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://www.facebook.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://vercel.live wss://ws-us3.pusher.com",
  'frame-src https://vercel.live',
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'report-uri /csp-report',
].join('; ');

export const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  {
    key: 'Content-Security-Policy',
    value:
      "object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'",
  },
  { key: 'Content-Security-Policy-Report-Only', value: reportOnlyPolicy },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  trailingSlash: false,
  productionBrowserSourceMaps: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
    minimumCacheTTL: 86400,
    remotePatterns: [],
    dangerouslyAllowSVG: false,
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/index.php', destination: '/', permanent: true },
      { source: '/politica', destination: '/privacidade', permanent: true },
      { source: '/privacy', destination: '/privacidade', permanent: true },
      { source: '/solucoes', destination: '/servicos', permanent: true },
      { source: '/portfolio', destination: '/casos', permanent: true },
      { source: '/projetos', destination: '/casos', permanent: true },
      { source: '/recursos', destination: '/blog', permanent: true },
      { source: '/modelos', destination: '/servicos', permanent: true },
      { source: '/templates', destination: '/servicos', permanent: true },
      {
        source: '/servicos/site-conversao-local',
        destination: '/servicos/criacao-de-sites-franca',
        permanent: true,
      },
      {
        source: '/servicos/funis-e-automacao',
        destination: '/servicos/automacao-de-follow-up-franca',
        permanent: true,
      },
      {
        source: '/servicos/google-e-presenca-local',
        destination: '/servicos/seo-local-franca',
        permanent: true,
      },
      {
        source: '/servicos/integracao-whatsapp',
        destination: '/servicos/automacao-de-follow-up-franca',
        permanent: true,
      },
      {
        source: '/solucoes/site-institucional-premium',
        destination: '/servicos/criacao-de-sites-franca',
        permanent: true,
      },
      {
        source: '/solucoes/landing-page',
        destination: '/servicos/criacao-de-sites-franca',
        permanent: true,
      },
      {
        source: '/solucoes/seo-local-google-business',
        destination: '/servicos/seo-local-franca',
        permanent: true,
      },
      {
        source: '/solucoes/automacao-whatsapp',
        destination: '/servicos/automacao-de-follow-up-franca',
        permanent: true,
      },
      {
        source: '/solucoes/funil-de-qualificacao',
        destination: '/servicos/diagnostico-de-funil-franca',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
