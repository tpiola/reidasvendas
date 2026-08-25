import { Link } from 'react-router-dom';
import { BrandLockup } from '@/components/BrandLockup';
import { trackEvent } from '@/lib/analytics';

export function SiteHeader() {
  return (
    <header className="rdv-header">
      <a className="sr-only focus:not-sr-only" href="#main-content">Ir para o conteúdo</a>
      <div className="rdv-header-inner">
        <Link to="/" className="rdv-brand-link" aria-label="Rei das Vendas — página inicial">
          <BrandLockup compact />
        </Link>
        <p className="rdv-header-context">Franca · estratégia, interface e operação</p>
        <nav aria-label="Ação principal">
          <Link
            className="rdv-header-cta"
            to="/diagnostico"
            onClick={() => trackEvent('diagnostic_start', { position: 'header' })}
          >
            Abrir diagnóstico
          </Link>
        </nav>
      </div>
    </header>
  );
}
