import { useRef, useState, useEffect } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

/* ─── Scroll Reveal Variants ─── */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/* ─── Stagger ─── */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

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
    <h2 className="font-serif mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
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
    <section className={`relative py-20 sm:py-28 ${dark ? 'bg-background' : ''} ${className}`}>
      {children}
    </section>
  );
}
