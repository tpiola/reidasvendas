import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

const SPRING = { type: 'spring' as const, stiffness: 80, damping: 20 };

type NicheCardProps = {
  title: string;
  img: string;
  to: string;
  index: number;
};

export function NicheCard({ title, img, to, index }: NicheCardProps) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      className="group relative cursor-pointer overflow-hidden bg-[#0A0A0B]"
      style={{ aspectRatio: '4/3' }}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...SPRING, delay: index * 0.07 }}
    >
      <img
        src={img}
        alt={`${title} — Rei das Vendas`}
        width={1200}
        height={900}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
        loading={index < 2 ? 'eager' : 'lazy'}
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-[#C9A84C]/0 transition-colors duration-500 group-hover:bg-[#C9A84C]/10" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white/90 transition-colors group-hover:text-white">
          {title}
        </h3>
        <Link
          to={to}
          className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 hover:text-[#C9A84C]"
        >
          Ver solução
          <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </motion.article>
  );
}
