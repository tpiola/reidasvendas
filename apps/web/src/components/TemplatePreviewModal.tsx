import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Play } from 'lucide-react';
import type { TemplateDefinition } from '@/data/templates';

type Props = {
  template: TemplateDefinition | null;
  onClose: () => void;
};

export function TemplatePreviewModal({ template, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!template) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [template, onClose]);

  return (
    <AnimatePresence>
      {template && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Preview: ${template.name}`}
            tabIndex={-1}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Fechar preview"
            >
              <X size={16} />
            </button>

            {/* Preview image */}
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
              <img
                src={template.coverImageUrl}
                alt={`${template.name} preview`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-transform hover:scale-110">
                  <Play size={28} className="ml-1 text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70 backdrop-blur-sm">
                  {template.niche}
                </span>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">
                  {template.name}
                </h2>
                <p className="mt-1 text-sm text-zinc-400">{template.tagline}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/5 px-6 py-4">
              <div>
                <span className="text-[11px] font-medium text-zinc-500">
                  a partir de{' '}
                  <span className="text-zinc-300">
                    R$ {Math.floor(template.basePriceCents / 100).toLocaleString('pt-BR')}
                  </span>
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="inline-flex h-10 items-center rounded-lg border border-white/10 bg-white/5 px-4 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
                >
                  Fechar
                </button>
                <Link
                  to={`/templates/${template.slug}`}
                  onClick={onClose}
                  className="btn-glow inline-flex h-10 items-center gap-2 rounded-lg px-5 text-xs font-semibold uppercase tracking-[0.15em] text-white"
                >
                  Ver detalhes
                  <ExternalLink size={13} />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
