import { MessageCircle } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { trackEvent } from '@/lib/analytics';

export function WhatsAppFab() {
  return (
    <a
      href={BRAND.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="rdv-whatsapp-fab"
      aria-label={`Falar no WhatsApp com ${BRAND.name} — ${BRAND.phoneDisplay}`}
      onClick={() => trackEvent('whatsapp_click', { position: 'floating' })}
    >
      <span className="rdv-whatsapp-fab__ring" aria-hidden="true" />
      <MessageCircle aria-hidden="true" />
      <span className="rdv-whatsapp-fab__tip" aria-hidden="true">Fale no WhatsApp</span>
    </a>
  );
}
