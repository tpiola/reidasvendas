import { Link } from 'react-router-dom';
import { BrandLockup } from '@/components/BrandLockup';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useI18n } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';

export function SiteHeader() {
  const { t } = useI18n();
  return (
    <header className="rdv-header">
      <a className="sr-only focus:not-sr-only" href="#main-content">Ir para o conteúdo</a>
      <div className="rdv-header-inner">
        <Link to="/" className="rdv-brand-link" aria-label="Rei das Vendas — página inicial">
          <BrandLockup compact />
        </Link>
        <p className="rdv-header-context">Franca · presença · produto · operação</p>
        <div className="rdv-header-actions">
          <LanguageSwitcher />
          <nav aria-label="Ação principal">
            <Link
              className="rdv-header-cta"
              to="/diagnostico"
              onClick={() => trackEvent('diagnostic_start', { position: 'header' })}
            >
              <span className="rdv-header-cta__full">{t('nav.cta')}</span>
              <span className="rdv-header-cta__short">Diagnóstico</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
