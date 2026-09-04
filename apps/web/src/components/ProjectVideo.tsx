import { useEffect, useRef, useState } from 'react';

type ProjectVideoProps = {
  src: string;
  poster: string;
};

/**
 * Vídeo de demonstração dos cards de projeto: toca apenas no hover em telas
 * largas. No mobile fica a imagem estática (poster) — zero download de vídeo,
 * preservando PageSpeed. Respeita prefers-reduced-motion.
 */
export function ProjectVideo({ src, poster }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (min-width: 860px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    setCanPlay(mediaQuery.matches && !reduced.matches);

    const onHoverChange = () => {
      setCanPlay(mediaQuery.matches && !reduced.matches);
      if (!(mediaQuery.matches && !reduced.matches)) {
        videoRef.current?.pause();
      }
    };
    mediaQuery.addEventListener('change', onHoverChange);
    reduced.addEventListener('change', onHoverChange);
    return () => {
      mediaQuery.removeEventListener('change', onHoverChange);
      reduced.removeEventListener('change', onHoverChange);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="rdv-project-shot__video"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      aria-hidden="true"
      onMouseEnter={() => {
        if (!canPlay) return;
        const video = videoRef.current;
        if (video && video.readyState >= 2) {
          void video.play().catch(() => undefined);
        }
      }}
      onMouseLeave={() => {
        videoRef.current?.pause();
      }}
    />
  );
}
