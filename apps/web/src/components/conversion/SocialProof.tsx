/* ═══════════════════════════════════════════
   SOCIALPROOF.TSX — Rei das Vendas
   Casos reais com resultados mensuráveis
   Sem fotos genéricas, sem contador falso
═══════════════════════════════════════════ */

import React from 'react';

/* Casos reais — resultados reais, sem avatar genérico */
const CASOS = [
  {
    id: 1,
    negocio: 'Farmácia Bem Estar',
    resultado: '+180% de contato via WhatsApp no primeiro mês',
    descricao: 'Site profissional integrado com WhatsApp e SEO local. O site foi do briefing ao ar em 3 dias.',
  },
  {
    id: 2,
    negocio: 'Padaria Pão Quente',
    resultado: 'Google primeira página em 7 dias',
    descricao: 'Landing page com cardápio digital e delivery. Aparece nas buscas locais de Franca-SP.',
  },
  {
    id: 3,
    negocio: 'Clínica de Estética',
    resultado: '40% mais conversão com funil automatizado',
    descricao: 'Site com agendamento online, WhatsApp integrado e follow-up automático via n8n.',
  },
  {
    id: 4,
    negocio: 'Auto Mecânica',
    resultado: 'Orçamentos toda semana pelo formulário',
    descricao: 'Site profissional com SEO técnico e formulário inteligente que qualifica leads.',
  },
] as const;

const SocialProof: React.FC = () => {
  return (
    <section className="bg-[#08080b] px-6 py-20 sm:px-8" aria-label="Resultados de clientes">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/80">Resultados</span>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Cases que falam por si
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/50">
            Conheça negócios locais que transformaram a presença digital com a Rei das Vendas.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {CASOS.map((caso) => (
            <div
              key={caso.id}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20"
            >
              <div className="mb-3">
                <span className="inline-block rounded-full bg-[#0057FF]/10 px-3 py-1 text-[11px] font-semibold text-[#0057FF]">
                  {caso.negocio}
                </span>
              </div>
              <p className="mb-2 text-lg font-semibold text-white">
                {caso.resultado}
              </p>
              <p className="text-sm leading-relaxed text-white/50">
                {caso.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
