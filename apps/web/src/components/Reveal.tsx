import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@altiq/ui';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Mais dramático no scroll (blur + leve escala) */
  emphasis?: boolean;
};

const SPRING = {
  type: 'spring' as const,
  stiffness: 88,
  damping: 22,
};

const SPRING_SOFT = {
  type: 'spring' as const,
  stiffness: 70,
  damping: 24,
};

export function Reveal({ children, className, delay = 0, y = 28, emphasis = false }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={
        emphasis
          ? { opacity: 0, y: y + 8, scale: 0.98, filter: 'blur(10px)' }
          : { opacity: 0, y, filter: 'blur(6px)' }
      }
      whileInView={
        emphasis
          ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
          : { opacity: 1, y: 0, filter: 'blur(0px)' }
      }
      viewport={{ once: true, margin: '-72px 0px -48px 0px' }}
      transition={{ ...(emphasis ? SPRING_SOFT : SPRING), delay }}
    >
      {children}
    </motion.div>
  );
}
