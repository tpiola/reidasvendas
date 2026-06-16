import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Briefcase, Layout, Mail, Search, Smile } from 'lucide-react';
import { Reveal, staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { motion } from 'framer-motion';
import { GoldParticles } from '@/components/GoldParticles';
import { PremiumButton } from '@/components/PremiumButton';

const sugestoes = [
  { icon: Home, label: 'Home', path: '/', desc: 'Voltar ao início' },
  { icon: Briefcase, label: 'Serviços', path: '/servicos', desc: 'Conheça nossas soluções' },
  { icon: Layout, label: 'Portfólio', path: '/portfolio', desc: 'Veja nossos projetos' },
  { icon: Mail, label: 'Contato', path: '/contato', desc: 'Fale conosco' },
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      <GoldParticles count={20} />
      <div className="absolute inset-0 bg-[#030303]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(214,168,79,0.06)_0%,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
        <Reveal>
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="text-8xl font-serif font-bold text-gradient-gold">4</span>
            <span className="relative flex h-20 w-20 items-center justify-center">
              <span className="absolute inset-0 animate-pulse rounded-full border border-[rgba(214,168,79,0.3)]" />
              <Smile className="h-10 w-10 text-[#D6A84F]" />
            </span>
            <span className="text-8xl font-serif font-bold text-gradient-gold">4</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="font-serif text-2xl font-bold text-white sm:text-3xl">
            Erro 404: Esta página não existe <span className="text-gradient-gold">(ainda)</span>
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-3 max-w-md text-sm text-[#A1A1AA]">
            Parece que você encontrou um link quebrado ou digitou um endereço errado. 
            Enquanto isso, que tal explorar o que já temos de incrível?
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-8 flex max-w-sm items-center gap-3 rounded-xl border border-[rgba(214,168,79,0.1)] bg-[rgba(3,3,3,0.5)] px-5 py-3 backdrop-blur-sm">
            <Search className="h-4 w-4 shrink-0 text-[#71717A]" />
            <p className="text-xs text-[#71717A]">
              <strong className="text-white">Dica:</strong> Use o menu de navegação acima para encontrar o que procura.
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
                  className="glass-card group flex items-center gap-4 rounded-xl p-4 transition-all hover:border-[rgba(214,168,79,0.3)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(214,168,79,0.08)] text-[#D6A84F] transition-all group-hover:bg-[rgba(214,168,79,0.15)]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">{s.label}</p>
                    <p className="text-[10px] text-[#71717A]">{s.desc}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <Reveal delay={0.3}>
          <div className="mt-10">
            <PremiumButton href="/">
              <ArrowLeft className="h-4 w-4" />
              Voltar para Home
            </PremiumButton>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
