/** Copy da Home — direto, sem jargão de template */

export const HOME_FAQ = [
  {
    id: 'prazo',
    question: 'Quanto tempo para a primeira versão no ar?',
    answer:
      'Landing e funil: em geral até 72h após o diagnóstico. App ou extensão depende do escopo — sempre com marco e data, nada de prazo surpresa no final.',
  },
  {
    id: 'dados',
    question: 'Como ficam meus dados e o LGPD?',
    answer:
      'Formulário com consentimento, HTTPS, credenciais de integração só no servidor. Política de privacidade publicada e alinhada à LGPD.',
  },
  {
    id: 'google',
    question: 'O site passa no Google (velocidade e SEO)?',
    answer:
      'Sim. Código enxuto, imagens leves, meta-tags certas e página rápida no celular — isso entra no escopo, não é extra opcional.',
  },
  {
    id: 'escopo',
    question: 'O que vocês entregam na prática?',
    answer:
      'Site rápido, funil, WhatsApp e CRM integrados, automação (n8n), tráfego com mensagem certa e relatório do que converteu.',
  },
  {
    id: 'templates',
    question: 'Os sites do catálogo são copiados?',
    answer:
      'Não. As amostras mostram estilo e estrutura possíveis. Cada cliente recebe projeto feito do zero, com copy e jornada para o público dele converter mais.',
  },
] as const;

export const PAIN_POINTS = [
  {
    title: 'Lead esfria no WhatsApp',
    desc: 'Sem resposta no timing certo, a venda vai para o concorrente.',
  },
  {
    title: 'Anúncio sem página à altura',
    desc: 'Gasta tráfego e manda o cliente para um site que não convence.',
  },
  {
    title: 'CRM parado',
    desc: 'Ferramenta paga, funil só no PowerPoint.',
  },
  {
    title: 'Site lento ou genérico',
    desc: 'Bonito no desktop, some no Google e no celular.',
  },
] as const;

export const PILLARS_SECTION = {
  eyebrow: 'Funil de execução',
  title: 'Quatro passos.',
  titleAccent: 'Vantagem antes do concorrente.',
  subtitle:
    'Raio-X, rota, obra e ritmo — com stack moderna e automação. Para quem quer operar na frente, sem promessa vazia.',
} as const;

export const DELIVERY_PILLARS = [
  {
    num: '01',
    title: 'Raio-X',
    desc: 'Mapeamos onde a receita escapa: funil, tempo de resposta e posicionamento. Você enxerga o que o mercado já faz e onde ainda dá para ultrapassar — com clareza de dono.',
  },
  {
    num: '02',
    title: 'Rota',
    desc: 'Definimos mensagem, canal e oferta para o cliente que paga melhor. Menos clique perdido, mais conversa qualificada — o funil alinhado à sua meta de faturamento.',
  },
  {
    num: '03',
    title: 'Obra',
    desc: 'Site e integrações em tecnologia de ponta: rápido no celular, rastreável no Google, pronto para anúncio. Presença que transmite autoridade antes do primeiro contato.',
  },
  {
    num: '04',
    title: 'Ritmo',
    desc: 'Automação no follow-up enquanto você atende o balcão ou a consulta. Lead não esfria; o sistema sustenta o ritmo comercial que seus concorrentes ainda fazem na mão.',
  },
] as const;

export const TECH_STACK = [
  'GOOGLE ADS',
  'META ADS',
  'GA4',
  'N8N',
  'VERCEL',
  'WHATSAPP API',
  'SUPABASE',
  'SEARCH CONSOLE',
] as const;

export const HOME_STATS = [
  { value: '347+', label: 'Operações que já passaram por nós' },
  { value: '72h', label: 'Para primeira versão no ar' },
  { value: '4.8×', label: 'Retorno médio reportado' },
  { value: '0', label: 'Meses de fidelidade obrigatória' },
] as const;

export const PERFORMANCE_CARDS = [
  {
    tag: 'Velocidade',
    title: 'No ar em 72h',
    desc: 'Primeira versão publicada rápido — para você testar mercado, não esperar reunião eterna.',
  },
  {
    tag: 'Integração',
    title: 'Tudo conversando',
    desc: 'WhatsApp, formulário, CRM e métricas no mesmo fluxo. Menos planilha, mais venda.',
  },
  {
    tag: 'Clareza',
    title: 'Número que importa',
    desc: 'Você vê de onde veio o lead e o que virou oportunidade — sem dashboard que ninguém abre.',
  },
] as const;

export const VIDEO_SHOWCASE = [
  { id: 'funil', caption: 'Funil · clique até o CRM', srcKey: 'salesFunnel' as const },
  { id: 'revenue', caption: 'Faturamento · previsibilidade', srcKey: 'manifesto' as const },
  { id: 'automacao', caption: 'Automação · WhatsApp e n8n', srcKey: 'performance' as const },
  { id: 'equipe', caption: 'Vendas · time alinhado', srcKey: 'salesTeam' as const },
] as const;

export const TRUST_STATS = [
  { value: '72h', label: '1ª versão' },
  { value: '4.8×', label: 'Retorno médio' },
  { value: '24h', label: 'Resposta' },
] as const;

export const HOME_NICHES = [
  { title: 'Clínicas & Estética', imgKey: 'saude' as const, to: '/saude' },
  { title: 'Restaurantes & Bares', imgKey: 'restaurante' as const, to: '/projetos' },
  { title: 'Lojas & Varejo', imgKey: 'comercio' as const, to: '/projetos' },
  { title: 'Serviços & B2B', imgKey: 'servicos' as const, to: '/negocios' },
  { title: 'Imobiliário', imgKey: 'imobiliaria' as const, to: '/projetos' },
  { title: 'Academias & Studios', imgKey: 'academia' as const, to: '/projetos' },
] as const;

export const SALES_HIGHLIGHTS = [
  { title: 'Faturamento previsível', imgKey: 'revenue' as const },
  { title: 'Lucro com clareza', imgKey: 'profit' as const },
  { title: 'Crescimento mensurável', imgKey: 'growth' as const },
] as const;
