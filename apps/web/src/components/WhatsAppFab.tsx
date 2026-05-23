import { useEffect, useState } from 'react';
import { BRAND } from '@/lib/brand';

function buildUrl() {
  return BRAND.whatsappLink;
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#FFFFFF"
        d="M19.1 17.5c-.3-.2-1.6-.8-1.9-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.9-1.7-2.2-.2-.3 0-.5.1-.7.2-.2.3-.4.4-.6.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6 0-.2-.7-1.6-1-2.2-.3-.6-.6-.5-.8-.5h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9 0 1.7 1.2 3.3 1.4 3.6.2.2 2.4 3.7 5.9 5.1.8.3 1.4.5 1.9.6.8.3 1.6.2 2.2.1.7-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.1-1.3-.1-.2-.3-.2-.6-.3z"
      />
      <path
        fill="#FFFFFF"
        d="M16 4.8c-6.2 0-11.2 5-11.2 11.2 0 2 .5 3.9 1.5 5.6L4.6 27.2l5.8-1.5c1.6.9 3.5 1.4 5.6 1.4 6.2 0 11.2-5 11.2-11.2S22.2 4.8 16 4.8zm0 20.3c-1.9 0-3.7-.5-5.2-1.5l-.4-.2-3.4.9.9-3.3-.2-.4c-1-1.6-1.6-3.4-1.6-5.3 0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10z"
      />
    </svg>
  );
}

export function WhatsAppFab() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 220);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <a
      href={buildUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      onClick={() => {
        const gtag = window.gtag;
        if (typeof gtag === 'function') {
          gtag('event', 'whatsapp_click', { location: 'fab' });
        }
      }}
      className={
        'fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-[#25D366] text-white shadow-2xl shadow-black/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#20BD5B]'
      }
      style={{
        opacity: ready ? 1 : 0,
        transform: ready ? undefined : 'translateY(10px)',
        transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        transitionDuration: '320ms',
      }}
    >
      <WhatsAppIcon size={18} />
    </a>
  );
}
