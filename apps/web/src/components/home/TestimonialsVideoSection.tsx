import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { LazyVideo } from '@/components/home/LazyVideo';
import { VIDEO_TESTIMONIALS, TESTIMONIALS_SECTION } from '@/lib/home-content';
import { PEXELS } from '@/lib/media';

function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="video-section-wrapper aspect-video w-full overflow-hidden rounded-xl">
      <iframe
        className="h-full w-full border-0"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

export function TestimonialsVideoSection() {
  const [openTranscript, setOpenTranscript] = useState<string | null>(null);

  return (
    <section className="border-y border-[color:var(--border-subtle)] bg-[color:var(--page-bg)] py-16 md:py-24" aria-label="Depoimentos em vídeo">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/80">
            Prova social
          </span>
          <h2 className="mt-4 text-heading font-semibold text-[color:var(--page-fg)]">
            {TESTIMONIALS_SECTION.title}
            <span className="text-gradient-titanium"> em vídeo</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[color:var(--text-muted)]">
            {TESTIMONIALS_SECTION.disclaimer} Transcrição disponível para leitores de tela e buscadores.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {VIDEO_TESTIMONIALS.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08} emphasis>
              <article className="glass-card overflow-hidden rounded-2xl p-4 md:p-5">
                {item.youtubeId ? (
                  <YouTubeEmbed videoId={item.youtubeId} title={`Depoimento — ${item.title}`} />
                ) : (
                  <LazyVideo
                    src={PEXELS.profDoctor}
                    caption={item.title}
                    aspectClass="aspect-video"
                  />
                )}
                <div className="mt-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A84C]/85">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[color:var(--page-fg)]">{item.author}</p>
                    </div>
                    <p className="text-sm text-[#C9A84C]" aria-label={`Nota ${item.rating} de 5`}>
                      {'★'.repeat(item.rating)}
                      <span className="sr-only">{item.rating} estrelas</span>
                    </p>
                  </div>
                  <blockquote className="mt-3 text-sm leading-relaxed text-[color:var(--text-muted)]">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <button
                    type="button"
                    className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0057FF] hover:underline"
                    aria-expanded={openTranscript === item.id}
                    onClick={() => setOpenTranscript((id) => (id === item.id ? null : item.id))}
                  >
                    {openTranscript === item.id ? 'Ocultar transcrição' : 'Ver transcrição'}
                  </button>
                  {openTranscript === item.id ? (
                    <p className="mt-2 text-xs leading-relaxed text-[color:var(--text-muted)]">{item.transcript}</p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
