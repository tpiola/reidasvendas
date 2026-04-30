import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { HeroVideo } from '@/components/HeroVideo';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';
import { Reveal } from '@/components/Reveal';
import { BRAND } from '@/lib/brand';
import { INSIGHT_CATEGORIES } from '@/data/siteStructure';

const POSTS: Record<string, { slug: string; title: string; excerpt: string }[]> = {
  'build-notes': [
    {
      slug: 'arquitetura-antes-do-layout',
      title: 'Arquitetura antes do layout',
      excerpt: 'Como organizar hierarquia, funil e eventos antes de escolher estética.',
    },
  ],
  'ai-operations': [
    {
      slug: 'leadops-com-n8n',
      title: 'LeadOps com n8n',
      excerpt: 'Entrada, qualificação, resposta e follow-up com padrões auditáveis.',
    },
  ],
};

export default function InsightsCategory() {
  const { slug } = useParams();
  const category = useMemo(() => INSIGHT_CATEGORIES.find((x) => x.slug === slug), [slug]);
  const posts = slug ? POSTS[slug] : undefined;

  useEffect(() => {
    if (!category) return;
    applySeo({
      title: `${category.title} — Insights — Rei das Vendas`,
      description: category.description,
      canonicalPath: `/insights/${category.slug}`,
    });
  }, [category]);

  if (!category) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-2xl font-semibold tracking-tight">Página não encontrada</h1>
        <p className="mt-3 text-sm text-black/65">A categoria solicitada não existe.</p>
        <div className="mt-8">
          <Link className="text-sm font-semibold underline" to="/insights">
            Voltar para Insights
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden bg-[#090D12]" aria-labelledby="insights-cat-hero">
        <HeroVideo src={BRAND.heroVideoUrl} poster={BRAND.heroPosterUrl} />
        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-28 md:pb-16 md:pt-36">
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">Insights</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 id="insights-cat-hero" className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                {category.title}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/75">{category.description}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16" aria-label="Posts">
        <div className="grid gap-4 md:grid-cols-2">
          {(posts ?? []).length ? (
            (posts ?? []).map((p, i) => (
              <Reveal key={p.slug} delay={0.04 * i}>
                <div className="rounded-3xl border border-black/10 bg-white p-6">
                  <p className="text-sm font-semibold text-black">{p.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-black/65">{p.excerpt}</p>
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/55">
                    Em breve
                  </p>
                </div>
              </Reveal>
            ))
          ) : (
            <Reveal>
              <div className="rounded-3xl border border-black/10 bg-[#fafafa] p-6">
                <p className="text-sm leading-relaxed text-black/70">
                  Conteúdo editorial em preparação. Esta página já está estruturada para receber artigos e clusters de SEO.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <LeadCaptureSection
        id="diagnostico"
        source="footer"
        headline="Quer aplicar isso como estrutura na sua operação?"
        description="Solicite diagnóstico estratégico. A Rei das Vendas conecta tese, páginas, automação e mensuração com padrão premium."
        intent={`insights:${category.slug}`}
      />
    </main>
  );
}

