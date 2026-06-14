/* ═══════════════════════════════════════════════════
   HEROSECTION.TSX — Rei das Vendas
   Experiência Cinematográfica
   Vídeo fullscreen + overlay dramático + CTA único
═══════════════════════════════════════════════════ */

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const HERO_VIDEO =
  'https://videos.pexels.com/video-files/854071/854071-uhd_3840_2160_25fps.mp4';

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrolled, setScrolled] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pct = Math.min(window.scrollY / window.innerHeight, 1);
      setScrolled(pct);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const parallaxStyle = {
    transform: `translateY(${scrolled * 40}px) scale(${1 + scrolled * 0.02})`,
    opacity: 1 - scrolled * 1.2,
  };

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className="h-full w-full object-cover"
          style={{
            filter: videoLoaded ? 'none' : 'blur(20px)',
            transition: 'filter 0.5s ease',
            ...parallaxStyle,
          }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </div>

      {/* Loading placeholder */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#08080b] to-[#000000]" />
      )}

      {/* Overlay gradient cinematográfico */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,87,255,0.08)_0%,transparent_60%)]" />

      {/* Content */}
      <div
        className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center"
        style={{ opacity: videoLoaded ? 1 : 0, transition: 'opacity 0.8s ease' }}
      >
        {/* Badge */}
        <div className="mb-6 animate-fade-in-down">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/60 backdrop-blur-sm">
            De Franca-SP para o mundo
          </span>
        </div>

        {/* Title */}
        <h1 className="animate-fade-in-up max-w-4xl text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          Soluções Digitais para o{' '}
          <span className="bg-gradient-to-r from-[#0057FF] to-[#C9A84C] bg-clip-text text-transparent">
            seu Negócio Local
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up mt-6 max-w-2xl text-base text-white/60 sm:text-lg md:text-xl" style={{ animationDelay: '0.2s' }}>
          Sites, aplicativos, automações e consultoria. Tudo que você precisa para vender mais.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up mt-10 flex flex-col items-center gap-4 sm:flex-row" style={{ animationDelay: '0.4s' }}>
          <Link
            to="/contato"
            className="group relative inline-flex h-14 items-center gap-2 overflow-hidden rounded-full bg-[#0057FF] px-8 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#0046d6] hover:shadow-[0_0_40px_rgba(0,87,255,0.3)]"
          >
            <span>Diagnóstico Gratuito</span>
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            to="/planos"
            className="inline-flex h-14 items-center rounded-full border border-white/10 bg-white/5 px-8 text-sm font-medium text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            Ver planos
          </Link>
        </div>

        {/* Trust micro-copy */}
        <p className="animate-fade-in-up mt-6 text-xs text-white/30" style={{ animationDelay: '0.6s' }}>
          Diagnóstico gratuito · Resposta em 24h · Sem compromisso
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <svg className="h-6 w-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease both; }
        .animate-fade-in-down { animation: fade-in-down 0.6s ease both; }
      `}</style>
    </section>
  );
};

export default HeroSection;
