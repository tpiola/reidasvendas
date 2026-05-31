import { NicheLandingPage } from "@/components/shipper/NicheLandingPage";
import { BRAND } from "@/lib/brand";
import { SECTION_POSTERS } from "@/lib/media";

const HIGHLIGHTS = [
  "Proposta clara para decisor",
  "Funil B2B com CRM",
  "Relatório de origem do lead",
] as const;

export default function Negocios() {
  return (
    <NicheLandingPage
      seoTitle="Negócios & B2B — Rei das Vendas"
      seoDescription="Site e funil B2B. Lead qualificado e CRM integrado."
      canonicalPath="/negocios"
      eyebrow="B2B & serviços"
      title="Lead qualificado,"
      titleAccent="ticket maior."
      subtitle="Funil e automação para consultorias e serviços que vendem com conversa, não com desconto."
      videoSrc={BRAND.inlineVideos.performance}
      videoCaption="Operação B2B · funil integrado"
      poster={SECTION_POSTERS.handshake}
      highlights={HIGHLIGHTS}
    />
  );
}
