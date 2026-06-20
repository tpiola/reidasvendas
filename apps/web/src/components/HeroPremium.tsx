import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Monitor, Sparkles, Shield, Check } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { BRAND } from '@/lib/brand';
import { GoldParticles } from '@/components/GoldParticles';
import { PremiumButton } from '@/components/PremiumButton';
import { springGentle } from '@/hooks/useAnimation';

/* ─── Animated gradient background CSS keyframes ─── */
const gradientKeyframes = `
@keyframes heroGradient {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes floatMockup {
  0%, 100% { transform: translateY(0px) rotateX(3deg); }
  50%      { transform: translateY(-18px) rotateX(3deg); }
}
@keyframes glowPulse {
  0%, 100% { opacity: 0.4; }
  50%      { opacity: 0.8; }
}
@keyframes scrollIndicator {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50%      { transform: translateY(8px); opacity: 0.3; }
}
`;

/* ─── Tiny grid pattern SVG data URI ─── */
const gridPattern = `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.03'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;

export function HeroPremium() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.1]);

  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{gradientKeyframes}</style>
      <section
        ref={sectionRef}
        className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[#030303]"
      >
        {/* CSS Animated Gradient Background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #030303 0%, #0A1628 25%, #030303 50%, #0A1628 75%, #030303 100%)',
            backgroundSize: '400% 400%',
            animation: 'heroGradient 15s ease infinite',
          }}
        />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-60"
          style={{ backgroundImage: `url("${gridPattern}")` }}
        />

        {/* Gold glow accents */}
        <div className="absolute inset-0">
          <div
            className="absolute left-[10%] top-[15%] h-[300px] w-[300px] rounded-full blur-[180px]"
            style={{ background: 'rgba(212, 175, 55, 0.05)', animation: 'glowPulse 4s ease-in-out infinite' }}
          />
          <div
            className="absolute bottom-[20%] right-[10%] h-[250px] w-[250px] rounded-full blur-[150px]"
            style={{ background: 'rgba(212, 175, 55, 0.03)', animation: 'glowPulse 6s ease-in-out infinite', animationDelay: '2s' }}
          />
          <div
            className="absolute left-[40%] top-[60%] h-[200px] w-[200px] rounded-full blur-[120px]"
            style={{ background: 'rgba(10, 22, 40, 0.4)' }}
          />
        </div>

        {/* Gold Particles */}
        <GoldParticles count={60} />

        {/* Content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6"
        >
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: Text Content */}
            <div className="max-w-2xl">
              {/* Premium badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springGentle }}
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.06)] px-4 py-1.5 backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                    AI Site Builder Original
                  </span>
                  <span className="ml-1 rounded-full bg-[rgba(212,175,55,0.15)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#D4AF37]">
                    Enterprise
                  </span>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springGentle, delay: 0.15 }}
                className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
              >
                O{' '}
                <span className="text-gradient-gold">AI Site Builder Original</span>
                <br />
                <span className="text-white">para Visionários e Impérios</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springGentle, delay: 0.25 }}
                className="mt-5 max-w-lg text-base leading-relaxed text-[#A1A1AA] sm:text-lg"
              >
                100% custom. Ultra-realista. Seguro enterprise.
              </motion.p>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springGentle, delay: 0.3 }}
                className="mt-4 flex flex-wrap gap-4"
              >
                {[
                  { icon: Shield, text: 'Privacidade LGPD' },
                  { icon: Check, text: '100% Custom' },
                  { icon: Monitor, text: 'Design Ultra-Realista' },
                ].map((item) => (
                  <span
                    key={item.text}
                    className="inline-flex items-center gap-1.5 text-xs text-[#71717A]"
                  >
                    <item.icon className="h-3 w-3 text-[#D4AF37]" />
                    {item.text}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springGentle, delay: 0.35 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(212,175,55,0.2)',
                      '0 0 40px rgba(212,175,55,0.4)',
                      '0 0 20px rgba(212,175,55,0.2)',
                    ],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="rounded-full"
                >
                  <PremiumButton
                    href="/contato"
                    size="lg"
                  >
                    <Sparkles className="h-4 w-4" />
                    Iniciar Projeto Enterprise Privado
                  </PremiumButton>
                </motion.div>
                <button
                  onClick={scrollToPortfolio}
                  className="btn-outline-gold group text-sm sm:text-base"
                >
                  Ver casos de sucesso
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>

            {/* Right: Floating Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: -5 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ ...springGentle, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <div
                className="relative mx-auto aspect-[4/3] w-full max-w-lg perspective-[1000px]"
                style={{ animation: 'floatMockup 6s ease-in-out infinite' }}
              >
                {/* Dashboard Mockup Card */}
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.15)] bg-gradient-to-br from-[#0A1628] to-[#030303] shadow-[0_0_60px_rgba(212,175,55,0.08),0_0_120px_rgba(10,22,40,0.3)]">
                  {/* Mockup header */}
                  <div className="flex items-center gap-2 border-b border-[rgba(212,175,55,0.08)] px-5 py-3">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <div className="ml-3 flex-1 rounded-md bg-[rgba(212,175,55,0.06)] px-3 py-1">
                      <span className="text-[10px] text-[rgba(212,175,55,0.4)]">
                        reidasvendas.com — AI Builder
                      </span>
                    </div>
                  </div>

                  {/* Mockup body - Dashboard preview */}
                  <div className="p-5">
                    {/* Top bar */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-[rgba(212,175,55,0.15)]" />
                        <div>
                          <div className="h-2.5 w-24 rounded-full bg-[rgba(255,255,255,0.06)]" />
                          <div className="mt-1 h-2 w-16 rounded-full bg-[rgba(255,255,255,0.03)]" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-6 w-6 rounded-full bg-[rgba(212,175,55,0.1)]" />
                        <div className="h-6 w-6 rounded-full bg-[rgba(212,175,55,0.1)]" />
                      </div>
                    </div>

                    {/* Main content grid */}
                    <div className="grid grid-cols-3 gap-2">
                      {[70, 45, 85].map((h, i) => (
                        <div key={i} className="rounded-lg bg-[rgba(212,175,55,0.04)] p-2.5">
                          <div className="h-2 w-12 rounded-full bg-[rgba(255,255,255,0.04)]" />
                          <div
                            className="mt-2 rounded bg-[rgba(212,175,55,0.08)]"
                            style={{ height: `${h}%`, minHeight: '24px' }}
                          />
                          <div className="mt-1 h-2 w-8 rounded-full bg-[rgba(255,255,255,0.03)]" />
                        </div>
                      ))}
                    </div>

                    {/* Bottom section */}
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-[rgba(212,175,55,0.04)] p-3">
                        <div className="h-2 w-16 rounded-full bg-[rgba(255,255,255,0.04)]" />
                        <div className="mt-2 flex gap-1">
                          {[40, 60, 30, 50, 70].map((h, i) => (
                            <div
                              key={i}
                              className="w-2 rounded-t-sm bg-[rgba(212,175,55,0.12)]"
                              style={{ height: `${h}%`, minHeight: '8px' }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="rounded-lg bg-[rgba(212,175,55,0.04)] p-3">
                        <div className="h-2 w-16 rounded-full bg-[rgba(255,255,255,0.04)]" />
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-[rgba(212,175,55,0.1)]" />
                          <div className="flex-1">
                            <div className="h-2 w-full rounded-full bg-[rgba(255,255,255,0.04)]" />
                            <div className="mt-1 h-2 w-3/4 rounded-full bg-[rgba(212,175,55,0.06)]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Gold accent line */}
                    <div className="mx-auto mt-4 h-px w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                    <div className="mx-auto mt-1 flex items-center justify-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                      <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[rgba(212,175,55,0.4)]">
                        AI-Powered Enterprise
                      </span>
                      <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span
              className="text-[9px] font-bold uppercase tracking-[0.25em] text-[rgba(212,175,55,0.4)]"
            >
              Scroll
            </span>
            <ChevronDown
              className="h-4 w-4 text-[#D4AF37]"
              style={{ animation: 'scrollIndicator 2s ease-in-out infinite' }}
            />
          </div>
        </motion.div>

        {/* Extra bottom gradient fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030303] to-transparent" />
      </section>
    </>
  );
}
