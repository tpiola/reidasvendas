import { cn } from '@/lib/utils';

interface BrandLockupProps {
  compact?: boolean;
  className?: string;
  wordmarkClassName?: string;
}

export function BrandLockup({ compact = false, className, wordmarkClassName }: BrandLockupProps) {
  return (
    <span className={cn('inline-flex min-w-0 items-center', compact ? 'gap-2.5' : 'gap-3.5', className)}>
      <img
        src="/logo-mark.svg"
        alt=""
        aria-hidden="true"
        className={cn('shrink-0 object-contain drop-shadow-[0_8px_24px_rgba(200,255,53,.12)]', compact ? 'h-11 w-11 sm:h-12 sm:w-12' : 'h-16 w-16 sm:h-20 sm:w-20')}
      />
      <span className="min-w-0 leading-none">
        <span className={cn('rdv-wordmark block whitespace-nowrap font-semibold tracking-[-0.035em]', compact ? 'text-[1.35rem] sm:text-[1.55rem]' : 'text-3xl sm:text-4xl', wordmarkClassName)}>
          Rei das Vendas
        </span>
        <span className={cn('rdv-wordmark-subtitle mt-1 block whitespace-nowrap font-sans font-semibold uppercase tracking-[0.18em]', compact ? 'text-[0.48rem] sm:text-[0.55rem]' : 'text-[0.6rem] sm:text-[0.68rem]')}>
          Soberania digital
        </span>
      </span>
    </span>
  );
}
