import { lazy, Suspense, Component, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CookieConsent } from '@/components/CookieConsent';
import { WhatsAppFab } from '@/components/WhatsAppFab';
import Home from '@/pages/Home';
import { BRAND } from '@/lib/brand';
import { ARTICLE_BY_SLUG } from '@/lib/articles';
import { captureAttribution, trackEvent } from '@/lib/analytics';
import { GUIDES, SEO_BY_PATH } from '@/lib/growth';

const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Politica = lazy(() => import('@/pages/Politica'));
const Termos = lazy(() => import('@/pages/Termos'));
const Sobre = lazy(() => import('@/pages/Sobre'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const Solucoes = lazy(() => import('@/pages/Solucoes'));
const Diagnostico = lazy(() => import('@/pages/Diagnostico'));
const Obrigado = lazy(() => import('@/pages/Obrigado'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Planos = lazy(() => import('@/pages/Planos'));
const ContatoDireto = lazy(() => import('@/pages/ContatoDireto'));
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

  componentDidCatch(error: Error) {
    trackEvent('client_error', { boundary: 'page', message: error.message.slice(0, 160) });
    console.error(JSON.stringify({ level: 'error', event: 'page_render_failed', message: error.message }));
  }

  handleRetry = () => {
    window.location.reload();
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

// Navegadores com View Transitions API nativo (Chromium, e React Router v7
// via <Link viewTransition>) já cross-dissolvem a troca de rota no nível do
// compositor — rodar a animação do Framer Motion por cima duplicaria o efeito
// e brigaria com o snapshot do navegador. Nesses navegadores o Framer Motion
// só entrega o estado final; nos demais, mantém o fade/slide de sempre.
const supportsViewTransitions = typeof document !== 'undefined' && 'startViewTransition' in document;

function PageTransition({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  const skipMotion = shouldReduceMotion || supportsViewTransitions;

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial={false}
      animate={skipMotion ? { opacity: 1, y: 0 } : 'animate'}
      exit={skipMotion ? undefined : 'exit'}
    >
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

/**
 * /servicos/:slug e /segmentos/:slug eram um catálogo de conteúdo anterior à
 * reorganização "único caminho comercial" (commit a0c1d7f) que unificou o site
 * em /solucoes. As páginas antigas (ServicoDetalhe/SegmentoDetalhe) ficaram
 * sem nenhum link de entrada — órfãs, indexáveis só por URL direta ou backlink
 * antigo, com conteúdo sobrepondo o de /solucoes (ex.: "infraestrutura-digital"
 * existe nos dois catálogos com textos diferentes). Redireciona para o
 * equivalente mais próximo já ativo em /solucoes em vez de manter conteúdo
 * duplicado indexável.
 */
const LEGACY_SLUG_REDIRECTS: Record<string, string> = {
  'site-conversao-local': '/solucoes/site-institucional-premium',
  'funis-e-automacao': '/solucoes/funil-de-qualificacao',
  'aplicativos-e-saas': '/solucoes/app-para-empresas',
  'google-e-presenca-local': '/solucoes/seo-local-google-business',
  'infraestrutura-digital': '/solucoes/infraestrutura-digital',
  'integracao-whatsapp': '/solucoes/automacao-whatsapp',
  clinicas: '/solucoes/site-para-clinicas',
  odontologia: '/solucoes/site-para-dentistas',
  estetica: '/solucoes/site-para-clinicas',
  restaurantes: '/solucoes/site-para-restaurantes',
  'oficinas-mecanicas': '/solucoes/site-para-profissionais-liberais',
  'pet-shop': '/solucoes/site-institucional-premium',
  advocacia: '/solucoes/site-para-advogados',
  imobiliarias: '/solucoes/site-para-imobiliarias',
  'escolas-e-cursos': '/solucoes/site-institucional-premium',
  'servicos-locais': '/solucoes/site-para-profissionais-liberais',
};

function RedirectLegacySlug() {
  const { slug = '' } = useParams();
  return <RedirectTo to={LEGACY_SLUG_REDIRECTS[slug] ?? '/solucoes'} />;
}

const META_BY_PATH: Record<string, { title: string; description: string }> = {
  '/': {
    title: BRAND.seo.title,
    description: BRAND.seo.description,
  },
  '/solucoes': {
    title: 'Sites, lojas, aplicativos e soluções digitais | Rei das Vendas',
    description: 'Explore 24 possibilidades de presença, comércio, atendimento, produto, distribuição e operação digital para negócios locais.',
  },
  '/diagnostico': {
    title: 'Mapeamento do perfil do seu negócio | Rei das Vendas',
    description: 'Informe seu negócio, a solução necessária, o problema comercial e a faixa de investimento antes do atendimento pelo WhatsApp.',
  },
  '/portfolio': {
    title: 'Projetos publicados | Rei das Vendas',
    description: 'Sites, lojas e produtos digitais publicados, apresentados com contexto, escopo real e sem métricas inventadas.',
  },
  '/sobre': {
    title: 'Sobre o Rei das Vendas | Franca, SP',
    description: 'Princípios, forma de trabalho e responsabilidade por projetos digitais conduzidos a partir de Franca, SP.',
  },
  '/contato': {
    title: 'Contato | Rei das Vendas em Franca, SP',
    description: 'Fale pelo WhatsApp (16) 99233-3344 ou pelo e-mail contato@reidasvendas.com.br e organize o contexto do seu projeto digital.',
  },
  '/planos': {
    title: 'Projeto individual e operação contínua | Rei das Vendas',
    description: 'Compare entrega individual, assinatura operacional e ciclos de crescimento para sites, lojas, aplicativos, SaaS e automações.',
  },
  '/politica': {
    title: 'Política de privacidade | Rei das Vendas',
    description: 'Como informações enviadas pelo diagnóstico e dados de medição são tratados.',
  },
  '/termos': {
    title: 'Termos de uso | Rei das Vendas',
    description: 'Condições gerais de uso e contratação dos serviços do Rei das Vendas para negócios locais.',
  },
  '/blog': {
    title: 'Caderno de operação | Rei das Vendas',
    description: 'Leituras sobre publicação, busca, atendimento e continuidade para decidir antes de construir.',
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

    const staticSchema = document.getElementById('rdv-static-schema');
    const staticSchemaMatches = staticSchema?.getAttribute('data-path') === location.pathname;
    if (!staticSchemaMatches) staticSchema?.remove();

    const previousSchema = document.getElementById('rdv-route-schema');
    previousSchema?.remove();
    const staticMetadata = META_BY_PATH[location.pathname];
    if (!staticSchemaMatches && (article || growthMetadata || staticMetadata)) {
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
      } : growthMetadata ? {
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
      } : {
        '@context': 'https://schema.org',
        '@type': location.pathname === '/solucoes' || location.pathname === '/portfolio' ? 'CollectionPage' : 'WebPage',
        name: metadata.title,
        description: metadata.description,
        url: canonical,
        inLanguage: 'pt-BR',
        isPartOf: { '@id': 'https://reidasvendas.com.br/#website' },
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
              <Route path="/servicos/:slug" element={<RedirectLegacySlug />} />
              <Route path="/modelos" element={<RedirectTo to="/solucoes" />} />
              <Route path="/projetos" element={<RedirectTo to="/portfolio" />} />
              <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
              <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
              <Route path="/contato" element={<PageTransition><ContatoDireto /></PageTransition>} />
              <Route path="/planos" element={<PageTransition><Planos /></PageTransition>} />
              <Route path="/sobre" element={<PageTransition><Sobre /></PageTransition>} />
              <Route path="/recursos" element={<RedirectTo to="/blog" />} />
              <Route path="/segmentos" element={<RedirectTo to="/solucoes" />} />
              <Route path="/segmentos/:slug" element={<RedirectLegacySlug />} />
              <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
              <Route path="/obrigado" element={<PageTransition><Obrigado /></PageTransition>} />
              <Route path="/politica" element={<PageTransition><Politica /></PageTransition>} />
              <Route path="/termos" element={<PageTransition><Termos /></PageTransition>} />
              <Route path="/templates" element={<RedirectTo to="/demonstracoes" />} />
              <Route path="/builder" element={<RedirectTo to="/solucoes" />} />
              <Route path="/extensions" element={<RedirectTo to="/solucoes" />} />
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>
      <SiteFooter />
      <WhatsAppFab />
      <CookieConsent />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard/*" element={<Navigate to="/solucoes" replace />} />
        <Route path="*" element={<PageErrorBoundary><SiteLayout /></PageErrorBoundary>} />
      </Routes>
    </Router>
  );
}
