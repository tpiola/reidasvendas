import type { CSSProperties } from 'react';
import { cn } from '@altiq/ui';
import { useTheme } from '@/hooks/useTheme';

type LogoVariant = 'onDark' | 'onLight' | 'auto';
type LogoLayout = 'horizontal' | 'stacked';
type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

type BrandLogoProps = {
  variant?: LogoVariant;
  layout?: LogoLayout;
  size?: LogoSize;
  className?: string;
  /** Exibir wordmark ao lado da coroa */
  showWordmark?: boolean;
};

const SIZE = {
  sm: { crown: 28, text: 'text-[10px] sm:text-[11px]', gap: 'gap-2', width: 140 },
  md: { crown: 36, text: 'text-[11px] sm:text-xs', gap: 'gap-2.5', width: 168 },
  lg: { crown: 44, text: 'text-xs sm:text-sm md:text-base', gap: 'gap-3', width: 200 },
  xl: { crown: 52, text: 'text-sm sm:text-base md:text-lg', gap: 'gap-3.5', width: 240 },
} as const;

function CrownIcon({ size, gradientId }: { size: number; gradientId: string }) {
  const s = size;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 64 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <defs>
        <linearGradient id={gradientId} x1="8" y1="4" x2="56" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--logo-gold-hi)" />
          <stop offset="45%" stopColor="var(--logo-gold-mid)" />
          <stop offset="100%" stopColor="var(--logo-gold-lo)" />
        </linearGradient>
      </defs>
      {/* Coroa geométrica — traços finos, estilo premium */}
      <path
        d="M32 6 L38 22 L52 18 L44 34 L56 40 L32 36 L8 40 L20 34 L12 18 L26 22 Z"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.35"
        strokeLinejoin="miter"
        fill="none"
      />
      <path
        d="M32 6 L26 22 L20 34 M32 6 L38 22 L44 34 M26 22 L38 22 M20 34 L44 34"
        stroke={`url(#${gradientId})`}
        strokeWidth="0.9"
        strokeOpacity="0.65"
        fill="none"
      />
      <path
        d="M14 44 H50"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M32 12 L32 28" stroke={`url(#${gradientId})`} strokeWidth="0.75" strokeOpacity="0.5" />
    </svg>
  );
}

export function BrandLogo({
  variant = 'auto',
  layout = 'horizontal',
  size = 'lg',
  className,
  showWordmark = true,
}: BrandLogoProps) {
  const { isDark } = useTheme();
  const resolved = variant === 'auto' ? (isDark ? 'onDark' : 'onLight') : variant;
  const dims = SIZE[size];
  const gradientId = `rdv-gold-${resolved}-${size}`;

  return (
    <span
      className={cn(
        'brand-logo inline-flex items-center',
        layout === 'horizontal' ? dims.gap : 'flex-col gap-2',
        className,
      )}
      data-logo-variant={resolved}
      style={
        {
          '--logo-gold-hi': resolved === 'onDark' ? '#FFE9A8' : '#9A7209',
          '--logo-gold-mid': resolved === 'onDark' ? '#E8C56A' : '#B8903C',
          '--logo-gold-lo': resolved === 'onDark' ? '#C9A84C' : '#7A5C12',
        } as CSSProperties
      }
    >
      <CrownIcon size={dims.crown} gradientId={gradientId} />
      {showWordmark && (
        <span
          className={cn(
            'brand-logo__wordmark font-bold uppercase leading-[1.05] tracking-[0.14em] sm:tracking-[0.18em]',
            dims.text,
            resolved === 'onDark' ? 'text-gradient-gold' : 'text-gradient-gold-dark',
          )}
          style={{ maxWidth: layout === 'horizontal' ? dims.width : undefined }}
        >
          {layout === 'stacked' ? (
            <>
              <span className="block">Rei das</span>
              <span className="block">Vendas</span>
            </>
          ) : (
            <span className="block whitespace-nowrap">Rei das Vendas</span>
          )}
        </span>
      )}
    </span>
  );
}
