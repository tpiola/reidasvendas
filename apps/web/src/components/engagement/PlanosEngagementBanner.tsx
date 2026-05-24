import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const STORAGE_KEY = 'rdv-planos-banner';

export function PlanosEngagementBanner() {
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!location.pathname.startsWith('/planos')) return;

    const t = window.setTimeout(() => {
      try {
        if (sessionStorage.getItem(STORAGE_KEY)) return;
        sessionStorage.setItem(STORAGE_KEY, '1');
        setShow(true);
      } catch {
        setShow(true);
      }
    }, 25000);

    return () => window.clearTimeout(t);
  }, [location.pathname]);

  if (!show) return null;

  return (
    <div className="fixed bottom-24 left-5 right-5 z-[54] mx-auto max-w-lg md:left-auto md:right-24">
      <div className="glass-card flex flex-col gap-3 rounded-2xl border border-[#C9A84C]/25 p-4 text-white sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/60">
          <span className="font-semibold text-white">Ainda em dúvida?</span> Orçamento em 24h com escopo fechado.
        </p>
        <div className="flex shrink-0 gap-2">
          <Link
            to="/diagnostico"
            className="btn-glow inline-flex h-10 items-center justify-center px-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white"
          >
            Solicitar orçamento
          </Link>
          <button
            type="button"
            className="h-10 px-3 text-white/40 hover:text-white"
            aria-label="Fechar"
            onClick={() => setShow(false)}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
