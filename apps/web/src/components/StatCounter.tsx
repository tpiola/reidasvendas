import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

/**
 * Contador animado (count-up) ativado quando o elemento entra em viewport.
 * Usa ease-out cúbico + requestAnimationFrame; respeita prefers-reduced-motion.
 */
export function StatCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  decimals = 0,
  duration = 1800,
  className = '',
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!inView) return;

    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    let rafId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value, duration]);

  const formatted = display.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div ref={ref} className={className}>
      <div className="num-gold font-serif text-4xl font-bold leading-none tracking-tight sm:text-5xl md:text-6xl">
        {prefix}
        {formatted}
        {suffix}
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">{label}</p>
    </div>
  );
}
