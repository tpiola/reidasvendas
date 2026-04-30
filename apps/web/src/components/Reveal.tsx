import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@altiq/ui';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

// Spring physics: stiffness 100, damping 20 — heavy, luxurious movement
const SPRING = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20,
};

export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px 0px -10px 0px' }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </motion.div>
  );
}
