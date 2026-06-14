/* ═══════════════════════════════════════════
   NICHOSSECTION.TSX — Rei das Vendas
   Grid 3x2 com imagens GRANDES dominando o card
   Nome do nicho sobre a imagem, frase efeito
   Hover: zoom suave + overlay colorido
   SEM emojis
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
      {/* Background sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.03)_0%,transparent_50%)] pointer-events-none" aria-hidden="true" />

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
              Conhecemos a fundo cada segmento. Soluções sob medida para o seu ramo.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {nichos.map((nicho, index) => (
            <Reveal key={nicho.id} delay={0.05 * (index % 3)}>
              <Link
                to={`/servicos/${nicho.servicosPrincipais[0]}`}
                className="group relative block overflow-hidden rounded-2xl"
                aria-label={`Ver soluções para ${nicho.nome}`}
              >
                {/* Imagem GRANDE (320x200) */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={nicho.imagemUrl}
                    alt={nicho.nome}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Overlay gradiente escuro */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity group-hover:opacity-90" />

                  {/* Overlay colorido no hover */}
                  <div className="absolute inset-0 bg-[#0057FF]/0 transition-colors duration-500 group-hover:bg-[#0057FF]/20" />

                  {/* Nome do nicho GRANDE sobre a imagem */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                      {nicho.nome}
                    </h3>
                    <p className="mt-1 text-sm text-white/80 drop-shadow">
                      {nicho.fraseDeEfeito}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NichosSection;
