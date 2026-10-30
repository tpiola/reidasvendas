import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Experience from '@/components/Experience';
import JsonLd from '@/components/JsonLd';
import Observability from '@/components/Observability';
import ConsentBanner from '@/lib/consent';
import TrackingNavigation from '@/components/TrackingNavigation';
import { organization, SITE, metadata as meta } from '@/lib/site';
import '@/styles/globals.css';
import '@/styles/pages.css';
import '@/styles/subscriptions.css';
import '@/styles/commercial-flow.css';
import '@/styles/subscription-journey.css';
import '@/styles/studio.css';
const sora = localFont({
  src: '../public/fonts/sora-latin.woff2',
  display: 'swap',
  weight: '400 700',
  variable: '--font-sora',
  fallback: ['Arial'],
});
export const metadata: Metadata = {
  ...meta(
    'Sites por assinatura e SEO local em Franca',
    'Site profissional, SEO local, WhatsApp rastreado e manutenção contínua para pequenos negócios em Franca/SP. Conheça os planos e seus limites.',
  ),
  metadataBase: new URL(SITE),
  title: {
    default: 'Rei das Vendas | Sites por assinatura em Franca',
    template: '%s | Rei das Vendas',
  },
  applicationName: 'Rei das Vendas',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [{ url: '/logo/original-favicon.svg', type: 'image/svg+xml' }],
    apple: '/icons/original-apple-touch-icon.png',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_META_DOMAIN_VERIFICATION
      ? {
          'facebook-domain-verification':
            process.env.NEXT_PUBLIC_META_DOMAIN_VERIFICATION,
        }
      : {},
  },
  formatDetection: { telephone: false },
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#101920',
  colorScheme: 'light',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body className={sora.variable}>
        <a href="#main-content" className="skip-link">
          Ir para o conteúdo
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ConsentBanner />
        <Suspense>
          <TrackingNavigation />
        </Suspense>
        <Experience />
        <Observability />
        <JsonLd data={organization} />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': SITE + '/#website',
            url: SITE,
            name: 'Rei das Vendas',
            inLanguage: 'pt-BR',
            publisher: { '@id': SITE + '/#organization' },
          }}
        />
      </body>
    </html>
  );
}
