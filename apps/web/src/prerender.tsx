import { Suspense } from "react";
import { PageTransition } from "./App";
import { CookieConsent } from "./components/CookieConsent";
import { renderToString } from "react-dom/server";
import { StaticRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "./lib/i18n";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import Home from "./pages/Home";
import Solucoes from "./pages/Solucoes";
import SolutionDetail from "./pages/SolutionDetail";
import ComparisonDetail from "./pages/ComparisonDetail";
import IntentGuide from "./pages/IntentGuide";
import Tools from "./pages/Tools";
import ToolDetail from "./pages/ToolDetail";
import Demonstrations from "./pages/Demonstrations";
import DemoExperience from "./pages/DemoExperience";
import Diagnostico from "./pages/Diagnostico";
import Obrigado from "./pages/Obrigado";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Portfolio from "./pages/Portfolio";
import Planos from "./pages/Planos";
import BlackFriday from "./pages/BlackFriday";
import Sobre from "./pages/Sobre";
import Politica from "./pages/Politica";
import Termos from "./pages/Termos";
import ContatoDireto from "./pages/ContatoDireto";
import NotFound from "./pages/NotFound";
import { GUIDE_SLUGS } from "./lib/guide-slugs";

/** Build-time rendering shares the actual page components with the client. */
export function renderPage(pathname: string) {
  return renderToString(
    <StaticRouter location={pathname}>
      <I18nProvider>
        <SiteHeader />
        <div className="page-offset">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/solucoes"
                element={
                  <PageTransition>
                    <Solucoes />
                  </PageTransition>
                }
              />
              <Route
                path="/solucoes/:slug"
                element={
                  <PageTransition>
                    <SolutionDetail />
                  </PageTransition>
                }
              />
              <Route
                path="/alternativas/:slug"
                element={
                  <PageTransition>
                    <ComparisonDetail />
                  </PageTransition>
                }
              />
              <Route
                path="/ferramentas"
                element={
                  <PageTransition>
                    <Tools />
                  </PageTransition>
                }
              />
              <Route
                path="/ferramentas/:slug"
                element={
                  <PageTransition>
                    <ToolDetail />
                  </PageTransition>
                }
              />
              <Route
                path="/demonstracoes"
                element={
                  <PageTransition>
                    <Demonstrations />
                  </PageTransition>
                }
              />
              <Route
                path="/demonstracoes/:slug"
                element={
                  <PageTransition>
                    <DemoExperience />
                  </PageTransition>
                }
              />
              <Route
                path="/diagnostico"
                element={
                  <PageTransition>
                    <Diagnostico />
                  </PageTransition>
                }
              />
              <Route
                path="/obrigado"
                element={
                  <PageTransition>
                    <Obrigado />
                  </PageTransition>
                }
              />
              <Route
                path="/blog"
                element={
                  <PageTransition>
                    <Blog />
                  </PageTransition>
                }
              />
              <Route
                path="/blog/:slug"
                element={
                  <PageTransition>
                    <BlogPost />
                  </PageTransition>
                }
              />
              <Route
                path="/portfolio"
                element={
                  <PageTransition>
                    <Portfolio />
                  </PageTransition>
                }
              />
              <Route
                path="/planos"
                element={
                  <PageTransition>
                    <Planos />
                  </PageTransition>
                }
              />
              <Route
                path="/black-friday"
                element={
                  <PageTransition>
                    <BlackFriday />
                  </PageTransition>
                }
              />
              <Route
                path="/sobre"
                element={
                  <PageTransition>
                    <Sobre />
                  </PageTransition>
                }
              />
              <Route
                path="/politica"
                element={
                  <PageTransition>
                    <Politica />
                  </PageTransition>
                }
              />
              <Route
                path="/termos"
                element={
                  <PageTransition>
                    <Termos />
                  </PageTransition>
                }
              />
              <Route
                path="/contato"
                element={
                  <PageTransition>
                    <ContatoDireto />
                  </PageTransition>
                }
              />
              {GUIDE_SLUGS.map((slug) => (
                <Route
                  key={slug}
                  path={`/${slug}`}
                  element={
                    <PageTransition>
                      <IntentGuide />
                    </PageTransition>
                  }
                />
              ))}
              <Route
                path="*"
                element={
                  <PageTransition>
                    <NotFound />
                  </PageTransition>
                }
              />
            </Routes>
          </Suspense>
        </div>
        <SiteFooter />
        <CookieConsent />
      </I18nProvider>
    </StaticRouter>,
  );
}
