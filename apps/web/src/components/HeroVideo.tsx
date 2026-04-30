import { useState } from 'react';

type HeroVideoProps = {
  className?: string;
  poster: string;
  src?: string; // mantido para retrocompatibilidade — não usado internamente
};

const VIDEOS = [
  'https://cdn.coverr.co/videos/coverr-working-at-night-5178/1080p.mp4',
  'https://cdn.coverr.co/videos/coverr-a-man-working-in-a-coffee-shop-5254/1080p.mp4',
  'https://cdn.coverr.co/videos/coverr-business-meeting-5221/1080p.mp4',
];

// Read media query synchronously via lazy initializer — avoids useEffect re-render
function getReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function HeroVideo({ className, poster }: HeroVideoProps) {
  // Lazy initializer: reads once on mount, no useEffect needed
  const [reduceMotion] = useState(getReducedMotion);
  const [videoError, setVideoError] = useState(false);

  const showVideo = !reduceMotion && !videoError;

  return (
    <div className={className ?? 'absolute inset-0'} aria-hidden="true">
      {/* Poster fallback — eager loaded for LCP */}
      <img
        src={poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      {/* 4K Videos — CSS Crossfade (Zero JS loops) */}
      {showVideo &&
        VIDEOS.map((src, i) => (
          <video
            key={src}
            className={`absolute inset-0 h-full w-full object-cover grayscale opacity-0 video-layer-${i}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={i === 0 ? poster : undefined}
            onError={() => setVideoError(true)}
            onStalled={() => setVideoError(true)}
          >
            <source src={src} type="video/mp4" />
          </video>
        ))}

      {/* Layer 1: True Black base veil */}
      <div className="absolute inset-0 bg-[#030303]/60" />

      {/* Layer 2: Cinematic gradient — hero text legibility */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Layer 3: Electric Blue radial — subtle centered glow for new layout */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,112,243,0.15)_0%,transparent_60%)]" />
    </div>
  );
}
