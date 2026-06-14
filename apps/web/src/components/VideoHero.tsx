/* ═══════════════════════════════════════════
   VIDEOHERO.TSX — Rei das Vendas
   Hero FULLSCREEN com vídeo real Pexels
   CSS scroll-driven parallax nativo com fallback JS
   Overlay gradiente: #0057FF → transparent → #0a0a0a
   Design limpo, profissional — SEM urgência
═══════════════════════════════════════════ */

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { VIDEOS, COPY } from '@/data/plataforma';

const VideoHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      /* autoplay blocked — fallback silencioso, poster cobre */
    });
  }, []);

  /* Scroll-driven parallax: CSS @supports + JS fallback */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    /* Check if browser supports CSS scroll-driven animations */
    const supportsScrollDriven = CSS.supports('animation-timeline: scroll()');
    if (supportsScrollDriven) return; /* CSS handles it */

    /* JS fallback for parallax */
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrolled = window.scrollY;
      const speed = 0.3;
      const yOffset = (rect.top - scrolled) * speed;
      const bg = section.querySelector('.hero-parallax-bg') as HTMLElement;
      if (bg) {
        bg.style.transform = `translate3d(0, ${Math.max(yOffset, -200)}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100dvh] overflow-hidden bg-[#0a0a0a]"
      aria-label="Hero principal"
    >
      {/* Video fullscreen com parallax scroll-driven */}
      <div
        className="hero-parallax-bg absolute inset-0 h-[120%] w-full -top-[10%]"
        style={{
          /* CSS scroll-driven parallax (Chrome 115+) */
          animationTimeline: 'scroll()',
          animationRange: '0px 100vh',
          animationName: 'hero-parallax',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={VIDEOS.hero}
          className="h-full w-full object-cover"
          style={{ filter: 'brightness(0.45)' }}
          aria-hidden="true"
        >
          <source src={VIDEOS.hero} type="video/mp4" />
        </video>
      </div>

      {/* Overlay gradiente: #0057FF → transparent → #0a0a0a */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(0,87,255,0.25) 0%, transparent 40%, #0a0a0a 85%)',
        }}
        aria-hidden="true"
      />

      {/* Gradiente inferior para transição suave */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #0a0a0a 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Conteúdo centralizado */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col items-center justify-center px-6 pb-24 pt-28 text-center md:pt-36">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            {COPY.hero.titulo}
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-base leading-relaxed text-white/70 md:text-lg lg:text-xl">
            {COPY.hero.subtitulo}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/diagnostico"
              className="inline-flex h-14 items-center justify-center rounded-lg bg-[#0057FF] px-8 text-sm font-semibold text-white transition-all hover:bg-[#0057FF]/90 hover:shadow-[0_0_30px_rgba(0,87,255,0.3)] active:scale-[0.98]"
            >
              {COPY.hero.cta}
            </Link>
            <Link
              to="/planos"
              className="inline-flex h-14 items-center justify-center rounded-lg border border-white/15 bg-white/5 px-8 text-sm font-semibold text-white/80 transition-all hover:bg-white/10 hover:text-white active:scale-[0.98]"
            >
              Ver planos e preços
            </Link>
          </div>

          {/* Micro-copy de confiança */}
          <p className="mt-4 text-xs text-white/40">
            Diagnóstico gratuito · Sem compromisso · Suporte local em Franca-SP
          </p>
        </div>
      </div>

      {/* Scroll indicator minimalista */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
          {COPY.hero.scrollHint}
        </span>
        <div className="h-10 w-[1px] bg-gradient-to-b from-white/40 to-transparent" />
      </div>

      {/* Keyframes para parallax scroll-driven */}
      <style>{`
        @keyframes hero-parallax {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(0, -60px, 0); }
        }
        .hero-parallax-bg {
          animation: hero-parallax linear both;
          animation-timeline: scroll(root block);
          animation-range: 0vh 100vh;
        }
      `}</style>
    </section>
  );
};

export default VideoHero;
