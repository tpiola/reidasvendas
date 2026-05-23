import { useEffect, useRef, useState } from 'react';
import { HERO_POSTER } from '@/lib/media';

type LazyVideoProps = {
  src: string;
  poster?: string;
  caption?: string;
  className?: string;
  aspectClass?: string;
};

/** Vídeo só carrega quando entra na viewport — melhora LCP */
export function LazyVideo({
  src,
  poster = HERO_POSTER,
  caption,
  className = '',
  aspectClass = 'aspect-video',
}: LazyVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: '120px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={`video-section-wrapper shadow-2xl shadow-black/80 ${aspectClass} ${className}`}>
      {active ? (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          crossOrigin="anonymous"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <img src={poster} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
      )}
      <div className="video-overlay-gradient" />
      {caption ? (
        <p className="absolute bottom-4 left-6 right-6 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
