import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { trackEvent } from '@/lib/analytics';
import { MEASUREMENT_CONSENT_KEY } from '@/lib/analytics';
import { useI18n } from '@/lib/i18n';

export function WhatsAppFab() {
  const { t } = useI18n();
  const location = useLocation();
  const [consentOpen, setConsentOpen] = useState(false);
  const hideOnDiagnostico = location.pathname.startsWith('/diagnostico');

  useEffect(() => {
    try {
      if (localStorage.getItem(MEASUREMENT_CONSENT_KEY) === null) setConsentOpen(true);
    } catch {
      setConsentOpen(false);
    }
    const onConsent = () => setConsentOpen(false);
    window.addEventListener('rdv:consent', onConsent);
    return () => window.removeEventListener('rdv:consent', onConsent);
  }, []);

  if (hideOnDiagnostico) return null;

  return (
    <a
      href={BRAND.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={`rdv-whatsapp-fab${consentOpen ? ' is-hidden' : ''}`}
      aria-label={t('whatsapp.fab.aria', { name: BRAND.name, phone: BRAND.phoneDisplay })}
      onClick={() => trackEvent('whatsapp_click', { position: 'floating' })}
    >
      <span className="rdv-whatsapp-fab__ring" aria-hidden="true" />
      <MessageCircle aria-hidden="true" />
      <span className="rdv-whatsapp-fab__tip" aria-hidden="true">{t('whatsapp.fab')}</span>
    </a>
  );
}
