import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { findMenuPage, routeForSlug } from '@/data/megaMenu';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';

function normalizeInternalTo(to: string): string {
  if (to.startsWith('/secao/')) {
    const slug = to.replace('/secao/', '');
    return routeForSlug(slug) ?? '/';
  }
  if (to.startsWith('/p/')) {
    const slug = to.replace('/p/', '');
    return routeForSlug(slug) ?? '/';
  }
  if (to === '/#lead' || to === '#lead') return '/diagnostico';
  return to;
}

export default function MenuPage({ basePath }: { basePath?: string }) {
  const { slug } = useParams();
  const page = findMenuPage(slug);
  const canonicalBase = basePath ?? '/produtos';

  useEffect(() => {
    if (!page) return;
    applySeo({
      title: `${page.title} — Rei das Vendas`,
      description: page.description,
      canonicalPath: `${canonicalBase}/${page.slug}`,
    });
  }, [canonicalBase, page]);

  if (!page) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">Página não encontrada</h1>
        <p className="mt-3 text-sm text-black/65">Volte para navegar pelo catálogo e recursos.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/templates"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-black px-5 text-sm font-semibold text-white transition-colors hover:bg-black/85"
          >
            Ver templates
          </Link>
          <Link
            to="/builder"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-black/15 px-5 text-sm font-semibold text-black/80 transition-colors hover:bg-black/5"
          >
            Abrir builder
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
            {page.category}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{page.title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/65">{page.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to={normalizeInternalTo(page.ctaTo)}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-black px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/85"
            >
              {page.ctaLabel}
            </Link>
            <Link
              to="/templates"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-black/15 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-black/80 transition-colors hover:bg-black/5"
            >
              Explorar templates
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#fafafa]">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <div className="grid gap-6 rounded-3xl border border-black/10 bg-white p-6 md:p-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">Visão geral</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">Visão executiva da seção</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/65">
                Esta página consolida a proposta, os principais benefícios e o próximo passo recomendado, mantendo consistência visual e clareza comercial.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-black/10">
                <img
                  src={'/hero-slide-3.svg'}
                  alt=""
                  className="h-[220px] w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {page.highlights.map((h) => (
            <div key={h} className="rounded-2xl border border-black/10 bg-[#fafafa] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">Destaque</p>
              <p className="mt-3 text-sm font-semibold text-black">{h}</p>
              <p className="mt-2 text-sm leading-relaxed text-black/60">
                Estrutura com design consistente, semântica e performance para manter o padrão premium.
              </p>
            </div>
          ))}
        </div>
      </section>

      <LeadCaptureSection
        id="diagnostico"
        source="footer"
        headline="Quer transformar esta seção em operação?"
        description="Solicite um diagnóstico estratégico. Você recebe a rota recomendada, a arquitetura mínima e a estrutura de automação para executar com padrão premium."
        intent={`secao:${page.slug}`}
      />
    </main>
  );
}
