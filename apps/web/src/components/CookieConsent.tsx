import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'reidasvendas:cookie-consent';

type ConsentValue = 'accepted' | 'rejected';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) setVisible(true);
  }, []);

  const persist = (value: ConsentValue) => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-[9998] max-w-sm"
      role="alert"
      aria-live="polite"
    >
      <div
        className="relative overflow-hidden rounded-2xl border p-5 shadow-2xl"
        style={{
          background: 'rgba(255,255,255,0.035)',
          borderColor: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(32px) saturate(160%)',
          WebkitBackdropFilter: 'blur(32px) saturate(160%)',
          boxShadow: '0 16px 60px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.06) inset',
        }}
      >
        {/* Header */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ background: 'rgba(214,168,79,0.12)' }}
            >
              <Cookie className="h-4 w-4" style={{ color: '#D6A84F' }} />
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: '#F5F5F5' }}
            >
              Cookies &amp; Privacidade
            </span>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-[rgba(255,255,255,0.06)]"
            style={{ color: 'rgba(255,255,255,0.35)' }}
            aria-label="Fechar"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Body */}
        <p
          className="mb-4 text-xs leading-relaxed"
          style={{ color: 'rgba(248,248,250,0.65)' }}
        >
          Utilizamos cookies e tecnologias similares para melhorar sua
          experiência, analisar o tráfego e personalizar conteúdo.{' '}
          <Link
            to="/privacidade"
            className="font-medium underline underline-offset-2 transition-opacity hover:opacity-80"
            style={{ color: '#D6A84F' }}
          >
            Saiba mais
          </Link>
          .
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          {/* Aceitar */}
          <button
            onClick={() => persist('accepted')}
            className="flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300"
            style={{
              background:
                'linear-gradient(135deg, #D6A84F 0%, #F2D38A 50%, #D6A84F 100%)',
              backgroundSize: '200% auto',
              color: '#030303',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundPosition =
                'right center';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundPosition =
                'left center';
            }}
            type="button"
          >
            Aceitar todos
          </button>

          {/* Rejeitar + Saiba mais */}
          <div className="flex gap-2">
            <button
              onClick={() => persist('rejected')}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300"
              style={{
                borderColor: 'rgba(214,168,79,0.22)',
                color: '#F5F5F5',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = '#D6A84F';
                el.style.background = 'rgba(214,168,79,0.08)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = 'rgba(214,168,79,0.22)';
                el.style.background = 'transparent';
              }}
              type="button"
            >
              Rejeitar
            </button>
            <Link
              to="/privacidade"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300"
              style={{
                borderColor: 'rgba(214,168,79,0.22)',
                color: '#F5F5F5',
                background: 'transparent',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = '#D6A84F';
                el.style.background = 'rgba(214,168,79,0.08)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = 'rgba(214,168,79,0.22)';
                el.style.background = 'transparent';
              }}
            >
              Saiba mais
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
