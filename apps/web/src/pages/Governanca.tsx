import { useEffect } from 'react';
import { applySeo } from '@/lib/seo';
import { Reveal } from '@/components/Reveal';

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
    <main className="bg-background min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <h1 className="font-serif text-5xl font-medium tracking-tight text-white md:text-7xl">
            <span className="text-gradient-titanium">Governança Corporativa</span>
          </h1>
        </Reveal>
        
        <Reveal delay={0.1}>
          <p className="mt-8 text-lg leading-relaxed text-white/60 md:text-xl max-w-3xl mx-auto">
            Teoria de Ponta. Execução de Trincheira. Transparência total, rigor de campo e escala humana.
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
            <source src="https://cdn.coverr.co/videos/coverr-a-man-working-in-a-coffee-shop-5254/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10">
            <p className="font-serif text-2xl text-white">Rigor de Campo. O que vai para o ar, funciona.</p>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
