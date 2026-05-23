import { useRef } from 'react';
import { Reveal } from '@/components/Reveal';
import { BRAND } from '@/lib/brand';
import { HERO_POSTER, PEXELS } from '@/lib/media';
import { VIDEO_SHOWCASE } from '@/lib/home-content';

type VideoItem = (typeof VIDEO_SHOWCASE)[number];

const SRC_MAP = {
  manifesto: BRAND.inlineVideos.manifesto,
  performance: BRAND.inlineVideos.performance,
  heroBusiness: PEXELS.heroBusiness,
} as const;

function ShowcaseVideo({ src, caption }: { src: string; caption: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <div className="video-section-wrapper aspect-video shadow-xl shadow-black/60">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        poster={HERO_POSTER}
        crossOrigin="anonymous"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="video-overlay-gradient" />
      <p className="absolute bottom-4 left-5 right-5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
        {caption}
      </p>
    </div>
  );
}

type VideoShowcaseGridProps = {
  items: readonly VideoItem[];
};

export function VideoShowcaseGrid({ items }: VideoShowcaseGridProps) {
  return (
    <section id="tecnologia" className="bg-[#030305] py-28 md:py-40 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center mb-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/22">Esteira audiovisual</span>
          <h2 className="mt-4 text-heading font-semibold text-white">
            Tecnologia em ação,
            <span className="text-gradient-titanium"> não em slide.</span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-sm text-white/40 leading-relaxed">
            VSLs curtas de engenharia reversa: telas reais, fluxos de automação e métricas de performance — o que
            entregamos, não o que prometemos.
          </p>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <ShowcaseVideo src={SRC_MAP[item.srcKey]} caption={item.caption} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
