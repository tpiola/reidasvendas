import { Link } from 'react-router-dom';
import type { TemplateDefinition } from '@/data/templates';
import { formatBRL } from '@/utils/money';

type TemplateCardProps = {
  template: TemplateDefinition;
};

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm shadow-black/5 transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10">
      <Link
        to={`/templates/${template.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        aria-label={`Abrir template ${template.name}`}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={template.coverImageUrl}
            alt=""
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
        <p className="text-sm leading-relaxed text-black/70">{template.tagline}</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-black/55">A partir de {formatBRL(template.basePriceCents)}</p>
          <div className="flex items-center gap-2">
            <Link
              to={`/templates/${template.slug}`}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-black/15 px-4 text-xs font-semibold text-black/75 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              Ver template
            </Link>
            <Link
              to={`/templates/${template.slug}?intent=price`}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-black px-4 text-xs font-semibold text-white transition-colors hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              Ver preço
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
