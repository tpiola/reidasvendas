import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TransitionLink } from '@/components/TransitionLink';
import { Menu, X } from 'lucide-react';
import { BrandLockup } from '@/components/BrandLockup';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useI18n } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

function isActivePath(pathname: string, to: string): boolean {
  return to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`);
}

export function SiteHeader() {
  const { t, locale } = useI18n();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { label: t('nav.solutions'), to: '/solucoes' },
      { label: t('nav.portfolio'), to: '/portfolio' },
      { label: t('nav.plans'), to: '/planos' },
      { label: t('nav.about'), to: '/sobre' },
    ],
    [locale],
  );

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="rdv-header">
      <a className="sr-only focus:not-sr-only" href="#main-content">{t('nav.skip')}</a>
      <div className="rdv-header-inner">
        <TransitionLink to="/" className="rdv-brand-link" aria-label={t('nav.home')}>
          <BrandLockup compact />
        </TransitionLink>

        <nav className="rdv-desktop-nav" aria-label={t('nav.main')}>
          {navItems.map((item) => (
            <TransitionLink
              key={item.to}
              to={item.to}
              className={cn('rdv-nav-link', isActivePath(location.pathname, item.to) && 'is-active')}
              aria-current={isActivePath(location.pathname, item.to) ? 'page' : undefined}
            >
              {item.label}
            </TransitionLink>
          ))}
        </nav>

        <div className="rdv-header-actions">
          <LanguageSwitcher />
          <TransitionLink
            className="rdv-header-cta"
            to="/diagnostico"
            onClick={() => trackEvent('diagnostic_start', { position: 'header' })}
          >
            <span className="rdv-header-cta__full">{t('nav.cta')}</span>
            <span className="rdv-header-cta__short">{t('nav.cta.short')}</span>
          </TransitionLink>
        </div>

        <div className="rdv-mobile-actions">
          <LanguageSwitcher />
          <button
            type="button"
            className="rdv-menu-button"
            aria-expanded={menuOpen}
            aria-controls="rdv-mobile-nav"
            aria-label={menuOpen ? t('nav.menu.close') : t('nav.menu.open')}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="rdv-mobile-nav" className="rdv-mobile-nav" hidden={!menuOpen}>
        {navItems.map((item) => (
          <TransitionLink
            key={item.to}
            to={item.to}
            className={isActivePath(location.pathname, item.to) ? 'is-active' : undefined}
            aria-current={isActivePath(location.pathname, item.to) ? 'page' : undefined}
          >
            {item.label}
          </TransitionLink>
        ))}
        <TransitionLink
          className="rdv-header-cta"
          to="/diagnostico"
          onClick={() => trackEvent('diagnostic_start', { position: 'header-mobile' })}
        >
          {t('nav.cta')}
        </TransitionLink>
      </div>
    </header>
  );
}
