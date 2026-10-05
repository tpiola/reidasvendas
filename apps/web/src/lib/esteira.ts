/**
 * Esteira de monetização do Rei das Vendas — fonte única da escada de ofertas.
 *
 * REGRA DA CASA: nenhuma promessa de ranking, de volume de venda ou de prazo que
 * não possa ser cumprida. Aqui entra só o que é entregue, o que é cobrado e como
 * o preço se ancora em resultado (nunca em hora, nunca em "número de páginas").
 *
 * /planos, a home e o material comercial leem daqui: preço que aparece diferente
 * em duas páginas do mesmo site destrói a confiança mais rápido que preço alto.
 */

export interface Pilar {
  id: 'triagem' | 'setup' | 'mrr';
  ordem: string;
  nome: string;
  /** Faixa publicada, não preço único: o corte sai do laudo da triagem. */
  faixa: string;
  /** Como o valor se justifica sem virar tabela de commodity. */
  ancoragem: string;
  resumo: string;
  escopo: string[];
  prazo: string;
  /** Papel do pilar no funil — é o que o visitante precisa entender antes de perguntar o preço. */
  funcao: string;
}

export const PILARES: Pilar[] = [
  {
    id: 'triagem',
    ordem: '01',
    nome: 'Triagem Clínica',
    faixa: 'R$ 1.500 a R$ 2.500',
    ancoragem: 'Creditada integralmente no Setup aprovado em até 30 dias.',
    resumo:
      'Auditoria de conversão remunerada. É o único jeito de saber onde a receita escapa antes de gastar com reconstrução.',
    escopo: [
      'Quatro frentes medidas: arquitetura do funil, atrito de captura, latência e estabilidade de layout, alinhamento entre canal, oferta e intenção de busca',
      'Mapa de vazamento por etapa, com taxa de escape calculada em cada passagem',
      'Fila priorizada por impacto × esforço, não por ordem de chegada',
      'Laudo de 12 pontos com o instrumento de medição de cada um',
      'Sessão de 45 minutos com quem decide assinar',
    ],
    prazo: '5 dias úteis para o laudo, mais a sessão de leitura',
    funcao: 'Filtra curiosidade de compromisso. Quem não paga diagnóstico não sustenta engenharia.',
  },
  {
    id: 'setup',
    ordem: '02',
    nome: 'Setup de Infraestrutura',
    faixa: 'R$ 8.000 a R$ 25.000',
    ancoragem: 'Preço ancorado no ROI projetado no laudo, não em horas nem em quantidade de páginas.',
    resumo:
      'Engenharia de aquisição: a base técnica que faz o tráfego que você já paga parar de escorrer entre o clique e a decisão.',
    escopo: [
      'Arquitetura de dados e taxonomia de oferta: o que existe, em que ordem, com qual nome',
      'Páginas dedicadas por serviço e por praça, cada uma com intenção de busca declarada',
      'Dados estruturados por página (serviço, oferta, FAQ, endereço) para busca e para citação por IA',
      'Instrumentação de eventos com nomeação estável, para medir o antes e o depois',
      'Redução de atrito na captura: menos campo, mais contexto, retorno em canal único',
      'Core Web Vitals ≥ 90 no mobile com orçamento de caminho crítico declarado',
      'Integração de qualificação com o CRM/atendimento e base de experimentação A/B',
    ],
    prazo: '12 a 25 dias úteis, conforme o corte aprovado no laudo',
    funcao: 'É onde o dinheiro sério entra. Nada entra no Setup que não esteja na fila priorizada do laudo.',
  },
  {
    id: 'mrr',
    ordem: '03',
    nome: 'Otimização Contínua',
    faixa: 'R$ 2.000 a R$ 5.000 por mês',
    ancoragem: 'Sem fidelidade. A permanência se justifica pelo resultado do mês anterior, não por contrato.',
    resumo:
      'CRO contínuo: enquanto a operação roda, a conversão é medida, testada e corrigida em ciclos.',
    escopo: [
      'Dois experimentos por mês, com hipótese, amostra mínima e métrica de decisão declaradas antes de rodar',
      'Monitoramento de Core Web Vitals, disponibilidade e erros de front-end',
      'Iteração de copy nas páginas de maior tráfego, com registro do que mudou e do que aconteceu',
      'Relatório mensal com receita atribuída por página e por canal',
      'Reunião de prioridade: o próximo ciclo é escolhido com dado, não com opinião',
    ],
    prazo: 'Mensal, cancelamento a qualquer momento',
    funcao: 'Transforma entrega em sistema vivo. É o que separa operação de arquivo morto.',
  },
];

/** Escada em uma linha — usada nos resumos e no rodapé das páginas comerciais. */
export const ESTEIRA_RESUMO =
  'Triagem (R$ 1.500 a R$ 2.500, creditada no Setup) → Setup de infraestrutura (R$ 8.000 a R$ 25.000, ancorado no ROI) → Otimização contínua (R$ 2.000 a R$ 5.000/mês, sem fidelidade).';
