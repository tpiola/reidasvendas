import type { HTMLAttributes, ReactNode } from "react";

/** Props para superfícies de vidro controladas pelo orçamento de paint. */
export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "live" | "flat";
}

export function GlassCard({ children, variant = "flat", className = "", ...props }: GlassCardProps) {
  const effect = variant === "live" ? "backdrop-blur-xl [-webkit-backdrop-filter:blur(20px)]" : "";
  return <div className={`rounded-2xl border border-white/8 bg-white/[.04] shadow-[inset_0_1px_0_rgba(255,255,255,.04),0_8px_32px_rgba(0,0,0,.4)] transition-[border-color,box-shadow] duration-300 hover:border-[#d4a853]/20 hover:shadow-[inset_0_1px_0_rgba(255,255,255,.04),0_8px_32px_rgba(0,0,0,.4),0_0_40px_rgba(212,168,83,.05)] ${effect} ${className}`} {...props}>{children}</div>;
}
