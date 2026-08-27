import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Briefcase, Layout, Search, Smile, MessageCircle, ClipboardCheck } from 'lucide-react';
import { Reveal, staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { motion } from 'framer-motion';
import { PremiumButton } from '@/components/PremiumButton';
import { BRAND } from '@/lib/brand';

const sugestoes = [
  { icon: Home, label: 'Home', path: '/', desc: 'Voltar ao início' },
  { icon: ClipboardCheck, label: 'Diagnóstico gratuito', path: '/diagnostico', desc: 'Analise sua presença digital' },
  { icon: Briefcase, label: 'Soluções', path: '/solucoes', desc: 'Conheça nossas soluções' },
  { icon: Layout, label: 'Portfólio', path: '/portfolio', desc: 'Veja nossos projetos' },
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(166,111,24,0.06)_0%,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
        <Reveal>
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="text-8xl font-serif font-bold text-gradient-gold">4</span>
            <span className="relative flex h-20 w-20 items-center justify-center">
              <span className="absolute inset-0 animate-pulse rounded-full border border-[rgba(166,111,24,0.3)]" />
              <Smile className="h-10 w-10 text-gold" />
            </span>
            <span className="text-8xl font-serif font-bold text-gradient-gold">4</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="font-serif text-2xl font-bold text-text-primary sm:text-3xl">
            Esta página não está disponível. Mas podemos resolver seu problema digital <span className="text-gradient-gold">agora</span>.
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-3 max-w-md text-sm text-text-secondary">
            Use os atalhos abaixo ou fale com um especialista. Se chegou aqui procurando por presença digital, o diagnóstico gratuito é o melhor caminho.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-8 flex max-w-sm items-center gap-3 rounded-xl border border-[rgba(166,111,24,0.1)] bg-surface/60 px-5 py-3 backdrop-blur-sm">
            <Search className="h-4 w-4 shrink-0 text-text-muted" />
            <p className="text-xs text-text-muted">
              <strong className="text-text-primary">Dica:</strong> Use o menu de navegação acima para encontrar o que procura.
            </p>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 grid gap-3 sm:grid-cols-2"
        >
          {sugestoes.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.path} variants={staggerItem}>
                <Link
                  to={s.path}
                  className="glass-card group flex items-center gap-4 rounded-xl p-4 transition-all hover:border-[rgba(166,111,24,0.3)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(166,111,24,0.08)] text-gold transition-all group-hover:bg-[rgba(166,111,24,0.15)]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-text-primary">{s.label}</p>
                    <p className="text-[10px] text-text-muted">{s.desc}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <PremiumButton href="/">
              <ArrowLeft className="h-4 w-4" />
              Voltar para Home
            </PremiumButton>
            <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
              <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
