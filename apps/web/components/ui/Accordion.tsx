"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { track } from "@/lib/utils";

/** Props para acordeão de FAQ acessível. */
export interface AccordionProps { items: readonly (readonly [string, string])[]; }

export function Accordion({ items }: AccordionProps) {
  const [open, setOpen] = useState(0);
  return <div className="border-t border-white/8">{items.map(([question, answer], index) => {
    const active = open === index;
    const panelId = `faq-panel-${index}`;
    return <div key={question} className="border-b border-white/8"><button type="button" aria-expanded={active} aria-controls={panelId} className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-base font-medium text-[#f5f0e8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a853] md:text-lg" onClick={() => { setOpen(active ? -1 : index); if (!active) track("FAQ Open", { question }); }}><span>{question}</span><span aria-hidden="true" className={`text-2xl font-light text-[#d4a853] transition-transform duration-300 ${active ? "rotate-45" : ""}`}>+</span></button><AnimatePresence initial={false}>{active && <motion.div id={panelId} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} className="overflow-hidden"><p className="max-w-3xl pb-6 pr-10 text-sm leading-7 text-[#a89f8f] md:text-base">{answer}</p></motion.div>}</AnimatePresence></div>;
  })}</div>;
}
