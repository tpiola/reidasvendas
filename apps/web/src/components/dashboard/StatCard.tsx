import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  subtitle?: string;
  icon?: React.ReactNode;
  delay?: number;
}

export function StatCard({ title, value, change, positive = true, subtitle, icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl border border-[rgba(214,168,79,0.12)] bg-[rgba(255,255,255,0.02)] p-5 backdrop-blur-sm transition-all hover:border-[rgba(214,168,79,0.25)] hover:bg-[rgba(255,255,255,0.03)]"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#71717A]">{title}</p>
          <p className="mt-1.5 font-serif text-2xl font-bold text-white">{value}</p>
        </div>
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(214,168,79,0.08)] text-[#D6A84F]">
            {icon}
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center gap-2">
        {change && (
          <span className={`text-xs font-semibold ${positive ? 'text-[#34D399]' : 'text-[#F87171]'}`}>
            {positive ? '↑' : '↓'} {change}
          </span>
        )}
        {subtitle && <span className="text-[10px] text-[#71717A]">{subtitle}</span>}
      </div>
    </motion.div>
  );
}
