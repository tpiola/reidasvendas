import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CategoryTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface CategoryTabsProps {
  tabs: CategoryTab[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: 'underline' | 'pill';
}

export function CategoryTabs({
  tabs,
  active,
  onChange,
  className = '',
  variant = 'pill',
}: CategoryTabsProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap gap-2',
        variant === 'underline' ? 'border-b border-[rgba(255,255,255,0.06)]' : '',
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex items-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300',
              variant === 'pill'
                ? 'rounded-full px-5 py-2.5'
                : 'border-b-2 px-3 pb-3 pt-2',
              variant === 'pill' && isActive && 'text-[#030303]',
              variant === 'pill' && !isActive && 'text-[#A1A1AA] hover:text-white',
              variant === 'underline' && isActive && 'border-[#D6A84F] text-[#D6A84F]',
              variant === 'underline' && !isActive && 'border-transparent text-[#A1A1AA] hover:text-white'
            )}
          >
            {isActive && variant === 'pill' && (
              <motion.span
                layoutId="category-tab-bg"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D6A84F] to-[#F2D38A]"
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              />
            )}
            <span className={cn('relative z-10 flex items-center gap-2', isActive && variant === 'pill' && 'mix-blend-exclusion')}>
              {tab.icon && <span className="h-4 w-4">{tab.icon}</span>}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
