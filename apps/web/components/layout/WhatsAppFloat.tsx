"use client";

import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/constants";
import { track } from "@/lib/utils";

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false); const [sticky, setSticky] = useState(false);
  useEffect(() => { const update = () => { setVisible(window.scrollY > 300); setSticky(window.scrollY > 600); }; window.addEventListener("scroll", update, { passive: true }); update(); return () => window.removeEventListener("scroll", update); }, []);
  if (!visible) return null;
  return <a href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" data-cta="whatsapp-flutuante" onClick={() => track("CTA WhatsApp", { section: "flutuante" })} className={`whatsapp-pulse fixed right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,.3)] transition-transform hover:scale-110 ${sticky ? "bottom-[calc(72px+16px+env(safe-area-inset-bottom))] md:bottom-6" : "bottom-6"}`}><svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden="true"><path d="M12 2a9.7 9.7 0 0 0-8.3 14.7L2.4 22l5.4-1.4A9.8 9.8 0 1 0 12 2Zm0 17.8c-1.4 0-2.8-.4-4-1.1l-.3-.2-3.2.8.9-3.1-.2-.3A7.8 7.8 0 1 1 12 19.8Zm4.3-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-1.4-.7-2.4-1.4-3.3-3-.2-.3.2-.3.7-1 .1-.2.1-.4 0-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.4-.6 1.6-1.1.2-.6.2-1 .2-1.1-.1-.2-.2-.2-.5-.3Z"/></svg></a>;
}
