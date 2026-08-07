"use client";

import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/constants";
import { CTAButton } from "@/components/ui/CTAButton";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const update = () => setVisible(window.scrollY > 600); window.addEventListener("scroll", update, { passive: true }); update(); return () => window.removeEventListener("scroll", update); }, []);
  if (!visible) return null;
  return <div className="fixed inset-x-0 bottom-0 z-45 flex h-[calc(72px+env(safe-area-inset-bottom))] items-center justify-between border-t border-white/8 bg-[#0a0a0a]/85 px-5 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"><span className="text-sm font-semibold text-[#f5f0e8]">Pronto hoje</span><CTAButton href={whatsappUrl()} dataCta="whatsapp-sticky" section="sticky-mobile" variant="whatsapp" className="min-h-11 px-4 py-2">Falar no WhatsApp</CTAButton></div>;
}
