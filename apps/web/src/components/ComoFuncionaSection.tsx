/* ═══════════════════════════════════════════
   COMOFUNCIONASECTION.TSX — Rei das Vendas
   3 passos visuais: Diagnóstico → Projeto → Resultado
═══════════════════════════════════════════ */

import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';

interface Passo {
  numero: string;
  icone: string;
  titulo: string;
  descricao: string;
}

const PASSOS: Passo[] = [
  {
    numero: '01',
    icone: '🔍',
    titulo: 'Diagnóstico',
    descricao:
      'Analisamos seu negócio, concorrência e mercado em Franca. Identificamos gargalos, oportunidades e traçamos a rota digital ideal para você.',
  },
  {
    numero: '02',
    icone: '🚀',
    titulo: 'Projeto',
    descricao:
      'Criamos site, aplicativo ou automação sob medida. Design exclusivo, SEO aplicado, WhatsApp integrado. Tudo pronto em até 72 horas.',
  },
  {
    numero: '03',
    icone: '📈',
    titulo: 'Resultado',
    descricao:
      'Acompanhamos métricas, ajustamos rotas, otimizamos conversões. Seu negócio digital funcionando e gerando resultados mensuráveis todo mês.',
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
              Três passos simples para transformar seu negócio local em uma máquina de vendas digital.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {PASSOS.map((passo, index) => (
            <Reveal key={passo.numero} delay={0.08 * index}>
              <div className="group relative flex flex-col items-center text-center">
                {/* Número e ícone */}
                <div className="relative mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#0057FF]/10 text-3xl transition-transform group-hover:scale-105">
                    <span aria-hidden>{passo.icone}</span>
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#0057FF] text-[10px] font-bold text-white">
                    {passo.numero}
                  </span>
                </div>

                {/* Linha conectora (mobile: linha vertical simples) */}
                {index < PASSOS.length - 1 && (
                  <div
                    className="absolute top-10 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-5rem)] border-t border-dashed border-[#0057FF]/20 md:block"
                    aria-hidden="true"
                  />
                )}

                <h3 className="text-xl font-semibold text-[color:var(--page-fg)]">
                  {passo.titulo}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[color:var(--page-fg-muted)]">
                  {passo.descricao}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA abaixo dos passos */}
        <Reveal delay={0.3}>
          <div className="mt-14 text-center">
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
