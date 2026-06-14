import { NicheLandingPage } from '@/components/shipper/NicheLandingPage';

/* Imagem real de dashboard/soluções digitais — alta qualidade */
const SOLUCOES_IMAGE = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';

const HIGHLIGHTS = [
  'Site + funil sob medida para o seu segmento — nada de template genérico',
  'Automação n8n — lead capturado, lead no CRM, lead no WhatsApp',
  'Diagnóstico gratuito em 24h — raio-X completo da sua presença digital',
] as const;

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
      imageSrc={SOLUCOES_IMAGE}
      imageCaption="Funil · captação até o CRM"
      highlights={HIGHLIGHTS}
    />
  );
}
