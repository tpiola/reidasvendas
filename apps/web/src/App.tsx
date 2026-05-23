import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/useTheme';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CookieConsent } from '@/components/CookieConsent';
import { WhatsAppFab } from '@/components/WhatsAppFab';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';

const Home = lazy(() => import('@/pages/Home'));
const Projetos = lazy(() => import('@/pages/Projetos'));
const Contato = lazy(() => import('@/pages/Contato'));
const Saude = lazy(() => import('@/pages/Saude'));
const Negocios = lazy(() => import('@/pages/Negocios'));
const Solucoes = lazy(() => import('@/pages/Solucoes'));
const Governanca = lazy(() => import('@/pages/Governanca'));
const Politica = lazy(() => import('@/pages/Politica'));
const Termos = lazy(() => import('@/pages/Termos'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function RouteFallback() {
  return (
    <div
      className="flex min-h-[40vh] items-center justify-center text-sm text-[color:var(--page-fg)] opacity-50"
      aria-live="polite"
      aria-busy="true"
    >
      Carregando…
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
    <Router>
      <SiteHeader />
      <AnalyticsProvider />
      <div className="pt-16">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/saude" element={<Saude />} />
            <Route path="/negocios" element={<Negocios />} />
            <Route path="/solucoes" element={<Solucoes />} />
            <Route path="/governanca" element={<Governanca />} />
            <Route path="/politica" element={<Politica />} />
            <Route path="/termos" element={<Termos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <SiteFooter />
      <CookieConsent />
      <WhatsAppFab />
    </Router>
    </ThemeProvider>
  );
}
