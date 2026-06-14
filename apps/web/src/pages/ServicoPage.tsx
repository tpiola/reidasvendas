/* ═══════════════════════════════════════════
   SERVICOPAGE.TSX — Rei das Vendas
   Página dinâmica /servicos/:slug
   Hero com vídeo do serviço + benefícios + CTA
═══════════════════════════════════════════ */

import { useEffect, useMemo, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { servicos, COPY } from '@/data/plataforma';
import { applySeo } from '@/lib/seo';
import { Reveal } from '@/components/Reveal';

export default function ServicoPage() {
  const { slug } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);

  const servico = useMemo(
    () => servicos.find((s) => s.id === slug) ?? null,
    [slug],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, [servico]);

  useEffect(() => {
    if (!servico) return;
    applySeo({
      title: `${servico.titulo} — Rei das Vendas | Franca-SP`,
      description: servico.descricao,
      canonicalPath: `/servicos/${servico.id}`,
    });
  }, [servico]);

  /* Se serviço não encontrado */
  if (!servico) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--page-fg)]">
          Serviço não encontrado
        </h1>
        <p className="mt-3 text-sm text-[color:var(--page-fg-muted)]">
          O serviço solicitado não existe em nosso portfólio.
        </p>
        <div className="mt-8">
          <Link
            className="inline-flex h-12 items-center justify-center rounded-lg bg-[#0057FF] px-6 text-sm font-semibold text-white transition-all hover:bg-[#0057FF]/90"
            to="/"
          >
            Voltar para Home
          </Link>
        </div>
      </main>
    );
  }

  /* Serviços relacionados (exclui o atual) */
  const relacionados = servicos
    .filter((s) => s.id !== servico.id)
    .slice(0, 3);

  return (
    <main className="page-surface overflow-x-hidden">
      {/* Hero com vídeo do serviço */}
      <section className="relative isolate min-h-[70dvh] overflow-hidden bg-[#0a0a0a]" aria-labelledby="servico-hero-title">
        {/* Video background */}
        <div className="absolute inset-0 h-[120%] -top-[10%]">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={servico.imagemUrl}
            className="h-full w-full object-cover"
            style={{ filter: 'brightness(0.35)' }}
            aria-hidden="true"
          >
            <source src={servico.videoUrl} type="video/mp4" />
          </video>
        </div>

        {/* Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(0,87,255,0.2) 0%, transparent 40%, #0a0a0a 80%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--page-bg) 0%, transparent 100%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex min-h-[70dvh] max-w-7xl flex-col items-start justify-center px-6 pb-20 pt-32">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#0057FF]/80">
              Soluções
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1
              id="servico-hero-title"
              className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {servico.icone}{' '}
              {servico.titulo}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              {servico.descricao}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/diagnostico"
                className="inline-flex h-14 items-center justify-center rounded-lg bg-[#0057FF] px-8 text-sm font-semibold text-white transition-all hover:bg-[#0057FF]/90 hover:shadow-[0_0_30px_rgba(0,87,255,0.3)]"
              >
                {COPY.hero.cta}
              </Link>
              <Link
                to="/planos"
                className="inline-flex h-14 items-center justify-center rounded-lg border border-white/15 bg-white/5 px-8 text-sm font-semibold text-white/80 transition-all hover:bg-white/10 hover:text-white"
              >
                Ver planos e preços
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 md:py-28" aria-label="Benefícios do serviço">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/80">
                Benefícios
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--page-fg)] sm:text-4xl">
                O que está incluso
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {servico.beneficios.map((beneficio, index) => (
              <Reveal key={beneficio} delay={0.05 * index}>
                <div className="flex items-start gap-4 rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-6 transition-all hover:border-[#0057FF]/20">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0057FF]/10 text-lg text-[#0057FF]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-sm leading-relaxed text-[color:var(--page-fg)]">
                    {beneficio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Público-alvo e investimento */}
      <section className="border-t border-[color:var(--border-subtle)] bg-[color:var(--page-surface)] py-16 md:py-20" aria-label="Público e investimento">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-3">
            <Reveal>
              <div className="text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--page-fg-muted)]">
                  Ideal para
                </span>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--page-fg)]">
                  {servico.publicoAlvo}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--page-fg-muted)]">
                  Investimento
                </span>
                <p className="mt-3 text-2xl font-bold text-[#0057FF]">
                  {servico.precoBase}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--page-fg-muted)]">
                  Atendimento
                </span>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--page-fg)]">
                  Suporte local em Franca-SP com resposta em até 2 horas via WhatsApp.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Serviços Relacionados */}
      {relacionados.length > 0 && (
        <section className="py-20 md:py-28" aria-label="Serviços relacionados">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#0057FF]/80">
                  Também oferecemos
                </span>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[color:var(--page-fg)] sm:text-4xl">
                  Outras soluções
                </h2>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relacionados.map((rel, index) => (
                <Reveal key={rel.id} delay={0.05 * index}>
                  <Link
                    to={`/servicos/${rel.id}`}
                    className="group block rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-6 transition-all hover:border-[#0057FF]/30 hover:shadow-lg hover:shadow-[#0057FF]/5"
                  >
                    <span className="text-2xl" aria-hidden>{rel.icone}</span>
                    <h3 className="mt-3 text-lg font-semibold text-[color:var(--page-fg)] group-hover:text-[#0057FF] transition-colors">
                      {rel.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--page-fg-muted)]">
                      {rel.descricao.slice(0, 100)}…
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#0057FF]">
                      Ver solução
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="border-t border-[color:var(--border-subtle)] py-20" aria-label="Chamada final">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--page-fg)] sm:text-4xl">
              Vamos transformar seu negócio?
            </h2>
            <p className="mt-4 text-sm text-[color:var(--page-fg-muted)]">
              Diagnóstico gratuito e sem compromisso. Respondemos em até 2 horas.
            </p>
            <div className="mt-8">
              <Link
                to="/diagnostico"
                className="inline-flex h-14 items-center justify-center rounded-lg bg-[#0057FF] px-8 text-sm font-semibold text-white transition-all hover:bg-[#0057FF]/90 hover:shadow-[0_0_30px_rgba(0,87,255,0.3)] active:scale-[0.98]"
              >
                Solicitar Diagnóstico Gratuito
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
