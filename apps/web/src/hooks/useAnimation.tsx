/* eslint-disable react-refresh/only-export-components -- this module intentionally co-locates reusable motion primitives */
import { useRef, useState, useEffect } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

/* ─── Motion tokens (Stripe / Linear / Emil Kowalski) ───
   Duração + curva em vez de spring: previsível, sem overshoot e igual em todas
   as seções. Entrada = ease-out (chega rápido, assenta suave); deslocamento
   curto (16–24px, não 40px) para não "empurrar" a página. */
const EASE_OUT = [0.23, 1, 0.32, 1] as const;      // ease-out-quint
const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;  // ease-in-out-quart

/** Durações padrão: micro (hover/press), ui (estado), entrada (seção), hero. */
export const motionDuration = { micro: 0.14, ui: 0.22, entrada: 0.5, hero: 0.7 } as const;

/* ─── Scroll Reveal Variants ─── */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: motionDuration.entrada, ease: EASE_OUT } },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: motionDuration.entrada, ease: EASE_IN_OUT } },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: motionDuration.entrada, ease: EASE_IN_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE_OUT } },
};

/* ─── Stagger (40–90ms por item, como no padrão de mercado) ─── */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE_OUT } },
};

/* ─── Transição padrão para elementos que mudam de estado em tela ───
   (mantida para compatibilidade; prefira os tokens acima) */
export const springTransition = { duration: motionDuration.ui, ease: EASE_OUT };

/* ─── Card 3D Tilt ─── */
export function useTilt(degree = 6) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -degree;
      const rotateY = ((x - centerX) / centerX) * degree;
      setStyle({
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: 'transform 0.1s ease-out',
      });
    };

    const handleMouseLeave = () => {
      setStyle({
        transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [degree]);

  return { ref, style };
}

/* ─── Reveal ─── */
export function Reveal({
  children, className = '', delay = 0, variant = fadeInUp, once = true,
}: {
  children: React.ReactNode; className?: string; delay?: number;
  variant?: Variants; once?: boolean;
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-30px 0px' });
  return (
    <motion.div
      ref={ref} variants={variant} initial="hidden"
      animate={isInView ? 'visible' : 'hidden'} transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section Components ─── */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="section-label">{children}</span>;
}

export function SectionTitle({
  children, highlight,
}: {
  children: React.ReactNode; highlight?: string;
}) {
  return (
    <h2 className="font-serif mt-4 text-3xl font-bold leading-tight text-text-primary sm:text-4xl md:text-5xl">
      {children}{' '}
      {highlight && <span className="text-gradient-gold">{highlight}</span>}
    </h2>
  );
}

export function SectionWrapper({
  children, className = '', dark = true,
}: {
  children: React.ReactNode; className?: string; dark?: boolean;
}) {
  return (
    <section className={`relative py-24 sm:py-32 lg:py-40 ${dark ? 'bg-background' : ''} ${className}`}>
      {children}
    </section>
  );
}
