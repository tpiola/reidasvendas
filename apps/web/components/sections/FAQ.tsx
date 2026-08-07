"use client";

import { FAQ_ITEMS } from "@/lib/constants";
import { Accordion } from "@/components/ui/Accordion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function FAQ() {
  return <section id="faq" className="bg-[#12100c] px-6 py-20 md:px-12 md:py-28 xl:px-20 xl:py-[120px]"><div className="mx-auto max-w-[1000px]"><ScrollReveal><SectionHeading overline="FAQ" title="PERGUNTAS ANTES DE COMEÇAR." subtitle="Escopo, acesso, pagamento e entrega explicados sem jargão."/></ScrollReveal><Accordion items={FAQ_ITEMS}/></div></section>;
}
