import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { applySeo } from '@/lib/seo';
import { DEFAULT_OG_IMAGE } from '@/lib/seo-meta';
import { Reveal } from '@/components/Reveal';
import { PageHero } from '@/components/shipper/PageHero';
import { InlineVideo } from '@/components/home/InlineVideo';
import { HERO_POSTER } from '@/lib/media';

type NicheLandingPageProps = {
  seoTitle: string;
  seoDescription: string;
  canonicalPath: string;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  videoSrc: string;
  videoCaption: string;
  highlights: readonly string[];
};

export function NicheLandingPage({
  seoTitle,
  seoDescription,
  canonicalPath,
  eyebrow,
  title,
  titleAccent,
  subtitle,
  videoSrc,
  videoCaption,
  highlights,
}: NicheLandingPageProps) {
  useEffect(() => {
    applySeo({
      title: seoTitle,
      description: seoDescription,
      canonicalPath,
      ogImage: DEFAULT_OG_IMAGE,
    });
  }, [seoTitle, seoDescription, canonicalPath]);

  return (
    <main className="page-surface">
      <PageHero eyebrow={eyebrow} title={title} titleAccent={titleAccent} subtitle={subtitle} align="center" />

      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
        <Reveal>
          <div className="glass-card overflow-hidden rounded-2xl p-2">
            <InlineVideo src={videoSrc} poster={HERO_POSTER} caption={videoCaption} />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 grid gap-4 sm:grid-cols-3">
          {highlights.map((item) => (
            <div key={item} className="card-dark p-5 text-center">
              <p className="text-sm text-surface-muted">{item}</p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            to="/diagnostico"
            className="btn-glow inline-flex h-12 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.24em] text-white"
          >
            Agendar diagnóstico
          </Link>
          <Link
            to="/planos"
            className="btn-ghost inline-flex h-12 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.24em]"
          >
            Ver planos
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
