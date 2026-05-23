import { Reveal } from '@/components/Reveal';
import { LazyVideo } from '@/components/home/LazyVideo';
import { BRAND } from '@/lib/brand';
import { VIDEO_SHOWCASE } from '@/lib/home-content';

type VideoItem = (typeof VIDEO_SHOWCASE)[number];

const SRC_MAP = {
  manifesto: BRAND.inlineVideos.manifesto,
  performance: BRAND.inlineVideos.performance,
  salesFunnel: BRAND.inlineVideos.salesFunnel,
  salesTeam: BRAND.inlineVideos.salesTeam,
} as const;

type VideoShowcaseGridProps = {
  items: readonly VideoItem[];
};

export function VideoShowcaseGrid({ items }: VideoShowcaseGridProps) {
  return (
    <section id="tecnologia" className="relative overflow-hidden bg-[#030305] py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 text-center">
          <h2 className="text-heading font-semibold text-white">
            Bastidores
            <span className="text-gradient-titanium"> do que entregamos.</span>
          </h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <LazyVideo src={SRC_MAP[item.srcKey]} caption={item.caption} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
