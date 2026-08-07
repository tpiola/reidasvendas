"use client";

import { PROCESS } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Process() {
  return <section id="processo" className="px-6 py-20 md:px-12 md:py-28 xl:px-20 xl:py-[120px]"><div className="mx-auto max-w-[1280px]"><ScrollReveal><SectionHeading overline="Processo" title="DA MANHÃ À NOITE. PRONTO." subtitle="Um fluxo concentrado substitui semanas de idas e voltas. Os horários abaixo mostram a sequência operacional típica."/></ScrollReveal><div className="relative grid gap-0 md:grid-cols-5"><div className="absolute left-[10%] right-[10%] top-[21px] hidden h-px bg-gradient-to-r from-transparent via-[#d4a853]/60 to-transparent md:block" aria-hidden="true"/>{PROCESS.map(([time, title, description], index) => <ScrollReveal key={time} delay={index * .08} className="relative border-l border-[#d4a853]/30 pb-9 pl-7 last:pb-0 md:border-l-0 md:pb-0 md:pl-0 md:pr-6"><span className="absolute -left-[5px] top-4 h-2.5 w-2.5 rounded-full border border-[#d4a853] bg-[#0a0a0a] md:left-0 md:top-[17px]"/><div className="font-mono text-sm font-semibold text-[#d4a853] md:pt-14">{time}</div><h3 className="mt-3 font-display text-2xl text-[#f5f0e8]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#a89f8f]">{description}</p></ScrollReveal>)}</div><p className="mt-10 text-xs leading-5 text-[#7d7770]">Horários ilustrativos: a sequência começa pela manhã e termina à noite.</p></div></section>;
}
