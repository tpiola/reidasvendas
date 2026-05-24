import { useEffect } from 'react';
import { applySeo } from '@/lib/seo';
import { Reveal } from '@/components/Reveal';
import { InlineVideo } from '@/components/home/InlineVideo';
import { HERO_POSTER, PEXELS } from '@/lib/media';

export default function Governanca() {
  useEffect(() => {
    applySeo({
      title: 'Governança — Rei das Vendas',
      description: 'Transparência, LGPD e governança de dados. Em atualização — consulte a Política de Privacidade.',
      canonicalPath: '/governanca',
      robots: 'noindex, follow',
    });
  }, []);

  return (
    <main className="page-surface min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <h1 className="font-serif text-5xl font-medium tracking-tight text-surface md:text-7xl">
            <span className="text-gradient-accent">Governança Corporativa</span>
          </h1>
        </Reveal>
        
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl mx-auto text-lg leading-relaxed text-surface-muted md:text-xl">
            Teoria de Ponta. Execução de Trincheira. Transparência total, rigor de campo e escala humana.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="mt-24 mx-auto max-w-6xl px-6">
        <div className="media-band glass-card overflow-hidden rounded-2xl p-2">
          <InlineVideo
            src={PEXELS.profCharts}
            poster={HERO_POSTER}
            caption="Operação · rigor de campo"
            className="grayscale-[0.35]"
          />
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center font-serif text-2xl text-surface md:text-3xl">
          Rigor de Campo. O que vai para o ar, funciona.
        </p>
      </Reveal>
    </main>
  );
}
