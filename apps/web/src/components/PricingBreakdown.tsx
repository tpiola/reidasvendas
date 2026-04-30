import { formatBRL } from '@/utils/money';
import type { PriceQuote } from '@/utils/pricing';

export function PricingBreakdown({ quote }: { quote: PriceQuote }) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5 md:p-8">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
          Proposta e valores
        </p>
        <h2 className="text-2xl font-semibold tracking-tight">Estimativa do hub</h2>
        <p className="mt-1 text-sm leading-relaxed text-black/65">
          Valores moduláveis: conforme você adiciona módulos, o total aumenta e a entrega fica mais completa.
        </p>
      </div>

      <div className="mt-6 divide-y divide-black/10 rounded-2xl border border-black/10">
        {quote.lines.map((line) => (
          <div key={line.label} className="flex items-center justify-between gap-6 px-5 py-4">
            <span className="text-sm text-black/75">{line.label}</span>
            <span className="text-sm font-semibold tabular-nums text-black">
              {line.priceCents === 0 ? '—' : formatBRL(line.priceCents)}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between gap-6 bg-black/3 px-5 py-4">
          <span className="text-sm font-semibold text-black">Total</span>
          <span className="text-lg font-semibold tabular-nums text-black">
            {formatBRL(quote.totalCents)}
          </span>
        </div>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-black/55">
        O total é uma referência para escopo. Pagamentos, automações e integrações podem variar conforme o nicho e o volume.
      </p>
    </section>
  );
}

