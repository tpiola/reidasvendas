import { Link } from 'react-router-dom';
import type { TemplateDefinition } from '@/data/templates';
import { formatBRL } from '@/utils/money';

type TemplateCardProps = {
  template: TemplateDefinition;
};

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <article className="glass-card group overflow-hidden rounded-2xl transition-all hover:-translate-y-0.5">
      <Link
        to={`/templates/${template.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        aria-label={`Abrir template ${template.name}`}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={template.thumbImageUrl}
            srcSet={`${template.thumbImageUrl} 960w, ${template.coverImageUrl} 1920w`}
            sizes="(max-width: 1024px) 100vw, 33vw"
            alt={`Amostra ${template.name} — ${template.niche}`}
            width={960}
            height={540}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
              {template.niche}
            </p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight text-white">
              {template.name}
            </h3>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <p className="text-sm leading-relaxed text-white/50">{template.tagline}</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/35">Referência · a partir de {formatBRL(template.basePriceCents)}</p>
          <div className="flex items-center gap-2">
            <Link
              to={`/templates/${template.slug}`}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-white/15 px-4 text-xs font-semibold text-white/75 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60"
            >
              Ver amostra
            </Link>
            <Link
              to={`/planos/sob-medida`}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-[#0057FF] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#0057FF]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF]"
            >
              Montar projeto
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
