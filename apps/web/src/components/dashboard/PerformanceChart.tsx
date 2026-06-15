import { motion } from 'framer-motion';

interface ChartBar {
  label: string;
  value: number;
  color?: string;
}

interface PerformanceChartProps {
  title: string;
  data: ChartBar[];
  height?: number;
}

export function PerformanceChart({ title, data, height = 200 }: PerformanceChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="rounded-xl border border-[rgba(214,168,79,0.12)] bg-[rgba(255,255,255,0.02)] p-5 backdrop-blur-sm">
      <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#D6A84F] mb-4">{title}</h3>
      <div className="flex items-end gap-3" style={{ height }}>
        {data.map((bar, i) => {
          const pct = (bar.value / maxValue) * 100;
          return (
            <div key={bar.label} className="flex flex-1 flex-col items-center gap-1.5 h-full justify-end">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${pct}%` }}
                transition={{ delay: i * 0.08, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full rounded-t-sm transition-all duration-300 hover:opacity-80"
                style={{
                  background: bar.color || 'linear-gradient(180deg, #F2D38A, #D6A84F)',
                  boxShadow: '0 0 12px rgba(214,168,79,0.15)',
                }}
              />
              <span className="text-[9px] font-medium text-[#71717A] whitespace-nowrap">{bar.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
