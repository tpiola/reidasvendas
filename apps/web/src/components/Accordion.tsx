import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
  variant?: 'default' | 'bordered' | 'glass';
}

export function Accordion({
  items,
  className = '',
  allowMultiple = false,
  variant = 'default',
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : allowMultiple
          ? [...prev, id]
          : [id]
    );
  };

  const containerClass = cn(
    variant === 'bordered' && 'divide-y divide-[rgba(255,255,255,0.06)]',
    variant === 'glass' && 'space-y-3',
    className
  );

  return (
    <div className={containerClass}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={cn(
              'overflow-hidden transition-all duration-300',
              variant === 'glass' &&
                'rounded-2xl border border-[rgba(214,168,79,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-sm',
              variant === 'default' && 'border-b border-[rgba(255,255,255,0.06)] last:border-b-0',
              isOpen &&
                variant === 'glass' &&
                'border-[rgba(214,168,79,0.2)] bg-[rgba(214,168,79,0.03)]'
            )}
          >
            <button
              onClick={() => toggle(item.id)}
              className={cn(
                'flex w-full items-center justify-between gap-3 px-0 py-4 text-left transition-all duration-300',
                variant === 'glass' && 'px-5',
                variant === 'default' && 'px-1'
              )}
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  'text-base font-semibold transition-colors duration-300',
                  isOpen ? 'text-[#D6A84F]' : 'text-white'
                )}
              >
                {item.title}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors',
                  isOpen
                    ? 'text-[#D6A84F]'
                    : 'text-[#A1A1AA]'
                )}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.2 },
                  }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      'pb-5 text-sm leading-relaxed text-[#A1A1AA]',
                      variant === 'glass' ? 'px-5' : 'px-1'
                    )}
                  >
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
