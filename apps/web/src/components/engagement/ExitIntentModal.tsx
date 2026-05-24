import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '@/lib/brand';

const STORAGE_KEY = 'rdv-exit-intent-shown';

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    const onLeave = (e: MouseEvent) => {
      if (e.clientY > 12) return;
      try {
        if (sessionStorage.getItem(STORAGE_KEY)) return;
        sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {
        /* ignore */
      }
      setOpen(true);
    };

    document.addEventListener('mouseout', onLeave);
    return () => document.removeEventListener('mouseout', onLeave);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#030305]/80 p-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      <div className="glass-card relative max-w-md rounded-2xl p-8 text-center">
        <button
          type="button"
          className="absolute right-4 top-4 text-surface-muted transition-colors hover:text-[color:var(--page-fg)]"
          aria-label="Fechar"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/80">Antes de sair</p>
        <h2 id="exit-intent-title" className="mt-4 text-xl font-semibold text-surface">
          E se o funil trabalhasse enquanto você atende?
        </h2>
        <p className="mt-4 text-sm text-surface-muted">
          Fale no WhatsApp ou solicite orçamento — proposta em até 24h.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <a
            href={BRAND.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="btn-glow inline-flex h-12 items-center justify-center text-[11px] font-bold uppercase tracking-[0.24em] text-white"
          >
            Abrir WhatsApp
          </a>
          <Link
            to="/diagnostico"
            className="btn-ghost inline-flex h-12 items-center justify-center text-[11px] font-bold uppercase tracking-[0.24em]"
            onClick={() => setOpen(false)}
          >
            Solicitar orçamento
          </Link>
        </div>
      </div>
    </div>
  );
}
