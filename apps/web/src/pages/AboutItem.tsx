import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { HeroVideo } from '@/components/HeroVideo';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';
import { Reveal } from '@/components/Reveal';
import { BRAND } from '@/lib/brand';
import { ABOUT_ITEMS } from '@/data/siteStructure';

const BODY: Record<string, string[]> = {
  company: [
    'A Rei das Vendas nasceu da percepção de que o mercado precisa de arquitetura, não de mais produção superficial.',
    'Operamos na interseção de design, negócio e tecnologia para transformar presença em sistema.',
    'O objetivo é previsibilidade: captura, qualificação, resposta e mensuração por etapas.',
  ],
  founder: [
    'Thiago atua na interseção entre vendas, negócios e tecnologia.',
    'O foco é construir estruturas digitais que unem clareza, performance e execução.',
    'A prioridade é padrão: decisões mensuráveis, fluxos auditáveis e operação sustentável.',
  ],
  manifesto: [
    'Seu negócio não precisa de mais ferramentas. Precisa de arquitetura.',
    'Presença não é operação. Operação é método, automação e mensuração.',
    'O padrão premium não é estética: é clareza, consistência e entrega.',
  ],
};

export default function AboutItem() {
  const { slug } = useParams();
  const item = useMemo(() => ABOUT_ITEMS.find((x) => x.slug === slug), [slug]);
  const paragraphs = slug ? BODY[slug] : undefined;

  useEffect(() => {
    if (!item) return;
    applySeo({
      title: `${item.label} — Sobre — Rei das Vendas`,
      description: item.description,
      canonicalPath: `/about/${item.slug}`,
    });
  }, [item]);

  if (!item) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-2xl font-semibold tracking-tight">Página não encontrada</h1>
        <p className="mt-3 text-sm text-black/65">A seção solicitada não existe.</p>
        <div className="mt-8">
          <Link className="text-sm font-semibold underline" to="/about">
            Voltar para About
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden bg-[#090D12]" aria-labelledby="about-item-hero">
        <HeroVideo src={BRAND.heroVideoUrl} poster={BRAND.heroPosterUrl} />
        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-28 md:pb-16 md:pt-36">
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">Sobre</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 id="about-item-hero" className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                {item.label}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/75">{item.description}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12 md:py-16" aria-label="Conteúdo editorial">
        <div className="space-y-4 text-sm leading-relaxed text-black/70">
          {(paragraphs ?? [
            'Conteúdo editorial em construção. Use esta estrutura como base e substitua por texto institucional final.',
          ]).map((p, i) => (
            <Reveal key={i} delay={0.04 * i}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <LeadCaptureSection
        id="diagnostico"
        source="footer"
        headline="Quer uma arquitetura premium aplicada ao seu cenário?"
        description="Solicite diagnóstico estratégico. A Rei das Vendas retorna com rota recomendada e próximos passos."
        intent={`about:${item.slug}`}
      />
    </main>
  );
}
