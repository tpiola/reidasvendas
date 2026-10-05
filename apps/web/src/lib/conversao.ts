/**
 * Dossiê de conversão da home: patologias, protocolo, laudos e limite de escopo.
 *
 * REGRA DE INTEGRIDADE: todo número marcado como medido veio de auditoria HTTP
 * direta nas páginas em produção (data em MEDICAO_REALIZADA_EM). Onde não existe
 * medição, o campo `depois` fica como A INSTRUMENTAR — este site não publica
 * resultado de negócio sem instrumentação instalada.
 */

export const MEDICAO_REALIZADA_EM = '04/10/2026';

/** Barra de estado técnico exibida logo abaixo do hero. */
export const ESTADO_TECNICO = [
  { rotulo: 'TTFB medido', valor: '19 a 25 ms', detalhe: 'cache de borda em produção' },
  { rotulo: 'Caminho crítico', valor: '≈ 277 KB', detalhe: 'HTML + CSS + JS + fontes' },
  { rotulo: 'Dados estruturados', valor: '12 tipos', detalhe: 'Organization, Service, FAQPage, WebSite' },
  { rotulo: 'URLs publicadas', valor: '58', detalhe: 'sitemap verificado em produção' },
];

/** Os quatro vazamentos que a triagem mede. Cada um com o custo em CAC. */
export const PATOLOGIAS = [
  {
    ordem: '01',
    titulo: 'Taxonomia de oferta confusa',
    doenca:
      'O visitante não descobre o que a empresa vende pela ordem em que ela vende. Serviço, praça e produto aparecem misturados na mesma página.',
    custo: 'Aumenta o custo por sessão útil: mais cliques, menos contato. O CAC sobe sem a mídia subir.',
    mecanismo: 'Arquitetura de dados: hierarquia de oferta, nomes estáveis, uma intenção por página.',
  },
  {
    ordem: '02',
    titulo: 'Atrito de captura',
    doenca:
      'Formulário que pede o que o visitante não sabe responder, canal que exige que ele comece a conversa do zero.',
    custo: 'Cada campo a mais é abandono. O lead que chega sem contexto custa tempo de equipe — e tempo de equipe é CAC.',
    mecanismo: 'Redução de atrito: menos campo, contexto vindo da origem, retorno em um canal só.',
  },
  {
    ordem: '03',
    titulo: 'Latência e instabilidade de layout',
    doenca:
      'Hero com animação pesada, imagem sem dimensão declarada, script de terceiro acima da dobra. A página salta enquanto o visitante lê.',
    custo: 'LCP alto corta sessão antes da oferta. Layout instável faz a pessoa clicar no botão errado — literalmente.',
    mecanismo: 'Orçamento de performance: LCP < 1,2 s, CLS 0, caminho crítico declarado em KB.',
  },
  {
    ordem: '04',
    titulo: 'Canal, oferta e intenção desalinhados',
    doenca:
      'Anúncio promete uma coisa, a página entrega outra, e o atendimento começa sem saber de onde a pessoa veio.',
    custo: 'Paga-se por clique qualificado para servir uma mensagem genérica. É o jeito mais caro de gerar lead.',
    mecanismo: 'Alinhamento de jornada: página específica por intenção e contexto preservado até o atendimento.',
  },
];

/** As 12 verificações da triagem, na ordem de execução. */
export const PROTOCOLO = [
  ['Rastreio e indexação', 'O que o buscador e as ferramentas de IA recebem de fato, com e sem execução de JavaScript.'],
  ['Cobertura de intenção', 'Quais intenções de busca de compra existem e quais não têm página dedicada.'],
  ['Arquitetura de dados', 'Hierarquia de oferta, nomes, URLs e dados estruturados por página.'],
  ['Funil medido', 'Sessão, engajamento, contato e fechamento: onde a taxa cai entre cada etapa.'],
  ['Atrito de formulário', 'Campos, ordem, obrigatoriedade e o que trava o envio no mobile.'],
  ['Origem e atribuição', 'Se o contexto da campanha sobrevive até o atendimento e o CRM.'],
  ['Core Web Vitals', 'LCP, CLS e INP no mobile, medidos em produção e não em laboratório.'],
  ['Orçamento de peso', 'O que compõe o caminho crítico e o que dá para cortar sem perder função.'],
  ['Acessibilidade', 'Contraste, foco, rótulo e navegação por teclado nas páginas de conversão.'],
  ['Confiança visível', 'Preço, escopo, prazo, responsável e prova verificável declarados sem adjetivo.'],
  ['Instrumentação', 'Eventos nomeados, funil no analytics e painel de leitura do proprietário.'],
  ['Plano de correção', 'Fila priorizada por impacto × esforço, com o custo de cada semana sem corrigir.'],
];

/** Laudos publicados. O "depois" só existe com instrumentação instalada. */
export const LAUDOS = [
  {
    projeto: 'TKA Esportes',
    href: 'https://tkaesportes.com.br',
    metadata: 'Catálogo de 30 anos · comércio',
    vaidade: 'Posição de busca e visitas mensais.',
    negocio: 'Produto encontrado por quem já está procurando, por categoria e por praça.',
    medido: [
      '3.177 URLs publicadas e nenhum bloco de dados estruturados no HTML entregue',
      '268 KB de HTML na primeira resposta',
      'Nenhum header de segurança ativo (CSP, X-Frame-Options, Permissions-Policy, HSTS)',
    ],
    depois: 'A INSTRUMENTAR: home, busca interna e adição ao carrinho por sessão de catálogo.',
  },
  {
    projeto: 'SaúdeGPT',
    href: 'https://saudegpt.com',
    metadata: 'Produto web · saúde',
    vaidade: 'Cadastros totais e "plataforma completa".',
    negocio: 'Ativação: quantas pessoas chegam à primeira consulta útil, e quantas voltam em 30 dias.',
    medido: [
      '1,37 MB de JavaScript para entregar 91 KB de conteúdo (≈15× mais código que conteúdo)',
      '4 de 5 imagens sem largura e altura declaradas',
      '1.010 ms de TTFB no primeiro acesso, contra 50 a 63 ms com cache quente',
    ],
    depois: 'A INSTRUMENTAR: ativação por coorte, queda por etapa e retenção em D30.',
  },
  {
    projeto: 'Sentinela Saúde Ambiental',
    href: 'https://sentinelasaudeambiental.com.br',
    metadata: 'Serviço local · Franca/SP',
    vaidade: 'Cliques de campanha e criativo.',
    negocio: 'Orçamento qualificado por área atendida: o comercial recebe ambiente e endereço antes de discar.',
    medido: [
      '7 de 10 imagens sem largura e altura declaradas (risco direto de CLS)',
      'TTFB oscilando entre 27 ms e 182 ms em três medições',
      '126 KB de HTML, com dados estruturados locais corretos e completos',
    ],
    depois: 'A INSTRUMENTAR: orçamentos por 100 sessões orgânicas e por canal.',
  },
];

/** Limite de escopo declarado. Quem não se reconhece aqui não deve contratar. */
export const TRADE_OFF = [
  {
    ordem: '01',
    titulo: 'Quem ainda não tem oferta validada',
    detalhe:
      'Sem saber o que vende, para quem e por qual preço, não existe página que resolva. Nesse estágio o trabalho é de negócio, não de engenharia.',
  },
  {
    ordem: '02',
    titulo: 'Quem não tem tráfego para auditar',
    detalhe: 'Sem sessão não existe vazamento a calcular. Primeiro se constrói demanda, depois se otimiza conversão.',
  },
  {
    ordem: '03',
    titulo: 'Quem não decide sobre o investimento',
    detalhe:
      'Laudo entregue a quem não assina vira documento morto. A sessão de leitura exige a presença de quem tem autonomia.',
  },
  {
    ordem: '04',
    titulo: 'Quem procura o menor preço por página',
    detalhe:
      'Orçamento por quantidade de página é a medida que produz site bonito e conversão baixa. Não é o trabalho realizado aqui.',
  },
];

/** FAQ comercial da home. É também a fonte do HTML pré-renderizado (crawler e visitante leem o mesmo). */
export const HOME_FAQS = [
  {
    question: 'Por que o diagnóstico é pago?',
    answer:
      'Porque diagnóstico gratuito é peça de venda: ele termina onde a venda precisa, não onde o problema está. Cobrada, a triagem é prescritiva, priorizada e sua — o laudo pode ser executado por qualquer equipe.',
  },
  {
    question: 'E se eu não aprovar o Setup depois da triagem?',
    answer:
      'O laudo é seu. Ele traz o mapa de vazamento, a fila priorizada por impacto e o cálculo de retorno. Você decide se executa com a casa ou com outro time.',
  },
  {
    question: 'A triagem é creditada?',
    answer:
      'Sim, integralmente, no Setup aprovado em até 30 dias. O valor da triagem não é custo somado: é adiantamento de engenharia.',
  },
  {
    question: 'Quanto tempo leva?',
    answer: '5 dias úteis para o laudo, mais uma sessão de 45 minutos com quem decide.',
  },
  {
    question: 'Vocês garantem posição no Google ou volume de venda?',
    answer:
      'Não. Garantimos escopo, prazo, instrumentação e leitura de dados. Promessa de posição é assinatura de quem não mede.',
  },
  {
    question: 'Quando a triagem não faz sentido?',
    answer:
      'Sem oferta validada, sem tráfego mensurável ou sem autonomia de decisão, o laudo vira documento morto. Nesses três casos, a casa recusa o trabalho.',
  },
];
