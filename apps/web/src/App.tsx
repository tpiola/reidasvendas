import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/useTheme';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CookieConsent } from '@/components/CookieConsent';
import { WhatsAppFab } from '@/components/WhatsAppFab';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';
import { ExitIntentModal } from '@/components/engagement/ExitIntentModal';
import { AssistWidget } from '@/components/engagement/AssistWidget';
import { PlanosEngagementBanner } from '@/components/engagement/PlanosEngagementBanner';
import { ScrollToTop } from '@/components/ScrollToTop';

const Home = lazy(() => import('@/pages/Home'));
const Projetos = lazy(() => import('@/pages/Projetos'));
const ProjectPage = lazy(() => import('@/pages/projetos/ProjectPage'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Contato = lazy(() => import('@/pages/Contato'));
const Diagnostico = lazy(() => import('@/pages/Diagnostico'));
const Saude = lazy(() => import('@/pages/Saude'));
const Negocios = lazy(() => import('@/pages/Negocios'));
const Solucoes = lazy(() => import('@/pages/Solucoes'));
const Governanca = lazy(() => import('@/pages/Governanca'));
const Politica = lazy(() => import('@/pages/Politica'));
const Termos = lazy(() => import('@/pages/Termos'));
const Templates = lazy(() => import('@/pages/Templates'));
const TemplatePage = lazy(() => import('@/pages/TemplatePage'));
const PlanosIndex = lazy(() => import('@/pages/planos/PlanosIndex'));
const PlanoEssencial = lazy(() => import('@/pages/planos/PlanoEssencial'));
const PlanoCrescimento = lazy(() => import('@/pages/planos/PlanoCrescimento'));
const PlanoEscala = lazy(() => import('@/pages/planos/PlanoEscala'));
const PlanoSobMedida = lazy(() => import('@/pages/planos/PlanoSobMedida'));
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
      <ScrollToTop />
      <SiteHeader />
      <AnalyticsProvider />
      <div className="site-header-offset">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/projetos/:slug" element={<ProjectPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/diagnostico" element={<Diagnostico />} />
            <Route path="/saude" element={<Saude />} />
            <Route path="/negocios" element={<Negocios />} />
            <Route path="/solucoes" element={<Solucoes />} />
            <Route path="/governanca" element={<Governanca />} />
            <Route path="/politica" element={<Politica />} />
            <Route path="/termos" element={<Termos />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/templates/:slug" element={<TemplatePage />} />
            <Route path="/planos" element={<PlanosIndex />} />
            <Route path="/planos/essencial" element={<PlanoEssencial />} />
            <Route path="/planos/crescimento" element={<PlanoCrescimento />} />
            <Route path="/planos/escala" element={<PlanoEscala />} />
            <Route path="/planos/sob-medida" element={<PlanoSobMedida />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <SiteFooter />
      <CookieConsent />
      <WhatsAppFab />
      <AssistWidget />
      <PlanosEngagementBanner />
      <ExitIntentModal />
    </Router>
    </ThemeProvider>
  );
}
