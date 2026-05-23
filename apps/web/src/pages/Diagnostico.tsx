import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo, applyJsonLd } from '@/lib/seo';
import { BRAND } from '@/lib/brand';
import { LeadForm } from '@/components/LeadForm';
import { Reveal } from '@/components/Reveal';

const FAQ = [
  {
    q: 'Em quanto tempo eu recebo retorno?',
    a: 'Normalmente em até 24h, com rota recomendada, escopo inicial e próximos passos.',
  },
  {
    q: 'O que eu preciso enviar?',
    a: 'Apenas nome, e-mail e WhatsApp. No retorno pedimos contexto do negócio se faltar algo.',
  },
  {
    q: 'Vocês ajudam com automação e mensuração?',
    a: 'Sim. O diagnóstico já considera funil, UTMs, WhatsApp e automações de resposta.',
  },
] as const;

export default function Diagnostico() {
  useEffect(() => {
    applySeo({
      title: 'Diagnóstico estratégico — Rei das Vendas',
      description:
        'Agende diagnóstico: nome, e-mail e WhatsApp. Rota e escopo para colocar seu negócio à frente com tecnologia de ponta.',
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
    <main className="bg-[#030305] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(0,87,255,0.16)_0%,transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/80">Diagnóstico</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Rota de conversão
              <span className="text-gradient-gold"> com padrão premium</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/50">
              Preencha só nome, e-mail e WhatsApp. Devolvemos o próximo passo para você operar na frente do mercado —
              sem formulário longo.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <Reveal delay={0.08}>
          <div className="glass-card rounded-2xl p-8 md:p-10">
            <LeadForm
              source="hero"
              formVariant="minimal"
              title="Agendar diagnóstico"
              description="Somente nome, e-mail e WhatsApp."
              ctaLabel="Enviar e receber retorno"
              context={{ intent: 'diagnostico' }}
            />
          </div>
        </Reveal>
        <Reveal delay={0.12} className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/planos"
            className="btn-ghost inline-flex h-11 items-center justify-center px-8 text-[10px] font-bold uppercase tracking-[0.22em] text-white/70"
          >
            Ver planos
          </Link>
          <a
            href={BRAND.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="btn-glow inline-flex h-11 items-center justify-center px-8 text-[10px] font-bold uppercase tracking-[0.22em] text-white"
          >
            WhatsApp direto
          </a>
        </Reveal>
      </section>

      <section className="border-t border-white/[0.06] bg-[#08080B] py-14">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-xl font-semibold">Perguntas frequentes</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {FAQ.map((x, i) => (
              <Reveal key={x.q} delay={i * 0.05}>
                <div className="card-dark p-6">
                  <p className="text-sm font-semibold text-white">{x.q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/45">{x.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
