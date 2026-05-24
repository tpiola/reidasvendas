import { useEffect, useRef, useState } from 'react';
import { cn } from '@altiq/ui';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  emphasis?: boolean;
};

export function Reveal({ children, className, delay = 0, emphasis = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '-48px 0px -48px 0px', threshold: 0.08 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      className={cn(
        'reveal-on-scroll',
        emphasis && 'reveal-emphasis',
        visible && 'is-visible',
        className,
      )}
      style={delay > 0 ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
