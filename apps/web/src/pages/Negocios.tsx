import { NicheLandingPage } from '@/components/shipper/NicheLandingPage';

/* Imagem real de escritório/negócios — alta qualidade */
const NEGOCIOS_IMAGE = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80';

const HIGHLIGHTS = [
  'Proposta clara para decisor — site que comunica valor em segundos',
  'Funil B2B com CRM — lead qualificado sem follow-up manual',
  'Relatório de origem do lead — saiba exatamente de onde vem cada contato',
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
      imageSrc={NEGOCIOS_IMAGE}
      imageCaption="Operação B2B · funil integrado"
      highlights={HIGHLIGHTS}
    />
  );
}
