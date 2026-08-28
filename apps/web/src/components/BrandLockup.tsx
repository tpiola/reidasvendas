import { cn } from '@/lib/utils';

interface BrandLockupProps {
  compact?: boolean;
  className?: string;
  wordmarkClassName?: string;
}

export function BrandLockup({ compact = false, className, wordmarkClassName }: BrandLockupProps) {
  return (
    <span className={cn('rdv-brand-lockup', compact && 'is-compact', className)}>
      <svg
        className="rdv-brand-lockup__mark"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <path className="rdv-brand-lockup__frame" d="M6.5 6.5h35v35h-35z" />
        <path className="rdv-brand-lockup__r" d="M14 35V13h10.5c5.2 0 8.5 2.7 8.5 7.1 0 4.3-3.3 7-8.5 7H14m10.2 0L34 35" />
        <path className="rdv-brand-lockup__rise" d="m25.5 35 6.2-10.4L39 13" />
        <path className="rdv-brand-lockup__signal" d="M10 10h7M31 38h7" />
      </svg>
      <span className="rdv-brand-lockup__text">
        <span className={cn('rdv-wordmark', wordmarkClassName)}>Rei das Vendas</span>
        <span className="rdv-wordmark-subtitle">Negócios em movimento</span>
      </span>
    </span>
  );
}
