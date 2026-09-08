import { ArrowRight, Instagram, Linkedin } from 'lucide-react';
import { TransitionLink } from '@/components/TransitionLink';
import { BrandLockup } from '@/components/BrandLockup';
import { BRAND } from '@/lib/brand';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useI18n } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';

const SOCIAL = [
  { label: 'Instagram', href: BRAND.instagram, icon: Instagram },
  { label: 'LinkedIn', href: BRAND.linkedin, icon: Linkedin },
];

export function SiteFooter() {
  const { t } = useI18n();
  const index = [
    [t('footer.link.possibilities'), '/solucoes'],
    [t('footer.link.projects'), '/portfolio'],
    [t('footer.link.demos'), '/demonstracoes'],
    [t('footer.link.plans'), '/planos'],
  ] as const;
  const knowledge = [
    [t('footer.link.diagnostic'), '/diagnostico'],
    [t('footer.link.tools'), '/ferramentas'],
    [t('footer.link.guides'), '/blog'],
    [t('footer.link.about'), '/sobre'],
  ] as const;

  return (
    <footer className="rdv-footer-v3">
      <div className="rdv-shell rdv-footer-v3__top">
        <div className="rdv-footer-v3__brand">
          <TransitionLink to="/" aria-label={t('nav.home')}><BrandLockup /></TransitionLink>
          <p>{t('footer.mission')}</p>
        </div>

        <nav aria-label={t('footer.nav.build')}>
          <p>{t('footer.build')}</p>
          {index.map(([label, to]) => <TransitionLink key={to} to={to}>{label}</TransitionLink>)}
        </nav>

        <nav aria-label={t('footer.nav.decide')}>
          <p>{t('footer.decide')}</p>
          {knowledge.map(([label, to]) => <TransitionLink key={to} to={to}>{label}</TransitionLink>)}
        </nav>

        <div className="rdv-footer-v3__contact">
          <p>{t('footer.contact')}</p>
          <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { position: 'footer' })}>
            WhatsApp · {BRAND.phoneDisplay}
          </a>
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          <span>{t('footer.remote')}</span>
          <span>{t('footer.hours')}</span>
          <div className="rdv-footer-v3__social" aria-label={t('footer.social')}>
            {SOCIAL.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${BRAND.name} / ${label}`}
                onClick={() => trackEvent('social_click', { network: label.toLowerCase(), position: 'footer' })}
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="rdv-shell rdv-footer-v3__statement">
        <h2>{t('footer.statement')}</h2>
        <TransitionLink to="/diagnostico?origem=footer" onClick={() => trackEvent('diagnostic_start', { position: 'footer' })}>
          {t('footer.cta')} <ArrowRight aria-hidden="true" />
        </TransitionLink>
      </div>

      <div className="rdv-shell rdv-footer-v3__bottom">
        <p>© {new Date().getFullYear()} {BRAND.name}</p>
        <div>
          <TransitionLink to="/politica">{t('footer.privacy')}</TransitionLink>
          <TransitionLink to="/termos">{t('footer.terms')}</TransitionLink>
          <TransitionLink to="/contato">{t('footer.contact.link')}</TransitionLink>
        </div>
        <LanguageSwitcher />
        <p>{t('footer.tagline')}</p>
      </div>
    </footer>
  );
}
