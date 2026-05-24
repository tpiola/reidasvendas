/** Respostas guiadas do assistente (sem API) — encaminha para diagnóstico ou WhatsApp */

import { BRAND } from '@/lib/brand';

export type AssistReply = {
  text: string;
  links?: { label: string; href: string; external?: boolean }[];
};

const KEYWORD_RULES: { pattern: RegExp; reply: AssistReply }[] = [
  {
    pattern: /pre[cç]o|valor|quanto|custa|investimento|plano/i,
    reply: {
      text: 'Cada plano tem página com entregáveis e investimento. O Essencial começa em R$ 497/mês — o diagnóstico define o melhor ritmo para você.',
      links: [
        { label: 'Ver planos', href: '/planos' },
        { label: 'Diagnóstico em 24h', href: '/diagnostico' },
      ],
    },
  },
  {
    pattern: /prazo|quando|tempo|72|entrega/i,
    reply: {
      text: 'Landing e funil: em geral até 72h após o diagnóstico. Projetos maiores têm marcos com data fechada no escopo.',
      links: [{ label: 'Agendar diagnóstico', href: '/diagnostico' }],
    },
  },
  {
    pattern: /whatsapp|zap|contato|falar/i,
    reply: {
      text: 'Posso te levar ao WhatsApp da equipe ou ao formulário de diagnóstico — você escolhe o caminho mais rápido.',
      links: [
        { label: 'WhatsApp', href: BRAND.whatsappLink, external: true },
        { label: 'Diagnóstico', href: '/diagnostico' },
      ],
    },
  },
  {
    pattern: /projeto|nicho|segmento|cl[ií]nica|advocacia|im[oó]vel|varejo/i,
    reply: {
      text: 'Cada segmento tem uma referência exclusiva — nunca cópia. Veja os cases e o vídeo demo do seu nicho.',
      links: [{ label: 'Ver projetos', href: '/projetos' }],
    },
  },
  {
    pattern: /funil|lead|venda|automa/i,
    reply: {
      text: 'Montamos site, captura, WhatsApp e CRM no mesmo fluxo — você vê de onde veio cada lead sem planilha paralela.',
      links: [
        { label: 'Como funciona', href: '/#como-funciona' },
        { label: 'Diagnóstico', href: '/diagnostico' },
      ],
    },
  },
];

export function matchAssistReply(message: string): AssistReply {
  const trimmed = message.trim();
  if (!trimmed) {
    return {
      text: 'Descreva seu cenário (nicho, objetivo ou prazo) que eu indico o próximo passo.',
    };
  }

  for (const rule of KEYWORD_RULES) {
    if (rule.pattern.test(trimmed)) return rule.reply;
  }

  return {
    text: 'Obrigado pela mensagem. Para uma rota sob medida, o diagnóstico em 24h é o melhor caminho — sem compromisso de fidelidade.',
    links: [
      { label: 'Quero meu diagnóstico', href: '/diagnostico' },
      { label: 'Ver planos', href: '/planos' },
    ],
  };
}

export function buildAssistGreeting(firstName: string | null): string {
  if (firstName) {
    return `${firstName}, você sente que seu negócio está invisível online? Conte seu nicho — eu indico o próximo passo.`;
  }
  return 'Você sente que seu negócio está invisível online? Conte seu nicho e objetivo — eu indico o próximo passo.';
}
