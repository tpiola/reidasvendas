"use client";

import { PRICING, whatsappUrl } from "@/lib/constants";
import { CTAButton } from "@/components/ui/CTAButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Pricing() {
  return <section id="precos" className="bg-[#12100c] px-6 py-20 md:px-12 md:py-28 xl:px-20 xl:py-[120px]"><div className="mx-auto max-w-[1280px]"><ScrollReveal><SectionHeading overline="Investimento" title="ESCOLHA O NÍVEL DE EXECUÇÃO." subtitle="Sem fidelidade. O pagamento acontece na entrega e cada plano deixa claro o que está incluído."/></ScrollReveal><div className="grid items-stretch gap-6 lg:grid-cols-3">{PRICING.map((plan, index) => <ScrollReveal key={plan.id} delay={index * .08} className="h-full"><GlassCard variant={plan.featured ? "live" : "flat"} className={`flex h-full flex-col p-7 md:p-8 ${plan.featured ? "border-[#d4a853]/35 shadow-[0_0_60px_rgba(212,168,83,.08)]" : ""}`}><p className="font-mono text-xs uppercase tracking-[.15em] text-[#d4a853]">{plan.name}</p><div className="mt-5 font-display text-5xl text-[#f5f0e8]">{plan.price}</div><ul className="my-8 flex-1 space-y-4">{plan.features.map((feature) => <li key={feature} className="flex gap-3 text-sm leading-6 text-[#a89f8f]"><span className="text-[#d4a853]" aria-hidden="true">✓</span>{feature}</li>)}</ul><CTAButton href={whatsappUrl(plan.message)} dataCta={`whatsapp-precos-${plan.id}`} section={`precos-${plan.id}`} className="w-full">{plan.id === "completo" ? "Quero o Completo" : "Começar Agora"}</CTAButton></GlassCard></ScrollReveal>)}</div><div className="mt-9 space-y-2 text-center"><p className="font-semibold text-[#d4a853]">Você paga na entrega. Se a entrega completa não acontecer hoje, você não paga.</p><p className="text-sm text-[#a89f8f]">Manutenção opcional: R$ 97/mês. Sem fidelidade.</p></div></div></section>;
}
