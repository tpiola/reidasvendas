"use client";

import { whatsappUrl } from "@/lib/constants";
import { CTAButton } from "@/components/ui/CTAButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const problems = [
  ["Site desatualizado", "A primeira impressão digital pode contradizer a qualidade real da operação."],
  ["Fotos sem direção", "Imagem inconsistente dificulta perceber ambiente, padrão e diferenciais antes da visita."],
  ["Sem vídeo", "O cliente perde a chance de conhecer atmosfera, espaço e experiência antes de decidir."],
] as const;

export default function Problem() {
  return <section id="problema" className="px-6 py-20 md:px-12 md:py-28 xl:px-20 xl:py-[120px]"><div className="mx-auto max-w-[1280px]"><ScrollReveal><SectionHeading overline="O problema" title="O CLIENTE VÊ ANTES DE ENTRAR." subtitle="Antes de visitar, o cliente compara presença, clareza, reputação e facilidade de contato. Quando o digital não representa a operação real, a decisão começa em desvantagem."/></ScrollReveal><div className="grid gap-5 md:grid-cols-12">{problems.map(([title, text], index) => <ScrollReveal key={title} className={`${index === 0 ? "md:col-span-5" : index === 1 ? "md:col-span-4 md:translate-y-8" : "md:col-span-3 md:translate-y-16"}`} delay={index * .08}><GlassCard className="h-full min-h-52 p-6"><span className="mb-8 block font-mono text-xs text-[#d4a853]">0{index + 1}</span><h3 className="font-display text-2xl text-[#f5f0e8]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#a89f8f]">{text}</p></GlassCard></ScrollReveal>)}</div><ScrollReveal className="mt-24 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between"><p className="text-lg font-semibold text-[#d4a853]">A boa notícia? Isso se resolve no mesmo dia.</p><CTAButton href={whatsappUrl()} dataCta="whatsapp-problema" section="problema">Resolver isso hoje</CTAButton></ScrollReveal></div></section>;
}
