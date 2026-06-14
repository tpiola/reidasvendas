/* ═══════════════════════════════════════════
   CASESSECTION.TSX — Rei das Vendas
   2 cases grandes com layout 50/50 imagem + texto
   Resultado em NÚMERO GIGANTE
   Design tipo revista premium (The New Yorker meets Apple)
   SEM emojis
═══════════════════════════════════════════ */

import React from 'react';
import { casesSucesso } from '@/data/plataforma';
import { Reveal } from '@/components/Reveal';

function extractNumber(resultado: string): { highlight: string; rest: string } {
  const match = resultado.match(/^([+\d%.R$\sA-Za-zÀ-ú]+?)(?:\s(.*))$/);
  if (match && match[1].trim().length > 0) {
    return { highlight: match[1].trim(), rest: match[2] || '' };
  }
  const numMatch = resultado.match(/^([+\d%.R$\s]+[a-z]*)\s(.+)$/i);
  if (numMatch) {
    return { highlight: numMatch[1].trim(), rest: numMatch[2] };
  }
  return { highlight: resultado, rest: '' };
}

const CasesSection: React.FC = () => {
  /* Pegar apenas os 2 primeiros cases */
  const topCases = casesSucesso.slice(0, 2);

  return (
    <section
      className="relative isolate overflow-hidden bg-[#030305] py-20 md:py-28"
      aria-labelledby="cases-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#0057FF]/80">
              Resultados
            </span>
            <h2
              id="cases-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Quem já transformou o negócio
            </h2>
            <p className="mt-3 text-sm text-white/50">
              Negócios locais de Franca colhendo resultados reais com soluções digitais.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 space-y-10">
          {topCases.map((caso, index) => {
            const { highlight, rest } = extractNumber(caso.resultado);
            return (
              <Reveal key={caso.cliente} delay={0.08 * index}>
                <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] md:flex-row">
                  {/* Lado da imagem (50%) */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:w-1/2">
                    <img
                      src={caso.imagemUrl}
                      alt={caso.cliente}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                  </div>

                  {/* Lado do texto (50%) */}
                  <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12">
                    {/* Resultado em número GIGANTE */}
                    <div className="mb-3">
                      <span className="text-3xl font-bold tracking-tight text-[#0057FF] sm:text-4xl lg:text-5xl">
                        {highlight}
                      </span>
                    </div>

                    {rest && (
                      <p className="text-sm leading-relaxed text-white/60">
                        {rest}
                      </p>
                    )}

                    <p className="mt-4 text-sm leading-relaxed text-white/50">
                      {caso.descricao}
                    </p>

                    {/* Cliente + Nicho */}
                    <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0057FF]/20 text-sm font-bold text-[#0057FF]">
                        {caso.cliente.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{caso.cliente}</p>
                        <p className="text-xs text-white/40">{caso.nicho}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
