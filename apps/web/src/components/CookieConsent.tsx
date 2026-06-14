import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type Consent = 'accepted' | 'rejected';

export function CookieConsent() {
  const storageKey = 'reidasvendas:cookie-consent';
  const [value, setValue] = useState<Consent | null>(null);

  useEffect(() => {
    const v = window.localStorage.getItem(storageKey);
    if (v === 'accepted' || v === 'rejected') setValue(v);
  }, []);

  const open = useMemo(() => value === null, [value]);
  if (!open) return null;

  return (
    <div
      className="fixed z-[60] p-4"
      style={{
        bottom: 'max(24px, env(safe-area-inset-bottom, 24px))',
        left: 'max(24px, env(safe-area-inset-left, 24px))',
        maxWidth: '400px',
      }}
    >
      <div
        className="rounded-2xl border p-5 shadow-xl"
        style={{
          background: 'rgba(9, 13, 18, 0.88)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs leading-relaxed text-white/70">
              Usamos cookies para melhorar sua experiencia. Ao continuar, voce concorda com nossa{' '}
              <Link
                to="/politica"
                className="text-[#C9A84C] underline underline-offset-2 hover:text-[#F0D080] transition-colors"
                onClick={() => {
                  window.localStorage.setItem(storageKey, 'accepted');
                  setValue('accepted');
                }}
              >
                Politica de Privacidade
              </Link>
              .
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="h-10 rounded-xl border px-4 text-xs font-semibold transition-all"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.12)',
                background: 'rgba(255, 255, 255, 0.04)',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
              onClick={() => {
                window.localStorage.setItem(storageKey, 'rejected');
                setValue('rejected');
              }}
            >
              Rejeitar
            </button>
            <button
              type="button"
              className="h-10 rounded-xl px-4 text-xs font-semibold text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #0047CC 0%, #0057FF 50%, #3377FF 100%)',
                boxShadow: '0 0 20px rgba(0,87,255,0.3)',
              }}
              onClick={() => {
                window.localStorage.setItem(storageKey, 'accepted');
                setValue('accepted');
              }}
            >
              Aceitar
            </button>
            <Link
              to="/politica"
              className="inline-flex h-10 items-center rounded-xl border px-4 text-xs font-semibold transition-all"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.12)',
                background: 'rgba(255, 255, 255, 0.04)',
                color: 'rgba(201, 168, 76, 0.9)',
              }}
              onClick={() => {
                window.localStorage.setItem(storageKey, 'accepted');
                setValue('accepted');
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
