import { lazy, Suspense, Component, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CookieConsent } from '@/components/CookieConsent';
import { SuporteBot } from '@/components/SuporteBot';
import { GoldParticles } from '@/components/GoldParticles';

const Home = lazy(() => import('@/pages/Home'));
const Servicos = lazy(() => import('@/pages/Servicos'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Contato = lazy(() => import('@/pages/Contato'));
const Politica = lazy(() => import('@/pages/Politica'));
const Planos = lazy(() => import('@/pages/Planos'));
const Sobre = lazy(() => import('@/pages/Sobre'));
const Recursos = lazy(() => import('@/pages/Recursos'));
const Segmentos = lazy(() => import('@/pages/Segmentos'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const Obrigado = lazy(() => import('@/pages/Obrigado'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Builder = lazy(() => import('@/pages/Builder'));
const Templates = lazy(() => import('@/pages/Templates'));
const Extensions = lazy(() => import('@/pages/Extensions'));

/* ─── Error Boundary ─── */
interface ErrorBoundaryProps {
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
class PageErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center" role="alert">
          <div className="text-4xl">⚠️</div>
          <h2 className="font-serif text-2xl font-bold text-white">Algo deu errado</h2>
          <p className="max-w-md text-sm text-[#A1A1AA]">
            Ocorreu um erro inesperado ao carregar esta página. Tente novamente.
          </p>
          <button
            onClick={this.handleRetry}
            className="btn-gold mt-2"
            type="button"
          >
            Tentar novamente
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ─── Premium Loading Spinner ─── */
function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" aria-live="polite" aria-busy="true">
      <div className="loading-gold" />
    </div>
  );
}

/* ─── Page Transition (spring sofisticado + parallax sutil) ─── */
const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 18,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    filter: 'blur(2px)',
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 20,
      mass: 0.6,
    },
  },
};

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
    >
      {children}
    </motion.div>
  );
}

/* ─── Route Change Listener: scroll to top + analytics ─── */
function RouteChangeListener() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change (instant, not animated)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    // Analytics hook — dispatch custom event for any analytics service
    window.dispatchEvent(
      new CustomEvent('route-change', {
        detail: {
          pathname: location.pathname,
          search: location.search,
          hash: location.hash,
          timestamp: Date.now(),
        },
      })
    );
  }, [location]);

  return null;
}

/* ─── Site Layout ─── */
function SiteLayout() {
  const location = useLocation();
  return (
    <>
      <RouteChangeListener />
      <GoldParticles count={20} />
      <SiteHeader />
      <div className="page-offset">
        <Suspense fallback={<Loading />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/servicos" element={<PageTransition><Servicos /></PageTransition>} />
              <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
              <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
              <Route path="/contato" element={<PageTransition><Contato /></PageTransition>} />
              <Route path="/planos" element={<PageTransition><Planos /></PageTransition>} />
              <Route path="/sobre" element={<PageTransition><Sobre /></PageTransition>} />
              <Route path="/recursos" element={<PageTransition><Recursos /></PageTransition>} />
              <Route path="/segmentos" element={<PageTransition><Segmentos /></PageTransition>} />
              <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
              <Route path="/obrigado" element={<PageTransition><Obrigado /></PageTransition>} />
              <Route path="/politica" element={<PageTransition><Politica /></PageTransition>} />
              <Route path="/builder" element={<PageTransition><Builder /></PageTransition>} />
              <Route path="/templates" element={<PageTransition><Templates /></PageTransition>} />
              <Route path="/extensions" element={<PageTransition><Extensions /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>
      <SiteFooter />
      <CookieConsent />
      <SuporteBot />
    </>
  );
}

/* ─── App Root ─── */
export default function App() {
  return (
    <Router>
      {/* JSON-LD global */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['LocalBusiness', 'ProfessionalService'],
            name: 'Rei das Vendas',
            description: 'Sites premium, aplicativos sob medida, automações inteligentes e dashboards em tempo real para empresas locais em Franca-SP. Infraestrutura digital completa.',
            areaServed: ['Franca', 'Ribeirão Preto', 'São Paulo', 'Brasil'],
            url: 'https://reidasvendas.com.br',
            foundingDate: '2023',
            founder: { '@type': 'Person', name: 'Thiago B. G. Piola' },
            address: { '@type': 'PostalAddress', addressLocality: 'Franca', addressRegion: 'SP', addressCountry: 'BR' },
            contactPoint: [{
              '@type': 'ContactPoint',
              telephone: '+551****9999',
              contactType: 'customer support',
              availableLanguage: ['Portuguese'],
            }],
            makesOffer: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Criação de Sites Profissionais' }},
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desenvolvimento de Aplicativos' }},
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automação Comercial' }},
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dashboards em Tempo Real' }},
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mentoria Digital' }},
            ],
            knowsAbout: ['Web Design', 'Desenvolvimento de Software', 'Automação de Marketing', 'CRM', 'Inteligência Artificial', 'SEO'],
            priceRange: '$$',
          }),
        }}
      />

      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={
          <PageErrorBoundary>
            <SiteLayout />
          </PageErrorBoundary>
        } />
      </Routes>
    </Router>
  );
}
