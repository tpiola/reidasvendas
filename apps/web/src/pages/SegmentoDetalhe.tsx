import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { PremiumButton } from '@/components/PremiumButton';
import { Reveal, SectionLabel } from '@/hooks/useAnimation';
import { BRAND } from '@/lib/brand';

type FAQ = { q: string; a: string };
type Segmento = {
  slug: string;
  nome: string;
  dor: string[];
  solucaoRecomendada: string[];
  arquiteturaRef: string;
  faq: FAQ[];
  prova?: string;
};

const SEGMENTOS: Segmento[] = [
  {
    slug: 'clinicas',
    nome: 'clínicas e saúde',
    dor: [
      'O paciente costuma pesquisar especialidades, profissionais e reputação antes de considerar um agendamento.',
      'Informações incompletas sobre atendimento, localização e convênios podem comprometer a confiança inicial.',
      'Uma jornada difícil no celular transforma a intenção de agendar em abandono.',
      'Quando o WhatsApp demora ou não organiza a demanda, oportunidades de agendamento podem ser perdidas.',
    ],
    solucaoRecomendada: [
      'Site principal com especialidades, equipe, localização e orientações ao paciente',
      'Seção de serviços e procedimentos descritos com clareza e responsabilidade',
      'Prova social baseada apenas em avaliações e credenciais que possam ser verificadas',
      'WhatsApp contextualizado por especialidade ou unidade',
      'Formulário de pré-atendimento com coleta mínima de dados',
      'Google Maps integrado e informações locais consistentes',
      'Automação para confirmação de recebimento e encaminhamento',
      'Painel ou CRM para acompanhar solicitações, sem substituir o sistema clínico',
    ],
    arquiteturaRef: 'Uma página principal apresenta a clínica, especialidades, profissionais e diferenciais comprováveis. Páginas específicas aprofundam cada área, respondem dúvidas e conduzem ao agendamento. WhatsApp e formulário registram a origem e o assunto do contato; uma camada simples de automação confirma o recebimento e encaminha a solicitação à equipe responsável, respeitando privacidade e LGPD.',
    faq: [
      { q: 'O site pode ter agendamento online?', a: 'Sim. Podemos integrar uma agenda existente ou avaliar um fluxo novo. Regras, disponibilidade, custos e tratamento de dados são definidos antes da implementação.' },
      { q: 'É possível apresentar profissionais e especialidades?', a: 'Sim. Organizamos formação, registros, áreas de atuação e informações autorizadas pela clínica, observando as regras de comunicação aplicáveis.' },
      { q: 'A automação substitui a recepção?', a: 'Não. Ela pode confirmar o contato e organizar o encaminhamento, enquanto dúvidas clínicas e situações sensíveis permanecem com profissionais responsáveis.' },
    ],
    prova: 'Referência de abordagem: para clínicas e saúde, o padrão prioriza confiança (profissionais, registros, diferenciais), contato facilitado e fluxo de agendamento sem fricção, sempre observando regras de comunicação em saúde.',
  },
  {
    slug: 'odontologia',
    nome: 'odontologia',
    dor: [
      'A busca por dentistas tem forte componente local e frequentemente começa no celular.',
      'O paciente precisa perceber autoridade, segurança e transparência antes de iniciar uma conversa.',
      'Descrições genéricas de tratamentos dificultam entender se a clínica atende à necessidade pesquisada.',
      'Contato escondido ou agendamento confuso adiciona atrito em uma decisão que já pode gerar ansiedade.',
    ],
    solucaoRecomendada: [
      'Site principal para apresentar clínica, equipe e áreas de atendimento',
      'Seção de serviços com explicações acessíveis e sem promessas indevidas',
      'Prova social e credenciais publicadas com autorização e contexto',
      'WhatsApp com mensagem inicial orientada ao tipo de atendimento',
      'Formulário breve para solicitação de avaliação',
      'Google Maps, horários e dados de contato consistentes',
      'Automação de confirmação e distribuição das solicitações',
      'Painel ou CRM simples para acompanhar novos contatos e retornos',
    ],
    arquiteturaRef: 'A arquitetura parte de uma página institucional e distribui os principais tratamentos em páginas próprias, conectadas a informações da equipe, localização, dúvidas e chamada para avaliação. Os contatos chegam por WhatsApp ou formulário com contexto suficiente para a recepção priorizar e acompanhar cada retorno.',
    faq: [
      { q: 'Podemos mostrar fotos de antes e depois?', a: 'Somente quando o conteúdo, a autorização e a forma de publicação estiverem de acordo com as normas profissionais vigentes. A clínica é responsável pela validação final.' },
      { q: 'O site integra com a agenda da clínica?', a: 'A integração pode ser avaliada conforme o sistema utilizado e as APIs disponíveis. Quando não houver integração adequada, estruturamos um fluxo de solicitação de horário.' },
      { q: 'O projeto inclui presença local?', a: 'Podemos alinhar site, localização e dados públicos para reduzir inconsistências. Isso melhora a clareza da presença local, mas não representa garantia de posicionamento.' },
    ],
    prova: 'Referência de abordagem: para odontologia, o padrão organiza autoridade, especialidades, estrutura do consultório e um caminho de agendamento/contato simples, priorizando a experiência no celular e a presença local.',
  },
  {
    slug: 'estetica',
    nome: 'estética',
    dor: [
      'O cliente pesquisa uma empresa de estética em que possa confiar antes de informar dados ou agendar.',
      'Sem uma apresentação clara, pode ser difícil comparar serviços, profissionais, cuidados e localização.',
      'Imagens sem contexto ou alegações exageradas enfraquecem a credibilidade em vez de fortalecê-la.',
      'Uma jornada longa entre descoberta, dúvida e agenda faz o interesse esfriar.',
    ],
    solucaoRecomendada: [
      'Site principal com posicionamento, equipe, ambiente e formas de atendimento',
      'Seção de serviços organizada por necessidade e com informações responsáveis',
      'Prova social autorizada, contextualizada e sem manipulação',
      'WhatsApp com atalhos para dúvidas e solicitação de avaliação',
      'Formulário de interesse com poucos campos',
      'Google Maps, horário e acesso em destaque',
      'Automação para confirmação, triagem inicial e lembretes consentidos',
      'Painel ou CRM para organizar avaliações, retornos e etapas comerciais',
    ],
    arquiteturaRef: 'A página principal direciona o visitante por necessidades e não apenas por nomes técnicos. Cada serviço reúne indicação geral, cuidados, equipe habilitada, perguntas frequentes e próximo passo. Formulário e WhatsApp alimentam um fluxo de acompanhamento, com consentimento e intervenção humana nos pontos que exigem orientação individual.',
    faq: [
      { q: 'O site pode receber pedidos de agendamento?', a: 'Sim. O visitante pode solicitar um horário ou usar uma agenda integrada, conforme a operação e a ferramenta disponível.' },
      { q: 'Vocês ajudam a organizar os serviços?', a: 'Sim. Estruturamos categorias e textos a partir de informações reais, que devem ser revisadas pelos responsáveis técnicos do negócio.' },
      { q: 'É possível automatizar lembretes?', a: 'É possível em cenários compatíveis com as ferramentas utilizadas e com o consentimento do contato. O escopo é validado no diagnóstico.' },
    ],
    prova: 'Referência de abordagem: para estética, o padrão equilibra apresentação de serviços, portfólio visual, diferenciais e agendamento online, com cuidado para não prometer resultados.',
  },
  {
    slug: 'restaurantes',
    nome: 'restaurantes',
    dor: [
      'Antes de escolher, o cliente procura cardápio, fotos, avaliações, horários e rota.',
      'Cardápios ilegíveis no celular ou desatualizados criam dúvida sobre itens, preços e disponibilidade.',
      'A ausência de informações claras sobre reservas, retirada ou entrega reduz a chance de conversão.',
      'Perfis e canais com horários divergentes aumentam o risco de uma experiência frustrante.',
    ],
    solucaoRecomendada: [
      'Site ou página principal com proposta, horários e modalidades de atendimento',
      'Seção de cardápio e serviços fácil de consultar no celular',
      'Prova social legítima e galeria de fotos reais do ambiente e dos pratos',
      'WhatsApp com contexto para reserva, retirada ou dúvidas',
      'Formulário de reserva ou evento, quando fizer sentido',
      'Google Maps e informações locais atualizadas',
      'Automação para confirmar solicitações e encaminhar pedidos',
      'Painel ou CRM leve para reservas, eventos e contatos recorrentes',
    ],
    arquiteturaRef: 'A página inicial coloca cardápio, horário, localização e ação principal ao alcance imediato. Páginas ou blocos específicos explicam salão, reservas, delivery e eventos. A origem dos contatos é identificada e cada solicitação segue ao responsável adequado, evitando misturar reservas, pedidos e dúvidas em uma única fila sem contexto.',
    faq: [
      { q: 'O cardápio pode ser atualizado pela equipe?', a: 'Sim. Podemos prever uma área de gestão ou integrar uma fonte existente, dependendo da frequência de atualização e da solução escolhida.' },
      { q: 'O site substitui os aplicativos de delivery?', a: 'Não necessariamente. Ele pode centralizar informações e conectar canais próprios ou parceiros, conforme a estratégia e a operação do restaurante.' },
      { q: 'É possível receber reservas online?', a: 'Sim. O fluxo pode registrar uma solicitação ou integrar uma agenda. A confirmação deve seguir a capacidade e as regras definidas pelo restaurante.' },
    ],
    prova: 'Referência de abordagem: para restaurantes, o padrão reúne cardápio, fotos, horários, endereço, rota e canais de pedido/reserva em um só lugar claro, reduzindo dúvidas que hoje afastam clientes.',
  },
  {
    slug: 'oficinas-mecanicas',
    nome: 'oficinas mecânicas',
    dor: [
      'O cliente procura orçamento e rapidez, mas também precisa entender quais serviços a oficina realiza.',
      'A confiança depende de sinais concretos como localização, equipe, processo e avaliações legítimas.',
      'Pedidos sem dados básicos do veículo geram várias mensagens antes mesmo de uma avaliação inicial.',
      'Um WhatsApp sem triagem mistura orçamentos, acompanhamentos e dúvidas, dificultando o atendimento.',
    ],
    solucaoRecomendada: [
      'Site principal com especialidades, área atendida e processo da oficina',
      'Seção de serviços organizada por manutenção, diagnóstico e reparo',
      'Prova social legítima, estrutura e qualificações verificáveis',
      'WhatsApp com mensagem contextualizada para cada tipo de solicitação',
      'Formulário de orçamento com veículo, serviço e preferência de contato',
      'Google Maps, horários e referências de acesso',
      'Automação para confirmar recebimento e separar novos pedidos de acompanhamentos',
      'Painel ou CRM para etapa, responsável e retorno de cada contato',
    ],
    arquiteturaRef: 'A página principal esclarece perfil da oficina, serviços, processo e localização. Páginas de serviços capturam buscas específicas e levam a um formulário objetivo. Os dados entram em um painel por tipo de demanda, permitindo que a equipe responda com contexto e sem tratar uma solicitação digital como diagnóstico definitivo.',
    faq: [
      { q: 'O formulário gera um orçamento final?', a: 'Não. Ele coleta contexto para a oficina avaliar o pedido. Valores e diagnósticos dependem das regras do negócio e, frequentemente, de inspeção do veículo.' },
      { q: 'Podemos separar clientes novos de acompanhamentos?', a: 'Sim. O fluxo pode classificar o assunto e encaminhar cada conversa, reduzindo a mistura de demandas no atendimento.' },
      { q: 'O site pode mostrar marcas atendidas?', a: 'Sim, desde que as informações sejam verdadeiras e não sugiram vínculo oficial inexistente com fabricantes.' },
    ],
    prova: 'Referência de abordagem: para oficinas, o padrão organiza os serviços, como funciona o orçamento e o contato pelo WhatsApp, deixando claro o que é analisado antes de qualquer proposta.',
  },
  {
    slug: 'pet-shop',
    nome: 'pet shops',
    dor: [
      'O tutor busca serviços próximos, contato fácil e sinais de cuidado antes de confiar o animal à empresa.',
      'Informações dispersas sobre banho, tosa, horários e requisitos aumentam o volume de dúvidas repetidas.',
      'Sem uma agenda clara, pedidos podem se perder entre mensagens e mudanças de horário.',
      'Uma apresentação genérica não evidencia equipe, ambiente, rotina e serviços disponíveis.',
    ],
    solucaoRecomendada: [
      'Site principal com serviços, equipe, ambiente e orientações aos tutores',
      'Seção de banho, tosa e demais serviços com requisitos claros',
      'Prova social autorizada e fotos reais do espaço',
      'WhatsApp com assunto e dados iniciais do pet',
      'Formulário para solicitação de agendamento',
      'Google Maps, área atendida e horários consistentes',
      'Automação de confirmação e lembretes com consentimento',
      'Painel ou CRM para agenda, retornos e histórico operacional necessário',
    ],
    arquiteturaRef: 'O visitante conhece serviços, estrutura, cuidados e localização antes de solicitar um horário. O fluxo de agendamento coleta apenas dados úteis do tutor e do pet, confirma o recebimento e organiza a revisão da equipe. Informações sensíveis ou orientações veterinárias não são delegadas a respostas automáticas.',
    faq: [
      { q: 'É possível agendar banho e tosa pelo site?', a: 'Sim. A solução pode solicitar um horário ou consultar disponibilidade, dependendo da agenda e das regras operacionais do pet shop.' },
      { q: 'O cliente recebe lembrete?', a: 'Podemos configurar lembretes em ferramentas compatíveis, respeitando consentimento, políticas do canal e possibilidade de reagendamento.' },
      { q: 'Podemos apresentar todos os serviços?', a: 'Sim. Organizamos os serviços por categoria e registramos requisitos, limites e orientações fornecidos pela equipe responsável.' },
    ],
    prova: 'Referência de abordagem: para pet shops e petshops, o padrão apresenta serviços (banho, tosa, produtos), diferenciais de cuidado e um caminho simples para agendamento e contato.',
  },
  {
    slug: 'advocacia',
    nome: 'advocacia',
    dor: [
      'Quem pesquisa um advogado procura autoridade, confiança e clareza sobre áreas de atuação.',
      'Textos genéricos dificultam reconhecer se o escritório atende ao contexto buscado.',
      'Exposição inadequada de casos ou promessas de êxito pode comprometer credibilidade e conformidade.',
      'Um contato sem triagem mínima gera conversas sem contexto e aumenta o tempo até o encaminhamento correto.',
    ],
    solucaoRecomendada: [
      'Site institucional com escritório, profissionais e áreas de atuação',
      'Seção de serviços jurídicos com conteúdo informativo e responsável',
      'Prova de autoridade baseada em credenciais e conteúdo permitido',
      'WhatsApp com aviso de privacidade e assunto inicial',
      'Formulário de contato com coleta mínima e sem exposição desnecessária',
      'Google Maps e canais oficiais consistentes',
      'Automação apenas para confirmação e encaminhamento administrativo',
      'Painel ou CRM com acesso controlado para acompanhar contatos',
    ],
    arquiteturaRef: 'A página institucional estabelece identidade, equipe e canais oficiais. As áreas de atuação possuem páginas educativas que esclarecem escopo sem criar expectativa de resultado. O contato coleta o mínimo necessário, informa limites do canal e segue para análise humana, com controles de acesso e tratamento compatível com a confidencialidade.',
    faq: [
      { q: 'O conteúdo respeita as regras da advocacia?', a: 'A redação evita promessa de resultado e captação indevida. Todo conteúdo deve passar pela validação do escritório conforme as normas vigentes.' },
      { q: 'O formulário pode receber documentos?', a: 'A necessidade deve ser avaliada com cuidado. Priorizamos coleta mínima, segurança e um canal apropriado; anexos não são habilitados por padrão.' },
      { q: 'A resposta automática oferece orientação jurídica?', a: 'Não. A automação apenas confirma o contato e informa o próximo passo. A análise jurídica permanece com o profissional habilitado.' },
    ],
    prova: 'Referência de abordagem: para escritórios de advocacia, o padrão constrói autoridade com conteúdo responsável e áreas de atuação claras, mantendo um contato com coleta mínima e encaminhamento ético.',
  },
  {
    slug: 'imobiliarias',
    nome: 'imobiliárias',
    dor: [
      'A vitrine de imóveis precisa ser fácil de explorar e permanecer coerente com a disponibilidade real.',
      'Filtros ruins e páginas incompletas fazem o interessado abandonar antes de pedir informações.',
      'A captação sem identificação do imóvel ou objetivo gera leads difíceis de atender.',
      'Confiança em corretores, imobiliária e processo pesa na decisão de iniciar uma negociação.',
    ],
    solucaoRecomendada: [
      'Site principal com posicionamento, regiões e atalhos para imóveis',
      'Vitrine de imóveis e seção de serviços para compra, locação e captação',
      'Prova social, registros e informações institucionais verificáveis',
      'WhatsApp com código do imóvel e origem da conversa',
      'Formulários específicos para interesse e cadastro de imóvel',
      'Google Maps e páginas por região quando houver conteúdo útil',
      'Automação para distribuição, confirmação e tarefas de retorno',
      'Painel ou CRM para imóveis, leads, corretores e etapas',
    ],
    arquiteturaRef: 'A home conecta busca de imóveis, regiões e serviços. Cada imóvel possui página própria com dados, mídia, localização compatível com a estratégia e chamada contextualizada. Formulários de interesse e captação alimentam um CRM com origem, imóvel e responsável, enquanto integrações mantêm o catálogo alinhado ao sistema adotado pela imobiliária.',
    faq: [
      { q: 'O catálogo integra com o sistema da imobiliária?', a: 'A viabilidade depende do sistema, da documentação e das APIs disponíveis. Confirmamos sincronização, limites e responsabilidades antes da proposta.' },
      { q: 'É possível captar proprietários e compradores?', a: 'Sim. Criamos jornadas e formulários diferentes para cada intenção, evitando misturar demandas e permitindo encaminhamento adequado.' },
      { q: 'O site mantém a disponibilidade automaticamente?', a: 'Somente quando há uma fonte integrada e confiável. Sem integração, definimos uma rotina de atualização e sinalizamos a necessidade de confirmação.' },
    ],
    prova: 'Referência de abordagem: para imobiliárias, o padrão organiza vitrine de imóveis, filtros, informações de processo e captação de interessados com clareza sobre disponibilidade e próximos passos.',
  },
  {
    slug: 'escolas-e-cursos',
    nome: 'escolas e cursos',
    dor: [
      'Famílias e alunos precisam entender proposta, metodologia, calendário e processo de matrícula antes do contato.',
      'Informações espalhadas entre redes sociais e mensagens aumentam dúvidas e retrabalho da secretaria.',
      'Uma matrícula longa ou pouco adaptada ao celular pode interromper uma intenção já qualificada.',
      'A área do aluno precisa separar comunicação pública de conteúdos e dados restritos.',
    ],
    solucaoRecomendada: [
      'Site principal com proposta pedagógica, cursos, equipe e calendário',
      'Seção de serviços e páginas específicas para cada curso ou nível',
      'Prova social autorizada e informações institucionais verificáveis',
      'WhatsApp com contexto por curso, unidade ou etapa de matrícula',
      'Formulário de interesse ou matrícula online por etapas',
      'Google Maps para unidades, horários e canais oficiais',
      'Automação de confirmação, documentos pendentes e encaminhamento',
      'Painel ou CRM e área do aluno com perfis de acesso definidos',
    ],
    arquiteturaRef: 'A área pública organiza proposta, cursos, calendário, estrutura e dúvidas de responsáveis. Cada oferta leva a uma captação específica e, quando adequado, a uma matrícula por etapas. A área do aluno fica protegida e separada do conteúdo institucional; contatos e pendências são acompanhados em painel com acesso conforme a função da equipe.',
    faq: [
      { q: 'É possível fazer matrícula online?', a: 'Sim. Primeiro mapeamos campos, documentos, consentimentos e validações para definir se o fluxo será uma pré-matrícula ou matrícula completa.' },
      { q: 'O projeto pode incluir área do aluno?', a: 'Sim. Perfis, conteúdos, integrações e requisitos de segurança precisam ser especificados para estimar o escopo adequado.' },
      { q: 'Podemos separar contatos por curso ou unidade?', a: 'Sim. Formulários e WhatsApp podem preservar essa origem e encaminhar o contato ao responsável correspondente.' },
    ],
    prova: 'Referência de abordagem: para escolas e cursos, o padrão facilita a matrícula, apresenta a grade e diferenciais, e oferece canais claros para famílias e alunos obterem respostas.',
  },
  {
    slug: 'servicos-locais',
    nome: 'serviços locais',
    dor: [
      'Quem precisa de um serviço local normalmente procura disponibilidade, confiança e uma forma rápida de pedir orçamento.',
      'Sem páginas claras, o cliente não sabe se a empresa atende ao serviço ou à região necessária.',
      'Perfis com dados inconsistentes dificultam aparecer de forma útil na busca local e geram insegurança.',
      'Pedidos sem fotos, local ou descrição mínima alongam a conversa e atrasam a avaliação.',
    ],
    solucaoRecomendada: [
      'Site ou página principal com serviço, área atendida e processo',
      'Seção de serviços com páginas específicas para demandas relevantes',
      'Prova social real, portfólio autorizado e credenciais verificáveis',
      'WhatsApp com mensagem contextualizada por serviço',
      'Formulário de orçamento com informações essenciais',
      'Google Maps ou configuração de área de serviço e dados consistentes',
      'Automação de confirmação, classificação e encaminhamento',
      'Painel ou CRM simples para propostas, retornos e status',
    ],
    arquiteturaRef: 'A página principal deixa claro o que a empresa faz, onde atende e como funciona o orçamento. Páginas de serviço respondem às principais intenções de busca e direcionam a formulários objetivos. Cada solicitação chega com origem e contexto, é distribuída ao responsável e permanece visível até o retorno, sem prometer disponibilidade ou preço antes da avaliação.',
    faq: [
      { q: 'O site ajuda a aparecer na busca local?', a: 'Uma estrutura clara e dados consistentes criam uma base adequada para presença local, mas o posicionamento depende de vários fatores e não pode ser garantido.' },
      { q: 'O cliente pode enviar informações para orçamento?', a: 'Sim. Definimos campos úteis para o tipo de serviço e evitamos solicitar dados desnecessários no primeiro contato.' },
      { q: 'Atendo várias cidades. Isso pode ser mostrado?', a: 'Sim. A área atendida pode ser apresentada de forma honesta, com páginas regionais apenas quando houver conteúdo real e útil para cada localidade.' },
    ],
    prova: 'Referência de abordagem: para serviços locais, o padrão deixa claro o que você faz, para quem, como orçar e como iniciar o contato — reduzindo a fricção entre busca e mensagem.',
  },
];

const containerClass = 'mx-auto max-w-7xl px-4 sm:px-6';
const sectionClass = 'py-16 sm:py-24';

function SegmentoFallback() {
  return (
    <main className="min-h-screen bg-background pb-24 pt-32 text-text-primary">
      <div className={containerClass}>
        <Reveal><SectionLabel>Segmento não encontrado</SectionLabel></Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-6xl">Encontre uma solução para o seu tipo de negócio.</h1>
          <p className="mt-5 max-w-2xl leading-7 text-text-secondary">O endereço acessado não corresponde a um segmento publicado. Escolha uma opção ou solicite um diagnóstico para avaliarmos o seu contexto.</p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SEGMENTOS.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.03}>
              <Link to={`/segmentos/${item.slug}`} className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-text-primary/[0.08] bg-surface-2 p-6 transition hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                <span className="font-serif text-xl font-bold">{item.nome}</span>
                <ArrowRight className="h-5 w-5 shrink-0 text-gold transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <PremiumButton href="/diagnostico">Receber diagnóstico gratuito <ArrowRight className="h-4 w-4" /></PremiumButton>
        </div>
      </div>
    </main>
  );
}

export default function SegmentoDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const segmento = SEGMENTOS.find((item) => item.slug === slug);

  useEffect(() => {
    document.title = segmento
      ? `Soluções digitais para ${segmento.nome} | Rei das Vendas`
      : 'Segmentos atendidos | Rei das Vendas';
  }, [segmento]);

  if (!segmento) return <SegmentoFallback />;

  return (
    <main className="min-h-screen bg-background text-text-primary">
      <section className="relative overflow-hidden border-b border-line pb-20 pt-32 sm:pb-24 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(166,111,24,0.16),transparent_48%)]" aria-hidden="true" />
        <div className={`relative ${containerClass}`}>
          <Reveal><SectionLabel>Solução por segmento</SectionLabel></Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-5xl font-serif text-4xl font-bold leading-[1.07] sm:text-6xl lg:text-7xl">Infraestrutura digital para <span className="text-gold-light">{segmento.nome}</span> em Franca e região.</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-3xl text-base leading-8 text-text-secondary sm:text-lg">Site, funil, WhatsApp e automação construídos para transformar pesquisas em agendamentos, orçamentos ou vendas.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PremiumButton href="/diagnostico" size="lg">Receber diagnóstico para {segmento.nome} <ArrowRight className="h-4 w-4" /></PremiumButton>
              <PremiumButton href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" variant="outline" size="lg"><MessageCircle className="h-4 w-4" /> Falar no WhatsApp</PremiumButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={containerClass}>
          <Reveal>
            <SectionLabel>Diagnóstico do cenário</SectionLabel>
            <h2 className="mt-4 max-w-4xl font-serif text-3xl font-bold sm:text-5xl">A dor do {segmento.nome}.</h2>
            <p className="mt-5 max-w-3xl leading-7 text-text-secondary">Pontos de atrito comuns que precisam ser validados no contexto de cada operação.</p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {segmento.dor.map((item, index) => (
              <Reveal key={item} delay={index * 0.05} className="h-full">
                <article className="flex h-full gap-4 rounded-2xl border border-text-primary/[0.08] bg-surface-2 p-6">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <p className="leading-7 text-text-secondary">{item}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-16 sm:py-24">
        <div className={containerClass}>
          <Reveal>
            <SectionLabel>Escopo consultivo</SectionLabel>
            <h2 className="mt-4 max-w-4xl font-serif text-3xl font-bold sm:text-5xl">Solução recomendada.</h2>
            <p className="mt-5 max-w-3xl leading-7 text-text-secondary">A composição final depende do diagnóstico, das ferramentas existentes e da rotina real da equipe.</p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {segmento.solucaoRecomendada.map((item, index) => (
              <Reveal key={item} delay={index * 0.035} className="h-full">
                <article className="h-full rounded-2xl border border-text-primary/[0.08] bg-surface-3 p-6">
                  <CheckCircle2 className="h-5 w-5 text-gold" aria-hidden="true" />
                  <p className="mt-4 text-sm leading-7 text-text-secondary">{item}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={`${containerClass} grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]`}>
          <Reveal>
            <SectionLabel>Estrutura sugerida</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold sm:text-5xl">Arquitetura de referência.</h2>
          </Reveal>
          <Reveal delay={0.1} className="rounded-3xl border border-[rgba(166,111,24,0.2)] bg-[rgba(166,111,24,0.05)] p-7 sm:p-10">
            <p className="text-base leading-8 text-text-secondary sm:text-lg">{segmento.arquiteturaRef}</p>
            <p className="mt-5 border-t border-text-primary/[0.08] pt-5 text-sm leading-7 text-text-secondary">Esta é uma referência inicial, não um escopo fechado. Integrações, dados, responsabilidades e critérios de aceite são confirmados antes do projeto.</p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-16 sm:py-24">
        <div className={containerClass}>
          <Reveal className="rounded-3xl border border-text-primary/[0.08] bg-surface-3 p-7 sm:p-10">
            <SectionLabel>Prova</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold sm:text-5xl">Referência para este segmento.</h2>
            <p className="mt-6 text-sm leading-7 text-gold-light">
              {segmento.prova || 'Referência de abordagem: aplicamos o mesmo padrão de diagnóstico, arquitetura e integração, adaptado à realidade deste segmento. Os detalhes específicos são definidos no diagnóstico do negócio real.'}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-text-secondary">Não publicamos métricas ou depoimentos sem fonte real e autorização. O que apresentamos aqui é a referência de estrutura e processo — os números concretos do seu caso surgem no diagnóstico.</p>
          </Reveal>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <SectionLabel>Perguntas frequentes</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold sm:text-5xl">Antes de definir o projeto.</h2>
          </Reveal>
          <div className="mt-9 divide-y divide-text-primary/[0.1] border-y border-text-primary/[0.1]">
            {segmento.faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-serif text-lg font-bold marker:content-none sm:text-xl">
                  {item.q}
                  <span className="text-2xl font-light text-gold transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-3xl pb-2 pt-4 text-sm leading-7 text-text-secondary sm:text-base">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(166,111,24,0.12),transparent_52%)]" aria-hidden="true" />
        <Reveal className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <SectionLabel>Próximo passo</SectionLabel>
          <h2 className="mt-5 font-serif text-3xl font-bold leading-tight sm:text-5xl">Receber diagnóstico gratuito para seu negócio em {segmento.nome}.</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-text-secondary">Vamos avaliar presença atual, jornada de contato e prioridades antes de recomendar ferramentas ou escopo.</p>
          <div className="mt-8"><PremiumButton href="/diagnostico" size="lg">Receber diagnóstico gratuito <ArrowRight className="h-4 w-4" /></PremiumButton></div>
        </Reveal>
      </section>
    </main>
  );
}
