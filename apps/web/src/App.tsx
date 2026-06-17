import { lazy, Suspense } from 'react';
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
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const Obrigado = lazy(() => import('@/pages/Obrigado'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));

function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" aria-live="polite" aria-busy="true">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D6A84F] border-t-transparent" />
    </div>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ type: 'spring', stiffness: 100, damping: 22, mass: 1 }}
    >
      {children}
    </motion.div>
  );
}

function SiteLayout() {
  const location = useLocation();
  return (
    <>
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
              <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
              <Route path="/obrigado" element={<PageTransition><Obrigado /></PageTransition>} />
              <Route path="/politica" element={<PageTransition><Politica /></PageTransition>} />
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
              telephone: '+5516999999999',
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
        <Route path="*" element={<SiteLayout />} />
      </Routes>
    </Router>
  );
}
