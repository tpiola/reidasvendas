/* ═══════════════════════════════════════════
   PRICINGCARDSPREMIUM.TSX — Rei das Vendas
   3 planos alinhados com data/plans.ts
   Essencial R$497 | Crescimento R$997 | Escala R$1.997
   Design limpo, tipo Squarespace
═══════════════════════════════════════════ */

import React from 'react';
import { Link } from 'react-router-dom';

interface PlanoFeature {
  texto: string;
  incluido: boolean;
}

interface Plano {
  nome: string;
  slug: string;
  preco: number;
  descricao: string;
  destaque?: 'mais-vendido';
  features: PlanoFeature[];
}

const PLANOS: Plano[] = [
  {
    nome: 'Essencial',
    slug: 'essencial',
    preco: 497,
    descricao: 'Presença digital sólida para começar a captar clientes com método.',
    features: [
      { texto: 'Site institucional feito do zero para seu nicho', incluido: true },
      { texto: 'Copy orientada à conversão', incluido: true },
      { texto: 'WhatsApp integrado com mensagem de boas-vindas', incluido: true },
      { texto: 'SEO técnico (meta, velocidade, sitemap)', incluido: true },
      { texto: 'Hospedagem e SSL inclusos', incluido: true },
      { texto: 'Suporte por e-mail em dias úteis', incluido: true },
      { texto: 'CRM avançado', incluido: false },
      { texto: 'Automações complexas', incluido: false },
    ],
  },
  {
    nome: 'Crescimento',
    slug: 'crescimento',
    preco: 997,
    descricao: 'Funil, automação e follow-up para não perder nenhum lead.',
    destaque: 'mais-vendido',
    features: [
      { texto: 'Tudo do plano Essencial', incluido: true },
      { texto: 'Funil multi-etapas com GA4', incluido: true },
      { texto: 'Automação n8n: resposta, etiquetas e lembretes', incluido: true },
      { texto: 'CRM leve ou integração com o seu', incluido: true },
      { texto: 'Testes A/B de CTA e formulário', incluido: true },
      { texto: 'Relatório quinzenal de conversão', incluido: true },
      { texto: 'Gestão completa de mídia paga', incluido: false },
      { texto: 'Produção de vídeo em escala', incluido: false },
    ],
  },
  {
    nome: 'Escala',
    slug: 'escala',
    preco: 1997,
    descricao: 'Operação digital completa com tráfego, IA e dashboards.',
    features: [
      { texto: 'Tudo do plano Crescimento', incluido: true },
      { texto: 'Estratégia e criativos para Google e Meta', incluido: true },
      { texto: 'IA no primeiro contato (triagem e FAQ)', incluido: true },
      { texto: 'Dashboard executivo (origem, custo, conversão)', incluido: true },
      { texto: 'Reunião mensal de performance', incluido: true },
      { texto: 'Suporte prioritário', incluido: true },
    ],
  },
];

const CheckIcon: React.FC<{ checked: boolean }> = ({ checked }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke={checked ? '#0057FF' : 'rgba(255,255,255,0.15)'}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, opacity: checked ? 1 : 0.3 }}
  >
    {checked ? (
      <polyline points="20 6 9 17 4 12" />
    ) : (
      <line x1="18" y1="6" x2="6" y2="18" />
    )}
  </svg>
);

const PricingCardsPremium: React.FC = () => {
  return (
    <section className="bg-[#030305] px-6 py-20 sm:px-8" aria-label="Planos e preços">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/80">Planos</span>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Investimento claro
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/50">
            Cada plano com escopo definido. Sem surpresas, sem fidelidade obrigatória.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
          {PLANOS.map((plano) => {
            const isFeatured = plano.destaque === 'mais-vendido';

            return (
              <div
                key={plano.nome}
                className={`relative flex flex-col gap-6 rounded-2xl border p-8 transition-all ${
                  isFeatured
                    ? 'border-[#0057FF]/30 bg-[#0057FF]/[0.03] shadow-lg shadow-[#0057FF]/5'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-block rounded-full bg-gradient-to-r from-[#C9A84C] to-[#b8903c] px-4 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-black">
                      Mais vendido
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white">{plano.nome}</h3>
                  <p className="mt-1 text-sm text-white/50">{plano.descricao}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-medium text-white/40">R$</span>
                  <span className="text-4xl font-bold tracking-tight text-white">{plano.preco.toLocaleString('pt-BR')}</span>
                  <span className="text-sm text-white/30">/mês</span>
                </div>

                <Link
                  to={`/planos/${plano.slug}`}
                  className={`flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-all ${
                    isFeatured
                      ? 'bg-[#0057FF] text-white hover:bg-[#0057FF]/90 hover:shadow-[0_0_30px_rgba(0,87,255,0.3)]'
                      : 'border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Ver plano completo
                </Link>

                <ul className="flex flex-col gap-3">
                  {plano.features.map((f, i) => (
                    <li
                      key={`feature-${plano.nome}-${i}`}
                      className={`flex items-center gap-2 text-sm ${!f.incluido ? 'text-white/20' : 'text-white/70'}`}
                    >
                      <CheckIcon checked={f.incluido} />
                      <span>{f.texto}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingCardsPremium;
