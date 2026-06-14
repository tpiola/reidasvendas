/* ═══════════════════════════════════════════
   CASESSECTION.TSX — Rei das Vendas
   Grid de cases de sucesso com resultados em destaque
═══════════════════════════════════════════ */

import React from 'react';
import { casesSucesso } from '@/data/plataforma';
import { Reveal } from '@/components/Reveal';

function extractHighlight(resultado: string): { highlight: string; rest: string } {
  const match = resultado.match(/^([+\d%R$.\sA-Za-zÀ-ú]+?)(?:\s(.*))$/);
  if (match) {
    return { highlight: match[1].trim(), rest: match[2] || '' };
  }
  /* Tenta extrair qualquer número no início */
  const numMatch = resultado.match(/^([+\d%.R$\s]+[a-z]*)\s(.+)$/i);
  if (numMatch) {
    return { highlight: numMatch[1].trim(), rest: numMatch[2] };
  }
  return { highlight: resultado, rest: '' };
}

const CasesSection: React.FC = () => {
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
              Negócios locais de Franca que estão colhendo resultados reais com soluções digitais.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {casesSucesso.map((caso, index) => {
            const { highlight, rest } = extractHighlight(caso.resultado);
            return (
              <Reveal key={caso.cliente} delay={0.06 * index}>
                <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-[#0057FF]/30 hover:bg-white/[0.04] sm:p-8">
                  {/* Resultado em destaque */}
                  <div className="mb-4">
                    <span className="text-2xl font-bold tracking-tight text-[#0057FF] sm:text-3xl">
                      {highlight}
                    </span>
                    {rest && (
                      <span className="ml-2 text-sm text-white/60">{rest}</span>
                    )}
                  </div>

                  {/* Descrição */}
                  <p className="flex-1 text-sm leading-relaxed text-white/60">
                    {caso.descricao}
                  </p>

                  {/* Cliente + Nicho */}
                  <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                    <div>
                      <p className="text-sm font-semibold text-white">{caso.cliente}</p>
                      <p className="text-xs text-white/40">{caso.nicho}</p>
                    </div>
                    <div className="flex gap-1.5">
                      {caso.servicosContratados.map((servId) => {
                        const labels: Record<string, string> = {
                          sites: '🌐',
                          apps: '📱',
                          extensoes: '⚡',
                          dashboards: '📊',
                          mentoria: '🎯',
                        };
                        return (
                          <span key={servId} className="text-sm" title={servId}>
                            {labels[servId] || servId}
                          </span>
                        );
                      })}
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
