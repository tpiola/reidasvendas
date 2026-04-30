import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { quoteTemplate } from '@/utils/pricing';
import { TEMPLATE_MODULES } from '@/data/templateModules';
import { TEMPLATES } from '@/data/templates';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';

type StepId = 'topic' | 'format' | 'style' | 'modules' | 'proposal';

const STEPS: StepId[] = ['topic', 'format', 'style', 'modules', 'proposal'];

const FORMATS = [
  { id: 'site', label: 'Site institucional' },
  { id: 'landing', label: 'Landing de oferta' },
  { id: 'hub', label: 'Hub + automações' },
] as const;

const STYLES = [
  { id: 'editorial', label: 'Editorial' },
  { id: 'minimal', label: 'Minimal premium' },
  { id: 'cinematic', label: 'Cinematográfico' },
  { id: 'tech-dark', label: 'Tech dark' },
] as const;

function stepIndex(step: StepId) {
  return Math.max(0, STEPS.indexOf(step));
}

export default function Start() {
  const navigate = useNavigate();
  const [step, setStep] = useState<StepId>('topic');

  const [topic, setTopic] = useState('');
  const [format, setFormat] = useState<(typeof FORMATS)[number]['id']>('site');
  const [style, setStyle] = useState<(typeof STYLES)[number]['id']>('editorial');
  const [selected, setSelected] = useState<string[]>(() => TEMPLATES[0]?.includedModuleIds ?? []);

  useEffect(() => {
    applySeo({
      title: 'Comece agora — Rei das Vendas',
      description: 'Responda algumas perguntas e receba uma proposta inicial com escopo e valores.',
      canonicalPath: '/comecar',
    });
  }, []);

  useEffect(() => {
    const qp = new URLSearchParams(window.location.search);
    const seed = qp.get('topic');
    if (seed && seed.trim().length >= 2) setTopic(seed.trim());
  }, []);

  const progressPct = useMemo(() => {
    const i = stepIndex(step);
    return Math.round(((i + 1) / STEPS.length) * 100);
  }, [step]);

  const base = useMemo(() => {
    const t = TEMPLATES[0];
    if (!t) return null;
    const name = topic.trim() ? `Template — ${topic.trim()}` : 'Template';
    const niche = topic.trim() || 'Nicho';
    return { ...t, slug: 'start', name, niche };
  }, [topic]);

  const quote = useMemo(() => (base ? quoteTemplate(base, selected) : null), [base, selected]);

  const next = () => {
    const i = stepIndex(step);
    const nextStep = STEPS[i + 1];
    if (nextStep) setStep(nextStep);
  };

  const back = () => {
    const i = stepIndex(step);
    const prev = STEPS[i - 1];
    if (prev) setStep(prev);
  };

  return (
    <>
      <main className="min-h-[calc(100vh-4rem)] bg-white">
        <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-12">
          <section className="lg:col-span-7">
            <div className="mx-auto max-w-3xl px-6 pt-24">
            <h1 className="text-sm font-semibold uppercase tracking-[0.18em] text-black/55">
              Comece agora
            </h1>
            <div className="flex items-center justify-between text-xs">
              <button type="button" onClick={back} className="inline-flex items-center gap-2 text-black/60 hover:text-black" disabled={step === 'topic'}>
                <span aria-hidden="true">←</span>
                Voltar
              </button>
              <button type="button" className="text-black/60 hover:text-black" onClick={() => navigate('/templates')}>
                Ir para o catálogo
              </button>
            </div>

            <div className="mt-14">
              {step === 'topic' && (
                <>
                  <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Sobre o que é o seu site?</h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/60">
                    Iremos adaptar conteúdo, recomendações e proposta ao seu mercado. Comece pelo nicho.
                  </p>
                  <div className="mt-10">
                    <div className="relative">
                      <input
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Insira um tópico (ex.: Design de Interiores, Marcenaria)"
                        className="h-14 w-full rounded-xl border border-black/15 px-4 text-sm outline-none placeholder:text-black/35 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                      />
                    </div>
                    <div className="mt-3 h-0.5 w-16 bg-black" style={{ opacity: 0.15 }} />
                  </div>
                </>
              )}

              {step === 'format' && (
                <>
                  <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Qual o formato ideal?</h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/60">
                    Isso define arquitetura, páginas e a camada de automações.
                  </p>
                  <div className="mt-10 grid gap-3">
                    {FORMATS.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFormat(f.id)}
                        className={
                          f.id === format
                            ? 'h-12 rounded-xl border border-black bg-black px-5 text-sm font-semibold text-white'
                            : 'h-12 rounded-xl border border-black/15 bg-white px-5 text-sm font-semibold text-black/80 hover:bg-black/5'
                        }
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 'style' && (
                <>
                  <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Qual direção de design?</h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/60">
                    Ajustamos tipografia, grid, ritmo editorial e motion.
                  </p>
                  <div className="mt-10 grid gap-3 sm:grid-cols-2">
                    {STYLES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setStyle(s.id)}
                        className={
                          s.id === style
                            ? 'h-12 rounded-xl border border-black bg-black px-5 text-sm font-semibold text-white'
                            : 'h-12 rounded-xl border border-black/15 bg-white px-5 text-sm font-semibold text-black/80 hover:bg-black/5'
                        }
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 'modules' && (
                <>
                  <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">O que o hub precisa ter?</h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/60">
                    Selecione módulos. O valor aumenta conforme o escopo cresce.
                  </p>
                  <div className="mt-10 grid gap-3">
                    {TEMPLATE_MODULES.map((m) => {
                      const checked = selected.includes(m.id);
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() =>
                            setSelected((prev) => {
                              const set = new Set(prev);
                              if (set.has(m.id)) set.delete(m.id);
                              else set.add(m.id);
                              return Array.from(set);
                            })
                          }
                          className={
                            checked
                              ? 'rounded-2xl border border-black bg-black px-5 py-4 text-left'
                              : 'rounded-2xl border border-black/15 bg-white px-5 py-4 text-left hover:bg-black/5'
                          }
                        >
                          <p className={checked ? 'text-sm font-semibold text-white' : 'text-sm font-semibold text-black'}>
                            {m.label}
                          </p>
                          <p className={checked ? 'mt-1 text-xs text-white/65' : 'mt-1 text-xs text-black/60'}>
                            + {Math.round(m.priceCents / 100)}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {step === 'proposal' && (
                <>
                  <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Proposta inicial</h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/60">
                    Use isso como base. Ao clicar para ver preço, você é direcionado ao template com captura de lead.
                  </p>
                  <div className="mt-10 rounded-2xl border border-black/10 bg-[#fafafa] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">Resumo</p>
                    <div className="mt-4 grid gap-3 text-sm text-black/70">
                      <div className="flex items-center justify-between">
                        <span>Nicho</span>
                        <span className="font-semibold text-black">{topic.trim() || '—'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Formato</span>
                        <span className="font-semibold text-black">{FORMATS.find((f) => f.id === format)?.label}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Design</span>
                        <span className="font-semibold text-black">{STYLES.find((s) => s.id === style)?.label}</span>
                      </div>
                    </div>
                    <div className="mt-6 border-t border-black/10 pt-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-black">Total estimado</span>
                        <span className="text-2xl font-semibold tracking-tight text-black">
                          {quote ? `R$ ${Math.round(quote.totalCents / 100).toLocaleString('pt-BR')}` : '—'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate('/templates/preview?intent=price')}
                        className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-xl bg-black px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/85"
                      >
                        Ver preço no template
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="fixed bottom-0 left-0 right-0 border-t border-black/10 bg-white">
              <div className="mx-auto max-w-3xl px-6 py-4">
                <div className="h-0.5 w-full bg-black/10">
                  <div className="h-0.5 bg-black" style={{ width: `${progressPct}%` }} />
                </div>
                <div className="mt-4 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-black px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/85"
                    disabled={step === 'proposal' || (step === 'topic' && topic.trim().length < 2)}
                  >
                    Próximo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

          <aside className="relative hidden lg:col-span-5 lg:block" aria-hidden="true">
            <div className="absolute inset-0 bg-black" />
            <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_55%_35%,rgba(0,0,0,0.0),rgba(0,0,0,0.75))]" />
            <div className="absolute inset-0 opacity-90" style={{ backgroundImage: "url('/hero-slide-1.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
          </aside>
        </div>
      </main>

      <LeadCaptureSection
        id="diagnostico"
        source="footer"
        headline="Quer validar a rota antes de executar?"
        description="Solicite diagnóstico estratégico. A Rei das Vendas confirma arquitetura, páginas, automações e mensuração com base no seu objetivo e estágio atual."
        intent="start"
      />
    </>
  );
}
