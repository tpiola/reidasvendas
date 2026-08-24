import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BillingToggleProps {
  monthly: boolean;
  onChange: (monthly: boolean) => void;
  monthlyLabel?: string;
  yearlyLabel?: string;
  discountLabel?: string;
  className?: string;
}

export function BillingToggle({
  monthly,
  onChange,
  monthlyLabel = 'Mensal',
  yearlyLabel = 'Anual',
  discountLabel = 'Economize 20%',
  className = '',
}: BillingToggleProps) {
  return (
    <div className={cn('flex items-center justify-center gap-4', className)}>
      <span
        className={cn(
          'text-sm font-medium transition-colors duration-300',
          monthly ? 'text-text-primary' : 'text-text-secondary'
        )}
      >
        {monthlyLabel}
      </span>

      <button
        onClick={() => onChange(!monthly)}
        className="relative h-7 w-14 rounded-full bg-[rgba(28,25,20,0.08)] transition-colors hover:bg-[rgba(28,25,20,0.12)]"
        role="switch"
        aria-checked={!monthly}
        aria-label="Alternar entre faturamento mensal e anual"
      >
        <motion.span
          layout
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          className={cn(
            'absolute left-0.5 top-0.5 h-6 w-6 rounded-full',
            monthly
              ? 'bg-gold'
              : 'bg-gradient-to-r from-gold to-gold-light'
          )}
        />
      </button>

      <div className="flex items-center gap-2">
        <span
          className={cn(
            'text-sm font-medium transition-colors duration-300',
            !monthly ? 'text-text-primary' : 'text-text-secondary'
          )}
        >
          {yearlyLabel}
        </span>
        {discountLabel && !monthly && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-full bg-[rgba(166,111,24,0.12)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold"
          >
            {discountLabel}
          </motion.span>
        )}
      </div>
    </div>
  );
}
