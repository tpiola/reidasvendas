import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { trackEvent } from '@/lib/analytics';
import { MEASUREMENT_CONSENT_KEY } from '@/lib/analytics';

export function WhatsAppFab() {
  const location = useLocation();
  const [consentOpen, setConsentOpen] = useState(false);
  // No diagnóstico o WhatsApp qualificado vem do formulário; o FAB permanente
  // quebrava a promessa de "desbloquear depois da qualificação".
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
      aria-label={`Falar no WhatsApp com ${BRAND.name} — ${BRAND.phoneDisplay}`}
      onClick={() => trackEvent('whatsapp_click', { position: 'floating' })}
    >
      <span className="rdv-whatsapp-fab__ring" aria-hidden="true" />
      <MessageCircle aria-hidden="true" />
      <span className="rdv-whatsapp-fab__tip" aria-hidden="true">Fale no WhatsApp</span>
    </a>
  );
}
