import { MessageCircle, Mail, MapPin } from 'lucide-react';
import { Reveal } from '@/hooks/useAnimation';
import { BRAND } from '@/lib/brand';
import { trackEvent } from '@/lib/analytics';

function formatPhone(phone: string): string {
  // 5516993333344 -> +55 16 99333-3344
  const digits = phone.replace(/\D/g, '');
  const country = digits.slice(0, 2);
  const area = digits.slice(2, 4);
  const rest = digits.slice(4);
  const part1 = rest.slice(0, rest.length - 4);
  const part2 = rest.slice(rest.length - 4);
  return `+${country} ${area} ${part1}-${part2}`;
}

export function FinalCta() {
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="cta-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="rdv-cta-panel relative px-6 py-16 text-center sm:px-12 sm:py-20 lg:py-24">
            <div className="relative z-10 mx-auto max-w-3xl">
              <span className="gold-badge">
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Próximo movimento
              </span>
              <h2 id="cta-title" className="font-serif mt-6 text-3xl font-bold leading-tight text-text-primary sm:text-4xl md:text-5xl">
                Pronto pra <span className="text-gradient-premium">lotar sua agenda?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
                Manda uma mensagem no WhatsApp que a gente analisa seu negócio e te mostra o que dá pra melhorar.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={BRAND.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_cta', { position: 'home-final' })}
                  className="btn-gold w-full sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Falar no WhatsApp
                </a>
                <a
                  href={`mailto:${BRAND.email}`}
                  onClick={() => trackEvent('email_cta', { position: 'home-final' })}
                  className="btn-outline-gold w-full sm:w-auto"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {BRAND.email}
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-text-secondary">
                <span className="inline-flex items-center gap-2">
                  <MessageCircle className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  {formatPhone(BRAND.phone)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  {BRAND.address}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  {BRAND.email}
                </span>
              </div>

              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                Site rápido · IA que vende · Suporte próximo
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
