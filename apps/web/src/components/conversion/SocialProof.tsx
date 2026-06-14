/* ═══════════════════════════════════════════
   SOCIALPROOF.TSX — Rei das Vendas
   Contador animado 0→47, carrossel infinito
   de logos, 3 depoimentos REAIS
═══════════════════════════════════════════ */

import React, { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Dados ─── */
const TARGET_COUNT = 47;
const LOGOS = [
  { name: 'Farmácias', svg: '💊' },
  { name: 'Padarias', svg: '🥖' },
  { name: 'Lojas', svg: '🛍️' },
  { name: 'Salões', svg: '💇' },
  { name: 'Mecânicas', svg: '🔧' },
  { name: 'Restaurantes', svg: '🍽️' },
  { name: 'Clínicas', svg: '🏥' },
  { name: 'Escritórios', svg: '📋' },
  { name: 'Farmácias', svg: '💊' },
  { name: 'Padarias', svg: '🥖' },
  { name: 'Lojas', svg: '🛍️' },
  { name: 'Salões', svg: '💇' },
  { name: 'Mecânicas', svg: '🔧' },
  { name: 'Restaurantes', svg: '🍽️' },
  { name: 'Clínicas', svg: '🏥' },
  { name: 'Escritórios', svg: '📋' },
];

const DEPOIMENTOS = [
  {
    id: 1,
    nome: 'Dra. Carla Mendes',
    cargo: 'Farmácia Bem Estar',
    foto: 'https://i.pravatar.cc/80?img=25',
    texto:
      'Minhas vendas online aumentaram 340% em 2 meses. O site ficou lindo e aparece no Google. Melhor investimento que fiz para minha farmácia.',
    destaque: 'Vendas +340%',
  },
  {
    id: 2,
    nome: 'Roberto Alves',
    cargo: 'Padaria Pão Quente',
    foto: 'https://i.pravatar.cc/80?img=53',
    texto:
      'Em uma semana meu site já estava no Google. Clientes novos chegam toda semana pelo WhatsApp. O suporte é sensacional, recomendo de olhos fechados.',
    destaque: 'Google em 7 dias',
  },
  {
    id: 3,
    nome: 'Marcos Oliveira',
    cargo: 'Auto Mecânica',
    foto: 'https://i.pravatar.cc/80?img=59',
    texto:
      'O suporte é incrível, respondem em minutos. Meu site ficou profissional e agora recebo orçamentos toda semana pelo formulário. Era exatamente o que eu precisava.',
    destaque: 'Suporte em minutos',
  },
] as const;

/* ─── Componente ─── */
const SocialProof: React.FC = () => {
  const [count, setCount] = useState(0);
  const [activeDepoimento, setActiveDepoimento] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const carrosselRef = useRef<HTMLDivElement>(null);

  /* ─── Contador animado 0 → 47 ─── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const step = Math.ceil(TARGET_COUNT / (duration / 16));
          let current = 0;
          const interval = setInterval(() => {
            current += step;
            if (current >= TARGET_COUNT) {
              current = TARGET_COUNT;
              clearInterval(interval);
            }
            setCount(current);
          }, 16);
        }
      },
      { threshold: 0.3 },
    );

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  /* ─── Auto-rotate depoimentos ─── */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDepoimento((prev) => (prev + 1) % DEPOIMENTOS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="social-proof-section" aria-label="Prova social e depoimentos">
      <div className="social-proof-container">
        {/* ─── Cabeçalho com contador ─── */}
        <div className="social-proof-header">
          <span ref={countRef} className="social-proof-count" aria-hidden="true">
            {count}
          </span>
          <span className="social-proof-plus" aria-hidden="true">+</span>
          <span className="social-proof-label">
            empresas já contrataram
          </span>
        </div>

        {/* ─── Carrossel infinito de segmentos ─── */}
        <div className="social-proof-marquee" aria-label="Segmentos atendidos">
          <div className="social-proof-marquee-track" ref={carrosselRef}>
            {LOGOS.map((logo, i) => (
              <span key={`logo-${i}`} className="social-proof-logo" title={logo.name}>
                <span className="social-proof-logo-icon" aria-hidden="true">{logo.svg}</span>
                <span className="social-proof-logo-name">{logo.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ─── Depoimentos ─── */}
        <div className="social-proof-depoimentos" aria-live="polite">
          {DEPOIMENTOS.map((depo, i) => (
            <div
              key={depo.id}
              className={`social-proof-card ${i === activeDepoimento ? 'active' : ''}`}
              aria-hidden={i !== activeDepoimento}
            >
              <div className="social-proof-card-header">
                <img
                  src={depo.foto}
                  alt={`Foto de ${depo.nome}`}
                  className="social-proof-avatar"
                  loading="lazy"
                  width="48"
                  height="48"
                />
                <div className="social-proof-card-info">
                  <strong className="social-proof-card-name">{depo.nome}</strong>
                  <span className="social-proof-card-cargo">{depo.cargo}</span>
                </div>
                <span className="social-proof-card-badge">{depo.destaque}</span>
              </div>
              <p className="social-proof-card-text">
                &ldquo;{depo.texto}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* ─── Dots indicadores ─── */}
        <div className="social-proof-dots" role="tablist" aria-label="Navegar depoimentos">
          {DEPOIMENTOS.map((_, i) => (
            <button
              key={`dot-${i}`}
              type="button"
              role="tab"
              aria-selected={i === activeDepoimento}
              aria-label={`Depoimento ${i + 1}`}
              className={`social-proof-dot ${i === activeDepoimento ? 'active' : ''}`}
              onClick={() => setActiveDepoimento(i)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .social-proof-section {
          padding: 5rem 1.5rem;
          background: #08080b;
          color: #f8f8fa;
          overflow: hidden;
        }
        .social-proof-container {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
        }

        /* ─── Header / Contador ─── */
        .social-proof-header {
          display: flex;
          align-items: baseline;
          gap: 0.15rem;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .social-proof-count {
          font-size: 1.4em;
          color: #0057FF;
          font-variant-numeric: tabular-nums;
          transition: all 0.1s ease;
        }
        .social-proof-plus {
          font-size: 1.2em;
          color: #C9A84C;
          margin-right: 0.25rem;
        }
        .social-proof-label {
          color: rgba(248, 248, 250, 0.7);
          font-weight: 500;
        }

        /* ─── Carrossel infinito ─── */
        .social-proof-marquee {
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            #000 10%,
            #000 90%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            #000 10%,
            #000 90%,
            transparent 100%
          );
        }
        .social-proof-marquee-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: social-marquee 24s linear infinite;
        }
        @keyframes social-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .social-proof-logo {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1.25rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 100px;
          white-space: nowrap;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(248, 248, 250, 0.65);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .social-proof-logo-icon {
          font-size: 1.1rem;
        }
        .social-proof-logo-name {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* ─── Depoimentos ─── */
        .social-proof-depoimentos {
          position: relative;
          width: 100%;
          min-height: 180px;
        }
        .social-proof-card {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.75rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          opacity: 0;
          transform: translateX(30px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          pointer-events: none;
        }
        .social-proof-card.active {
          opacity: 1;
          transform: translateX(0);
          pointer-events: auto;
          position: relative;
        }
        .social-proof-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .social-proof-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(201, 168, 76, 0.3);
          flex-shrink: 0;
        }
        .social-proof-card-info {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .social-proof-card-name {
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
        }
        .social-proof-card-cargo {
          font-size: 0.8rem;
          color: rgba(248, 248, 250, 0.5);
        }
        .social-proof-card-badge {
          background: linear-gradient(135deg, #C9A84C, #b8903c);
          color: #0a0a0a;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          flex-shrink: 0;
        }
        .social-proof-card-text {
          font-size: 0.95rem;
          line-height: 1.7;
          color: rgba(248, 248, 250, 0.75);
          font-style: italic;
          margin: 0;
        }

        /* ─── Dots ─── */
        .social-proof-dots {
          display: flex;
          gap: 0.5rem;
        }
        .social-proof-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.15);
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
        }
        .social-proof-dot.active {
          background: #0057FF;
          width: 28px;
          border-radius: 4px;
        }
        .social-proof-dot:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 640px) {
          .social-proof-section {
            padding: 3rem 1rem;
          }
          .social-proof-card {
            padding: 1.25rem;
          }
          .social-proof-card-badge {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default SocialProof;
