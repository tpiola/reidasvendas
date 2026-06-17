import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

interface StatBarProps {
  stats: StatItem[];
  className?: string;
  layout?: 'horizontal' | 'vertical';
  barColor?: string;
}

function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  inView,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) {
      setDisplay(0);
      return;
    }

    const duration = 1500;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    }

    requestAnimationFrame(tick);
  }, [value, inView]);

  return (
    <span className="tabular-nums">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function StatBar({
  stats,
  className = '',
  layout = 'horizontal',
  barColor = 'from-[#D6A84F] to-[#F2D38A]',
}: StatBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div
      ref={ref}
      className={`${
        layout === 'horizontal'
          ? 'flex flex-wrap items-center justify-center gap-8 md:gap-16'
          : 'flex flex-col gap-6'
      } ${className}`}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <span className="font-serif text-3xl font-bold text-[#D6A84F] md:text-4xl lg:text-5xl">
            <AnimatedNumber
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              decimals={stat.decimals ?? 0}
              inView={inView}
            />
          </span>
          <span className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-[#A1A1AA] md:text-sm">
            {stat.label}
          </span>
          {i < stats.length - 1 && layout === 'horizontal' && (
            <div className="hidden h-12 w-px bg-gradient-to-b from-transparent via-[rgba(214,168,79,0.3)] to-transparent md:absolute md:right-[-2rem]" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
