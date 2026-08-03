import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageCircle, XCircle } from 'lucide-react';
import { PremiumButton } from '@/components/PremiumButton';
import { Reveal, SectionLabel } from '@/hooks/useAnimation';
import { BRAND } from '@/lib/brand';

type Processo = { num: string; titulo: string; texto: string };
type Pergunta = { q: string; a: string };
type Servico = {
  slug: string;
  categoria: string;
  titulo: string;
  sub: string;
  problema: string;
  solucao: string;
  entregaveis: string[];
  beneficios: string[];
  paraQuem: string;
  paraQuemNao: string;
  processo: Processo[];
  faq: Pergunta[];
};

const SERVICOS: Servico[] = [
  {
    slug: 'site-conversao-local',
    categoria: 'Sites e conversão',
    titulo: 'Site de conversão para negócios locais.',
    sub: 'Um site construído para transformar visitas em contatos, com foco em mobile, velocidade, clareza e WhatsApp.',
    problema: 'Muitos sites até apresentam a empresa, mas deixam o visitante sem entender o diferencial, o serviço ou o próximo passo. No celular, páginas lentas e contatos escondidos aumentam a chance de abandono.',
    solucao: 'Planejamos uma jornada curta e clara: contexto, confiança, oferta e ação. A arquitetura, os textos e os pontos de contato são definidos de acordo com o que o cliente precisa saber antes de conversar com sua empresa.',
    entregaveis: ['Arquitetura de páginas orientada à jornada do cliente', 'Layout responsivo com prioridade para celular', 'Textos consultivos e chamadas para ação claras', 'Integração com WhatsApp, formulário e localização', 'Configuração técnica essencial de SEO e compartilhamento', 'Publicação, testes e orientação de manutenção'],
    beneficios: ['Apresentação profissional e coerente do negócio', 'Informações importantes fáceis de localizar', 'Menos atrito entre a visita e o primeiro contato', 'Base própria para campanhas e presença orgânica', 'Experiência consistente em celular e computador'],
    paraQuem: 'Negócios locais que precisam apresentar serviços com clareza, fortalecer a confiança e facilitar pedidos de orçamento, agendamentos ou conversas.',
    paraQuemNao: 'Empresas que buscam apenas uma página decorativa, sem participar da definição de conteúdo, diferenciais e fluxo de atendimento.',
    processo: [
      { num: '01', titulo: 'Diagnóstico', texto: 'Entendemos oferta, público, região, canais atuais e objetivo principal do site.' },
      { num: '02', titulo: 'Estratégia', texto: 'Definimos páginas, mensagens, provas disponíveis e caminhos de contato.' },
      { num: '03', titulo: 'Criação', texto: 'Desenvolvemos, revisamos e testamos a experiência em diferentes telas.' },
      { num: '04', titulo: 'Publicação', texto: 'Publicamos no domínio, validamos os contatos e orientamos os próximos passos.' },
    ],
    faq: [
      { q: 'O site já inclui versão para celular?', a: 'Sim. A experiência é planejada com prioridade para celular e revisada também em tablet e computador.' },
      { q: 'Vocês ajudam com os textos?', a: 'Sim. Organizamos e redigimos o conteúdo a partir das informações reais do negócio, sempre sujeito à sua validação.' },
      { q: 'O site garante mais vendas?', a: 'Não existe garantia responsável de vendas. O projeto reduz atritos digitais e cria uma base mais clara para apresentação e contato; o resultado também depende da oferta, atendimento e aquisição de tráfego.' },
      { q: 'Domínio e hospedagem estão incluídos?', a: 'A necessidade é avaliada no diagnóstico e os itens incluídos são descritos na proposta antes do início.' },
    ],
  },
  {
    slug: 'funis-e-automacao',
    categoria: 'Processos comerciais',
    titulo: 'Funil e automação para não perder leads.',
    sub: 'Capture, responda, organize e acompanhe contatos com automação inteligente e CRM simples.',
    problema: 'Quando os contatos ficam espalhados entre formulários, planilhas e conversas, retornos podem atrasar ou ser esquecidos. Sem etapas claras, a equipe também perde contexto sobre quem precisa de acompanhamento.',
    solucao: 'Mapeamos o processo comercial real e conectamos captura, resposta inicial, organização e acompanhamento. A automação cuida de tarefas repetitivas sem substituir o atendimento humano nos momentos que exigem contexto.',
    entregaveis: ['Mapeamento do fluxo atual de entrada e atendimento', 'Formulários e pontos de captura integrados', 'CRM simples com etapas e responsáveis', 'Mensagens automáticas de confirmação e encaminhamento', 'Alertas e tarefas de acompanhamento', 'Documentação e treinamento do fluxo'],
    beneficios: ['Contatos reunidos em um fluxo visível', 'Resposta inicial mais consistente', 'Menos tarefas manuais repetitivas', 'Contexto preservado para o atendimento', 'Processo mais fácil de acompanhar e ajustar'],
    paraQuem: 'Empresas que já recebem contatos e precisam organizar resposta, qualificação e acompanhamento sem adicionar complexidade desnecessária.',
    paraQuemNao: 'Operações sem um responsável pelo atendimento ou que esperam que a automação substitua relacionamento, proposta e decisão comercial.',
    processo: [
      { num: '01', titulo: 'Mapeamento', texto: 'Identificamos canais, etapas, responsáveis, exceções e gargalos do atendimento.' },
      { num: '02', titulo: 'Desenho do fluxo', texto: 'Definimos campos, etapas, mensagens e regras de encaminhamento.' },
      { num: '03', titulo: 'Implementação', texto: 'Configuramos integrações e validamos cenários com dados de teste.' },
      { num: '04', titulo: 'Adoção', texto: 'Treinamos a equipe, acompanhamos o uso inicial e refinamos o processo.' },
    ],
    faq: [
      { q: 'Preciso trocar todas as ferramentas?', a: 'Não necessariamente. Primeiro avaliamos o que já existe e priorizamos integrações que reduzam custo e ruptura operacional.' },
      { q: 'A automação responde tudo sozinha?', a: 'Não. Ela pode confirmar recebimento, coletar contexto e criar tarefas, mas conversas consultivas continuam com a equipe.' },
      { q: 'É possível integrar formulários e WhatsApp?', a: 'Em muitos cenários, sim. A viabilidade depende das ferramentas, permissões e APIs disponíveis e é confirmada antes da proposta.' },
      { q: 'Como os dados dos contatos são tratados?', a: 'O fluxo é desenhado para coletar apenas o necessário, com acessos definidos e orientação sobre consentimento e retenção.' },
    ],
  },
  {
    slug: 'aplicativos-e-saas',
    categoria: 'Software sob medida',
    titulo: 'Aplicativos e sistemas sob medida para operações locais.',
    sub: 'Agendamento, painéis, atendimento, controle interno e integrações construídos para o seu modelo de negócio.',
    problema: 'Planilhas desconectadas e ferramentas genéricas podem criar retrabalho, duplicidade e pouca visibilidade da operação. Ao mesmo tempo, desenvolver sem validar o processo aumenta custo e risco.',
    solucao: 'Começamos pelo problema operacional e validamos o menor escopo útil antes de ampliar. O sistema é desenhado para a rotina, os perfis de acesso e as integrações realmente necessárias.',
    entregaveis: ['Descoberta e especificação funcional', 'Protótipo dos fluxos principais', 'Aplicação web responsiva', 'Perfis de acesso e regras de permissão', 'Integrações priorizadas no escopo', 'Testes, documentação e plano de evolução'],
    beneficios: ['Fluxos adaptados à operação real', 'Informação centralizada e mais acessível', 'Redução de etapas manuais evitáveis', 'Evolução organizada por prioridade', 'Maior rastreabilidade das atividades'],
    paraQuem: 'Operações com um problema recorrente e bem identificado que não é atendido adequadamente pelas ferramentas disponíveis.',
    paraQuemNao: 'Quem pretende construir uma plataforma ampla sem validar usuários, processo, prioridade e orçamento de manutenção.',
    processo: [
      { num: '01', titulo: 'Descoberta', texto: 'Entrevistamos envolvidos e registramos regras, dados, riscos e objetivo operacional.' },
      { num: '02', titulo: 'Protótipo', texto: 'Validamos os fluxos essenciais antes de investir no desenvolvimento completo.' },
      { num: '03', titulo: 'Construção', texto: 'Entregamos por etapas testáveis, com revisões frequentes do responsável.' },
      { num: '04', titulo: 'Operação', texto: 'Publicamos, documentamos, monitoramos e priorizamos melhorias futuras.' },
    ],
    faq: [
      { q: 'Vocês criam aplicativo para lojas de celular?', a: 'O formato depende do uso. Muitas operações são melhor atendidas por uma aplicação web responsiva; aplicativos nativos são avaliados quando há justificativa.' },
      { q: 'Quanto tempo leva?', a: 'O prazo depende do escopo, integrações e critérios de aceite. Uma estimativa é apresentada somente depois da descoberta inicial.' },
      { q: 'Posso começar com uma versão menor?', a: 'Sim. Recomendamos priorizar o fluxo de maior valor e validar o uso antes de expandir.' },
      { q: 'Há suporte depois da entrega?', a: 'As opções de sustentação, monitoramento e evolução são definidas de forma explícita na proposta.' },
    ],
  },
  {
    slug: 'google-e-presenca-local',
    categoria: 'Descoberta local',
    titulo: 'Google, mapa e presença local.',
    sub: 'Organize as informações da sua empresa no Google para ser encontrado facilmente em Franca e região.',
    problema: 'Endereço, horário, telefone e categoria inconsistentes geram dúvida e dificultam a decisão de quem procura uma empresa local. Perfis incompletos também deixam de responder perguntas básicas antes do contato.',
    solucao: 'Revisamos os ativos disponíveis e organizamos as informações públicas de forma consistente entre perfil, site e canais relevantes. Também orientamos uma rotina legítima de atualização e gestão de avaliações.',
    entregaveis: ['Auditoria da presença local atual', 'Revisão de categorias, serviços e dados públicos', 'Padronização de nome, endereço, telefone e horários', 'Organização de fotos e conteúdos fornecidos pela empresa', 'Integração entre perfil, mapa, site e contato', 'Orientação para publicações e avaliações'],
    beneficios: ['Informações mais confiáveis para o cliente', 'Menos dúvidas sobre localização e atendimento', 'Presença consistente entre canais', 'Base organizada para buscas locais', 'Rotina clara de manutenção do perfil'],
    paraQuem: 'Negócios com atendimento local, endereço físico ou área de serviço que precisam organizar como aparecem para clientes da região.',
    paraQuemNao: 'Empresas que buscam manipular avaliações, criar localizações falsas ou obter garantia de posição nos resultados do Google.',
    processo: [
      { num: '01', titulo: 'Auditoria', texto: 'Verificamos perfil, site, dados públicos, acessos e inconsistências encontradas.' },
      { num: '02', titulo: 'Organização', texto: 'Definimos informações oficiais, categorias e materiais que podem ser comprovados.' },
      { num: '03', titulo: 'Configuração', texto: 'Aplicamos ajustes autorizados e conectamos os principais canais.' },
      { num: '04', titulo: 'Rotina', texto: 'Entregamos orientações para manter dados, fotos, posts e avaliações atualizados.' },
    ],
    faq: [
      { q: 'Vocês garantem a primeira posição no Google?', a: 'Não. O posicionamento depende de diversos fatores controlados pelo Google. Trabalhamos organização, consistência e boas práticas, sem promessas de ranking.' },
      { q: 'É preciso ter endereço aberto ao público?', a: 'Não em todos os casos. Negócios de área de serviço podem ter configurações específicas, respeitando as regras da plataforma.' },
      { q: 'Vocês respondem avaliações?', a: 'Podemos orientar tom, processo e modelos de resposta. A responsabilidade e aprovação final permanecem com a empresa.' },
      { q: 'Quanto tempo as alterações levam para aparecer?', a: 'Algumas são rápidas; outras passam por análise ou verificação do Google, cujo prazo não controlamos.' },
    ],
  },
  {
    slug: 'infraestrutura-digital',
    categoria: 'Tecnologia e sustentação',
    titulo: 'Infraestrutura digital.',
    sub: 'Domínio, hospedagem, segurança, performance, analytics e sustentação contínua para o seu ativo digital.',
    problema: 'Domínios sem controle, hospedagens mal configuradas e ausência de monitoramento tornam o ativo digital vulnerável a indisponibilidade e perda de acesso. Sem documentação, qualquer manutenção fica mais lenta e arriscada.',
    solucao: 'Organizamos propriedade, acessos, publicação, segurança e observabilidade de acordo com o porte do projeto. O objetivo é criar uma base compreensível, documentada e adequada à continuidade do negócio.',
    entregaveis: ['Inventário de domínio, DNS, hospedagem e acessos', 'Configuração de publicação e certificado de segurança', 'Rotinas compatíveis de backup e recuperação', 'Monitoramento essencial de disponibilidade', 'Analytics com eventos acordados no escopo', 'Documentação técnica e plano de sustentação'],
    beneficios: ['Maior clareza sobre propriedade e acessos', 'Menos dependência de configurações improvisadas', 'Base preparada para manutenção', 'Visibilidade sobre disponibilidade e uso', 'Riscos técnicos identificados e priorizados'],
    paraQuem: 'Empresas que dependem do site ou sistema e precisam profissionalizar publicação, segurança, acessos e manutenção.',
    paraQuemNao: 'Quem procura uma promessa de disponibilidade absoluta ou segurança total sem investir em manutenção, atualização e gestão de acessos.',
    processo: [
      { num: '01', titulo: 'Inventário', texto: 'Mapeamos ativos, fornecedores, acessos, dependências e responsáveis.' },
      { num: '02', titulo: 'Plano técnico', texto: 'Priorizamos riscos e definimos a arquitetura proporcional ao projeto.' },
      { num: '03', titulo: 'Configuração', texto: 'Aplicamos mudanças controladas, com validação e possibilidade de reversão.' },
      { num: '04', titulo: 'Sustentação', texto: 'Documentamos, monitoramos e estabelecemos a rotina de atualização e suporte.' },
    ],
    faq: [
      { q: 'O domínio fica em nome de quem?', a: 'Recomendamos que a empresa seja a titular e mantenha controle administrativo, com acessos técnicos delegados quando necessário.' },
      { q: 'Vocês fazem backup?', a: 'A estratégia depende da tecnologia e do provedor. Frequência, retenção e testes de recuperação são definidos no escopo.' },
      { q: 'Analytics significa rastrear tudo?', a: 'Não. Definimos eventos úteis e minimizamos coleta, respeitando consentimento e privacidade aplicáveis.' },
      { q: 'Existe garantia de que o site nunca ficará fora do ar?', a: 'Não. Nenhuma infraestrutura elimina todo risco; trabalhamos prevenção, monitoramento e resposta compatíveis com o serviço contratado.' },
    ],
  },
  {
    slug: 'integracao-whatsapp',
    categoria: 'Atendimento',
    titulo: 'Integração com WhatsApp.',
    sub: 'WhatsApp organizado, com mensagens predefinidas e automação para responder e qualificar contatos mais rápido.',
    problema: 'Links sem contexto e conversas sem padrão dificultam identificar origem e necessidade do contato. Em horários de pico, mensagens podem ficar sem triagem ou encaminhamento adequado.',
    solucao: 'Estruturamos entradas com mensagens contextualizadas, respostas iniciais e regras de encaminhamento. Quando a operação exige integrações oficiais, a viabilidade, os custos do provedor e as políticas da plataforma são validados antes da implementação.',
    entregaveis: ['Mapeamento das origens e tipos de conversa', 'Links e botões com mensagens contextualizadas', 'Biblioteca de respostas rápidas', 'Fluxo inicial de triagem e encaminhamento', 'Integrações previstas e tecnicamente validadas', 'Treinamento e boas práticas de atendimento'],
    beneficios: ['Mais contexto no início da conversa', 'Respostas recorrentes mais consistentes', 'Encaminhamento claro entre responsáveis', 'Menos digitação repetitiva', 'Atendimento organizado sem perder o tom humano'],
    paraQuem: 'Negócios que usam WhatsApp como canal relevante e precisam padronizar entradas, triagem e encaminhamento.',
    paraQuemNao: 'Quem pretende enviar mensagens não solicitadas, burlar políticas da plataforma ou automatizar conversas sensíveis sem supervisão humana.',
    processo: [
      { num: '01', titulo: 'Diagnóstico', texto: 'Analisamos volume, origens, dúvidas frequentes, equipe e ferramentas existentes.' },
      { num: '02', titulo: 'Roteiro', texto: 'Definimos mensagens, campos mínimos, limites da automação e transferências.' },
      { num: '03', titulo: 'Integração', texto: 'Configuramos os pontos aprovados e testamos cenários comuns e exceções.' },
      { num: '04', titulo: 'Operação', texto: 'Treinamos responsáveis e ajustamos o fluxo a partir do uso observado.' },
    ],
    faq: [
      { q: 'É usado o WhatsApp oficial?', a: 'Quando o projeto exige API, priorizamos soluções compatíveis com os recursos e políticas oficiais. A opção adequada é confirmada no diagnóstico.' },
      { q: 'Há custos além do projeto?', a: 'Podem existir custos do provedor, número, plataforma ou conversas. Esses valores precisam ser confirmados com os fornecedores antes da contratação.' },
      { q: 'Posso continuar atendendo manualmente?', a: 'Sim. A automação pode organizar o início e transferir a conversa para uma pessoa quando necessário.' },
      { q: 'Vocês fazem disparos em massa?', a: 'Não implementamos práticas de spam ou fluxos que desrespeitem consentimento e políticas da plataforma.' },
    ],
  },
];

const sectionClass = 'py-16 sm:py-24';
const containerClass = 'mx-auto max-w-7xl px-4 sm:px-6';

function ServicoFallback() {
  return (
    <main className="min-h-screen bg-[#030303] pb-24 pt-32 text-white">
      <div className={containerClass}>
        <Reveal><SectionLabel>Serviço não encontrado</SectionLabel></Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-bold sm:text-6xl">Conheça as soluções disponíveis.</h1>
          <p className="mt-5 max-w-2xl leading-7 text-[#A1A1AA]">O endereço acessado não corresponde a um serviço publicado. Escolha uma das opções abaixo ou solicite um diagnóstico para identificar a prioridade do seu negócio.</p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {SERVICOS.map((item) => (
            <Link key={item.slug} to={`/servicos/${item.slug}`} className="group rounded-2xl border border-white/[0.08] bg-[#090909] p-6 transition hover:border-[#D6A84F]/50">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#D6A84F]">{item.categoria}</span>
              <h2 className="mt-3 font-serif text-2xl font-bold">{item.titulo}</h2>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-[#F2D38A]">Ver detalhes <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
        <div className="mt-10"><PremiumButton href="/diagnostico">Receber diagnóstico gratuito <ArrowRight className="h-4 w-4" /></PremiumButton></div>
      </div>
    </main>
  );
}

export default function ServicoDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const servico = SERVICOS.find((item) => item.slug === slug);

  useEffect(() => {
    document.title = servico ? `${servico.titulo} | Rei das Vendas` : 'Serviços disponíveis | Rei das Vendas';
  }, [servico]);

  if (!servico) return <ServicoFallback />;

  return (
    <main className="min-h-screen bg-[#030303] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.06] pb-20 pt-32 sm:pb-24 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(214,168,79,0.15),transparent_45%)]" aria-hidden="true" />
        <div className={`relative ${containerClass}`}>
          <Reveal><SectionLabel>{servico.categoria}</SectionLabel></Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-5xl font-serif text-4xl font-bold leading-[1.06] sm:text-6xl lg:text-7xl">{servico.titulo}</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[#A1A1AA] sm:text-lg">{servico.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PremiumButton href="/diagnostico">Receber diagnóstico gratuito <ArrowRight className="h-4 w-4" /></PremiumButton>
              <PremiumButton href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" variant="outline"><MessageCircle className="h-4 w-4" /> Falar no WhatsApp</PremiumButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={`${containerClass} grid gap-12 lg:grid-cols-2`}>
          <Reveal>
            <SectionLabel>O problema</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold sm:text-5xl">O que costuma travar o próximo passo.</h2>
            <p className="mt-5 text-base leading-8 text-[#A1A1AA]">{servico.problema}</p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-3xl border border-[rgba(214,168,79,0.18)] bg-[rgba(214,168,79,0.05)] p-7 sm:p-9">
            <SectionLabel>Como resolvemos</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">Estratégia antes da ferramenta.</h2>
            <p className="mt-5 text-base leading-8 text-[#A1A1AA]">{servico.solucao}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-[#080808] py-16 sm:py-24">
        <div className={containerClass}>
          <SectionLabel>Entregáveis</SectionLabel>
          <h2 className="mt-4 max-w-3xl font-serif text-3xl font-bold sm:text-5xl">Um escopo claro, definido antes do início.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {servico.entregaveis.map((item, index) => (
              <Reveal key={item} delay={index * 0.04} className="rounded-2xl border border-white/[0.08] bg-[#0C0C0C] p-6">
                <CheckCircle2 className="h-5 w-5 text-[#D6A84F]" aria-hidden="true" />
                <p className="mt-4 leading-7 text-[#D4D4D8]">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={`${containerClass} grid gap-10 lg:grid-cols-[.8fr_1.2fr]`}>
          <div>
            <SectionLabel>Benefícios</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold sm:text-5xl">O que o projeto ajuda a organizar.</h2>
          </div>
          <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {servico.beneficios.map((item) => <li key={item} className="flex gap-3 py-5 text-[#D4D4D8]"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D6A84F]" aria-hidden="true" />{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-[#080808] py-16 sm:py-24">
        <div className={`${containerClass} grid gap-5 md:grid-cols-2`}>
          <article className="rounded-3xl border border-[rgba(214,168,79,0.18)] bg-[#0C0C0C] p-7 sm:p-9">
            <CheckCircle2 className="h-7 w-7 text-[#D6A84F]" aria-hidden="true" />
            <h2 className="mt-5 font-serif text-3xl font-bold">Para quem é</h2>
            <p className="mt-4 leading-8 text-[#A1A1AA]">{servico.paraQuem}</p>
          </article>
          <article className="rounded-3xl border border-white/[0.08] bg-[#0C0C0C] p-7 sm:p-9">
            <XCircle className="h-7 w-7 text-[#71717A]" aria-hidden="true" />
            <h2 className="mt-5 font-serif text-3xl font-bold">Para quem não é</h2>
            <p className="mt-4 leading-8 text-[#A1A1AA]">{servico.paraQuemNao}</p>
          </article>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={containerClass}>
          <SectionLabel>Processo</SectionLabel>
          <h2 className="mt-4 max-w-3xl font-serif text-3xl font-bold sm:text-5xl">Quatro etapas para avançar com clareza.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {servico.processo.map((etapa) => (
              <article key={etapa.num} className="rounded-2xl border border-white/[0.08] bg-[#090909] p-6">
                <span className="text-xs font-bold tracking-[0.2em] text-[#D6A84F]">{etapa.num}</span>
                <h3 className="mt-5 font-serif text-2xl font-bold">{etapa.titulo}</h3>
                <p className="mt-3 text-sm leading-7 text-[#A1A1AA]">{etapa.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-[#080808] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionLabel>Perguntas frequentes</SectionLabel>
          <h2 className="mt-4 font-serif text-3xl font-bold sm:text-5xl">Antes de começar.</h2>
          <div className="mt-9 divide-y divide-white/[0.1] border-y border-white/[0.1]">
            {servico.faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-serif text-lg font-bold marker:content-none sm:text-xl">
                  {item.q}<span className="text-2xl font-light text-[#D6A84F] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-3xl pb-2 pt-4 text-sm leading-7 text-[#A1A1AA] sm:text-base">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <SectionLabel>Próximo passo</SectionLabel>
          <h2 className="mt-5 font-serif text-3xl font-bold sm:text-5xl">Entenda o que faz sentido para o seu negócio.</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#A1A1AA]">O diagnóstico inicial ajuda a identificar prioridades, dependências e o escopo adequado antes de qualquer proposta.</p>
          <div className="mt-8"><PremiumButton href="/diagnostico" size="lg">Receber diagnóstico gratuito <ArrowRight className="h-4 w-4" /></PremiumButton></div>
        </div>
      </section>
    </main>
  );
}
