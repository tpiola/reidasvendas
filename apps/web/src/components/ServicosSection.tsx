/* ═══════════════════════════════════════════
   SERVICOSSECTION.TSX — Rei das Vendas
   Grid de serviços com scroll reveal
═══════════════════════════════════════════ */

import React from 'react';
import { Link } from 'react-router-dom';
import { servicos } from '@/data/plataforma';
import { Reveal } from '@/components/Reveal';

const ServicosSection: React.FC = () => {
  return (
    <section
      className="relative isolate overflow-hidden bg-[color:var(--page-bg)] py-20 md:py-28"
      aria-labelledby="servicos-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#0057FF]/80">
              Soluções
            </span>
            <h2
              id="servicos-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--page-fg)] sm:text-4xl"
            >
              O que fazemos por você
            </h2>
            <p className="mt-3 text-sm text-[color:var(--page-fg-muted)]">
              Cinco soluções integradas para transformar seu negócio local em uma máquina digital.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicos.map((servico, index) => (
            <Reveal key={servico.id} delay={0.04 * index}>
              <div className="group relative flex flex-col rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-6 transition-all hover:border-[#0057FF]/30 hover:shadow-lg hover:shadow-[#0057FF]/5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0057FF]/10 text-2xl">
                  {servico.icone}
                </div>

                <h3 className="text-lg font-semibold text-[color:var(--page-fg)]">
                  {servico.titulo}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-[color:var(--page-fg-muted)]">
                  {servico.descricao}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs text-[color:var(--page-fg-muted)]">
                  <span className="font-medium text-[#0057FF]">{servico.precoBase}</span>
                  <span aria-hidden>·</span>
                  <span>{servico.publicoAlvo.split(',')[0]}</span>
                </div>

                <Link
                  to={`/servicos/${servico.id}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#0057FF] transition-all hover:gap-2"
                >
                  Ver solução
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicosSection;
