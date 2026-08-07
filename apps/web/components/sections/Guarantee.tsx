"use client";

import { whatsappUrl } from "@/lib/constants";
import { CTAButton } from "@/components/ui/CTAButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Guarantee() {
  return <section className="px-6 py-20 md:px-12 md:py-28 xl:px-20 xl:py-[120px]"><ScrollReveal className="mx-auto max-w-[640px]"><GlassCard className="p-8 text-center md:p-12"><div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-[#d4a853]/25 bg-[#d4a853]/5 text-3xl text-[#d4a853] shadow-[0_0_40px_rgba(212,168,83,.08)]" aria-hidden="true">◇</div><p className="font-mono text-xs uppercase tracking-[.15em] text-[#d4a853]">Garantia operacional</p><h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] text-[#f5f0e8]">RISCO CONTROLADO.</h2><p className="mt-5 text-sm leading-7 text-[#a89f8f] md:text-base">O pagamento acontece quando você recebe. Se o projeto completo não for entregue no mesmo dia, não há cobrança. O escopo aprovado no briefing define a entrega.</p><CTAButton href={whatsappUrl()} dataCta="whatsapp-garantia" section="garantia" className="mt-8">Começar sem risco</CTAButton></GlassCard></ScrollReveal></section>;
}
