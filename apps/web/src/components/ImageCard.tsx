import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageCardProps {
  src: string;
  alt: string;
  label?: string;
  category?: string;
  href?: string;
  overlayOpacity?: number;
  className?: string;
  aspectRatio?: string;
  children?: React.ReactNode;
}

export function ImageCard({
  src,
  alt,
  label,
  category,
  href,
  overlayOpacity = 0.5,
  className = '',
  aspectRatio = 'aspect-[4/3]',
  children,
}: ImageCardProps) {
  const Component = href ? motion.a : motion.div;
  const linkProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Component
      {...linkProps}
      className={cn(
        'group relative overflow-hidden rounded-2xl',
        aspectRatio,
        'cursor-pointer',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[rgba(3,3,3,0.2)] to-transparent transition-all duration-500"
        style={{ opacity: overlayOpacity + 0.2 }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-tr from-[rgba(214,168,79,0.15)] to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100"
      />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        {category && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-2 inline-block w-fit rounded-full bg-[rgba(214,168,79,0.12)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D6A84F] backdrop-blur-sm"
          >
            {category}
          </motion.span>
        )}

        {label && (
          <h3 className="text-lg font-bold text-white transition-all duration-300 group-hover:text-[#D6A84F]">
            {label}
          </h3>
        )}

        {children && (
          <div className="mt-1 text-sm text-[rgba(255,255,255,0.7)]">
            {children}
          </div>
        )}

        {/* CTA on hover */}
        {href && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center gap-1 text-sm font-semibold text-[#D6A84F] opacity-0 transition-all duration-300 group-hover:opacity-100"
          >
            Ver projeto
            <ArrowUpRight className="h-4 w-4" />
          </motion.div>
        )}
      </div>

      {/* Gold border on hover */}
      <div className="absolute inset-0 rounded-2xl border border-transparent transition-all duration-500 group-hover:border-[rgba(214,168,79,0.3)]" />
    </Component>
  );
}
