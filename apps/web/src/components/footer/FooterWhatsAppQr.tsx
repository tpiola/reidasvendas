import { BRAND } from '@/lib/brand';

const QR_SIZE = 168;

function buildQrSrc(data: string): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${QR_SIZE}x${QR_SIZE}&margin=12&color=0A0A0B&bgcolor=FFFFFF&data=${encodeURIComponent(data)}`;
}

export function FooterWhatsAppQr() {
  const qrSrc = buildQrSrc(BRAND.whatsappLink);

  return (
    <a
      href={BRAND.whatsappLink}
      target="_blank"
      rel="noreferrer"
      className="group relative flex flex-col items-center rounded-2xl border border-white/10 bg-white p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60"
      aria-label="Abrir conversa no WhatsApp — escanear QR Code"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C9A84C]/10 via-transparent to-[#0057FF]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <img
        src={qrSrc}
        alt=""
        width={QR_SIZE}
        height={QR_SIZE}
        className="relative rounded-lg"
        loading="lazy"
        decoding="async"
      />
      <span className="relative mt-3 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#0A0A0B]/70 group-hover:text-[#0A0A0B]">
        WhatsApp
      </span>
      <span className="relative text-center text-[9px] text-[#0A0A0B]/45">Toque ou escaneie</span>
    </a>
  );
}
