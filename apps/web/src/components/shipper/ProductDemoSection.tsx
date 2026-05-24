import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';
import { InlineVideo } from '@/components/home/InlineVideo';
import { BRAND } from '@/lib/brand';
import { HERO_POSTER } from '@/lib/media';
import { PRODUCT_DEMO } from '@/lib/home-content';
import { SectionShell } from '@/components/shipper/SectionShell';

export function ProductDemoSection() {
  return (
    <SectionShell
      id="demo"
      eyebrow={PRODUCT_DEMO.eyebrow}
      title={PRODUCT_DEMO.title}
      titleAccent={PRODUCT_DEMO.titleAccent}
      subtitle={PRODUCT_DEMO.subtitle}
      variant="dark"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="glass-card overflow-hidden rounded-2xl border border-white/[0.08] p-2">
            <InlineVideo
              src={BRAND.inlineVideos.performance}
              poster={HERO_POSTER}
              caption="Funil em operação · preview"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ol className="space-y-4">
            {PRODUCT_DEMO.steps.map((step, i) => (
              <li
                key={step}
                className="flex gap-4 border border-white/[0.06] bg-white/[0.03] p-4 transition-colors hover:border-[#0057FF]/25"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#0057FF]/15 text-[11px] font-bold text-[#0057FF]">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-white/55">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/templates"
              className="btn-glow inline-flex h-12 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.26em] text-white"
            >
              Ver amostras ao vivo
            </Link>
            <Link
              to="/diagnostico"
              className="btn-ghost inline-flex h-12 items-center justify-center px-8 text-[11px] font-bold uppercase tracking-[0.26em] text-white/75"
            >
              Agendar diagnóstico
            </Link>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
