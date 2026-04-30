import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { RESOURCE_ITEMS, RESOURCES_INSPIRE } from '@/data/megaMenu';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';

export default function Resources() {
  useEffect(() => {
    applySeo({
      title: 'Recursos — Rei das Vendas',
      description: 'Suporte, guias e inspiração para estruturar hubs e operações digitais com IA.',
      canonicalPath: '/recursos',
      ogImage: RESOURCES_INSPIRE.mediaUrl,
    });
  }, []);

  return (
    <main className="bg-[#090D12] text-white">
      <section className="mx-auto max-w-6xl px-6 pb-14 pt-28">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">Recursos</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Recursos e guias</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
          Materiais para orientar decisões, organizar o funil e manter execução consistente.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-10 rounded-3xl border border-white/10 bg-black/70 p-8 shadow-2xl shadow-black/40 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Base de conhecimento</p>
            <div className="mt-6 grid gap-7 md:grid-cols-2">
              {RESOURCE_ITEMS.map((item) => (
                <Link
                  key={item.slug}
                  to={`/recursos/${item.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-white/65">{item.description}</p>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60 group-hover:text-white">Abrir</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Inspire-se</p>
            <Link
              to={RESOURCES_INSPIRE.to}
              className="mt-6 block overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <div className="relative aspect-[16/9]">
                <img src={RESOURCES_INSPIRE.mediaUrl} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/20" />
              </div>
              <div className="px-6 py-5">
                <p className="text-sm font-semibold text-white">{RESOURCES_INSPIRE.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-white/65">{RESOURCES_INSPIRE.description}</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <LeadCaptureSection
        id="diagnostico"
        source="footer"
        headline="Quer transformar conhecimento em operação?"
        description="Solicite um diagnóstico estratégico. A Rei das Vendas organiza a rota de execução, define a arquitetura mínima e conecta conteúdo, captura e automação."
        intent="insights"
      />
    </main>
  );
}
