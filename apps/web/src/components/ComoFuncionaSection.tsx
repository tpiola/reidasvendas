/* ═══════════════════════════════════════════
   COMOFUNCIONASECTION.TSX — Rei das Vendas
   3 passos HORIZONTAIS com conector
   NÚMERO GRANDE (text-8xl), minimalista, espaço branco
   SEM emojis
═══════════════════════════════════════════ */

import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';

interface Passo {
  numero: string;
  titulo: string;
  descricao: string;
}

const PASSOS: Passo[] = [
  {
    numero: '01',
    titulo: 'Diagnóstico',
    descricao: 'Analisamos seu negócio, concorrência e mercado. Identificamos oportunidades.',
  },
  {
    numero: '02',
    titulo: 'Projeto',
    descricao: 'Criamos site, aplicativo ou automação sob medida. Design exclusivo em até 72h.',
  },
  {
    numero: '03',
    titulo: 'Resultado',
    descricao: 'Acompanhamos métricas e otimizamos conversões. Resultados mensuráveis todo mês.',
  },
];

const ComoFuncionaSection: React.FC = () => {
  return (
    <section
      className="relative isolate overflow-hidden bg-[color:var(--page-bg)] py-20 md:py-28"
      aria-labelledby="comofunciona-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/80">
              Método
            </span>
            <h2
              id="comofunciona-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--page-fg)] sm:text-4xl"
            >
              Como funciona
            </h2>
            <p className="mt-3 text-sm text-[color:var(--page-fg-muted)]">
              Três passos. Do diagnóstico ao resultado.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-20 grid gap-12 md:grid-cols-3 md:gap-0">
          {PASSOS.map((passo, index) => (
            <Reveal key={passo.numero} delay={0.1 * index}>
              <div className="relative flex flex-col items-center text-center px-4">
                {/* Número GRANDE */}
                <div className="text-7xl font-bold tracking-tighter text-[#0057FF]/10 sm:text-8xl md:text-8xl lg:text-9xl select-none">
                  {passo.numero}
                </div>

                {/* Título */}
                <h3 className="mt-2 text-xl font-semibold text-[color:var(--page-fg)]">
                  {passo.titulo}
                </h3>

                {/* Descrição curta */}
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-[color:var(--page-fg-muted)]">
                  {passo.descricao}
                </p>

                {/* Conector horizontal entre passos */}
                {index < PASSOS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-16 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-px border-t border-dashed border-[#0057FF]/15"
                    aria-hidden="true"
                  />
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA final */}
        <Reveal delay={0.3}>
          <div className="mt-16 text-center">
            <Link
              to="/diagnostico"
              className="inline-flex h-14 items-center justify-center rounded-lg bg-[#0057FF] px-8 text-sm font-semibold text-white transition-all hover:bg-[#0057FF]/90 hover:shadow-[0_0_30px_rgba(0,87,255,0.3)] active:scale-[0.98]"
            >
              Começar diagnóstico gratuito
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ComoFuncionaSection;
