import { useId, useState } from 'react';
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
        <h2 id={`${baseId}-heading`} className="text-center text-heading font-semibold text-[color:var(--page-fg)]">
          Perguntas frequentes
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-sm text-[color:var(--text-muted)]">
          Prazo, dados, escopo — sem letra miúda escondida.
        </p>

        <div className="mt-14 divide-y divide-[color:var(--border-subtle)] border border-[color:var(--border-subtle)]">
          {items.map((item, index) => {
            const isOpen = openId === item.id;
            const num = String(index + 1).padStart(2, '0');
            const panelId = `${baseId}-panel-${item.id}`;
            const triggerId = `${baseId}-trigger-${item.id}`;

            return (
              <article
                key={item.id}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className="bg-[color:var(--surface)]"
              >
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[color:var(--header-hover)]"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <h3
                    itemProp="name"
                    className="flex items-start gap-4 pr-4 text-sm font-semibold text-[color:var(--page-fg)] md:text-base"
                  >
                    <span className="shrink-0 text-[10px] font-bold tracking-[0.2em] text-[#0057FF]/70" aria-hidden>
                      {num}.
                    </span>
                    <span>{item.question}</span>
                  </h3>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center border border-[color:var(--border-subtle)] text-lg leading-none text-[color:var(--text-muted)]"
                    aria-hidden
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className="faq-panel-grid"
                  data-open={isOpen ? 'true' : 'false'}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div>
                    <p itemProp="text" className="px-6 pb-6 text-sm leading-relaxed text-[color:var(--text-muted)]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
