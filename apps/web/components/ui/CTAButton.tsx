"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track } from "@/lib/utils";

/** Props do CTA rastreável usado no funil. */
export interface CTAButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "whatsapp";
  dataCta: string;
  section: string;
}

export function CTAButton({ children, variant = "primary", dataCta, section, className = "", onClick, ...props }: CTAButtonProps) {
  const styles = variant === "primary"
    ? "bg-[#d4a853] text-[#0a0a0a] hover:bg-[#e0b65f]"
    : variant === "whatsapp"
      ? "bg-[#25D366] text-[#07150c] hover:bg-[#35e477]"
      : "border border-white/12 bg-white/[.03] text-[#f5f0e8] hover:border-[#d4a853]/30";
  return <a data-cta={dataCta} onClick={(event) => { track(dataCta.startsWith("email") ? "CTA Email" : "CTA WhatsApp", { section }); onClick?.(event); }} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a853] ${styles} ${className}`} {...props}>{children}</a>;
}
