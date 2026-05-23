import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';
import { getFeaturedTemplates } from '@/data/templates';
import { TemplatePreviewCard } from '@/components/home/TemplatePreviewCard';
import {
  getCatalogCtaLabel,
  resolveCatalogCtaVariant,
  type CatalogCtaVariant,
} from '@/lib/ab-catalog-cta';

export function TemplateCatalogSection() {
  const featured = getFeaturedTemplates();
  const [ctaVariant, setCtaVariant] = useState<CatalogCtaVariant>('premium');
  const ctaLabel = getCatalogCtaLabel(ctaVariant);

  useEffect(() => {
    setCtaVariant(resolveCatalogCtaVariant());
  }, []);

  return (
    <section
      id="catalogo-sites"
      className="relative overflow-hidden border-y border-white/[0.04] bg-[#030305] py-28 md:py-40"
      aria-labelledby="catalog-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/25">Amostras por profissão</span>
          <h2 id="catalog-heading" className="mt-4 text-heading font-semibold text-white">
            O visual que o seu cliente
            <span className="text-gradient-gold"> espera ver.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/45">
            Quatro referências na Home. Cada projeto é feito do zero — copy e jornada para o seu nicho converter.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((t, i) => (
            <TemplatePreviewCard key={t.slug} template={t} index={i} />
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/templates"
            data-cta-variant={ctaVariant}
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-sm border border-[#C9A84C]/40 bg-gradient-to-r from-[#C9A84C]/15 via-[#C9A84C]/8 to-transparent px-12 text-[11px] font-bold uppercase tracking-[0.28em] text-[#C9A84C] transition-all duration-300 hover:border-[#C9A84C]/70 hover:from-[#C9A84C]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50"
          >
            <span className="relative z-10">{ctaLabel}</span>
            <span
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.2), transparent 70%)',
              }}
              aria-hidden
            />
          </Link>
          <Link
            to="/planos"
            className="btn-ghost inline-flex h-14 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.28em] text-white/75"
          >
            Planos e assinaturas
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
