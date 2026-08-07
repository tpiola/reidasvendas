"use client";

import { BRAND, emailUrl, whatsappUrl } from "@/lib/constants";
import { CTAButton } from "@/components/ui/CTAButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ParticleField } from "@/components/ui/ParticleField";

export default function FinalCTA() {
  return <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_100%,rgba(193,122,46,.10)_0%,transparent_50%)] px-6 py-24 md:px-12 xl:px-20"><ParticleField/><div className="relative z-10 mx-auto w-full max-w-3xl text-center"><p className="font-mono text-xs font-semibold uppercase tracking-[.15em] text-[#d4a853]">Próxima decisão</p><h2 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05] tracking-[-.02em] text-[#f5f0e8]">SEU NEGÓCIO DEVERIA PARECER TÃO BOM QUANTO É.</h2><p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#a89f8f] md:text-lg">Organize sua presença digital para ser encontrado, compreendido e chamado. Comece de manhã, receba à noite.</p><GlassCard variant="live" className="mx-auto mt-10 max-w-xl p-7 md:p-10"><div className="font-display text-2xl text-[#f5f0e8]">{BRAND.name}</div><div className="mt-7 flex flex-col gap-3"><MagneticButton><CTAButton href={whatsappUrl()} dataCta="whatsapp-final" section="final" className="w-full px-10 py-5">Transformar Meu Negócio</CTAButton></MagneticButton><CTAButton href={emailUrl()} dataCta="email-final" section="final" variant="secondary" className="w-full">Enviar email</CTAButton></div><p className="mt-5 text-xs text-[#7d7770]">Resposta em até 2 horas. Sem compromisso.</p></GlassCard></div></section>;
}
