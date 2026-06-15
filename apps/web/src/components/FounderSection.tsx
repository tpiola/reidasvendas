import { Reveal } from '@/hooks/useAnimation';
import { BRAND } from '@/lib/brand';

export function FounderSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#030303]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[20%] top-[20%] h-[300px] w-[300px] rounded-full bg-[rgba(214,168,79,0.05)] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="founder-glow glass-premium rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-5">
              {/* Photo / Emblem side */}
              <div className="relative flex items-center justify-center bg-gradient-to-b from-[rgba(214,168,79,0.08)] to-transparent p-8 md:col-span-2">
                <div className="text-center">
                  {/* Crown emblem */}
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[rgba(214,168,79,0.3)] bg-[rgba(214,168,79,0.06)]">
                    <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                      <defs>
                        <linearGradient id="founder-gold" x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#F2D38A"/>
                          <stop offset="45%" stopColor="#D6A84F"/>
                          <stop offset="100%" stopColor="#B88932"/>
                        </linearGradient>
                      </defs>
                      <g transform="translate(4, 5) scale(0.375)">
                        <path d="M32 6 L38 22 L52 18 L44 34 L56 40 L32 36 L8 40 L20 34 L12 18 L26 22 Z" stroke="url(#founder-gold)" strokeWidth="1.35" fill="none"/>
                        <path d="M32 6 L26 22 L20 34 M32 6 L38 22 L44 34 M26 22 L38 22 M20 34 L44 34" stroke="url(#founder-gold)" strokeWidth="0.9" strokeOpacity="0.65" fill="none"/>
                        <path d="M14 44 H50" stroke="url(#founder-gold)" strokeWidth="1.2" strokeLinecap="round"/>
                      </g>
                    </svg>
                  </div>
                  <p className="font-serif text-sm text-[#A1A1AA] italic">Fundador</p>
                </div>
              </div>

              {/* Content side */}
              <div className="p-8 md:col-span-3 md:p-10">
                <Reveal>
                  <span className="section-label">Founder</span>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="font-serif mt-4 text-2xl font-bold text-white sm:text-3xl">
                    {BRAND.founder.name}
                  </h2>
                </Reveal>
                <Reveal delay={0.15}>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#D6A84F]">
                    {BRAND.founder.title} • {BRAND.founder.crf}
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA]">
                    {BRAND.founder.bio}
                  </p>
                </Reveal>
                <Reveal delay={0.25}>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={BRAND.founder.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.22)] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D6A84F] transition-all hover:bg-[rgba(214,168,79,0.08)] hover:shadow-[0_0_20px_rgba(214,168,79,0.1)]"
                    >
                      thiagopiola.com.br
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
