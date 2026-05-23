import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';
import { BuiltFromScratchBanner } from '@/components/BuiltFromScratchBanner';
import { getFeaturedTemplates } from '@/data/templates';
import { TemplatePreviewCard } from '@/components/home/TemplatePreviewCard';

export function TemplateCatalogSection() {
  const featured = getFeaturedTemplates();

  return (
    <section
      id="catalogo-sites"
      className="relative overflow-hidden border-y border-white/[0.04] bg-[#030305] py-28 md:py-40"
      aria-labelledby="catalog-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/25">Catálogo visual</span>
          <h2 id="catalog-heading" className="mt-4 text-heading font-semibold text-white">
            Sites que construímos
            <span className="text-gradient-gold"> para nossos clientes.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/45">
            Referências reais de estética, saúde, varejo e serviços — cada entrega nasce do zero, alinhada ao que o
            público do cliente busca.
          </p>
        </Reveal>

        <div className="mt-10">
          <BuiltFromScratchBanner variant="dark" />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((t, i) => (
            <TemplatePreviewCard key={t.slug} template={t} index={i} />
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/templates"
            className="btn-glow inline-flex h-14 items-center justify-center px-12 text-[11px] font-bold uppercase tracking-[0.28em] text-white"
          >
            Ver mais tipos de sites
          </Link>
          <Link
            to="/planos"
            className="btn-ghost inline-flex h-14 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.28em] text-white/75"
          >
            Ver planos e assinaturas
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
