import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';
import { CTA } from '@/lib/cta-copy';

export function HomePlanosCtaBand() {
  return (
    <Reveal className="border-y border-[color:var(--border-subtle)] py-14 md:py-16">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/80">Investimento claro</p>
        <h2 className="mt-4 text-heading font-semibold text-[color:var(--page-fg)]">
          Planos que escalam
          <span className="text-gradient-accent"> com o seu negócio</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-[color:var(--text-muted)]">
          Sem fidelidade forçada. Cada plano com página própria, entregáveis e orçamento em 24h.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/planos"
            className="btn-glow inline-flex h-14 items-center justify-center px-12 text-[11px] font-bold uppercase tracking-[0.28em] text-white"
          >
            {CTA.planos}
          </Link>
          <Link
            to="/diagnostico"
            className="btn-ghost inline-flex h-14 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.24em]"
          >
            {CTA.orcamento}
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
