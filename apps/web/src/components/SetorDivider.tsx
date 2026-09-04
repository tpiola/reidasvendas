import { useEffect, useRef } from 'react';

type SetorDividerProps = {
  video: string;
  poster: string;
  kicker: string;
  title: string;
  description: string;
  align?: 'left' | 'right';
};

/**
 * Faixa de transição entre blocos: cena cinematográfica de empresa local em
 * movimento (Ken Burns). Toca em desktop E mobile — autoplay silencioso com
 * IntersectionObserver (só inicia quando visível, pausa ao sair da tela) e
 * preload adiado para não gastar dados de quem não rola até lá.
 */
export function SetorDivider({ video, poster, kicker, title, description, align = 'left' }: SetorDividerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          video.preload = 'auto';
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`rdv-setor-divider is-${align}`}
      aria-label={kicker}
    >
      <div className="rdv-setor-divider__media" aria-hidden="true">
        <video
          ref={videoRef}
          src={video}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          tabIndex={-1}
        />
        <span className="rdv-setor-divider__shade" />
      </div>
      <div className="rdv-setor-divider__content">
        <p className="rdv-kicker">{kicker}</p>
        <h2>{title}</h2>
        <p className="rdv-setor-divider__desc">{description}</p>
      </div>
    </section>
  );
}
