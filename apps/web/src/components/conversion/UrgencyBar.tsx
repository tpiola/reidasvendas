/* ═══════════════════════════════════════════
   URGENCYBAR.TSX — Rei das Vendas
   Barra fixa no TOPO com timer regressivo
   "ÚLTIMAS 2 VAGAS DO MÊS" — 29:59 → 0
   Fechável com X, vermelho pulsando < 5min
═══════════════════════════════════════════ */

import React, { useState, useEffect, useRef, useCallback } from 'react';

const TIMER_DURATION = 29 * 60 + 59; // 29:59 em segundos
const DANGER_THRESHOLD = 5 * 60; // 5 minutos

const UrgencyBar: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasMounted = useRef(false);

  /* ─── Timer regressivo + reinício automático ─── */
  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(TIMER_DURATION);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Reinicia automaticamente
          return TIMER_DURATION;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      startTimer();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startTimer]);

  /* ─── Animação de fade-in na montagem ─── */
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  if (isDismissed) return null;

  /* ─── Formatação do timer ─── */
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timerStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const isDanger = timeLeft < DANGER_THRESHOLD;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`urgency-bar ${isVisible ? 'urgency-bar-visible' : ''} ${isDanger ? 'urgency-bar-danger' : ''}`}
    >
      <div className="urgency-bar-inner">
        <span className="urgency-bar-icon" aria-hidden="true">⚡</span>

        <span className="urgency-bar-text">
          ÚLTIMAS 2 VAGAS DO MÊS
        </span>

        <span className="urgency-bar-separator" aria-hidden="true">—</span>

        <span className="urgency-bar-label">
          Preço vai subir em:
        </span>

        <span
          className={`urgency-bar-timer ${isDanger ? 'urgency-bar-timer-pulse' : ''}`}
          aria-label={`${minutes} minutos e ${seconds} segundos restantes`}
        >
          {timerStr}
        </span>

        <a
          href="/contato"
          className="urgency-bar-cta"
          aria-label="Garantir vaga com preço atual"
        >
          GARANTIR VAGA →
        </a>

        <button
          type="button"
          className="urgency-bar-close"
          onClick={handleDismiss}
          aria-label="Fechar barra de urgência"
        >
          ✕
        </button>
      </div>

      <style>{`
        .urgency-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          height: 44px;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          color: #fff;
          font-family: inherit;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          transform: translateY(-100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 16px rgba(220, 38, 38, 0.35);
          overflow: hidden;
        }
        .urgency-bar-visible {
          transform: translateY(0);
        }
        .urgency-bar-danger {
          animation: urgency-pulse-bg 1.5s ease-in-out infinite;
        }
        @keyframes urgency-pulse-bg {
          0%, 100% { box-shadow: 0 2px 16px rgba(220, 38, 38, 0.35); }
          50% { box-shadow: 0 2px 32px rgba(220, 38, 38, 0.65), 0 0 60px rgba(220, 38, 38, 0.2); }
        }
        .urgency-bar-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          height: 100%;
          padding: 0 1rem;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }
        .urgency-bar-icon {
          font-size: 0.9rem;
          flex-shrink: 0;
        }
        .urgency-bar-text {
          white-space: nowrap;
          text-transform: uppercase;
          flex-shrink: 0;
        }
        .urgency-bar-separator {
          opacity: 0.4;
          flex-shrink: 0;
        }
        .urgency-bar-label {
          opacity: 0.85;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .urgency-bar-timer {
          font-variant-numeric: tabular-nums;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          background: rgba(0, 0, 0, 0.2);
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          flex-shrink: 0;
          min-width: 3.5rem;
          text-align: center;
        }
        .urgency-bar-timer-pulse {
          animation: urgency-timer-flash 0.8s ease-in-out infinite;
        }
        @keyframes urgency-timer-flash {
          0%, 100% { background: rgba(0, 0, 0, 0.25); }
          50% { background: rgba(255, 200, 50, 0.3); color: #ffe060; }
        }
        .urgency-bar-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: #fff;
          color: #dc2626;
          padding: 0.2rem 0.75rem;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-decoration: none;
          flex-shrink: 0;
          transition: transform 0.15s ease;
        }
        .urgency-bar-cta:hover {
          transform: scale(1.04);
        }
        .urgency-bar-cta:active {
          transform: scale(0.96);
        }
        .urgency-bar-close {
          position: absolute;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.15);
          border: none;
          color: #fff;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          font-size: 0.65rem;
          line-height: 1;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .urgency-bar-close:hover {
          background: rgba(0, 0, 0, 0.3);
        }
        @media (max-width: 640px) {
          .urgency-bar {
            height: auto;
            min-height: 44px;
          }
          .urgency-bar-inner {
            flex-wrap: wrap;
            gap: 0.3rem;
            padding: 0.4rem 2rem 0.4rem 0.75rem;
          }
          .urgency-bar-label,
          .urgency-bar-separator {
            display: none;
          }
          .urgency-bar-cta {
            font-size: 0.65rem;
            padding: 0.15rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default UrgencyBar;
