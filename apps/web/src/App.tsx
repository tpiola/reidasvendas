import { lazy, Suspense, Component, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CookieConsent } from '@/components/CookieConsent';
import Home from '@/pages/Home';
import { BRAND } from '@/lib/brand';
import { ARTICLE_BY_SLUG } from '@/lib/articles';
import { captureAttribution, trackEvent } from '@/lib/analytics';
import { GUIDES, SEO_BY_PATH, SOLUTIONS } from '@/lib/growth';

const ServicoDetalhe = lazy(() => import('@/pages/ServicoDetalhe'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Politica = lazy(() => import('@/pages/Politica'));
const Sobre = lazy(() => import('@/pages/Sobre'));
const SegmentoDetalhe = lazy(() => import('@/pages/SegmentoDetalhe'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const Solucoes = lazy(() => import('@/pages/Solucoes'));
const Diagnostico = lazy(() => import('@/pages/Diagnostico'));
const Obrigado = lazy(() => import('@/pages/Obrigado'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Builder = lazy(() => import('@/pages/Builder'));
const Extensions = lazy(() => import('@/pages/Extensions'));
const SolutionDetail = lazy(() => import('@/pages/SolutionDetail'));
const ComparisonDetail = lazy(() => import('@/pages/ComparisonDetail'));
const IntentGuide = lazy(() => import('@/pages/IntentGuide'));
const Tools = lazy(() => import('@/pages/Tools'));
const ToolDetail = lazy(() => import('@/pages/ToolDetail'));
const Demonstrations = lazy(() => import('@/pages/Demonstrations'));
const DemoExperience = lazy(() => import('@/pages/DemoExperience'));

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
        <div className="rdv-system-state" role="alert">
          <p className="rdv-kicker">Falha de carregamento</p>
          <h1>Não foi possível abrir esta página.</h1>
          <p>Tente novamente. Se o problema continuar, use o WhatsApp para falar com a equipe.</p>
          <button onClick={this.handleRetry} className="rdv-action rdv-action--primary rdv-action--md" type="button">Tentar novamente</button>
        </div>
      );
    }

    return this.props.children;
  }
}

function Loading() {
  return (
    <div className="rdv-loading" aria-live="polite" aria-busy="true">
      <div className="rdv-loading__mark" />
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
    title: 'Soluções digitais por segmento e operação | Rei das Vendas',
    description: 'Sites, landing pages, catálogos, aplicativos, sistemas e automações desenhados para o problema real de cada operação.',
  },
  '/diagnostico': {
    title: 'Mapeamento do perfil do seu negócio | Rei das Vendas',
    description: 'Informe seu negócio, a solução necessária, o problema comercial e a faixa de investimento antes do atendimento pelo WhatsApp.',
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

function upsertProperty(property: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.content = content;
}

function updateCanonical(url: string) {
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;
}

function DashboardRoute() {
  useEffect(() => {
    upsertMeta('robots', 'noindex, nofollow');
    upsertMeta('googlebot', 'noindex, nofollow');
    document.title = `Painel | ${BRAND.name}`;
  }, []);

  return <Dashboard />;
}

function RouteMetadata() {
  const location = useLocation();

  useEffect(() => {
    const articleSlug = location.pathname.match(/^\/blog\/([^/]+)$/)?.[1];
    const article = articleSlug ? ARTICLE_BY_SLUG.get(articleSlug) : undefined;
    const growthMetadata = SEO_BY_PATH.get(location.pathname);
    const metadata = article ? { title: `${article.title} | Rei das Vendas`, description: article.description } : growthMetadata ?? META_BY_PATH[location.pathname] ?? {
      title: BRAND.seo.title,
      description: BRAND.seo.description,
    };
    const canonical = `https://reidasvendas.com.br${location.pathname === '/' ? '/' : location.pathname}`;
    const noIndex = ['/obrigado', '/builder', '/extensions'].includes(location.pathname)
      || (!article && !growthMetadata && !META_BY_PATH[location.pathname] && location.pathname !== '/');

    document.title = metadata.title;
    upsertMeta('description', metadata.description);
    upsertMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large');
    upsertMeta('googlebot', noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large');
    upsertMeta('twitter:title', metadata.title);
    upsertMeta('twitter:description', metadata.description);
    upsertProperty('og:title', metadata.title);
    upsertProperty('og:description', metadata.description);
    upsertProperty('og:url', canonical);
    upsertProperty('og:type', article ? 'article' : 'website');
    updateCanonical(canonical);

    const previousSchema = document.getElementById('rdv-route-schema');
    previousSchema?.remove();
    if (article || growthMetadata) {
      const schema = document.createElement('script');
      schema.id = 'rdv-route-schema';
      schema.type = 'application/ld+json';
      schema.textContent = JSON.stringify(article ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        datePublished: article.published,
        dateModified: article.published,
        inLanguage: 'pt-BR',
        mainEntityOfPage: canonical,
        author: { '@id': 'https://reidasvendas.com.br/#founder' },
        publisher: { '@id': 'https://reidasvendas.com.br/#organization' },
      } : {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': growthMetadata!.category,
            name: metadata.title,
            description: metadata.description,
            url: canonical,
            provider: { '@id': 'https://reidasvendas.com.br/#organization' },
          },
          ...(growthMetadata!.questions.length ? [{
            '@type': 'FAQPage',
            mainEntity: growthMetadata!.questions.map((question) => ({
              '@type': 'Question',
              name: question.question,
              acceptedAnswer: { '@type': 'Answer', text: question.answer },
            })),
          }] : []),
        ],
      }).replace(/</g, '\\u003c');
      document.head.appendChild(schema);
    }

    captureAttribution();
    trackEvent('page_view', { page_title: metadata.title });
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
              <Route path="/solucoes/:slug" element={<PageTransition><SolutionDetail /></PageTransition>} />
              <Route path="/alternativas/:slug" element={<PageTransition><ComparisonDetail /></PageTransition>} />
              <Route path="/ferramentas" element={<PageTransition><Tools /></PageTransition>} />
              <Route path="/ferramentas/:slug" element={<PageTransition><ToolDetail /></PageTransition>} />
              <Route path="/demonstracoes" element={<PageTransition><Demonstrations /></PageTransition>} />
              <Route path="/demonstracoes/:slug" element={<PageTransition><DemoExperience /></PageTransition>} />
              {GUIDES.map((guide) => <Route key={guide.slug} path={`/${guide.slug}`} element={<PageTransition><IntentGuide /></PageTransition>} />)}
              <Route path="/diagnostico" element={<PageTransition><Diagnostico /></PageTransition>} />
              <Route path="/servicos" element={<RedirectTo to="/solucoes" />} />
              <Route path="/servicos/:slug" element={<PageTransition><ServicoDetalhe /></PageTransition>} />
              <Route path="/modelos" element={<RedirectTo to="/solucoes" />} />
              <Route path="/projetos" element={<RedirectTo to="/portfolio" />} />
              <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
              <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
              <Route path="/contato" element={<RedirectTo to="/diagnostico" />} />
              <Route path="/planos" element={<RedirectTo to="/diagnostico" />} />
              <Route path="/sobre" element={<PageTransition><Sobre /></PageTransition>} />
              <Route path="/recursos" element={<RedirectTo to="/blog" />} />
              <Route path="/segmentos" element={<RedirectTo to="/solucoes" />} />
              <Route path="/segmentos/:slug" element={<PageTransition><SegmentoDetalhe /></PageTransition>} />
              <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
              <Route path="/obrigado" element={<PageTransition><Obrigado /></PageTransition>} />
              <Route path="/politica" element={<PageTransition><Politica /></PageTransition>} />
              <Route path="/builder" element={<PageTransition><Builder /></PageTransition>} />
              <Route path="/templates" element={<RedirectTo to="/demonstracoes" />} />
              <Route path="/extensions" element={<PageTransition><Extensions /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>
      <SiteFooter />
      <CookieConsent />
    </>
  );
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
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
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Arquiteturas digitais e foco em resultado',
        itemListElement: SOLUTIONS.map((solution) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: solution.title,
            description: solution.summary,
            url: `https://reidasvendas.com.br/solucoes/${solution.slug}`,
            areaServed: BRAND.seo.geo.areaServed,
          },
        })),
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://reidasvendas.com.br/#founder',
      name: BRAND.founder.name,
      url: BRAND.founder.site,
      worksFor: { '@id': 'https://reidasvendas.com.br/#organization' },
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
        <Route path="/dashboard/*" element={<DashboardRoute />} />
        <Route path="*" element={<PageErrorBoundary><SiteLayout /></PageErrorBoundary>} />
      </Routes>
    </Router>
  );
}
