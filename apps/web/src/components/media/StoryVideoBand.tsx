import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { InlineVideo } from "@/components/home/InlineVideo";
import { SECTION_POSTERS } from "@/lib/media";

type StoryVideoBandProps = {
  id?: string;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  videoSrc: string;
  videoCaption: string;
  ctaLabel: string;
  ctaTo: string;
  compact?: boolean;
};

/** Faixa de vídeo curta — lazy, sem peso no scroll */
export function StoryVideoBand({
  id,
  eyebrow,
  title,
  titleAccent,
  subtitle,
  videoSrc,
  videoCaption,
  ctaLabel,
  ctaTo,
  compact = false,
}: StoryVideoBandProps) {
  return (
    <section
      id={id}
      className={`border-y border-[color:var(--border-subtle)] bg-[color:var(--surface)] ${compact ? "py-16 md:py-20" : "py-20 md:py-28"}`}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/80">
            {eyebrow}
          </span>
          <h2
            id={id ? `${id}-heading` : undefined}
            className="mt-3 text-heading font-semibold text-[color:var(--page-fg)]"
          >
            {title}
            {titleAccent ? (
              <span className="text-gradient-accent"> {titleAccent}</span>
            ) : null}
          </h2>
          {subtitle ? (
            <p className="mx-auto mt-4 max-w-lg text-sm text-[color:var(--text-muted)]">
              {subtitle}
            </p>
          ) : null}
        </Reveal>
        <Reveal delay={0.08} className="mt-10">
          <div className="glass-card mx-auto max-w-4xl overflow-hidden rounded-2xl p-2">
            <InlineVideo
              src={videoSrc}
              poster={SECTION_POSTERS.funnel}
              caption={videoCaption}
            />
          </div>
        </Reveal>
        <Reveal delay={0.12} className="mt-8 flex justify-center">
          <Link
            to={ctaTo}
            className="btn-glow inline-flex h-12 items-center justify-center px-10 text-[10px] font-bold uppercase tracking-[0.26em] text-white"
          >
            {ctaLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
