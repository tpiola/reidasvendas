/* ═══════════════════════════════════════════
   VIDEOHERO.TSX — Rei das Vendas
   Hero profissional estilo Squarespace
   Imagem estática de alta qualidade + texto à esquerda
   Sem timer, sem urgência, sem typewriter, sem orbes 3D
═══════════════════════════════════════════ */

import React from 'react';
import { Link } from 'react-router-dom';

/* Imagem de alta qualidade — mockup profissional de site + dashboard */
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80';

const VideoHero: React.FC = () => {
  return (
    <section className="relative isolate min-h-[85dvh] overflow-hidden bg-[#08080b]">
      {/* Background gradient sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#08080b] to-[#050510]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(0,87,255,0.06)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(201,168,76,0.04)_0%,transparent_50%)]" />

      <div className="relative mx-auto flex min-h-[85dvh] max-w-7xl flex-col items-center gap-12 px-6 py-24 md:flex-row md:py-32 lg:px-10">
        {/* Conteúdo textual — lado esquerdo */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="block text-[#C9A84C]">Soluções digitais</span>
            <span className="block text-white">para o seu negócio local crescer</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/60 md:text-lg">
            Site profissional + SEO + automação. Tudo que você precisa para atrair mais clientes e vender mais, todo santo dia.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/diagnostico"
              className="inline-flex h-14 items-center justify-center rounded-lg bg-[#0057FF] px-8 text-sm font-semibold text-white transition-all hover:bg-[#0057FF]/90 hover:shadow-[0_0_30px_rgba(0,87,255,0.3)]"
            >
              Solicitar diagnóstico gratuito
            </Link>
            <Link
              to="/planos"
              className="inline-flex h-14 items-center justify-center rounded-lg border border-white/15 bg-white/5 px-8 text-sm font-semibold text-white/80 transition-all hover:bg-white/10 hover:text-white"
            >
              Ver planos
            </Link>
          </div>

          {/* Micro-copy de confiança */}
          <p className="mt-4 text-xs text-white/40">
            Orçamento em 24h · Sem fidelidade · Suporte direto
          </p>
        </div>

        {/* Imagem de alta qualidade — lado direito */}
        <div className="flex-1">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 shadow-2xl md:mx-0">
            <img
              src={HERO_IMAGE}
              alt="Dashboard de métricas e site profissional — soluções digitais para negócios locais"
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
              width="800"
              height="600"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 ring-inset" />
          </div>
        </div>
      </div>

      {/* Scroll indicator sutil */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 3v14M5 12l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/30" />
        </svg>
      </div>
    </section>
  );
};

export default VideoHero;
