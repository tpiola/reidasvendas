import { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FaqItem } from '@/lib/seo-schema';

type FaqAccordionProps = {
  items: readonly FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section
      id="faq"
      className="section-white py-28 md:py-36"
      aria-labelledby={`${baseId}-heading`}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2 id={`${baseId}-heading`} className="text-heading font-semibold text-[#0A0A0B] text-center">
          Perguntas frequentes
        </h2>
        <p className="mt-4 text-center text-sm text-[#0A0A0B]/45 max-w-lg mx-auto">
          Respostas objetivas para decisores — indexadas para busca e motores generativos (GEO).
        </p>

        <div className="mt-14 divide-y divide-black/[0.08] border border-black/[0.06]">
          {items.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${baseId}-panel-${item.id}`;
            const triggerId = `${baseId}-trigger-${item.id}`;

            return (
              <article
                key={item.id}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className="bg-white"
              >
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#F8F9FC]"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <h3 itemProp="name" className="text-sm font-semibold text-[#0A0A0B] md:text-base pr-4">
                    {item.question}
                  </h3>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center border border-black/10 text-[#0A0A0B]/50 text-lg leading-none"
                    aria-hidden
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <p itemProp="text" className="px-6 pb-6 text-sm leading-relaxed text-[#0A0A0B]/55">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
