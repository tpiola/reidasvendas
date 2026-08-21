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
        src="/logo-sovereign.png"
        alt=""
        aria-hidden="true"
        className={cn('shrink-0 object-contain drop-shadow-[0_8px_24px_rgba(184,154,94,.18)]', compact ? 'h-12 w-12 sm:h-14 sm:w-14' : 'h-20 w-20 sm:h-24 sm:w-24')}
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
