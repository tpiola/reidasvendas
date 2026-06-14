/* ═══════════════════════════════════════════
   HEROSECTION.TSX — Rei das Vendas
   Hero com IMAGEM GRANDE (real), storytelling visual
   Overlay gradiente escuro, CTA único
   Design premium — SEM emojis, SEM urgência, SEM typewriter
═══════════════════════════════════════════ */

import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative isolate min-h-[80dvh] overflow-hidden bg-[#0a0a0a]"
      aria-label="Hero principal"
    >
      {/* Imagem de fundo grande */}
      <div className="absolute inset-0 h-full w-full">
        <img
          src="/imagens/hero-digital-platform.png"
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: 'brightness(0.5)' }}
          aria-hidden="true"
        />
      </div>

      {/* Overlay gradiente: #0a0a0a → transparent → #0a0a0a */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,10,0.6) 0%, transparent 40%, transparent 60%, rgba(10,10,10,0.9) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Conteúdo centralizado */}
      <div className="relative z-10 mx-auto flex min-h-[80dvh] max-w-7xl flex-col items-center justify-center px-6 pb-24 pt-28 text-center md:pt-36">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Soluções Digitais para o seu Negócio Local
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-base leading-relaxed text-white/70 md:text-lg lg:text-xl">
            De Franca para o mundo. Sites, apps e automação.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/contato"
              className="inline-flex h-14 items-center justify-center rounded-lg bg-[#0057FF] px-10 text-sm font-semibold text-white transition-all hover:bg-[#0057FF]/90 hover:shadow-[0_0_30px_rgba(0,87,255,0.3)] active:scale-[0.98]"
            >
              Diagnóstico Gratuito
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator minimalista */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <svg
          width="20"
          height="32"
          viewBox="0 0 20 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white/30"
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
