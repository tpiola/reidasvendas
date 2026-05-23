import { Reveal } from '@/components/Reveal';
import { CASE_PLACEHOLDERS } from '@/lib/home-content';

type CasePlaceholderGridProps = {
  items: typeof CASE_PLACEHOLDERS;
};

export function CasePlaceholderGrid({ items }: CasePlaceholderGridProps) {
  return (
    <section className="section-white py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#0A0A0B]/30">Prova social</span>
          <h2 className="mt-4 text-heading font-semibold text-[#0A0A0B]">
            Cases autorizados
            <span className="text-gradient-gold"> em construção.</span>
          </h2>
          <p className="mt-4 text-sm text-[#0A0A0B]/45 leading-relaxed">
            Estrutura pronta para publicação com consentimento do cliente: problema real, intervenção, resultado e
            prazo — sem inventar números.
          </p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.07}>
              <article className="pillar-card h-full border border-black/[0.06] bg-[#FAFAFA] p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#0057FF]/60">{c.segment}</p>
                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0A0A0B]/35">Problema real</dt>
                    <dd className="mt-1 text-[#0A0A0B]/55 italic">{c.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0A0A0B]/35">
                      Intervenção tecnológica
                    </dt>
                    <dd className="mt-1 text-[#0A0A0B]/55 italic">{c.intervention}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0A0A0B]/35">
                      Mudança observada
                    </dt>
                    <dd className="mt-1 text-[#0A0A0B]/55 italic">{c.outcome}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0A0A0B]/35">
                      Tempo de implementação
                    </dt>
                    <dd className="mt-1 text-[#0A0A0B]/55 italic">{c.timeline}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
