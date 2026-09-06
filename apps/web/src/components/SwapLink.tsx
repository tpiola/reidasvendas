import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * SwapLink — texto que "troca" no hover (padrão premium Obys).
 * O rótulo desliza para cima e revela o texto alternativo (swapLabel)
 * vindo de baixo, com overflow escondido. Sem lib extra; animação CSS.
 * Respeita prefers-reduced-motion via media query (a troca vira fade).
 */
export function SwapLink({
  to,
  children,
  swapLabel,
  className = '',
  onClick,
}: {
  to: string;
  children: ReactNode;
  swapLabel: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link to={to} className={`rdv-swap-link ${className}`} onClick={onClick}>
      <span className="rdv-swap-link__stack" aria-hidden="true">
        <span className="rdv-swap-link__row rdv-swap-link__row--primary">{children}</span>
        <span className="rdv-swap-link__row rdv-swap-link__row--swap">{swapLabel}</span>
      </span>
      <ArrowRight className="rdv-swap-link__arrow" aria-hidden="true" />
    </Link>
  );
}
