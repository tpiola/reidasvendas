"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BRAND, NAV_ITEMS, whatsappUrl } from "@/lib/constants";
import { CTAButton } from "@/components/ui/CTAButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => { const update = () => setScrolled(window.scrollY > 100); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  useEffect(() => {
    const main = document.querySelector("main");
    if (main instanceof HTMLElement) main.inert = open;
    if (!open) return () => { if (main instanceof HTMLElement) main.inert = false; };
    const menu = menuRef.current;
    const focusable = menu?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])');
    focusable?.[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab" && focusable?.length) { const first = focusable[0]; const last = focusable[focusable.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); if (main instanceof HTMLElement) main.inert = false; };
  }, [open]);
  return <header className={`fixed inset-x-0 top-0 z-50 h-16 transition-all duration-300 md:h-[72px] ${scrolled ? "border-b border-white/8 bg-[#0a0a0a]/80 backdrop-blur-xl [-webkit-backdrop-filter:blur(20px)]" : "bg-transparent"}`}><div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6 md:px-12 xl:px-20"><a href="#inicio" className="flex min-h-11 items-center gap-3 font-display text-xl text-[#f5f0e8]" aria-label={`${BRAND.name} — início`}><span className="grid h-9 w-9 place-items-center border border-[#d4a853]/40 text-xs font-semibold text-[#d4a853]">RV</span><span>{BRAND.name}</span></a><nav aria-label="Navegação principal" className="hidden items-center gap-7 md:flex">{NAV_ITEMS.map((item) => <a key={item.href} className="min-h-11 py-3 text-sm text-[#a89f8f] transition-colors hover:text-[#f5f0e8]" href={item.href}>{item.label}</a>)}</nav><div className="hidden md:block"><CTAButton href={whatsappUrl()} target="_blank" rel="noreferrer" dataCta="whatsapp-navbar" section="navbar" variant="secondary" className="min-h-11 px-4 py-2">Falar no WhatsApp</CTAButton></div><button type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} className="relative grid h-11 w-11 place-items-center md:hidden" onClick={() => setOpen((value) => !value)}><span className={`absolute h-px w-6 bg-[#f5f0e8] transition-transform ${open ? "rotate-45" : "-translate-y-2"}`}/><span className={`absolute h-px w-6 bg-[#f5f0e8] transition-opacity ${open ? "opacity-0" : "opacity-100"}`}/><span className={`absolute h-px w-6 bg-[#f5f0e8] transition-transform ${open ? "-rotate-45" : "translate-y-2"}`}/></button></div><AnimatePresence>{open && <motion.div ref={menuRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }} className="fixed inset-0 top-16 z-50 flex flex-col items-center justify-center gap-8 bg-[#0a0a0a]/95 backdrop-blur-xl md:hidden">{NAV_ITEMS.map((item) => <a key={item.href} onClick={() => setOpen(false)} className="font-display text-4xl text-[#f5f0e8]" href={item.href}>{item.label}</a>)}<CTAButton href={whatsappUrl()} dataCta="whatsapp-menu" section="menu" variant="whatsapp">Falar no WhatsApp</CTAButton></motion.div>}</AnimatePresence></header>;
}
