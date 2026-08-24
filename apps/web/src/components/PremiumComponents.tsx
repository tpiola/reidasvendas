export function LuxuryDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`luxury-divider my-14 ${className}`} aria-hidden="true" />
  );
}

export function GoldBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="gold-badge">
      {children}
    </span>
  );
}

export function SectionHeading({
  label, title, highlight, description,
}: {
  label?: string; title: string; highlight?: string; description?: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      {label && <span className="section-label mb-4 inline-block">{label}</span>}
      <h2 className="font-serif mt-4 text-3xl font-bold leading-tight text-text-primary sm:text-4xl md:text-5xl">
        {title}{highlight && <span className="text-gradient-gold"> {highlight}</span>}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}

export function FeatureCard({
  icon, title, description, className = '',
}: {
  icon: React.ReactNode; title: string; description: string; className?: string;
}) {
  return (
    <div className={`glass-card group rounded-2xl p-6 sm:p-7 shine-effect hover:border-[rgba(166,111,24,0.3)] transition-all ${className}`}>
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(166,111,24,0.1)] text-gold transition-all duration-300 group-hover:bg-[rgba(166,111,24,0.18)] group-hover:scale-110">
        {icon}
      </div>
      <h3 className="font-serif text-base font-semibold text-text-primary">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{description}</p>
    </div>
  );
}

export function ProcessStep({
  number, title, description, isLast = false,
}: {
  number: string; title: string; description: string; isLast?: boolean;
}) {
  return (
    <div className="relative flex gap-5">
      {/* Number circle with connector */}
      <div className="flex flex-col items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(166,111,24,0.3)] bg-[rgba(166,111,24,0.08)] text-sm font-bold text-gold backdrop-blur-sm">
          {number}
        </div>
        {!isLast && (
          <div className="mt-1 w-px flex-1 bg-gradient-to-b from-[rgba(166,111,24,0.3)] to-transparent" />
        )}
      </div>
      {/* Content */}
      <div className="pb-8">
        <h3 className="font-serif text-lg font-semibold text-text-primary">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{description}</p>
      </div>
    </div>
  );
}
