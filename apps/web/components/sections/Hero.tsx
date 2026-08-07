"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BRAND, whatsappUrl } from "@/lib/constants";
import { clipReveal, staggerContainer } from "@/lib/animations";
import { CTAButton } from "@/components/ui/CTAButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

const deliverables = [["01", "Filme"], ["02", "Website"], ["03", "Publicidade"], ["04", "Google"]] as const;

export function Hero() {
  const reduced = useReducedMotion();
  return <section id="inicio" className="relative flex min-h-[100svh] items-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,168,83,.08)_0%,transparent_60%)] px-6 pb-16 pt-28 md:px-12 md:pb-24 md:pt-32 xl:px-20"><div className="light-ray left-[8%] top-[6%]" aria-hidden="true"/><div className="relative z-10 mx-auto w-full max-w-[1280px]"><div className="max-w-4xl"><p className="mb-6 font-mono text-xs font-semibold uppercase tracking-[.15em] text-[#d4a853]">{BRAND.overline}</p><motion.h1 variants={staggerContainer} initial={reduced ? "visible" : "hidden"} animate="visible" className="font-display text-[clamp(2.5rem,7vw,5.6rem)] font-semibold leading-[.95] tracking-[-.03em] text-[#f5f0e8]">{["SEU NEGÓCIO", "DEVERIA SER", "INESQUECÍVEL."].map((line) => <span className="block overflow-hidden pb-1" key={line}><motion.span variants={clipReveal} className={`block ${line === "INESQUECÍVEL." ? "text-[#d4a853]" : ""}`}>{line}</motion.span></span>)}</motion.h1><p className="mt-7 max-w-[560px] text-base leading-7 text-[#a89f8f] md:text-lg">Criamos vídeo cinematográfico, site premium, anúncios profissionais e otimizamos seu Perfil no Google. Comece de manhã, receba à noite.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><MagneticButton><CTAButton href={whatsappUrl()} target="_blank" rel="noreferrer" dataCta="whatsapp-hero" section="hero" className="w-full px-8 py-4 sm:w-auto">Transformar Meu Negócio <span aria-hidden="true">↗</span></CTAButton></MagneticButton><a href="#portfolio" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/12 bg-white/[.03] px-7 py-3 text-sm font-semibold text-[#f5f0e8] transition-colors hover:border-[#d4a853]/30">Ver o Trabalho</a></div><p className="mt-5 text-xs text-[#7d7770]">Agendamos 3 briefings por dia.</p></div><GlassCard className="mt-14 grid gap-px overflow-hidden rounded-3xl p-2 sm:grid-cols-2 lg:grid-cols-4">{deliverables.map(([number, label]) => <div className="flex min-h-24 items-center gap-4 rounded-2xl px-5 py-4" key={number}><span className="font-mono text-xs text-[#d4a853]">{number}</span><span className="font-display text-xl text-[#f5f0e8]">{label}</span></div>)}</GlassCard><a href="#problema" aria-label="Rolar para a próxima seção" className="mx-auto mt-8 grid h-11 w-11 place-items-center text-[#7d7770] motion-safe:animate-bounce">↓</a></div></section>;
}
