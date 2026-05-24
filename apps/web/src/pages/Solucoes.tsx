import { NicheLandingPage } from '@/components/shipper/NicheLandingPage';
import { BRAND } from '@/lib/brand';

const HIGHLIGHTS = ['Site + funil sob medida', 'Automação n8n', 'Diagnóstico em 24h'] as const;

export default function Solucoes() {
  return (
    <NicheLandingPage
      seoTitle="Soluções — Rei das Vendas"
      seoDescription="Site, funil e automação para negócios locais. Diagnóstico em 24h."
      canonicalPath="/solucoes"
      eyebrow="Soluções"
      title="Digital que vende,"
      titleAccent="não só aparece."
      subtitle="Site, integrações e ritmo comercial para o seu segmento — escopo fechado no diagnóstico."
      videoSrc={BRAND.inlineVideos.salesFunnel}
      videoCaption="Funil · captação até o CRM"
      highlights={HIGHLIGHTS}
    />
  );
}
