import { BRAND } from '@/lib/brand';

function buildEmbedUrl(query: string): string {
  const q = encodeURIComponent(query);
  return `https://www.google.com/maps?q=${q}&output=embed`;
}

function buildDirectionsUrl(query: string): string {
  const dest = encodeURIComponent(query);
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
}

export function MapEmbed({ query }: { query?: string }) {
  const q = (query ?? BRAND.mapsQuery).trim();
  const embedUrl = buildEmbedUrl(q);
  const directionsUrl = buildDirectionsUrl(q);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Localização</p>
      <p className="mt-3 text-sm font-semibold text-white/90">{BRAND.baseCity}</p>
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
        <iframe
          title={`Mapa de ${BRAND.baseCity}`}
          src={embedUrl}
          className="h-48 w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-scripts allow-same-origin"
          aria-label={`Mapa do Google mostrando ${q}`}
        />
      </div>
      <div className="mt-4">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-white px-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-black hover:bg-white/90"
        >
          Abrir no GPS
        </a>
      </div>
    </div>
  );
}

