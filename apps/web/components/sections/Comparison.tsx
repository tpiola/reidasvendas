"use client";

import { motion } from "framer-motion";
import { whatsappUrl } from "@/lib/constants";
import { CTAButton } from "@/components/ui/CTAButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const traditional = ["R$ 8.000–15.000", "4 a 8 semanas", "Revisões normalmente limitadas", "Vídeo, site e anúncios cotados separadamente", "Múltiplas etapas de atendimento"];
const rei = ["R$ 697–2.997", "MESMO DIA", "Revisões conforme o plano", "Vídeo + site + criativos + Google", "Atendimento direto e concentrado"];

export default function Comparison() {
  return <section className="bg-[#12100c] px-6 py-20 md:px-12 md:py-28 xl:px-20 xl:py-[120px]"><div className="mx-auto max-w-[1280px]"><SectionHeading overline="Comparação de modelo" title="POR QUE PAGAR MAIS POR MAIS TEMPO?"/><div className="grid gap-6 md:grid-cols-2"><motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .2 }}><GlassCard className="h-full p-8 opacity-70"><p className="font-mono text-xs uppercase tracking-[.15em] text-[#7d7770]">Agência tradicional</p><ul className="mt-7 space-y-5">{traditional.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-[#a89f8f]"><span aria-hidden="true">—</span>{item}</li>)}</ul></GlassCard></motion.div><motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .2 }}><GlassCard className="h-full border-[#d4a853]/30 p-8 shadow-[0_0_60px_rgba(212,168,83,.06)]"><p className="font-mono text-xs uppercase tracking-[.15em] text-[#d4a853]">Rei das Vendas</p><ul className="mt-7 space-y-5">{rei.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-[#f5f0e8]"><span className="text-[#d4a853]" aria-hidden="true">✓</span>{item}</li>)}</ul></GlassCard></motion.div></div><div className="mt-9"><CTAButton href={whatsappUrl()} dataCta="whatsapp-comparacao" section="comparacao">Comparar minha operação</CTAButton></div></div></section>;
}
