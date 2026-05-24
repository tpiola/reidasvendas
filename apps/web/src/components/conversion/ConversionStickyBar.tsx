import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '@/lib/brand';
import { trackEvent } from '@/lib/analytics';

const SCROLL_THRESHOLD = 400;

export function ConversionStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`conversion-sticky-bar fixed bottom-0 left-0 right-0 z-[90] border-t border-[color:var(--border-subtle)] bg-[color:var(--header-surface)] px-4 py-3 shadow-lg shadow-black/20 ${visible ? 'is-visible' : ''}`}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      role="region"
      aria-label="Ação rápida"
      hidden={!visible}
    >
      <div className="mx-auto flex max-w-lg flex-col gap-2 sm:max-w-2xl sm:flex-row sm:items-center sm:justify-center sm:gap-3">
        <Link
          to="/diagnostico"
          className="btn-glow inline-flex h-11 flex-1 items-center justify-center px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white sm:flex-none sm:px-8"
        >
          Orçamento em 24h
        </Link>
        <a
          href={BRAND.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { location: 'sticky_bar' })}
          className="btn-ghost inline-flex h-11 flex-1 items-center justify-center px-4 text-[10px] font-bold uppercase tracking-[0.2em] sm:flex-none sm:px-6"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
