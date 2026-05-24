import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';
import { InlineVideo } from '@/components/home/InlineVideo';
import { BRAND } from '@/lib/brand';
import { HERO_POSTER } from '@/lib/media';

type CinematicVideoBandProps = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  ctaLabel: string;
  ctaTo: string;
};

export function CinematicVideoBand({
  eyebrow,
  title,
  titleAccent,
  ctaLabel,
  ctaTo,
}: CinematicVideoBandProps) {
  return (
    <section className="relative overflow-hidden bg-[color:var(--page-bg)] py-20 md:py-32" aria-labelledby="cinematic-heading">
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center md:mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/70">{eyebrow}</span>
          <h2 id="cinematic-heading" className="mt-4 text-heading font-semibold text-[color:var(--page-fg)]">
            {title}
            <span className="text-gradient-titanium"> {titleAccent}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative">
            <div className="absolute -inset-8 rounded-3xl bg-[#0057FF]/4 blur-3xl" aria-hidden />
            <InlineVideo
              src={BRAND.inlineVideos.manifesto}
              poster={HERO_POSTER}
              caption="Presença digital · faturamento com ritmo"
            />
          </div>
        </Reveal>
        <Reveal delay={0.18} className="mt-12 flex justify-center">
          <Link
            to={ctaTo}
            className="btn-glow inline-flex h-14 items-center justify-center px-12 text-[11px] font-bold uppercase tracking-[0.28em] text-white"
          >
            {ctaLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
