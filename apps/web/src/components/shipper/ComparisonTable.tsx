import { Reveal } from '@/components/Reveal';
import { COMPARISON_ROWS, COMPARISON_SECTION } from '@/lib/home-content';

export function ComparisonTable() {
  return (
    <div>
      <Reveal className="mb-10 max-w-2xl">
        <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/25">
          {COMPARISON_SECTION.eyebrow}
        </span>
        <h2 className="mt-4 text-heading font-semibold text-white">
          {COMPARISON_SECTION.title}
          <span className="text-gradient-gold"> {COMPARISON_SECTION.titleAccent}</span>
        </h2>
      </Reveal>

      <div className="hidden overflow-hidden rounded-2xl border border-white/[0.08] md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.03]">
              <th className="px-6 py-4 font-semibold text-white/50" scope="col">
                Critério
              </th>
              <th className="px-6 py-4 font-semibold text-white/40" scope="col">
                Agência comum / DIY
              </th>
              <th className="px-6 py-4 font-semibold text-[#C9A84C]" scope="col">
                Rei das Vendas
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.label} className="border-b border-white/[0.04] last:border-0">
                <th className="px-6 py-4 font-medium text-white/70" scope="row">
                  {row.label}
                </th>
                <td className="px-6 py-4 text-white/40">{row.generic}</td>
                <td className="px-6 py-4 text-white/75">{row.rdv}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 md:hidden">
        {COMPARISON_ROWS.map((row, i) => (
          <Reveal key={row.label} delay={i * 0.05}>
            <article className="card-dark p-5">
              <h3 className="text-sm font-bold text-white">{row.label}</h3>
              <p className="mt-3 text-xs text-white/40">
                <span className="font-semibold uppercase tracking-wider text-white/30">Comum: </span>
                {row.generic}
              </p>
              <p className="mt-2 text-xs text-white/60">
                <span className="font-semibold uppercase tracking-wider text-[#C9A84C]/70">RDV: </span>
                {row.rdv}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
