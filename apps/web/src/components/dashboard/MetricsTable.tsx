import { motion } from 'framer-motion';

interface MetricRow {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

interface MetricsTableProps {
  title: string;
  data: MetricRow[];
}

export function MetricsTable({ title, data }: MetricsTableProps) {
  return (
    <div className="rounded-xl border border-[rgba(214,168,79,0.12)] bg-[rgba(255,255,255,0.02)] p-5 backdrop-blur-sm">
      <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#D6A84F] mb-4">{title}</h3>
      <div className="space-y-1">
        {data.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-[rgba(255,255,255,0.03)]"
          >
            <span className="text-sm text-[#A1A1AA]">{row.label}</span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-white">{row.value}</span>
              <span className={`text-[10px] font-semibold ${row.positive ? 'text-[#34D399]' : 'text-[#F87171]'}`}>
                {row.positive ? '↑' : '↓'} {row.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
