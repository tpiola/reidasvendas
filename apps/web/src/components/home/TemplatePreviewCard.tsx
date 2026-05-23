import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import type { TemplateDefinition } from '@/data/templates';

const SPRING = { type: 'spring' as const, stiffness: 90, damping: 22 };

type TemplatePreviewCardProps = {
  template: TemplateDefinition;
  index: number;
};

export function TemplatePreviewCard({ template, index }: TemplatePreviewCardProps) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      className="glass-card group relative overflow-hidden rounded-2xl"
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...SPRING, delay: index * 0.06 }}
    >
      <Link
        to={`/templates/${template.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60"
        aria-label={`Ver amostra ${template.name}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={template.thumbImageUrl}
            srcSet={`${template.thumbImageUrl} 960w, ${template.coverImageUrl} 1920w`}
            sizes="(max-width: 768px) 100vw, 33vw"
            alt={`Amostra de site — ${template.name}, ${template.niche}`}
            width={960}
            height={540}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            loading={index < 3 ? 'eager' : 'lazy'}
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/35 to-transparent" />
          <div className="absolute left-4 top-4">
            <span className="inline-flex border border-white/15 bg-black/45 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/85 backdrop-blur-md">
              Amostra
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A84C]/85">{template.niche}</p>
            <h3 className="mt-1 text-lg font-semibold text-white">{template.name}</h3>
          </div>
        </div>
      </Link>
      <div className="border-t border-white/[0.06] p-4">
        <p className="text-xs leading-relaxed text-white/45">{template.tagline}</p>
        <Link
          to={`/templates/${template.slug}`}
          className="mt-3 inline-flex text-[10px] font-bold uppercase tracking-[0.2em] text-[#0057FF]/80 transition-colors hover:text-[#0057FF]"
        >
          Ver amostra →
        </Link>
      </div>
    </motion.article>
  );
}
