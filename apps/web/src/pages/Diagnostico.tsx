import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo, applyJsonLd } from '@/lib/seo';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';

const FAQ = [
  {
    q: 'Em quanto tempo eu recebo retorno?',
    a: 'Normalmente em até 1 dia útil, com rota recomendada, escopo inicial e próximos passos.',
  },
  {
    q: 'O que eu preciso enviar?',
    a: 'Apenas nome, e-mail e WhatsApp. No retorno pedimos contexto do negócio se faltar algo.',
  },
  {
    q: 'Vocês ajudam com automação e mensuração?',
    a: 'Sim. O diagnóstico já considera eventos do funil, UTMs, roteamento e automações de resposta.',
  },
] as const;

export default function Diagnostico() {
  useEffect(() => {
    applySeo({
      title: 'Diagnóstico estratégico — Rei das Vendas',
      description: 'Solicite um diagnóstico para definir rota, escopo e arquitetura de conversão com padrão premium.',
      canonicalPath: '/diagnostico',
    });

    applyJsonLd('faq', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((x) => ({
        '@type': 'Question',
        name: x.q,
        acceptedAnswer: { '@type': 'Answer', text: x.a },
      })),
    });
  }, []);

  return (
    <main className="bg-white">
      <section className="border-b border-black/10 bg-[#fafafa]">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">Diagnóstico</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Rota de conversão com padrão premium</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/65">
            Você descreve cenário e objetivo. Eu retorno com uma rota recomendada (páginas, hierarquia e próximos passos) para executar rápido e com autoridade.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/5516992333344?text=Ol%C3%A1!%20Quero%20um%20diagn%C3%B3stico%20estrat%C3%A9gico."
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-black px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/85"
            >
              Falar no WhatsApp
            </a>
            <Link
              to="/templates"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-black/15 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-black/80 transition-colors hover:bg-black/5"
            >
              Ver templates
            </Link>
          </div>
        </div>
      </section>

      <LeadCaptureSection
        source="hero"
        headline="Descreva seu cenário e receba o próximo passo"
        description="Você recebe uma sugestão objetiva: páginas, ordem, copy base e eventos para medir o funil. Tudo com consistência visual e execução premium."
        intent="diagnostico"
        ctaLabel="Solicitar diagnóstico"
      />

      <section className="border-t border-black/10 bg-[#fafafa]">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <h2 className="text-xl font-semibold tracking-tight">Perguntas frequentes</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {FAQ.map((x) => (
              <div key={x.q} className="rounded-2xl border border-black/10 bg-white p-6">
                <p className="text-sm font-semibold text-black">{x.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-black/65">{x.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
