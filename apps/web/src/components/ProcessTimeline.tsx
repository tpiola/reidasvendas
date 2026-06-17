import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ProcessTimelineProps {
  steps: TimelineStep[];
  className?: string;
  variant?: 'vertical' | 'horizontal';
}

export function ProcessTimeline({
  steps,
  className = '',
  variant = 'vertical',
}: ProcessTimelineProps) {
  if (variant === 'horizontal') {
    return (
      <div className={cn('relative', className)}>
        {/* Connector line */}
        <div className="absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-transparent via-[rgba(214,168,79,0.3)] to-transparent" />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Step number circle */}
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(214,168,79,0.2)] bg-[rgba(3,3,3,0.8)] backdrop-blur-sm">
                {step.icon ? (
                  <span className="text-[#D6A84F]">{step.icon}</span>
                ) : (
                  <span className="font-serif text-lg font-bold text-[#D6A84F]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                )}
              </div>
              <h4 className="mt-4 text-sm font-bold text-white">{step.title}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-[#A1A1AA]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Vertical timeline
  return (
    <div className={cn('relative', className)}>
      {/* Vertical line */}
      <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[rgba(214,168,79,0.3)] via-[rgba(214,168,79,0.15)] to-transparent" />

      <div className="space-y-10">
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex gap-6 pl-16"
          >
            {/* Dot */}
            <div className="absolute left-4 top-1 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, damping: 18, delay: i * 0.1 + 0.2 }}
                className="h-5 w-5 rounded-full border-2 border-[#D6A84F] bg-[#030303]"
              />
              <div className="absolute h-3 w-3 rounded-full bg-[#D6A84F] opacity-40 blur-sm" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-3">
                {step.icon && (
                  <span className="text-[#D6A84F]">{step.icon}</span>
                )}
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[rgba(214,168,79,0.5)]">
                  Passo {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">{step.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-[#A1A1AA]">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
