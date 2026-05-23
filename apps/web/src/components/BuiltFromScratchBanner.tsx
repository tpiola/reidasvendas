import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';

type BuiltFromScratchBannerProps = {
  variant?: 'dark' | 'light';
  className?: string;
};

/** Reforça que templates são amostras — cada entrega é projeto único */
export function BuiltFromScratchBanner({ variant = 'dark', className = '' }: BuiltFromScratchBannerProps) {
  const isDark = variant === 'dark';
  return (
    <Reveal className={className}>
      <aside
        className={
          isDark
            ? 'rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/[0.06] p-6 md:p-8'
            : 'rounded-2xl border border-[#0057FF]/15 bg-[#F0F4FF] p-6 md:p-8'
        }
        aria-label="Como trabalhamos"
      >
        <p
          className={
            isDark
              ? 'text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/80'
              : 'text-[10px] font-bold uppercase tracking-[0.28em] text-[#0057FF]/70'
          }
        >
          Projeto exclusivo por cliente
        </p>
        <p
          className={
            isDark
              ? 'mt-3 text-sm leading-relaxed text-white/55 md:text-base'
              : 'mt-3 text-sm leading-relaxed text-[#0A0A0B]/60 md:text-base'
          }
        >
          As imagens abaixo são <strong className={isDark ? 'text-white/80' : 'text-[#0A0A0B]'}>amostras</strong> do
          que podemos construir — cada site, app ou funil é feito{' '}
          <strong className={isDark ? 'text-white/80' : 'text-[#0A0A0B]'}>do zero</strong>, com copy, oferta e jornada
          pensadas para o que o <em>seu</em> cliente final realmente quer, para maximizar conversão.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/contato"
            className={
              isDark
                ? 'btn-glow inline-flex h-11 items-center justify-center px-8 text-[10px] font-bold uppercase tracking-[0.24em] text-white'
                : 'inline-flex h-11 items-center justify-center bg-[#0A0A0B] px-8 text-[10px] font-bold uppercase tracking-[0.24em] text-white'
            }
          >
            Agendar diagnóstico
          </Link>
          <Link
            to="/planos"
            className={
              isDark
                ? 'btn-ghost inline-flex h-11 items-center justify-center px-8 text-[10px] font-bold uppercase tracking-[0.24em] text-white/70'
                : 'inline-flex h-11 items-center justify-center border border-black/15 px-8 text-[10px] font-bold uppercase tracking-[0.24em] text-[#0A0A0B]/75 hover:bg-black/5'
            }
          >
            Ver planos
          </Link>
        </div>
      </aside>
    </Reveal>
  );
}
