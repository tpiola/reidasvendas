import { motion } from 'framer-motion';

interface DataPanelProps {
  items: { label: string; value: string; percent: number }[];
  title?: string;
}

export function DataPanel({ items, title }: DataPanelProps) {
  return (
    <div className="glass-premium rounded-2xl p-6 sm:p-8">
      {title && (
        <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#D6A84F] mb-5">
          {title}
        </h3>
      )}
      <div className="space-y-4">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-[#A1A1AA]">{item.label}</span>
              <span className="text-xs font-bold text-[#F2D38A]">{item.value}</span>
            </div>
            <div className="data-bar">
              <motion.div
                className="data-bar-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${item.percent}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
