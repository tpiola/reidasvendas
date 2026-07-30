import { cn } from '@/lib/utils';

interface BrandLockupProps {
  compact?: boolean;
  className?: string;
  wordmarkClassName?: string;
}

export function BrandLockup({
  compact = false,
  className,
  wordmarkClassName,
}: BrandLockupProps) {
  return (
    <span className={cn('inline-flex min-w-0 items-center', compact ? 'gap-2.5' : 'gap-3.5', className)}>
      <img
        src="/logo-original.png"
        alt=""
        aria-hidden="true"
        className={cn(
          'shrink-0 object-contain',
          compact ? 'h-11 w-auto sm:h-12' : 'h-16 w-auto sm:h-20'
        )}
      />
      <span className="min-w-0 leading-none">
        <span
          className={cn(
            'rdv-wordmark block whitespace-nowrap font-semibold tracking-[-0.035em] text-white',
            compact ? 'text-[1.35rem] sm:text-[1.55rem]' : 'text-3xl sm:text-4xl',
            wordmarkClassName
          )}
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Rei das Vendas
        </span>
        <span
          className={cn(
            'rdv-wordmark-subtitle mt-1 block whitespace-nowrap font-sans font-semibold uppercase tracking-[0.18em] text-[#D6A84F]',
            compact ? 'text-[0.48rem] sm:text-[0.55rem]' : 'text-[0.6rem] sm:text-[0.68rem]'
          )}
        >
          Sites para negócios locais
        </span>
      </span>
    </span>
  );
}
