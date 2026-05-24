import type { ReactNode } from 'react';
import { Reveal } from '@/components/Reveal';

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  children: ReactNode;
  variant?: 'dark' | 'light';
  className?: string;
  align?: 'left' | 'center';
};

export function SectionShell({
  id,
  eyebrow,
  title,
  titleAccent,
  subtitle,
  children,
  variant = 'dark',
  className = '',
  align = 'left',
}: SectionShellProps) {
  const isDark = variant === 'dark';
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'max-w-2xl';

  return (
    <section
      id={id}
      className={`py-20 md:py-28 ${isDark ? 'bg-[color:var(--page-bg)]' : 'section-white'} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className={alignClass}>
          {eyebrow ? (
            <span
              className={
                isDark
                  ? 'text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/70'
                  : 'text-[10px] font-bold uppercase tracking-[0.32em] text-[#0057FF]/50'
              }
            >
              {eyebrow}
            </span>
          ) : null}
          <h2
            className="mt-4 text-heading font-semibold text-[color:var(--page-fg)]"
          >
            {title}
            {titleAccent ? (
              <span className={isDark ? ' text-gradient-accent' : ' text-gradient-gold-dark'}>
                {' '}
                {titleAccent}
              </span>
            ) : null}
          </h2>
          {subtitle ? (
            <p
              className={`mt-5 text-sm leading-relaxed text-[color:var(--text-muted)] md:text-base ${align === 'center' ? 'mx-auto max-w-xl' : ''}`}
            >
              {subtitle}
            </p>
          ) : null}
        </Reveal>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
