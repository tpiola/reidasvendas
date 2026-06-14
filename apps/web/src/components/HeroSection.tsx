/* ═══════════════════════════════════════════
   HEROSECTION.TSX — Rei das Vendas
   Hero PREMIUM com IMAGEM REAL, 85dvh
   Overlay gradiente escuro, CTA único
   Design premium — SEM emojis, SEM urgência, SEM typewriter
═══════════════════════════════════════════ */

import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative isolate min-h-[85dvh] overflow-hidden bg-[#0a0a0a] hero-dark"
      aria-label="Hero principal"
    >
      {/* Imagem de fundo grande — ocupa 100% */}
      <div className="absolute inset-0 h-full w-full">
        <img
          src="/imagens/hero-digital-platform.png"
          alt=""
          className="h-full w-full object-cover object-center"
          style={{ filter: 'brightness(0.45)' }}
          aria-hidden="true"
        />
      </div>

      {/* Overlay gradiente profundo: #0a0a0a → transparent → #0a0a0a */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,10,0.7) 0%, transparent 40%, transparent 60%, rgba(10,10,10,0.92) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Conteúdo centralizado */}
      <div className="relative z-10 mx-auto flex min-h-[85dvh] max-w-7xl flex-col items-center justify-center px-6 pb-24 pt-28 text-center md:pt-36">
        <div className="hero-enter max-w-4xl">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-white lg:text-7xl text-shadow-premium">
            Soluções Digitais para o seu Negócio Local
          </h1>

          <p className="hero-enter-delay-2 mt-6 mx-auto max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            De Franca para o mundo. Sites, apps e automação.
          </p>

          <div className="hero-enter-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/contato"
              className="btn-glow inline-flex h-14 items-center justify-center rounded-lg px-10 text-sm font-semibold text-white transition-all active:scale-[0.98]"
            >
              Diagnóstico Gratuito
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator minimalista */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center hero-enter-delay-4">
        <svg
          width="20"
          height="32"
          viewBox="0 0 20 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white/25"
          aria-hidden="true"
        >
          <rect
            x="1.5"
            y="1.5"
            width="17"
            height="29"
            rx="8.5"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="10" cy="10" r="2" fill="currentColor">
            <animate
              attributeName="cy"
              values="10;18;10"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0.3;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
