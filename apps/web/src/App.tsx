import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from '@/hooks/useTheme';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CookieConsent } from '@/components/CookieConsent';
import { WhatsAppFab } from '@/components/WhatsAppFab';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';
import { DeferredEngagement } from '@/components/DeferredEngagement';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ConversionStickyBar } from '@/components/conversion/ConversionStickyBar';

import Home from '@/pages/Home';
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
const TemplateBuilder = lazy(() => import('@/pages/TemplateBuilder'));
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

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<RouteFallback />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/projetos" element={<PageTransition><Projetos /></PageTransition>} />
          <Route path="/projetos/:slug" element={<PageTransition><ProjectPage /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
          <Route path="/contato" element={<PageTransition><Contato /></PageTransition>} />
          <Route path="/diagnostico" element={<PageTransition><Diagnostico /></PageTransition>} />
          <Route path="/saude" element={<PageTransition><Saude /></PageTransition>} />
          <Route path="/negocios" element={<PageTransition><Negocios /></PageTransition>} />
          <Route path="/solucoes" element={<PageTransition><Solucoes /></PageTransition>} />
          <Route path="/governanca" element={<PageTransition><Governanca /></PageTransition>} />
          <Route path="/politica" element={<PageTransition><Politica /></PageTransition>} />
          <Route path="/termos" element={<PageTransition><Termos /></PageTransition>} />
          <Route path="/templates" element={<PageTransition><Templates /></PageTransition>} />
          <Route path="/templates/:slug" element={<PageTransition><TemplatePage /></PageTransition>} />
          <Route path="/builder" element={<PageTransition><TemplateBuilder /></PageTransition>} />
          <Route path="/planos" element={<PageTransition><PlanosIndex /></PageTransition>} />
          <Route path="/planos/essencial" element={<PageTransition><PlanoEssencial /></PageTransition>} />
          <Route path="/planos/crescimento" element={<PageTransition><PlanoCrescimento /></PageTransition>} />
          <Route path="/planos/escala" element={<PageTransition><PlanoEscala /></PageTransition>} />
          <Route path="/planos/sob-medida" element={<PageTransition><PlanoSobMedida /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default function App() {
  return (
    <ThemeProvider>
    <Router>
      <ScrollToTop />
      <ConversionStickyBar />
      <SiteHeader />
      <AnalyticsProvider />
      <div className="site-header-offset">
        <AnimatedRoutes />
      </div>
      <SiteFooter />
      <CookieConsent />
      <WhatsAppFab />
      <DeferredEngagement />
    </Router>
    </ThemeProvider>
  );
}
