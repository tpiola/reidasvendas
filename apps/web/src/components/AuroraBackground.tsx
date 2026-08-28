export function AuroraBackground() {
  return (
    <div className="rdv-aurora" aria-hidden="true">
      <div className="rdv-aurora-blob rdv-aurora-blob--1" />
      <div className="rdv-aurora-blob rdv-aurora-blob--2" />
      <div className="rdv-aurora-blob rdv-aurora-blob--3" />
      <div className="absolute inset-0 bg-grid-subtle opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_20%,rgba(232,200,111,0.08),transparent_60%)]" />
    </div>
  );
}
