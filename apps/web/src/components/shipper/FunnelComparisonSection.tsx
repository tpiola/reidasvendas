import { FunnelMockPanel } from '@/components/shipper/FunnelMockPanel';
import { ComparisonTable } from '@/components/shipper/ComparisonTable';

export function FunnelComparisonSection() {
  return (
    <section className="bg-[#030305] py-24 md:py-32" aria-label="Produto e comparativo">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2 lg:items-start">
        <FunnelMockPanel />
        <ComparisonTable />
      </div>
    </section>
  );
}
