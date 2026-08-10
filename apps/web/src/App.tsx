import { lazy, Suspense, Component, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CookieConsent } from '@/components/CookieConsent';
import Home from '@/pages/Home';
import { SuporteBot } from '@/components/SuporteBot';
import { BRAND } from '@/lib/brand';

const Servicos = lazy(() => import('@/pages/Servicos'));
const ServicoDetalhe = lazy(() => import('@/pages/ServicoDetalhe'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Contato = lazy(() => import('@/pages/Contato'));
const Politica = lazy(() => import('@/pages/Politica'));
const Planos = lazy(() => import('@/pages/Planos'));
const Sobre = lazy(() => import('@/pages/Sobre'));
const Recursos = lazy(() => import('@/pages/Recursos'));
const Segmentos = lazy(() => import('@/pages/Segmentos'));
const SegmentoDetalhe = lazy(() => import('@/pages/SegmentoDetalhe'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const Solucoes = lazy(() => import('@/pages/Solucoes'));
const Diagnostico = lazy(() => import('@/pages/Diagnostico'));
const Obrigado = lazy(() => import('@/pages/Obrigado'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Builder = lazy(() => import('@/pages/Builder'));
const Templates = lazy(() => import('@/pages/Templates'));
const Extensions = lazy(() => import('@/pages/Extensions'));

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class PageErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#030303] px-6 text-center" role="alert">
          <h1 className="font-serif text-3xl font-bold text-white">Não foi possível carregar esta página.</h1>
          <p className="max-w-md text-sm leading-6 text-[#A1A1AA]">Tente novamente. Se o problema continuar, use o WhatsApp para falar com a equipe.</p>
          <button onClick={this.handleRetry} className="btn-gold mt-2" type="button">Tentar novamente</button>
        </div>
      );
    }

    return this.props.children;
  }
}

function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-[#030303]" aria-live="polite" aria-busy="true">
      <div className="loading-gold" />
      <span className="sr-only">Carregando página</span>
    </div>
  );
}

const pageTransitionVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] as const },
  },
};

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageTransitionVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

/** Redirect 301-level para consolidar rotas antigas (evita duplicidade e perda de SEO). */
function RedirectTo({ to }: { to: string }) {
  useEffect(() => {
    // Compatibilidade com SEO: registra o redirect como clique (tentar trocar para 301 real no server).
    window.dispatchEvent(new CustomEvent('route-redirect', { detail: { to, timestamp: Date.now() } }));
  }, [to]);
  return <Navigate to={to} replace />;
}

const META_BY_PATH: Record<string, { title: string; description: string }> = {
  '/': {
    title: BRAND.seo.title,
    description: BRAND.seo.description,
  },
  '/solucoes': {
    title: 'Soluções digitais para negócios locais em Franca | Rei das Vendas',
    description: 'Sites, funis, automações e aplicativos construídos negócio a negócio para empresas locais venderem mais. Receba um diagnóstico gratuito.',
  },
  '/diagnostico': {
    title: 'Diagnóstico gratuito para negócios locais | Rei das Vendas',
    description: 'Receba uma análise clara do seu site, Google, WhatsApp e funil. Diagnóstico gratuito para negócios locais em Franca e região.',
  },
  '/servicos': {
    title: 'Sites profissionais para negócios locais | Rei das Vendas',
    description: 'Sites profissionais, responsivos e preparados para facilitar buscas, orçamentos, agendamentos e contatos de empresas locais.',
  },
  '/templates': {
    title: 'Modelos de sites por segmento | Rei das Vendas',
    description: 'Conheça arquiteturas demonstrativas para clínicas, dedetizadoras, restaurantes, estética, academias, oficinas, pet shops, advocacia, imobiliárias e escolas.',
  },
  '/portfolio': {
    title: 'Projetos publicados | Rei das Vendas',
    description: 'Conheça projetos digitais desenvolvidos para diferentes objetivos, públicos e negócios.',
  },
  '/sobre': {
    title: 'Sobre o Rei das Vendas | Sites para negócios locais',
    description: 'Conheça a forma de trabalho do Rei das Vendas na criação de sites profissionais para empresas locais.',
  },
  '/contato': {
    title: 'Solicitar análise do meu negócio | Rei das Vendas',
    description: 'Envie seu site atual ou perfil da empresa no Google para receber uma análise inicial da presença online.',
  },
  '/planos': {
    title: 'Investimento e proposta | Rei das Vendas',
    description: 'Entenda como o escopo e o investimento de um site profissional são definidos para cada negócio.',
  },
  '/politica': {
    title: 'Política de privacidade | Rei das Vendas',
    description: 'Saiba como o Rei das Vendas trata dados enviados pelos visitantes do site.',
  },
  '/termos': {
    title: 'Termos de uso | Rei das Vendas',
    description: 'Condições gerais de uso e contratação dos serviços do Rei das Vendas para negócios locais.',
  },
  '/blog': {
    title: 'Blog | Rei das Vendas — sites e presença digital para negócios locais',
    description: 'Conteúdo sobre sites profissionais, presença digital, automação e design para negócios locais de Franca e região.',
  },
  '/segmentos': {
    title: 'Modelos de sites por segmento | Rei das Vendas',
    description: 'Arquiteturas de site por segmento: atendimento, saúde, comércio, restaurantes e profissionais. Veja qual se encaixa no seu negócio.',
  },
  '/recursos': {
    title: 'Recursos | Rei das Vendas',
    description: 'Recursos e ferramentas para negócios locais melhorarem a presença digital e a conversão online.',
  },
  '/obrigado': {
    title: 'Mensagem enviada | Rei das Vendas',
    description: 'Recebemos sua solicitação. Em breve retornamos com a análise da presença digital do seu negócio.',
  },
};

function upsertMeta(name: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
}

function RouteMetadata() {
  const location = useLocation();

  useEffect(() => {
    const metadata = META_BY_PATH[location.pathname] ?? {
      title: BRAND.seo.title,
      description: BRAND.seo.description,
    };

    document.title = metadata.title;
    upsertMeta('description', metadata.description);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    window.dispatchEvent(new CustomEvent('route-change', { detail: { pathname: location.pathname, search: location.search, timestamp: Date.now() } }));
  }, [location.pathname, location.search]);

  return null;
}

function SiteLayout() {
  const location = useLocation();

  return (
    <>
      <RouteMetadata />
      <SiteHeader />
      <div className="page-offset">
        <Suspense fallback={<Loading />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/solucoes" element={<PageTransition><Solucoes /></PageTransition>} />
              <Route path="/diagnostico" element={<PageTransition><Diagnostico /></PageTransition>} />
              <Route path="/servicos" element={<PageTransition><Servicos /></PageTransition>} />
              <Route path="/servicos/:slug" element={<PageTransition><ServicoDetalhe /></PageTransition>} />
              <Route path="/modelos" element={<RedirectTo to="/segmentos" />} />
              <Route path="/projetos" element={<RedirectTo to="/portfolio" />} />
              <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
              <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
              <Route path="/contato" element={<PageTransition><Contato /></PageTransition>} />
              <Route path="/planos" element={<PageTransition><Planos /></PageTransition>} />
              <Route path="/sobre" element={<PageTransition><Sobre /></PageTransition>} />
              <Route path="/recursos" element={<PageTransition><Recursos /></PageTransition>} />
              <Route path="/segmentos" element={<PageTransition><Segmentos /></PageTransition>} />
              <Route path="/segmentos/:slug" element={<PageTransition><SegmentoDetalhe /></PageTransition>} />
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

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://reidasvendas.com.br/#organization',
      name: BRAND.name,
      description: BRAND.seo.description,
      url: 'https://reidasvendas.com.br',
      email: BRAND.email,
      telephone: `+${BRAND.phone}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: BRAND.seo.geo.city,
        addressRegion: BRAND.seo.geo.state,
        addressCountry: BRAND.seo.geo.country,
      },
      areaServed: BRAND.seo.geo.areaServed,
      sameAs: [BRAND.instagram, BRAND.linkedin],
      priceRange: '$$',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Sites profissionais para negócios locais',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Criação de sites profissionais',
              description: 'Planejamento, design, desenvolvimento, revisão e publicação de sites para negócios locais.',
              areaServed: BRAND.seo.geo.areaServed,
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://reidasvendas.com.br/#website',
      url: 'https://reidasvendas.com.br',
      name: BRAND.name,
      inLanguage: 'pt-BR',
      publisher: { '@id': 'https://reidasvendas.com.br/#organization' },
    },
  ],
};

export default function App() {
  return (
    <Router>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<PageErrorBoundary><SiteLayout /></PageErrorBoundary>} />
      </Routes>
    </Router>
  );
}
