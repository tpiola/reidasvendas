import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Reveal } from '@/components/Reveal';
import type { PlanDetail } from '@/data/plans';
import { PLANS_HUB } from '@/data/plans';
import { BuiltFromScratchNotice } from '@/components/BuiltFromScratchNotice';
import { LeadForm } from '@/components/LeadForm';
import { InlineVideo } from '@/components/home/InlineVideo';
import { HERO_POSTER } from '@/lib/media';
import { PLAN_DEMO_VIDEOS } from '@/data/projects';
import { PlanComparisonTable } from '@/components/planos/PlanComparisonTable';
import { BRAND } from '@/lib/brand';
import { applyJsonLd } from '@/lib/seo';
import { buildPlanProductJsonLd } from '@/lib/seo-schema';

type PlanPageShellProps = {
  plan: PlanDetail;
  children?: ReactNode;
  leadContext?: Record<string, unknown>;
};

export function PlanPageShell({ plan, children, leadContext }: PlanPageShellProps) {
  const otherPlans = PLANS_HUB.filter((p) => p.slug !== plan.slug);

  useEffect(() => {
    applyJsonLd('plan-product', buildPlanProductJsonLd(plan));
  }, [plan]);

  return (
    <main className="page-surface">
      <section className="relative overflow-hidden border-b border-white/[0.06] py-20 md:py-28">
        <img
          src={plan.coverImageUrl}
          alt={plan.coverImageAlt}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          width={1920}
          height={1080}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030305] via-[#030305]/85 to-[#030305]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(0,87,255,0.18)_0%,transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <nav className="text-[11px] text-white/40" aria-label="Breadcrumb">
            <Link to="/planos" className="hover:text-white/70">
              Planos
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{plan.headline}</span>
          </nav>
          <Reveal className="mt-8 max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/80">Assinatura</p>
            <h1 className="mt-4 text-display font-semibold text-white">{plan.headline}</h1>
            <p className="mt-6 text-lg leading-relaxed text-white/50">{plan.subhead}</p>
            <p className="mt-8 text-3xl font-bold tracking-tight text-gradient-gold">{plan.priceLabel}</p>
            <p className="mt-2 text-sm text-white/35">{plan.billingNote}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contratar-plano"
                className="btn-glow inline-flex h-12 items-center justify-center px-8 text-[10px] font-bold uppercase tracking-[0.22em] text-white"
              >
                {plan.ctaContractLabel}
              </a>
              <a
                href={BRAND.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost inline-flex h-12 items-center justify-center px-8 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75"
              >
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-xl font-semibold text-white">O que está incluso</h2>
              <ul className="mt-6 space-y-3">
                {plan.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/55">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057FF]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="mt-10">
              <p className="text-sm text-white/45">
                <span className="font-semibold text-white/70">Ideal para: </span>
                {plan.idealFor}
              </p>
              <p className="mt-4 text-sm text-white/35">
                <span className="font-semibold text-white/50">Não inclui: </span>
                {plan.notIncluded.join(' · ')}
              </p>
            </Reveal>
            <Reveal delay={0.06} className="mt-10">
              <div className="glass-card overflow-hidden rounded-2xl p-2">
                <InlineVideo
                  src={PLAN_DEMO_VIDEOS[plan.slug] ?? BRAND.inlineVideos.performance}
                  poster={HERO_POSTER}
                  caption={`${plan.headline} · demonstração visual`}
                />
              </div>
            </Reveal>
            {children ? <div className="mt-12">{children}</div> : null}
            <BuiltFromScratchNotice className="mt-10" />
            <PlanComparisonTable currentSlug={plan.slug} />
          </div>
          <div id="contratar-plano" className="lg:col-span-5">
          <Reveal delay={0.12}>
            <div className="glass-card rounded-2xl p-8">
              <LeadForm
                source="pricing"
                formVariant="minimal"
                title="Quero este plano"
                description="Nome, e-mail e WhatsApp. Retorno com proposta alinhada ao seu cenário."
                ctaLabel={plan.ctaContractLabel}
                context={{ intent: 'plano', plan: plan.slug, ...leadContext }}
              />
            </div>
          </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-[#08080B] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
            Outros planos
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherPlans.map((p) => (
              <Link
                key={p.slug}
                to={`/planos/${p.slug}`}
                className="card-dark rounded-2xl p-6 transition-colors hover:border-[#0057FF]/30"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A84C]/70">{p.name}</p>
                <p className="mt-2 text-sm text-white/50">{p.tagline}</p>
                <span className="mt-4 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#0057FF]/80">
                  {p.ctaLabel} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
