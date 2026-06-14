import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setVisible(scrollPct > 0.25 && !dismissed);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  if (!visible && !dismissed) return null;
  if (dismissed) return null;

  return (
    <div className={`sticky-cta-bar${visible ? ' visible' : ''}`} role="complementary" aria-label="CTA fixo">
      <button
        className="sticky-close"
        onClick={() => { setDismissed(true); setVisible(false); }}
        aria-label="Fechar"
      >
        ✕
      </button>
      <span className="sticky-text">
        ⏳ <strong>Últimas vagas</strong> · Entrega em 72h
      </span>
      <Link
        to="/diagnostico"
        className="btn-glow inline-flex h-10 items-center justify-center bg-[#0057FF] px-5 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-all hover:bg-[#0057FF]/90 hover:shadow-[0_0_30px_rgba(0,87,255,0.6)]"
        onClick={() => { setDismissed(true); setVisible(false); }}
      >
        QUERO ORÇAMENTO →
      </Link>
    </div>
  );
}
