import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '@/lib/brand';

const STORAGE_KEY = 'rdv-assist-opened';

export function ProactiveAssist() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      try {
        if (!sessionStorage.getItem(STORAGE_KEY)) setVisible(true);
      } catch {
        setVisible(true);
      }
    }, 12000);
    return () => window.clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 right-5 z-[55] max-w-[min(320px,90vw)]">
      {expanded ? (
        <div className="relative glass-card rounded-2xl border border-white/[0.08] p-5 pt-8 text-white shadow-2xl">
          <button
            type="button"
            className="absolute right-3 top-3 text-white/40 hover:text-white"
            aria-label="Minimizar"
            onClick={() => {
              setExpanded(false);
              try {
                sessionStorage.setItem(STORAGE_KEY, '1');
              } catch {
                /* ignore */
              }
            }}
          >
            ×
          </button>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C9A84C]/80">Especialista</p>
          <p className="mt-2 text-sm text-white/55">
            Você sente que seu negócio está invisível online? O diagnóstico mostra o próximo passo em 24h.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              to="/diagnostico"
              className="btn-glow inline-flex h-10 items-center justify-center text-[10px] font-bold uppercase tracking-[0.22em] text-white"
            >
              Falar com especialista
            </Link>
            <a
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 hover:text-[#C9A84C]"
            >
              WhatsApp direto
            </a>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="btn-glow flex h-12 items-center gap-2 rounded-full px-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" aria-hidden />
          Ajuda?
        </button>
      )}
    </div>
  );
}
