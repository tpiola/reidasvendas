import { useEffect, useMemo, useState } from 'react';

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
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4">
      <div className="mx-auto max-w-6xl rounded-2xl border border-black/10 bg-white p-5 shadow-xl shadow-black/10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold tracking-tight">Cookies e dados</div>
            <p className="mt-1 text-xs leading-relaxed text-black/70">
              Eu uso cookies essenciais para funcionamento e, com sua permissão, medição de performance para otimizar conversão.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="h-10 rounded-xl border border-black/15 bg-white px-4 text-xs font-semibold text-black transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              onClick={() => {
                window.localStorage.setItem(storageKey, 'rejected');
                setValue('rejected');
              }}
            >
              Rejeitar
            </button>
            <button
              type="button"
              className="h-10 rounded-xl bg-black px-4 text-xs font-semibold text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              onClick={() => {
                window.localStorage.setItem(storageKey, 'accepted');
                setValue('accepted');
              }}
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

