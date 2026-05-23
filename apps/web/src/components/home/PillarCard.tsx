import { motion, useReducedMotion } from 'framer-motion';
import { DELIVERY_PILLARS } from '@/lib/home-content';

type Pillar = (typeof DELIVERY_PILLARS)[number];

type PillarCardProps = {
  pillar: Pillar;
  index: number;
};

export function PillarCard({ pillar, index }: PillarCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className="pillar-card group relative h-full border-r border-black/[0.06] bg-white p-8 last:border-r-0"
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ type: 'spring', stiffness: 85, damping: 22, delay: index * 0.07 }}
      whileHover={reduce ? undefined : { y: -6, backgroundColor: 'rgb(240 244 255)' }}
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-[0.32em] text-[#0057FF]/50">{pillar.num}</span>
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]/0 transition-colors duration-500 group-hover:text-[#C9A84C]/80">
          →
        </span>
      </div>
      <h3 className="mb-3 text-xl font-bold text-[#0A0A0B] transition-colors group-hover:text-[#0057FF]">
        {pillar.title}
      </h3>
      <p className="text-sm leading-relaxed text-[#0A0A0B]/50">{pillar.desc}</p>
    </motion.article>
  );
}
