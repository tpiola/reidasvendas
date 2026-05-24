import { useEffect, useRef, useState } from 'react';
import { HERO_POSTER } from '@/lib/media';

type LazyVideoProps = {
  src: string;
  poster?: string;
  caption?: string;
  className?: string;
  aspectClass?: string;
};

/** Vídeo lazy na viewport — não compete com LCP do hero */
export function LazyVideo({
  src,
  poster = HERO_POSTER,
  caption,
  className = '',
  aspectClass = 'aspect-video',
}: LazyVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduceMotion) {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  return (
    <div
      ref={wrapRef}
      className={`video-section-wrapper shadow-2xl shadow-black/40 ${aspectClass} ${className}`}
    >
      {active && !reduceMotion ? (
        <video
          className="h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          crossOrigin={src.startsWith('http') ? 'anonymous' : undefined}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <img
          src={poster}
          alt=""
          className="h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
        />
      )}
      <div className="video-overlay-gradient" />
      {caption ? (
        <p className="absolute bottom-3 left-4 right-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/55 sm:bottom-4 sm:left-6">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
