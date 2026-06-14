/* ═══════════════════════════════════════════
   SERVICOSSECTION.TSX — Rei das Vendas
   Grid 5 colunas com SVGs, sem emojis, max 12 palavras
   Design premium, imagem de fundo sutil
═══════════════════════════════════════════ */

import React from 'react';
import { Link } from 'react-router-dom';
import { servicos } from '@/data/plataforma';
import { Reveal } from '@/components/Reveal';

/* ─── Ícones SVG inline ─────────────────── */
const SVG_ICONS: Record<string, React.ReactNode> = {
  sites: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  apps: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  extensoes: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  dashboards: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  mentoria: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
};

const SERVC_SHORT: Record<string, string> = {
  sites: 'Sites profissionais que vendem.',
  apps: 'Apps para iOS, Android e web.',
  extensoes: 'Automação que elimina o retrabalho.',
  dashboards: 'Painéis com métricas em tempo real.',
  mentoria: 'Estratégia digital para crescer.',
};

const ServicosSection: React.FC = () => {
  return (
    <section
      className="relative isolate overflow-hidden bg-[color:var(--page-bg)] py-20 md:py-28"
      aria-labelledby="servicos-heading"
    >
      {/* Background sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,87,255,0.03)_0%,transparent_60%)] pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#0057FF]/80">
              Soluções
            </span>
            <h2
              id="servicos-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--page-fg)] sm:text-4xl"
            >
              O que fazemos
            </h2>
            <p className="mt-3 text-sm text-[color:var(--page-fg-muted)]">
              Cinco soluções integradas para transformar seu negócio.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {servicos.map((servico, index) => (
            <Reveal key={servico.id} delay={0.04 * index}>
              <Link
                to={`/servicos/${servico.id}`}
                className="group relative flex flex-col items-center rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#0057FF]/30 hover:shadow-lg hover:shadow-[#0057FF]/5"
              >
                {/* Ícone SVG */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#0057FF]/10 text-[#0057FF] transition-transform group-hover:scale-110">
                  {SVG_ICONS[servico.id] || null}
                </div>

                <h3 className="text-base font-semibold text-[color:var(--page-fg)]">
                  {servico.titulo}
                </h3>

                <p className="mt-2 text-sm leading-snug text-[color:var(--page-fg-muted)]">
                  {SERVC_SHORT[servico.id] || servico.descricao.split('.')[0]}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicosSection;
