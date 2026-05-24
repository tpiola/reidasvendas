import type { ReactNode } from 'react';
import { Reveal } from '@/components/Reveal';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  children?: ReactNode;
  align?: 'left' | 'center';
};

export function PageHero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  children,
  align = 'center',
}: PageHeroProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'max-w-2xl';

  return (
    <section className="relative overflow-hidden border-b border-[color:var(--border-subtle)] bg-[color:var(--page-bg)] py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.08)_0%,transparent_60%)]" />
      <div className={`relative mx-auto max-w-6xl px-6 ${alignClass}`}>
        <Reveal>
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/80">{eyebrow}</p>
          <h1 className="mt-4 text-display font-semibold text-[color:var(--page-fg)]">
            {title}
            {titleAccent ? <span className="text-gradient-accent"> {titleAccent}</span> : null}
          </h1>
          {subtitle ? (
            <p className={`mt-6 text-base leading-relaxed text-[color:var(--text-muted)] ${align === 'center' ? 'max-w-2xl' : ''}`}>
              {subtitle}
            </p>
          ) : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
