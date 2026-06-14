import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-consent');
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] p-4" role="alert">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(3,3,5,0.95)] p-4 shadow-2xl backdrop-blur-2xl sm:p-5">
        <p className="text-sm leading-relaxed text-[rgba(248,248,250,0.7)]">
          Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{' '}
          <Link to="/politica" className="text-[#C9A84C] underline underline-offset-2 hover:text-[#f0d080]">
            Política de Privacidade
          </Link>.
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={accept}
            className="whitespace-nowrap rounded-full bg-[#0057FF] px-5 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#0044cc]"
          >
            Aceitar
          </button>
          <button
            onClick={() => setVisible(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[rgba(255,255,255,0.35)] transition hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
