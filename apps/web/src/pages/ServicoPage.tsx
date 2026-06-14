/**
 * SERVICOPAGE.TSX — Rei das Vendas
 * Pagina dinamica /servicos/:slug
 * Hero com imagem + titulo + beneficios + publico-alvo + precos + CTA
 * SEO por pagina com keywords especificas
 */

import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { servicos, COPY } from '@/data/plataforma';
import { applySeo } from '@/lib/seo';
import { Reveal } from '@/components/Reveal';

const SEO_KEYWORDS: Record<string, string> = {
  sites: 'criacao de sites Franca, site profissional Franca SP, site para comercio local, landing page Franca, site institucional',
  apps: 'aplicativo delivery Franca, app para restaurante Franca, aplicativo proprio Franca, PWA Franca SP, app para comercio',
  extensoes: 'extensao Chrome Franca, automacao Franca SP, integracao sistemas Franca, bot WhatsApp Franca, CRM Franca',
  dashboards: 'dashboard Franca SP, painel indicadores Franca, relatorio vendas Franca, DRE online, KPI tempo real Franca',
  mentoria: 'mentoria digital Franca, consultoria marketing Franca, transformacao digital Franca, estrategia vendas Franca',
};

const SEO_DESCRIPTIONS: Record<string, string> = {
  sites: 'Criacao de sites profissionais em Franca-SP. Design premium, responsivo e otimizado para SEO. Lojas, servicos e industrias com presenca digital de verdade.',
  apps: 'Aplicativos mobile e web para negocios em Franca-SP. App delivery, catalogo digital, agendamento. Publique na Play Store e App Store.',
  extensoes: 'Extensoes de Chrome e automacoes para empresas em Franca-SP. Integracao com sistemas, bots WhatsApp, CRM personalizado.',
  dashboards: 'Dashboards e relatorios para empresarios de Franca-SP. Painel de vendas, estoque, DRE online em tempo real.',
  mentoria: 'Mentoria e consultoria digital para negocios de Franca-SP. Diagnostico completo, plano de acao e acompanhamento mensal.',
};

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function ServicoPage() {
  const { slug } = useParams();
  const servico = useMemo(
    () => servicos.find((s) => s.id === slug) ?? null,
    [slug],
  );

  useEffect(() => {
    if (!servico) return;
    const keywords = SEO_KEYWORDS[servico.id] ?? 'servicos digitais Franca SP, Rei das Vendas';
    applySeo({
      title: `${servico.titulo} — Rei das Vendas | Franca-SP`,
      description: SEO_DESCRIPTIONS[servico.id] ?? servico.descricao,
      canonicalPath: `/servicos/${servico.id}`,
    });
    const metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      const el = document.createElement('meta');
      el.setAttribute('name', 'keywords');
      el.setAttribute('content', keywords);
      document.head.appendChild(el);
    }
  }, [servico]);

  if (!servico) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--page-fg)]">
          Servico nao encontrado
        </h1>
        <p className="mt-3 text-sm text-[color:var(--page-fg-muted)]">
          O servico solicitado nao existe em nosso portfolio.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex h-12 items-center justify-center rounded-lg bg-[#0057FF] px-6 text-sm font-semibold text-white transition-all hover:bg-[#0057FF]/90"
            to="/"
          >
            Voltar para Home
          </Link>
          <Link
            className="inline-flex h-12 items-center justify-center rounded-lg border border-[color:var(--border-subtle)] px-6 text-sm font-semibold text-[color:var(--page-fg)] transition-all hover:bg-[color:var(--surface)]"
            to="/servicos"
          >
            Ver todos os servicos
          </Link>
        </div>
      </main>
    );
  }

  const relacionados = servicos
    .filter((s) => s.id !== servico.id)
    .slice(0, 3);

  return (
    <main className="page-surface overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative isolate min-h-[70dvh] overflow-hidden bg-[#0a0a0a]" aria-labelledby="servico-hero-title">
        <div className="absolute inset-0">
          <img
            src={servico.imagemUrl}
            alt=""
            className="h-full w-full object-cover"
            style={{ filter: 'brightness(0.35)' }}
            aria-hidden="true"
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(0,87,255,0.25) 0%, transparent 40%, #0a0a0a 80%)',
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
              Solucoes
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1
              id="servico-hero-title"
              className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {servico.titulo}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base md:text-lg">
              {servico.descricao}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/diagnostico"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#0057FF] px-7 text-sm font-semibold text-white transition-all hover:bg-[#0057FF]/90 hover:shadow-[0_0_30px_rgba(0,87,255,0.3)]"
              >
                {COPY.hero.cta}
              </Link>
              <Link
                to="/planos"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/15 bg-white/5 px-7 text-sm font-semibold text-white/80 transition-all hover:bg-white/10 hover:text-white"
              >
                Ver planos e precos
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BENEFICIOS SECTION */}
      <section className="py-16 md:py-24" aria-label="Beneficios do servico">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/80">
                Beneficios
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--page-fg)] sm:text-3xl">
                O que esta incluso
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servico.beneficios.map((beneficio, index) => (
              <Reveal key={beneficio} delay={0.05 * index}>
                <div className="flex items-start gap-3 rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-5 transition-all hover:border-[#0057FF]/20">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0057FF]/10 text-[#0057FF]">
                    <CheckIcon />
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

      {/* PUBLICO-ALVO + PRECO + ATENDIMENTO */}
      <section className="border-t border-[color:var(--border-subtle)] bg-[color:var(--page-surface)] py-14 md:py-20" aria-label="Publico e investimento">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            <Reveal>
              <div className="rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-6 text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--page-fg-muted)]">
                  Para quem e
                </span>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--page-fg)]">
                  {servico.publicoAlvo}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-6 text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--page-fg-muted)]">
                  Investimento
                </span>
                <p className="mt-3 text-xl font-bold text-[#0057FF] sm:text-2xl">
                  {servico.precoBase}
                </p>
                <Link
                  to="/planos"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#0057FF] hover:underline"
                >
                  Ver planos detalhados <ArrowRightIcon />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-6 text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--page-fg-muted)]">
                  Atendimento
                </span>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--page-fg)]">
                  Suporte local em Franca-SP com resposta em ate 2 horas via WhatsApp.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICOS RELACIONADOS */}
      {relacionados.length > 0 && (
        <section className="py-16 md:py-24" aria-label="Servicos relacionados">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#0057FF]/80">
                  Tambem oferecemos
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--page-fg)] sm:text-3xl">
                  Outras solucoes
                </h2>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relacionados.map((rel, index) => (
                <Reveal key={rel.id} delay={0.05 * index}>
                  <Link
                    to={`/servicos/${rel.id}`}
                    className="group block rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-5 transition-all hover:border-[#0057FF]/30 hover:shadow-lg hover:shadow-[#0057FF]/5"
                  >
                    <h3 className="text-base font-semibold text-[color:var(--page-fg)] group-hover:text-[#0057FF] transition-colors">
                      {rel.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--page-fg-muted)]">
                      {rel.descricao.slice(0, 100)}...
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#0057FF]">
                      Ver solucao <ArrowRightIcon />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA FINAL */}
      <section className="border-t border-[color:var(--border-subtle)] py-16 md:py-20" aria-label="Chamada final">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--page-fg)] sm:text-3xl">
              Vamos transformar seu negocio?
            </h2>
            <p className="mt-3 text-sm text-[color:var(--page-fg-muted)]">
              Diagnostico gratuito e sem compromisso. Respondemos em ate 2 horas.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/diagnostico"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#0057FF] px-7 text-sm font-semibold text-white transition-all hover:bg-[#0057FF]/90 hover:shadow-[0_0_30px_rgba(0,87,255,0.3)] active:scale-[0.98]"
              >
                Solicitar Diagnostico Gratuito
              </Link>
              <Link
                to="/planos"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-[color:var(--border-subtle)] px-7 text-sm font-semibold text-[color:var(--page-fg)] transition-all hover:bg-[color:var(--surface)]"
              >
                Ver planos
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
