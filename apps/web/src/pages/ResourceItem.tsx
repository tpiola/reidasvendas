import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { RESOURCE_ITEMS } from '@/data/megaMenu';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';

export default function ResourceItem() {
  const { slug } = useParams();
  const item = RESOURCE_ITEMS.find((i) => i.slug === slug);

  useEffect(() => {
    if (!item) return;
    applySeo({
      title: `${item.title} — Recursos Rei das Vendas`,
      description: item.description,
      canonicalPath: `/recursos/${item.slug}`,
      ogImage: 'https://reidasvendas.com/og-image.svg',
    });
  }, [item]);

  if (!item) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">Recurso não encontrado</h1>
        <p className="mt-3 text-sm text-black/65">Volte para navegar pelos recursos disponíveis.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/recursos"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-black px-5 text-sm font-semibold text-white transition-colors hover:bg-black/85"
          >
            Ver recursos
          </Link>
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-black/15 px-5 text-sm font-semibold text-black/80 transition-colors hover:bg-black/5"
          >
            Ir para a home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#090D12] text-white">
      <section className="mx-auto max-w-6xl px-6 pb-14 pt-28">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">Recursos</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">{item.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">{item.description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/recursos"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-xs font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-white/90"
          >
            Voltar aos recursos
          </Link>
          <Link
            to="/contato"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10"
          >
            Falar com a Rei das Vendas
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-10 rounded-3xl border border-white/10 bg-black/70 p-8 shadow-2xl shadow-black/40 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Conteúdo</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
              Este recurso foi estruturado para leitura editorial, com navegação clara e foco em decisão. O conteúdo detalhado pode ser expandido com seções, exemplos e materiais complementares.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {RESOURCE_ITEMS.filter((i) => i.slug !== item.slug)
                .slice(0, 4)
                .map((i) => (
                  <Link
                    key={i.slug}
                    to={`/recursos/${i.slug}`}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                  >
                    <p className="text-sm font-semibold text-white">{i.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-white/65">{i.description}</p>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">Abrir</p>
                  </Link>
                ))}
            </div>
          </div>
          <div className="lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Mídia</p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <img
                src={'/hero-slide-2.svg'}
                alt=""
                className="h-[320px] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <LeadCaptureSection
        id="diagnostico"
        source="footer"
        headline="Quer aplicar isso como sistema?"
        description="Solicite diagnóstico estratégico. A Rei das Vendas traduz conteúdo em arquitetura, captura e automação com padrões mensuráveis."
        intent={`recurso:${item.slug}`}
      />
    </main>
  );
}
