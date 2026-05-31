import { NicheLandingPage } from "@/components/shipper/NicheLandingPage";
import { PEXELS, NICHE_PHOTOS } from "@/lib/media";

const HIGHLIGHTS = [
  "Agendamento e WhatsApp integrados",
  "Copy para paciente certo",
  "SEO local e velocidade",
] as const;

export default function Saude() {
  return (
    <NicheLandingPage
      seoTitle="Saúde & Estética — Rei das Vendas"
      seoDescription="Site e funil para clínicas e estética. Captação e follow-up no WhatsApp."
      canonicalPath="/saude"
      eyebrow="Saúde & estética"
      title="Paciente certo,"
      titleAccent="agenda cheia."
      subtitle="Página rápida, prova social e follow-up automático — você foca no atendimento."
      videoSrc={PEXELS.profDoctor}
      videoCaption="Clínica · presença premium"
      poster={NICHE_PHOTOS.saude}
      highlights={HIGHLIGHTS}
    />
  );
}
