import { cn } from '@/lib/utils';

interface BrandLockupProps {
  compact?: boolean;
  className?: string;
  wordmarkClassName?: string;
}

export function BrandLockup({ compact = false, className, wordmarkClassName }: BrandLockupProps) {
  return (
    <span className={cn('rdv-brand-lockup', compact && 'is-compact', className)}>
      <span className="rdv-brand-lockup__index" aria-hidden="true">RV/</span>
      <span className="rdv-brand-lockup__text">
        <span className={cn('rdv-wordmark', wordmarkClassName)}>Rei das Vendas</span>
        <span className="rdv-wordmark-subtitle">Arquitetura comercial</span>
      </span>
    </span>
  );
}
