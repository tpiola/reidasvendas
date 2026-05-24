type BuiltFromScratchNoticeProps = {
  variant?: 'dark' | 'light';
  className?: string;
};

/** Linha única — amostras ≠ cópia; evita banner pesado repetido */
export function BuiltFromScratchNotice({ variant = 'dark', className = '' }: BuiltFromScratchNoticeProps) {
  const isDark = variant === 'dark';
  return (
    <p className={`text-xs leading-relaxed text-[color:var(--text-muted)] md:text-sm ${className}`}>
      <span className={isDark ? 'font-semibold text-[#C9A84C]/85' : 'font-semibold text-[#0057FF]/80'}>
        Amostras, não pacotes:
      </span>{' '}
      cada entrega é projeto exclusivo — copy e jornada para o seu cliente converter.
    </p>
  );
}
