/**
 * Preços e oferta de campanha do Rei das Vendas — fonte única.
 *
 * /planos e /black-friday leem daqui de propósito: preço que aparece diferente
 * em duas páginas do mesmo site destrói a confiança mais rápido que preço alto.
 *
 * REGRA DA CASA (é princípio do próprio negócio, está em /planos): nenhuma
 * promessa de ranking, de volume de vendas ou de prazo que não possa ser
 * cumprido. Aqui entra só o que é entregue e o que é cobrado.
 *
 * CONFIRMADO PELO DONO: os valores e prazos abaixo foram aprovados e estão no ar.
 * Se o número mudar, muda aqui e o site inteiro acompanha (é um lugar só).
 */

export const brl = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });

export interface ItemOferta {
  nome: string;
  /** null = sob diagnóstico (não escondemos tudo atrás de "fale conosco") */
  valor: number | null;
  resumo: string;
  entrega: string[];
  prazo: string;
  destaque?: boolean;
  selo?: string;
}

/** Implantação: serviço entregue uma vez, com escopo fechado. */
export const IMPLANTACAO: ItemOferta[] = [
  {
    nome: 'Página de campanha',
    valor: 1497,
    selo: 'Começa aqui',
    resumo: 'Uma oferta, uma decisão. Para quem precisa testar uma campanha antes de investir no site inteiro.',
    entrega: [
      'Uma página com a sua oferta escrita para converter, não para enfeitar',
      'Botão de WhatsApp e formulário ligados no seu número, testados',
      'Instalada no seu domínio, com o Google avisado do que a página é',
      'Você aprova o texto antes de ir para o ar',
    ],
    prazo: '5 dias úteis após o material do negócio',
  },
  {
    nome: 'Site profissional',
    valor: 3297,
    destaque: true,
    selo: 'Recomendado',
    resumo: 'O seu endereço próprio na internet. Para quem já é procurado e não quer depender de rede social para existir.',
    entrega: [
      'Até 6 páginas: quem você é, o que vende, onde fica, como falar',
      'Texto escrito para o cliente entender, na primeira tela, o que você resolve',
      'Com os dados de contato, serviço e endereço que a busca local precisa ler',
      'WhatsApp, localização e horário funcionando no celular',
      'Painel para você mesmo trocar foto, preço e texto sem chamar ninguém',
    ],
    prazo: '12 dias úteis após o material do negócio',
  },
  {
    nome: 'Loja ou catálogo com pedido',
    valor: 5497,
    resumo: 'Para quem vende produto e perde venda no "manda no direct?". Catálogo organizado com pedido que chega fechado.',
    entrega: [
      'Catálogo com busca, categoria e preço que você atualiza sozinho',
      'Pedido pelo site ou direto no WhatsApp, já com o item escolhido',
      'Pagamento e cálculo de frete configurados',
      'Ficha de cada produto em formato de feed, pronta para enviar ao Google Shopping',
      'Treinamento de 1 hora para a sua equipe operar',
    ],
    prazo: '20 dias úteis após catálogo e fotos',
  },
  {
    nome: 'Sob medida',
    valor: null,
    resumo: 'Aplicativo, sistema interno, portal ou integração que o seu negócio já precisa e nenhum pacote cobre.',
    entrega: [
      'Levantamento do que existe hoje e do que trava a operação',
      'Escopo fechado, por escrito, antes de qualquer linha de código',
      'Entregas parciais que você usa durante o desenvolvimento',
      'Documentação e treinamento na entrega',
    ],
    prazo: 'Definido no diagnóstico, por escrito',
  },
];

export interface ItemAssinatura {
  nome: string;
  mensal: number;
  resumo: string;
  entrega: string[];
  destaque?: boolean;
  selo?: string;
}

/** Assinatura: mensalidade, sem fidelidade. Anual = 10 mensalidades. */
export const ASSINATURA: ItemAssinatura[] = [
  {
    nome: 'Base',
    mensal: 297,
    resumo: 'O seu site no ar, rápido, seguro e com alguém responsável por isso.',
    entrega: [
      'Hospedagem, domínio técnico, certificado e backup',
      'Monitoramento: se cair, eu sei antes de você',
      'Correções e atualizações de segurança',
      'Suporte por WhatsApp no horário do site: seg–sex 9h–18h, sáb 9h–13h',
    ],
  },
  {
    nome: 'Crescimento',
    mensal: 697,
    destaque: true,
    selo: 'Recomendado',
    resumo: 'Para quem não quer só o site no ar: quer aparecer mais e receber mais contato.',
    entrega: [
      'Tudo da Base',
      'Trabalho de busca local: o seu nome para os serviços que você vende',
      '2 conteúdos por mês escritos para quem está decidindo comprar',
      'Relatório mensal do que foi feito e do que chegou',
      'Ajustes de conversão com base no que a medição mostrar',
    ],
  },
  {
    nome: 'Capilaridade',
    mensal: 1297,
    resumo: 'Para quem já tem site e atendimento e quer disputar espaço em mais de um canal.',
    entrega: [
      'Tudo do Crescimento',
      'Páginas novas para cada serviço, bairro ou campanha',
      'Campanhas de anúncio com página de destino medida',
      'Integrações: agenda, CRM, e-mail, automação de atendimento',
      'Reunião mensal de prioridade com você',
    ],
  },
];

/** Anual: paga 10, usa 12 (dois meses grátis). */
export const MESES_ANUAIS = 10;

export interface BlackFriday {
  /** Data real da Black Friday 2026 — 4ª quinta de novembro + 1 dia. */
  fim: string;
  descontoImplantacao: number;
  mesGratisAssinatura: boolean;
  regras: string[];
  oQueNaoTem: string[];
}

export const BLACK_FRIDAY: BlackFriday = {
  fim: '2026-11-27T23:59:59-03:00',
  descontoImplantacao: 0.3,
  mesGratisAssinatura: true,
  regras: [
    'O desconto de 30% vale para implantação contratada e assinada até 27 de novembro de 2026, às 23h59.',
    'Quem assina a assinatura junto leva o primeiro mês sem cobrança.',
    'Depois de 27/11, o valor volta para a tabela de /planos. Não existe "última vaga" que reaparece.',
    'Escopo, prazo e o que está incluído ficam por escrito antes de qualquer pagamento.',
    'O desconto é sobre o trabalho da casa. Mídia paga, licenças e serviços de terceiros sempre aparecem separados.',
  ],
  oQueNaoTem: [
    'Contador que reinicia quando você volta à página',
    'Vaga limitada inventada para te apressar',
    'Preço "de" que nunca foi praticado',
    'Avaliação ou número de cliente que eu não possa provar',
  ],
};

export const precoComDesconto = (valor: number) =>
  Math.round(valor * (1 - BLACK_FRIDAY.descontoImplantacao));

/**
 * A campanha está no ar? Os links para /black-friday usam isto: depois de 27/11
 * eles desaparecem sozinhos, em vez de deixar no rodapé um link de promoção
 * vencida — que é o que faz um site parecer abandonado.
 */
export const CAMPANHA_ATIVA = Date.now() < new Date(BLACK_FRIDAY.fim).getTime();
