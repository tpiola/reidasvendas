import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Projetos from '@/pages/Projetos';
import Contato from '@/pages/Contato';
import Saude from '@/pages/Saude';
import Negocios from '@/pages/Negocios';
import Solucoes from '@/pages/Solucoes';
import Governanca from '@/pages/Governanca';
import NotFound from '@/pages/NotFound';
import Politica from '@/pages/Politica';
import Termos from '@/pages/Termos';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CookieConsent } from '@/components/CookieConsent';
import { WhatsAppFab } from '@/components/WhatsAppFab';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';

export default function App() {
  return (
    <Router>
      <SiteHeader />
      <AnalyticsProvider />
      <div className="pt-16">
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
      </div>
      <SiteFooter />
      <CookieConsent />
      <WhatsAppFab />
    </Router>
  );
}
