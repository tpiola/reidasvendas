/** Props de cabeçalho editorial de seção. */
export interface SectionHeadingProps { overline: string; title: string; subtitle?: string; align?: "left" | "center"; }

export function SectionHeading({ overline, title, subtitle, align = "left" }: SectionHeadingProps) {
  return <header className={`mb-12 md:mb-16 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}><p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[.15em] text-[#d4a853]">{overline}</p><h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.15] tracking-[-.01em] text-[#f5f0e8]">{title}</h2>{subtitle && <p className="mt-5 max-w-2xl text-base leading-7 text-[#a89f8f] md:text-lg">{subtitle}</p>}</header>;
}
