import { BRAND } from '@/lib/brand';

export function HeroVisual() {
  return (
    <div className="relative mx-auto flex h-[380px] w-full max-w-md items-center justify-center sm:h-[440px] lg:h-[520px]">
      {/* Órbita decorativa */}
      <div className="rdv-orbit-ring h-[280px] w-[280px] sm:h-[340px] sm:w-[340px]" aria-hidden="true" />
      <div
        className="absolute h-[180px] w-[180px] rounded-full bg-[rgba(214,168,79,0.10)] blur-[80px] sm:h-[220px] sm:w-[220px]"
        aria-hidden="true"
      />

      {/* Símbolo central */}
      <div className="animate-float-slow relative z-10">
        <img
          src="/logo-mark.svg"
          alt="Símbolo Rei das Vendas"
          width={220}
          height={220}
          decoding="async"
          className="h-[180px] w-[180px] object-contain drop-shadow-[0_12px_40px_rgba(214,168,79,0.25)] sm:h-[220px] sm:w-[220px]"
        />
      </div>

      {/* Card: satisfação */}
      <div className="rdv-float-card glass-premium absolute left-0 top-6 z-20 rounded-2xl px-4 py-3 sm:left-2 sm:top-10">
        <p className="num-gold font-serif text-2xl font-bold leading-none sm:text-3xl">{BRAND.stats.satisfaction}</p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A1A1AA]">satisfação</p>
      </div>

      {/* Card: projetos */}
      <div className="rdv-float-card rdv-float-card--slow glass-premium absolute right-0 top-10 z-20 rounded-2xl px-4 py-3 sm:right-2">
        <p className="num-gold font-serif text-2xl font-bold leading-none sm:text-3xl">{BRAND.stats.projects}</p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A1A1AA]">projetos</p>
      </div>

      {/* Card: credencial */}
      <div className="rdv-float-card glass-premium absolute bottom-4 left-6 z-20 flex items-center gap-3 rounded-2xl px-4 py-3 sm:bottom-10 sm:left-8">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(214,168,79,0.3)] bg-[rgba(214,168,79,0.08)] text-[10px] font-bold text-[#D6A84F]">
          CRF
        </span>
        <div>
          <p className="text-xs font-semibold text-white">{BRAND.founder.crf}</p>
          <p className="text-[10px] text-[#A1A1AA]">responsabilidade técnica</p>
        </div>
      </div>
    </div>
  );
}
