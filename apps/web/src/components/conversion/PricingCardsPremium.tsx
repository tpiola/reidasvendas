/* ═══════════════════════════════════════════
   PRICINGCARDSPREMIUM.TSX — Rei das Vendas
   3 planos dark/glassmorphism
   Start R$197 | Profissional R$397 [MAIS VENDIDO]
   Enterprise R$697 | Micro-copy de economia anual
═══════════════════════════════════════════ */

import React, { useState } from 'react';

/* ─── Tipos ─── */
interface PlanoFeature {
  texto: string;
  incluido: boolean;
}

interface Plano {
  nome: string;
  preco: number;
  descricao: string;
  destaque?: 'mais-vendido' | 'economico';
  features: PlanoFeature[];
  ctaTexto: string;
  economiaAnual?: string;
}

/* ─── Planos ─── */
const PLANOS: Plano[] = [
  {
    nome: 'Start',
    preco: 197,
    descricao:
      'Perfeito para quem está dando o primeiro passo digital. Site profissional que já aparece no Google.',
    destaque: 'economico',
    features: [
      { texto: 'Site de 5 páginas', incluido: true },
      { texto: 'Design responsivo (celular + desktop)', incluido: true },
      { texto: 'SEO básico (On-Page + Google)', incluido: true },
      { texto: 'Botão do WhatsApp integrado', incluido: true },
      { texto: 'Formulário de contato', incluido: true },
      { texto: '1 revisão gratuita', incluido: true },
      { texto: 'Hospedagem com SSL grátis', incluido: true },
      { texto: 'Suporte por e-mail', incluido: true },
      { texto: 'Blog integrado', incluido: false },
      { texto: 'LGPD completo', incluido: false },
      { texto: 'IA Chatbot', incluido: false },
    ],
    ctaTexto: 'QUERO COMEÇAR',
    economiaAnual: 'Economia de 15% no anual',
  },
  {
    nome: 'Profissional',
    preco: 397,
    descricao:
      'O plano favorito dos nossos clientes. Site completo com blog, LGPD e SEO pesado para dominar o Google.',
    destaque: 'mais-vendido',
    features: [
      { texto: 'Site completo (páginas ilimitadas)', incluido: true },
      { texto: 'Design responsivo premium', incluido: true },
      { texto: 'SEO completo (On-Page + Técnico + Local)', incluido: true },
      { texto: 'Botão do WhatsApp integrado', incluido: true },
      { texto: 'Formulário de contato inteligente', incluido: true },
      { texto: '3 revisões gratuitas', incluido: true },
      { texto: 'Hospedagem com SSL grátis', incluido: true },
      { texto: 'Suporte prioritário WhatsApp', incluido: true },
      { texto: 'Blog integrado com SEO', incluido: true },
      { texto: 'LGPD completo (banner + política)', incluido: true },
      { texto: 'IA Chatbot', incluido: false },
    ],
    ctaTexto: 'QUERO O PROFISSIONAL',
    economiaAnual: 'Economia de 18% no anual',
  },
  {
    nome: 'Enterprise',
    preco: 697,
    descricao:
      'Tudo que seu negócio precisa para vender 24h por dia. Site completo + e-commerce + IA para atendimento.',
    features: [
      { texto: 'Site + E-commerce completo', incluido: true },
      { texto: 'Design responsivo premium + animações', incluido: true },
      { texto: 'SEO completo + Google Ads setup', incluido: true },
      { texto: 'WhatsApp + Instagram + Facebook integrados', incluido: true },
      { texto: 'Formulário com automação de lead', incluido: true },
      { texto: '10 revisões gratuitas', incluido: true },
      { texto: 'Hospedagem premium com CDN', incluido: true },
      { texto: 'Suporte prioritário 24h via WhatsApp', incluido: true },
      { texto: 'Blog + SEO avançado', incluido: true },
      { texto: 'LGPD completo + adequação', incluido: true },
      { texto: 'IA Chatbot para atendimento', incluido: true },
    ],
    ctaTexto: 'QUERO O ENTERPRISE',
    economiaAnual: 'Economia de 20% no anual',
  },
] as const;

/* ─── Ícone de check ─── */
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

/* ─── Componente ─── */
const PricingCardsPremium: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'mensal' | 'anual'>('mensal');

  const precoComDesconto = (preco: number) => {
    if (selectedPlan === 'anual') {
      const fator = PLANOS.find((p) => p.preco === preco)?.nome === 'Enterprise' ? 0.2 : PLANOS.find((p) => p.preco === preco)?.nome === 'Profissional' ? 0.18 : 0.15;
      return Math.round(preco * (1 - fator));
    }
    return preco;
  };

  return (
    <section className="pricing-section" aria-label="Planos e preços">
      <div className="pricing-container">
        {/* ─── Toggle mensal / anual ─── */}
        <div className="pricing-toggle">
          <button
            type="button"
            className={`pricing-toggle-btn ${selectedPlan === 'mensal' ? 'active' : ''}`}
            onClick={() => setSelectedPlan('mensal')}
            aria-pressed={selectedPlan === 'mensal'}
          >
            Mensal
          </button>
          <button
            type="button"
            className={`pricing-toggle-btn ${selectedPlan === 'anual' ? 'active' : ''}`}
            onClick={() => setSelectedPlan('anual')}
            aria-pressed={selectedPlan === 'anual'}
          >
            Anual <span className="pricing-toggle-badge">ECONOMIZE</span>
          </button>
        </div>

        {/* ─── Grid de planos ─── */}
        <div className="pricing-grid">
          {PLANOS.map((plano) => {
            const precoFinal = precoComDesconto(plano.preco);
            const isMaisVendido = plano.destaque === 'mais-vendido';

            return (
              <div
                key={plano.nome}
                className={`pricing-card ${isMaisVendido ? 'pricing-card-featured' : ''}`}
              >
                {/* Badge "MAIS VENDIDO" */}
                {isMaisVendido && (
                  <div className="pricing-card-badge-wrapper">
                    <span className="pricing-card-badge">MAIS VENDIDO</span>
                  </div>
                )}

                {/* Cabeçalho */}
                <div className="pricing-card-header">
                  <h3 className="pricing-card-name">{plano.nome}</h3>
                  <p className="pricing-card-desc">{plano.descricao}</p>
                </div>

                {/* Preço */}
                <div className="pricing-card-price-area">
                  <span className="pricing-card-currency">R$</span>
                  <span className="pricing-card-price">{precoFinal}</span>
                  <span className="pricing-card-period">/mês</span>
                </div>

                {/* Micro-copy economia */}
                {selectedPlan === 'anual' && plano.economiaAnual && (
                  <p className="pricing-card-economia">{plano.economiaAnual}</p>
                )}

                {/* CTA */}
                <a
                  href={`/contato?plano=${plano.nome.toLowerCase()}`}
                  className={`pricing-card-cta ${isMaisVendido ? 'pricing-card-cta-primary' : ''}`}
                >
                  {plano.ctaTexto}
                </a>

                {/* Features */}
                <ul className="pricing-card-features">
                  {plano.features.map((f, i) => (
                    <li
                      key={`feature-${plano.nome}-${i}`}
                      className={`pricing-card-feature ${!f.incluido ? 'muted' : ''}`}
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

      <style>{`
        .pricing-section {
          padding: 5rem 1.5rem;
          background: #030305;
          color: #f8f8fa;
        }
        .pricing-container {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
        }

        /* ─── Toggle ─── */
        .pricing-toggle {
          display: inline-flex;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 100px;
          padding: 0.25rem;
          gap: 0.15rem;
        }
        .pricing-toggle-btn {
          padding: 0.5rem 1.25rem;
          border: none;
          border-radius: 100px;
          background: transparent;
          color: rgba(248, 248, 250, 0.6);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .pricing-toggle-btn.active {
          background: #0057FF;
          color: #fff;
        }
        .pricing-toggle-btn:hover:not(.active) {
          color: rgba(248, 248, 250, 0.85);
        }
        .pricing-toggle-badge {
          font-size: 0.6rem;
          background: #C9A84C;
          color: #0a0a0a;
          padding: 0.1rem 0.35rem;
          border-radius: 100px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        /* ─── Grid ─── */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          width: 100%;
          align-items: start;
        }

        /* ─── Card ─── */
        .pricing-card {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 2rem 1.75rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: all 0.3s ease;
          position: relative;
        }
        .pricing-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        .pricing-card-featured {
          background: rgba(0, 87, 255, 0.04);
          border-color: rgba(0, 87, 255, 0.2);
          transform: translateY(-8px);
          box-shadow: 0 8px 40px rgba(0, 87, 255, 0.08);
        }
        .pricing-card-featured:hover {
          border-color: rgba(0, 87, 255, 0.35);
          box-shadow: 0 24px 80px rgba(0, 87, 255, 0.15);
        }

        .pricing-card-badge-wrapper {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
        }
        .pricing-card-badge {
          background: linear-gradient(135deg, #C9A84C, #b8903c);
          color: #0a0a0a;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.3rem 1rem;
          border-radius: 100px;
          white-space: nowrap;
        }

        .pricing-card-header {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .pricing-card-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .pricing-card-desc {
          font-size: 0.85rem;
          color: rgba(248, 248, 250, 0.55);
          line-height: 1.5;
          margin: 0;
        }

        .pricing-card-price-area {
          display: flex;
          align-items: baseline;
          gap: 0.15rem;
        }
        .pricing-card-currency {
          font-size: 1rem;
          font-weight: 600;
          color: rgba(248, 248, 250, 0.5);
        }
        .pricing-card-price {
          font-size: 2.75rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #fff;
          font-variant-numeric: tabular-nums;
        }
        .pricing-card-period {
          font-size: 0.9rem;
          color: rgba(248, 248, 250, 0.35);
          font-weight: 500;
        }
        .pricing-card-economia {
          font-size: 0.75rem;
          color: #C9A84C;
          font-weight: 600;
          margin: -0.5rem 0 0;
        }

        .pricing-card-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.85rem 1.5rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          text-decoration: none;
          color: #fff;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.25s ease;
        }
        .pricing-card-cta:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.02);
        }
        .pricing-card-cta-primary {
          background: linear-gradient(135deg, #0057FF, #3B82F6);
          border: none;
          color: #fff;
          box-shadow: 0 4px 20px rgba(0, 87, 255, 0.25);
        }
        .pricing-card-cta-primary:hover {
          box-shadow: 0 6px 30px rgba(0, 87, 255, 0.4);
          transform: scale(1.03);
        }

        .pricing-card-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .pricing-card-feature {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: rgba(248, 248, 250, 0.8);
          line-height: 1.4;
        }
        .pricing-card-feature.muted {
          color: rgba(248, 248, 250, 0.25);
        }

        /* ─── Responsivo ─── */
        @media (max-width: 900px) {
          .pricing-grid {
            grid-template-columns: 1fr;
            max-width: 420px;
          }
          .pricing-card-featured {
            transform: translateY(0);
          }
          .pricing-card-featured:hover {
            transform: translateY(-4px);
          }
        }

        @media (max-width: 640px) {
          .pricing-section {
            padding: 3rem 1rem;
          }
          .pricing-card {
            padding: 1.5rem 1.25rem;
          }
        }
      `}</style>
    </section>
  );
};

export default PricingCardsPremium;
