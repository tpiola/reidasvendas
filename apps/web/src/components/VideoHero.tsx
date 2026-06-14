/* ═══════════════════════════════════════════
   VIDEOHERO.TSX — Rei das Vendas
   Hero FULLSCREEN com vídeo de fundo real,
   parallax scroll, typewriter, CTA pulsante,
   seções de conteúdo com scroll reveal
═══════════════════════════════════════════ */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import '../styles/scroll-hero.css';

/* URL real de vídeo de escritório/tecnologia (Pexels — domínio público) */
const HERO_VIDEO_URL =
  'https://videos.pexels.com/video-files/4328609/4328609-uhd_3840_2160_30fps.mp4';

const HERO_POSTER_URL =
  'https://images.pexels.com/photos/11813187/pexels-photo-11813187.jpeg?auto=compress&cs=tinysrgb&w=1920';

const VideoHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [showIndicator, setShowIndicator] = useState(true);
  const [typewriterDone, setTypewriterDone] = useState(false);

  /* ─── Parallax fallback (browsers sem scroll-driven) ─── */
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
    setShowIndicator(window.scrollY < window.innerHeight * 0.6);
  }, []);

  useEffect(() => {
    const supportsNative = CSS.supports('animation-timeline', 'scroll()');
    if (!supportsNative) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  /* ─── Typewriter done ─── */
  useEffect(() => {
    const timer = setTimeout(() => setTypewriterDone(true), 3800);
    return () => clearTimeout(timer);
  }, []);

  /* ─── IntersectionObserver para seções ─── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((el) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const setSectionRef = (i: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[i] = el;
  };

  /* ─── Parallax transform inline ─── */
  const supportsScrollDriven = CSS.supports?.('animation-timeline', 'scroll()');
  const videoParallax = supportsScrollDriven
    ? {}
    : {
        transform: `translateY(${scrollY * 0.12}px) scale(${1 + scrollY * 0.00008})`,
      };
  const overlayParallax = supportsScrollDriven
    ? {}
    : {
        transform: `translateY(${scrollY * 0.05}px)`,
      };

  const scrollToSections = () => {
    const target = document.getElementById('hero-scroll-content');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="video-hero" ref={scrollRef}>
      {/* ─── Vídeo de fundo ─── */}
      <video
        ref={videoRef}
        className="hero-video-bg"
        autoPlay
        loop
        muted
        playsInline
        poster={HERO_POSTER_URL}
        preload="auto"
        style={videoParallax}
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
      </video>

      {/* ─── Overlay gradiente ─── */}
      <div className="hero-overlay" style={overlayParallax} />

      {/* ─── Conteúdo principal ─── */}
      <div className="hero-content">
        <h1 className={`hero-title ${typewriterDone ? '' : 'caret-blink'}`}>
          {typewriterDone
            ? 'Seu negócio local vendendo COMO AS GIGANTES'
            : 'Seu negócio local vendendo COMO AS GIGANTES'}
        </h1>

        <p className="hero-subtitle hero-enter hero-enter-delay-2">
          Site profissional + SEO + WhatsApp = clientes todos os dias
        </p>

        <a
          href="/contato"
          className="hero-cta hero-enter hero-enter-delay-4"
          aria-label="Solicitar orçamento de site profissional"
        >
          QUERO MEU SITE EM 72H
          <span aria-hidden="true" style={{ fontSize: '1.2rem' }}>
            →
          </span>
        </a>
      </div>

      {/* ─── Scroll Indicator ─── */}
      {showIndicator && (
        <button
          className="scroll-indicator"
          onClick={scrollToSections}
          aria-label="Rolar para saber mais"
          type="button"
        >
          <span>Role para saber mais</span>
          <span className="arrow-down" />
        </button>
      )}

      {/* ─── Seções de conteúdo no scroll ─── */}
      <div className="hero-scroll-sections" id="hero-scroll-content">
        {/* Seção 1: Diagnóstico Gratuito */}
        <div
          ref={setSectionRef(0)}
          className="hero-section-reveal"
        >
          <span className="section-icon" aria-hidden="true">🔍</span>
          <h2 className="section-title">Diagnóstico Gratuito</h2>
          <p className="section-desc">
            Analisamos sua presença digital sem custo. Em 24 horas você recebe um
            raio-X completo de como está sua visibilidade online — com plano de
            ação personalizado.
          </p>
        </div>

        {/* Seção 2: Projeto em 72h */}
        <div
          ref={setSectionRef(1)}
          className="hero-section-reveal"
        >
          <span className="section-icon" aria-hidden="true">⚡</span>
          <h2 className="section-title">Projeto em 72h</h2>
          <p className="section-desc">
            Enquanto agências tradicionais levam meses, entregamos seu site
            profissional em até 72 horas. Design moderno, responsivo e otimizado
            para conversão.
          </p>
        </div>

        {/* Seção 3: Suporte Vitalício */}
        <div
          ref={setSectionRef(2)}
          className="hero-section-reveal"
        >
          <span className="section-icon" aria-hidden="true">♾️</span>
          <h2 className="section-title">Suporte Vitalício</h2>
          <p className="section-desc">
            Não é só um site. É uma parceria. Enquanto seu negócio existir, seu
            site fica atualizado, seguro e funcionando. Suporte via WhatsApp com
            resposta em até 2 horas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;
