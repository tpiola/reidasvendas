/* ═══════════════════════════════════════════
   COPY-PERSUASIVO.TS — Rei das Vendas
   Textos NLP completos com gatilhos mentais:
   pressuposição, comando embutido, escassez,
   ancoragem, prova social, futuro-presente
═══════════════════════════════════════════ */

export const copyPersuasivo = {
  /* ─── Hero ─── */
  hero: {
    titulo: 'Seu negócio local vendendo COMO AS GIGANTES',
    subtitulo: 'Site profissional + SEO + WhatsApp = clientes todos os dias',
    cta: 'QUERO MEU SITE EM 72H',
    nlp1:
      'Enquanto você lê isso, seu cérebro já está processando como seria ter clientes novos todos os dias sem precisar sair da sua mesa.',
    nlp2:
      'Você já sentiu que seu negócio merece mais do que um site que ninguém encontra? Que merece aparecer no Google bem na hora que seus clientes estão procurando?',
    nlp3:
      'Imagine acordar amanhã e ver 3 pedidos que chegaram enquanto você dormia — sem ter que correr atrás de ninguém.',
  },

  /* ─── Comando Embutido ─── */
  comandoEmbedido:
    'E quando você contratar esse serviço, vai se perguntar por que não fez isso antes. É normal. Todo cliente nosso sente a mesma coisa na primeira semana.',

  /* ─── Pressuposição ─── */
  pressuposicao:
    'Depois que seu site estiver no ar, seus clientes vão te encontrar no Google sem esforço. Você só precisa focar em entregar o melhor serviço da sua área.',

  /* ─── Passos da Jornada ─── */
  passo1: {
    titulo: 'Diagnóstico Gratuito',
    descricao:
      'Enquanto você cuida do seu negócio, nós analisamos sua presença digital gratuitamente. Em 24h você recebe um raio-X completo de como está sua visibilidade online.',
    icone: '🔍',
    gatilho:
      'Quanto mais rápido você agir, mais rápido seus clientes vão te encontrar. Deixe seu diagnóstico conosco.',
  },
  passo2: {
    titulo: 'Projeto em 72h',
    descricao:
      'Seu site aparece no Google enquanto você dorme. Projetamos, desenvolvemos e publicamos seu site profissional em até 72 horas úteis. Otimizado para SEO desde o primeiro byte.',
    icone: '⚡',
    gatilho:
      'Sites entregues em 72h — enquanto seus concorrentes ainda estão pensando, você já está vendendo.',
  },
  passo3: {
    titulo: 'Suporte Vitalício',
    descricao:
      'Clientes chegam, vendas acontecem, seu negócio cresce. E a gente fica com você — suporte vitalício, atualizações de segurança, e melhorias contínuas sem custo extra.',
    icone: '♾️',
    gatilho:
      'Você nunca vai ficar na mão. Enquanto seu negócio existir, a gente existe pra manter sua máquina de vendas rodando.',
  },

  /* ─── Seções de Conteúdo ─── */
  secaoDiagnostico: {
    titulo: '🔍 Diagnóstico Gratuito da Sua Presença Digital',
    descricao:
      'Descubra quantos clientes você está perdendo online. Analisamos SEO, redes sociais, Google Meu Negócio e concorrentes — tudo de graça e sem compromisso.',
    bullets: [
      'Análise de SEO completo da sua região',
      'Comparativo com 3 concorrentes diretos',
      'Relatório de oportunidades de palavras-chave',
      'Checklist de Google Meu Negócio',
      'Plano de ação personalizado em PDF',
    ],
  },
  secaoProjeto72h: {
    titulo: '⚡ Seu Site em 72 Horas',
    descricao:
      'Enquanto você espera meses por uma agência tradicional, a gente entrega seu site profissional em 3 dias. Design moderno, responsivo e preparado para converter.',
    bullets: [
      'Design exclusivo para seu segmento',
      'Integração com WhatsApp e Instagram',
      'SEO On-Page completo (Google, Bing)',
      'Hospedagem com SSL grátis incluso',
      'Painel para editar conteúdo sem técnico',
    ],
  },
  secaoSuporte: {
    titulo: '♾️ Suporte e Atualizações Vitalícias',
    descricao:
      'Não é só um site. É uma parceria de longo prazo. Enquanto seu negócio existir, seu site fica atualizado, seguro e funcionando perfeitamente.',
    bullets: [
      'Atualizações de segurança automáticas',
      'Backups semanais com 30 dias de retenção',
      'Suporte via WhatsApp em até 2 horas',
      'Otimizações de velocidade contínuas',
      'Relatório mensal de desempenho',
    ],
  },

  /* ─── Escassez ─── */
  escassez:
    'Últimas vagas deste mês — investimento vai subir. Bloqueie seu orçamento com as condições atuais antes do reajuste. Essa oportunidade não volta.',
  escassezTimer:
    '⏳ Oferta exclusiva expira em {{tempo}}. Após esse prazo, os preços voltam ao valor cheio.',
  escassezVagas:
    '⚡ ÚLTIMAS 2 VAGAS DO MÊS — Restam apenas {{vagas}} vagas com este valor. Preço vai subir para o próximo lote.',

  /* ─── Provas Sociais ─── */
  empresasContrataram: 47,
  contadorTexto: 'empresas já contrataram',
  contadorSufixo: '+',

  depoimentos: [
    {
      nome: 'Dra. Carla Mendes',
      cargo: 'Farmácia Bem Estar',
      foto: 'https://i.pravatar.cc/80?img=25',
      texto:
        'Minhas vendas online aumentaram 340% em 2 meses. O site ficou lindo e aparece no Google. Melhor investimento que fiz para minha farmácia.',
      destaque: 'Vendas +340%',
    },
    {
      nome: 'Roberto Alves',
      cargo: 'Padaria Pão Quente',
      foto: 'https://i.pravatar.cc/80?img=53',
      texto:
        'Em uma semana meu site já estava no Google. Clientes novos chegam toda semana pelo WhatsApp. O suporte é sensacional, recomendo de olhos fechados.',
      destaque: 'Google em 7 dias',
    },
    {
      nome: 'Marcos Oliveira',
      cargo: 'Auto Mecânica',
      foto: 'https://i.pravatar.cc/80?img=59',
      texto:
        'O suporte é incrível, respondem em minutos. Meu site ficou profissional e agora recebo orçamentos toda semana pelo formulário. Era exatamente o que eu precisava.',
      destaque: 'Suporte em minutos',
    },
  ] as const,

  /* ─── WhatsApp CTA ─── */
  whatsappCta: 'Fale com a gente no WhatsApp',
  whatsappTexto:
    'Clique e descubra como podemos fazer seu negócio vender mais em 72 horas.',
} as const;

export default copyPersuasivo;
