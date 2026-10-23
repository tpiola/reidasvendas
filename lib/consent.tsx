'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  bootTracking,
  readConsent,
  saveConsent,
  trackPageView,
} from './tracking';

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event('rdv:open-consent'))}
    >
      Preferências de cookies
    </button>
  );
}
export default function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    bootTracking();
    const value = readConsent();
    setOpen(!value.updatedAt);
    setAnalytics(value.analytics);
    setMarketing(value.marketing);
    const reopen = () => {
      previousFocus.current = document.activeElement as HTMLElement;
      const c = readConsent();
      setAnalytics(c.analytics);
      setMarketing(c.marketing);
      setSettings(true);
      setOpen(true);
      requestAnimationFrame(() => heading.current?.focus());
    };
    window.addEventListener('rdv:open-consent', reopen);
    return () => window.removeEventListener('rdv:open-consent', reopen);
  }, []);
  function finish(a: boolean, m: boolean) {
    saveConsent(a, m);
    setOpen(false);
    previousFocus.current?.focus();
  }
  if (!open) return null;
  return (
    <section
      className="cookie-banner"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-description"
    >
      <h2 ref={heading} tabIndex={-1} id="cookie-title">
        Você escolhe o que medir.
      </h2>
      <p id="cookie-description">
        Usamos o necessário para lembrar sua escolha e proteger os formulários.
        Com sua permissão, Google Analytics mede o uso e a Meta mede anúncios.
        Recusar não limita o site.{' '}
        <Link href="/privacidade">Leia a política de privacidade.</Link>
      </p>
      {settings && (
        <fieldset>
          <legend>Cookies opcionais — desativados por padrão</legend>
          <label>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
            />{' '}
            Análise de uso (Google Analytics)
          </label>
          <label>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
            />{' '}
            Publicidade (Meta e sinais de anúncios Google)
          </label>
          <p>
            Sua escolha vale por 180 dias e pode ser alterada no rodapé. A
            exclusão de cookies já enviados não apaga dados mantidos por
            fornecedores; consulte seus direitos na política.
          </p>
        </fieldset>
      )}
      <div className="cookie-actions">
        <button type="button" onClick={() => finish(false, false)}>
          Rejeitar opcionais
        </button>
        <button type="button" onClick={() => finish(true, true)}>
          Aceitar opcionais
        </button>
        {settings ? (
          <button type="button" onClick={() => finish(analytics, marketing)}>
            Salvar preferências
          </button>
        ) : (
          <button type="button" onClick={() => setSettings(true)}>
            Configurar
          </button>
        )}
      </div>
    </section>
  );
}

// The initial PageView is emitted when tags are first authorized, not again here.
export function TrackingNavigation() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  useEffect(() => {
    if (previous.current !== pathname) {
      previous.current = pathname;
      trackPageView(pathname);
    }
  }, [pathname]);
  return null;
}
