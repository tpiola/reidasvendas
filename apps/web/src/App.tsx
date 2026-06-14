import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CookieConsent } from '@/components/CookieConsent';
import { SuporteBot } from '@/components/SuporteBot';

const Home = lazy(() => import('@/pages/Home'));
const Servicos = lazy(() => import('@/pages/Servicos'));
const Blog = lazy(() => import('@/pages/Blog'));
const Contato = lazy(() => import('@/pages/Contato'));
const Politica = lazy(() => import('@/pages/Politica'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" aria-live="polite" aria-busy="true">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0057FF] border-t-transparent" />
    </div>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<Loading />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/servicos" element={<PageTransition><Servicos /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/contato" element={<PageTransition><Contato /></PageTransition>} />
          <Route path="/politica" element={<PageTransition><Politica /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default function App() {
  return (
    <Router>
      <SiteHeader />
      <div className="page-offset">
        <AnimatedRoutes />
      </div>
      <SiteFooter />
      <CookieConsent />
      <SuporteBot />
    </Router>
  );
}
