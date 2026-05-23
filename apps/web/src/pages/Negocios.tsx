import { useEffect } from 'react';
import { applySeo } from '@/lib/seo';
import { Reveal } from '@/components/Reveal';

export default function Negocios() {
  useEffect(() => {
    applySeo({
      title: 'Negócios & B2B — Rei das Vendas',
      description: 'Site e funil B2B. Lead qualificado e CRM integrado.',
      canonicalPath: '/negocios',
    });
  }, []);

  return (
    <main className="bg-background min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <h1 className="font-serif text-5xl font-medium tracking-tight text-white md:text-7xl">
            <span className="text-gradient-titanium">Negócios & B2B</span>
          </h1>
        </Reveal>
        
        <Reveal delay={0.1}>
          <p className="mt-8 text-lg leading-relaxed text-white/60 md:text-xl max-w-3xl mx-auto">
            Funil e automação para serviços e consultorias que vendem ticket médio alto.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="mt-24 mx-auto max-w-6xl px-6">
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
          <video
            className="absolute inset-0 h-full w-full object-cover grayscale opacity-60"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="https://cdn.coverr.co/videos/coverr-business-meeting-5221/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10">
            <p className="font-serif text-2xl text-white">Distância Estratégica. A tecnologia opera, você lidera.</p>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
