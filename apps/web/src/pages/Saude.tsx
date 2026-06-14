import { NicheLandingPage } from '@/components/shipper/NicheLandingPage';

/* Imagem real de clínica/estética — alta qualidade */
const SAUDE_IMAGE = 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=80';

const HIGHLIGHTS = [
  'Agendamento e WhatsApp integrados — paciente marca direto pelo site',
  'Copy para paciente certo — mensagem que gera confiança antes da consulta',
  'SEO local para clínicas — apareça quando buscarem por especialistas perto',
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
      imageSrc={SAUDE_IMAGE}
      imageCaption="Clínica · presença premium"
      highlights={HIGHLIGHTS}
    />
  );
}
