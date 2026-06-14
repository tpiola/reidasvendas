/* ═══════════════════════════════════════════
   NICHOSSECTION.TSX — Rei das Vendas
   Grid de nichos de Franca-SP com scroll reveal
═══════════════════════════════════════════ */

import React from 'react';
import { Link } from 'react-router-dom';
import { nichos } from '@/data/plataforma';
import { Reveal } from '@/components/Reveal';

const NichosSection: React.FC = () => {
  return (
    <section
      className="relative isolate overflow-hidden bg-[color:var(--page-surface)] py-20 md:py-28"
      aria-labelledby="nichos-heading"
    >
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,87,255,0.03)_0%,transparent_50%)] pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/80">
              Setores
            </span>
            <h2
              id="nichos-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--page-fg)] sm:text-4xl"
            >
              Soluções para cada setor de Franca
            </h2>
            <p className="mt-3 text-sm text-[color:var(--page-fg-muted)]">
              Conhecemos a fundo cada segmento do mercado francano. Soluções sob medida para o seu ramo.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {nichos.map((nicho, index) => (
            <Reveal key={nicho.id} delay={0.05 * (index % 3)}>
              <div className="group relative overflow-hidden rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] transition-all hover:border-[#C9A84C]/30 hover:shadow-lg hover:shadow-[#C9A84C]/5">
                {/* Imagem de fundo com overlay */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={nicho.imagemUrl}
                    alt={nicho.nome}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--surface)]/90 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="text-xl" aria-hidden>{nicho.icone}</span>
                    <h3 className="text-lg font-bold text-white drop-shadow-sm">{nicho.nome}</h3>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-5">
                  <p className="text-sm leading-relaxed text-[color:var(--page-fg-muted)]">
                    {nicho.descricao}
                  </p>

                  <p className="mt-3 text-sm font-medium italic text-[#C9A84C]/80">
                    &ldquo;{nicho.fraseDeEfeito}&rdquo;
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {nicho.servicosPrincipais.map((servId) => {
                      const nomes: Record<string, string> = {
                        sites: 'Sites',
                        apps: 'Apps',
                        extensoes: 'Automação',
                        dashboards: 'Dashboards',
                        mentoria: 'Mentoria',
                      };
                      return (
                        <span
                          key={servId}
                          className="inline-block rounded-full bg-[#0057FF]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#0057FF]"
                        >
                          {nomes[servId] || servId}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <Link
                  to={`/servicos/${nicho.servicosPrincipais[0]}`}
                  className="absolute inset-0"
                  aria-label={`Ver soluções para ${nicho.nome}`}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NichosSection;
