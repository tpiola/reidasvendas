export type Faq = { question: string; answer: string };
export type ArchitectureItem = { title: string; detail: string };

export type Solution = {
  slug: string;
  title: string;
  category: string;
  audience: string;
  summary: string;
  pain: string;
  outcome: string;
  image: string;
  demonstration?: string;
  architecture: ArchitectureItem[];
  questions: Faq[];
  related: string[];
};

export const SOLUTIONS: Solution[] = [
  {
    slug: 'site-para-advogados',
    title: 'Site para advogados e escritórios de advocacia',
    category: 'Advocacia',
    audience: 'Escritórios, advogados autônomos e bancas especializadas',
    summary: 'Uma presença institucional que organiza áreas de atuação, demonstra responsabilidade técnica e encaminha contatos com contexto.',
    pain: 'Quando a pessoa chega pelo Google e encontra apenas um perfil social, ela não entende sua especialidade, sua forma de atuação nem o próximo passo adequado.',
    outcome: 'Autoridade institucional, arquitetura informativa e triagem comercial sem transformar comunicação jurídica em promessa de resultado.',
    image: '/imagens/nichos/servicos.jpg',
    architecture: [
      { title: 'Áreas de atuação com contexto', detail: 'Páginas próprias para demandas empresariais, trabalhistas, familiares ou outras especialidades efetivamente atendidas.' },
      { title: 'Triagem antes da conversa', detail: 'Formulário que identifica assunto, cidade e estágio da demanda antes do encaminhamento ao WhatsApp.' },
      { title: 'Presença local verificável', detail: 'Informações institucionais consistentes, localização e conteúdo informativo, sujeitos à revisão das regras profissionais aplicáveis.' },
      { title: 'Governança editorial', detail: 'Comunicação revisável, sem alegações de êxito garantido, sem exposição indevida e sem dados sensíveis desnecessários.' },
    ],
    questions: [
      { question: 'Um escritório pode ter páginas separadas por área de atuação?', answer: 'Sim, desde que o conteúdo seja institucional e informativo, reflita atividades reais e seja revisado conforme as normas profissionais aplicáveis.' },
      { question: 'O visitante pode ir direto para o WhatsApp?', answer: 'O fluxo recomendado começa por um diagnóstico curto. Assim, o atendimento recebe o contexto da demanda e evita conversas completamente desqualificadas.' },
    ],
    related: ['landing-page', 'automacao-whatsapp', 'site-para-contadores'],
  },
  {
    slug: 'site-para-clinicas',
    title: 'Site para clínicas e consultórios',
    category: 'Saúde',
    audience: 'Clínicas médicas, consultórios e operações multiprofissionais',
    summary: 'Uma arquitetura que apresenta especialidades, profissionais e critérios de atendimento com agendamento orientado e linguagem responsável.',
    pain: 'A agenda perde oportunidades quando especialidades, localização, formas de atendimento e canal de marcação aparecem fragmentados entre redes sociais e mensagens.',
    outcome: 'Uma jornada mais clara entre busca, confiança institucional, seleção da especialidade e pedido de agendamento.',
    image: '/imagens/nichos/saude.jpg',
    demonstration: 'clinica-premium',
    architecture: [
      { title: 'Especialidades organizadas', detail: 'Cada área recebe informações institucionais próprias, perguntas frequentes e um encaminhamento compatível com o atendimento.' },
      { title: 'Equipe e credenciais', detail: 'Apresentação de profissionais, registros e serviços efetivamente oferecidos, sem extrapolar qualificações.' },
      { title: 'Agendamento contextual', detail: 'O visitante informa especialidade e necessidade antes da transferência para o atendimento humano.' },
      { title: 'Informação responsável', detail: 'Conteúdo informativo, proteção de dados e revisão profissional: o site não oferece diagnóstico clínico.' },
    ],
    questions: [
      { question: 'É possível organizar o atendimento por especialidade?', answer: 'Sim. A arquitetura pode apresentar cada especialidade, direcionar a solicitação e preservar o atendimento final por uma equipe habilitada.' },
      { question: 'O site fornece diagnóstico médico?', answer: 'Não. A experiência organiza informações e solicitações de atendimento. Avaliação, diagnóstico e orientação de saúde permanecem sob responsabilidade profissional.' },
    ],
    related: ['site-para-dentistas', 'automacao-whatsapp', 'landing-page'],
  },
  {
    slug: 'site-para-dentistas',
    title: 'Site para dentistas e clínicas odontológicas',
    category: 'Odontologia',
    audience: 'Dentistas, clínicas odontológicas e consultórios especializados',
    summary: 'Presença digital que apresenta serviços odontológicos, orienta solicitações e facilita a decisão de agendar uma avaliação.',
    pain: 'Uma clínica perde contexto quando pacientes chegam ao atendimento sem entender quais procedimentos são oferecidos, onde fica a unidade ou como solicitar uma avaliação.',
    outcome: 'Mais clareza entre pesquisa local, apresentação institucional e encaminhamento responsável para a equipe da clínica.',
    image: '/imagens/nichos/saude.jpg',
    demonstration: 'clinica-premium',
    architecture: [
      { title: 'Procedimentos com linguagem informativa', detail: 'Páginas organizadas por serviço efetivamente prestado, evitando promessas clínicas e informações sem revisão profissional.' },
      { title: 'Pedido de avaliação', detail: 'Formulário breve registra interesse, disponibilidade e contato antes de abrir uma conversa contextualizada.' },
      { title: 'Encontrabilidade local', detail: 'Endereço, horários, referência geográfica e informações comerciais consistentes com os canais oficiais.' },
      { title: 'Experiência mobile', detail: 'Navegação objetiva para quem pesquisa pelo celular e precisa entender o próximo passo sem atrito.' },
    ],
    questions: [
      { question: 'Podemos criar páginas para tratamentos diferentes?', answer: 'Sim, quando correspondem a serviços reais e passam por revisão da equipe responsável e das normas de publicidade aplicáveis.' },
      { question: 'A marcação acontece automaticamente?', answer: 'A demonstração organiza o pedido. Integração real com agenda depende do sistema utilizado e do escopo aprovado.' },
    ],
    related: ['site-para-clinicas', 'landing-page', 'automacao-whatsapp'],
  },
  {
    slug: 'site-para-contadores',
    title: 'Site para contadores e escritórios contábeis',
    category: 'Contabilidade',
    audience: 'Escritórios contábeis, consultorias tributárias e operações B2B',
    summary: 'Uma presença institucional que explica serviços, perfis atendidos e requisitos iniciais antes da conversa comercial.',
    pain: 'Empresários encontram descrições genéricas, não entendem se seu regime ou porte é atendido e chegam ao WhatsApp sem informações suficientes para uma proposta.',
    outcome: 'Posicionamento mais preciso, qualificação por perfil empresarial e encaminhamento comercial organizado.',
    image: '/imagens/nichos/servicos.jpg',
    architecture: [
      { title: 'Serviços por perfil empresarial', detail: 'Arquiteturas específicas para abertura, rotinas contábeis, apoio fiscal e outros serviços realmente disponíveis.' },
      { title: 'Qualificação inicial', detail: 'Coleta de segmento, porte, momento e necessidade antes da transferência ao atendimento.' },
      { title: 'Conteúdo para decisão', detail: 'Respostas claras sobre documentos, processo e próximos passos, sem substituir orientação contábil personalizada.' },
      { title: 'Continuidade comercial', detail: 'Origem, intenção e serviço procurado acompanham o lead durante a conversa.' },
    ],
    questions: [
      { question: 'O formulário pode separar abertura de empresa e troca de contador?', answer: 'Sim. A triagem pode registrar o estágio do negócio e encaminhar cada solicitação com contexto específico.' },
      { question: 'É possível explicar regimes tributários no site?', answer: 'É possível oferecer conteúdo informativo. Qualquer recomendação tributária deve ser revisada e feita por um profissional habilitado.' },
    ],
    related: ['site-para-advogados', 'automacao-whatsapp', 'sistema-sob-medida'],
  },
  {
    slug: 'site-para-imobiliarias',
    title: 'Site para imobiliárias e corretores',
    category: 'Mercado imobiliário',
    audience: 'Imobiliárias, corretores independentes e incorporadoras',
    summary: 'Uma vitrine filtrável que organiza imóveis, localização, perfil do interessado e solicitação de visita.',
    pain: 'O atendimento se torna improdutivo quando o interessado recebe PDFs soltos, encontra imóveis desatualizados ou inicia conversas sem informar sua necessidade.',
    outcome: 'Busca orientada, apresentação consistente dos imóveis e conversas iniciadas com critérios comerciais relevantes.',
    image: '/imagens/nichos/comercio.jpg',
    demonstration: 'imobiliaria-premium',
    architecture: [
      { title: 'Busca por intenção', detail: 'Filtros por finalidade, tipo, região e faixa de valor, conforme o inventário disponível.' },
      { title: 'Ficha de imóvel utilizável', detail: 'Fotos, características, contexto e próximos passos claros sem inflar disponibilidade.' },
      { title: 'Pedido de visita contextual', detail: 'Interesse, imóvel e contato chegam juntos à equipe responsável pelo atendimento.' },
      { title: 'Governança do catálogo', detail: 'Processo de atualização do inventário e responsabilidades definidas desde o diagnóstico.' },
    ],
    questions: [
      { question: 'O catálogo pode integrar um sistema imobiliário existente?', answer: 'Pode, quando a plataforma disponibiliza integração compatível. A viabilidade é confirmada antes da definição do escopo.' },
      { question: 'A demonstração mostra imóveis reais?', answer: 'A arquitetura demonstrativa utiliza registros fictícios identificados como exemplo. Um projeto publicado deve usar somente imóveis autorizados e atualizados.' },
    ],
    related: ['catalogo-digital', 'landing-page', 'automacao-whatsapp'],
  },
  {
    slug: 'site-para-restaurantes',
    title: 'Site para restaurantes e operações de delivery',
    category: 'Gastronomia',
    audience: 'Restaurantes, cafeterias, dark kitchens e operações gastronômicas',
    summary: 'Cardápio digital organizado, informações de atendimento e uma jornada de pedido preparada para o canal da operação.',
    pain: 'Menus em imagem ou PDF desatualizado dificultam a escolha, aumentam dúvidas repetidas e transformam cada pedido em uma conversa do zero.',
    outcome: 'Um cardápio legível, categorias claras e um fluxo de interesse que chega ao atendimento com mais contexto.',
    image: '/imagens/nichos/comercio.jpg',
    demonstration: 'restaurante-premium',
    architecture: [
      { title: 'Cardápio navegável', detail: 'Produtos agrupados por categoria, descrições objetivas, valores quando aprovados e adaptação ao celular.' },
      { title: 'Cesta demonstrativa', detail: 'Seleção de itens e resumo do interesse antes do encaminhamento, conforme a forma de operação definida.' },
      { title: 'Informação operacional', detail: 'Horários, retirada, entrega e canais oficiais apresentados com clareza.' },
      { title: 'Atualização simples', detail: 'Estrutura de conteúdo definida para facilitar manutenção de disponibilidade e cardápio.' },
    ],
    questions: [
      { question: 'O cardápio substitui aplicativos de entrega?', answer: 'Depende da operação. Ele pode complementar canais existentes ou servir a um fluxo próprio; pagamentos, logística e integrações precisam ser definidos no escopo.' },
      { question: 'É possível compartilhar os itens selecionados?', answer: 'Sim. A arquitetura pode organizar uma mensagem contextual para o canal comercial escolhido depois de validar a jornada do restaurante.' },
    ],
    related: ['catalogo-digital', 'automacao-whatsapp', 'landing-page'],
  },
  {
    slug: 'catalogo-digital',
    title: 'Catálogo digital para empresas',
    category: 'Catálogo digital',
    audience: 'Comércios, distribuidoras, fabricantes e operações de vendas consultivas',
    summary: 'Uma vitrine atualizável que organiza produtos, categorias e pedidos de orçamento sem depender de arquivos enviados manualmente.',
    pain: 'PDFs desatualizados, fotos espalhadas no WhatsApp e listas sem contexto consomem tempo e dificultam a comparação de opções.',
    outcome: 'Um catálogo centralizado, consultável pelo celular e preparado para encaminhar produtos de interesse com contexto.',
    image: '/imagens/nichos/comercio.jpg',
    demonstration: 'representacao-comercial',
    architecture: [
      { title: 'Categorias e busca', detail: 'Organização de linhas, coleções ou famílias de produtos com pesquisa e filtragem relevantes.' },
      { title: 'Dados comerciais sob controle', detail: 'Imagens, descrições, variações e políticas de exibição de preço definidas pela empresa.' },
      { title: 'Lista de interesse', detail: 'Produtos selecionados compõem uma solicitação mais objetiva antes do atendimento.' },
      { title: 'Publicação compartilhável', detail: 'Links próprios para linhas, campanhas e contextos comerciais, sem depender de anexos.' },
    ],
    questions: [
      { question: 'Preciso mostrar preços publicamente?', answer: 'Não. O catálogo pode exibir preços, ocultá-los ou direcionar para orçamento conforme a estratégia comercial.' },
      { question: 'O catálogo funciona no celular?', answer: 'A arquitetura é concebida para consulta móvel. Integrações com estoque ou ERP dependem da disponibilidade técnica de cada sistema.' },
    ],
    related: ['catalogo-para-representantes', 'site-para-restaurantes', 'automacao-whatsapp'],
  },
  {
    slug: 'catalogo-para-representantes',
    title: 'Catálogo inteligente para representantes comerciais',
    category: 'Representação comercial',
    audience: 'Representantes, equipes externas, distribuidores e fabricantes',
    summary: 'Uma apresentação comercial que separa linhas, facilita a busca e transforma seleções em pedidos de cotação estruturados.',
    pain: 'Representantes perdem velocidade quando precisam atualizar vários PDFs, procurar referências em conversas antigas e remontar pedidos manualmente.',
    outcome: 'Um fluxo mais simples para apresentar produtos, identificar interesse e chegar ao atendimento com uma seleção organizada.',
    image: '/imagens/nichos/industria.jpg',
    demonstration: 'representacao-comercial',
    architecture: [
      { title: 'Busca por referência e categoria', detail: 'Pesquisa desenhada para a linguagem comercial de quem consulta catálogo e precisa localizar produtos rapidamente.' },
      { title: 'Múltiplas linhas de produto', detail: 'Separação por marca, coleção ou fabricante de acordo com a operação real do representante.' },
      { title: 'Cotação estruturada', detail: 'Itens selecionados, quantidades e identificação do comprador seguem juntos para a próxima etapa.' },
      { title: 'Base para microproduto', detail: 'A arquitetura pode evoluir para um produto recorrente somente depois de validar uso, demanda e modelo comercial.' },
    ],
    questions: [
      { question: 'O catálogo substitui um ERP?', answer: 'Não necessariamente. Ele resolve apresentação e intenção comercial; integração ou substituição de sistemas exige validação técnica e operacional.' },
      { question: 'Posso testar a experiência?', answer: 'Sim. A demonstração apresenta busca, filtros e seleção de itens usando produtos fictícios identificados como exemplo.' },
    ],
    related: ['catalogo-digital', 'app-para-empresas', 'sistema-sob-medida'],
  },
  {
    slug: 'landing-page',
    title: 'Landing page para campanhas e ofertas',
    category: 'Landing page',
    audience: 'Empresas com campanhas, serviços específicos ou uma oferta prioritária',
    summary: 'Uma página concentrada em uma decisão comercial, com mensagem objetiva, argumentos verificáveis e diagnóstico antes do contato.',
    pain: 'Campanhas perdem eficiência quando levam todo visitante para uma página genérica, sem contexto da oferta, critério de qualificação ou próximo passo claro.',
    outcome: 'Uma jornada focalizada em intenção, proposta, evidência disponível e coleta do contexto necessário para o atendimento.',
    image: '/imagens/services/sites.jpg',
    architecture: [
      { title: 'Uma oferta, uma decisão', detail: 'Headline, proposta, objeções e CTA organizados em torno de uma única ação econômica.' },
      { title: 'Prova contextual', detail: 'Somente exemplos, indicadores e resultados que possam ser demonstrados e autorizados.' },
      { title: 'Formulário qualificante', detail: 'Perguntas suficientes para compreender segmento, problema, investimento e canal de retorno.' },
      { title: 'Mensuração por etapa', detail: 'Eventos registram origem, página, início do formulário, envio e abertura do WhatsApp.' },
    ],
    questions: [
      { question: 'Qual é a diferença entre landing page e site?', answer: 'A landing page concentra uma oferta e uma conversão; o site institucional apresenta diferentes áreas, informações e caminhos. A escolha depende da intenção da campanha.' },
      { question: 'Uma landing page garante conversões?', answer: 'Não. Ela melhora a organização da jornada, mas resultado depende de oferta, tráfego, público, atendimento e acompanhamento medidos.' },
    ],
    related: ['automacao-whatsapp', 'site-para-clinicas', 'app-para-empresas'],
  },
  {
    slug: 'app-para-empresas',
    title: 'Aplicativo para empresas e operações comerciais',
    category: 'Aplicativos',
    audience: 'Empresas que precisam organizar uma jornada digital ou um processo recorrente',
    summary: 'Aplicações web planejadas a partir de um processo real: catálogo, agendamento, orçamento, atendimento ou operação interna.',
    pain: 'Planilhas dispersas e tarefas repetidas podem gerar retrabalho quando o processo exige uma interface própria e uma sequência de ações clara.',
    outcome: 'Um produto enxuto que resolve uma necessidade validada antes de acumular funcionalidades, integrações e custo operacional.',
    image: '/imagens/services/apps.jpg',
    architecture: [
      { title: 'Mapeamento do processo', detail: 'Identificação de usuário, tarefa principal, dados necessários e pontos de decisão.' },
      { title: 'Primeira versão utilizável', detail: 'Escopo mínimo coerente com a operação, priorizando o fluxo que precisa funcionar primeiro.' },
      { title: 'Integrações necessárias', detail: 'Conexões são avaliadas caso a caso; ferramentas adicionais entram somente quando resolvem um problema claro.' },
      { title: 'Evolução orientada por uso', detail: 'Métricas e feedback reais definem as próximas entregas sem transformar a primeira versão em um sistema excessivo.' },
    ],
    questions: [
      { question: 'Preciso lançar na App Store?', answer: 'Não necessariamente. Muitas operações podem começar com um aplicativo web responsivo. Publicação em lojas depende de requisitos específicos.' },
      { question: 'Vocês criam um CRM completo?', answer: 'Só quando a necessidade for comprovada. Na maioria dos projetos iniciais, uma jornada simples e registros objetivos atendem melhor ao momento da empresa.' },
    ],
    related: ['sistema-sob-medida', 'catalogo-para-representantes', 'automacao-whatsapp'],
  },
  {
    slug: 'sistema-sob-medida',
    title: 'Sistema sob medida para operações empresariais',
    category: 'Sistemas e SaaS',
    audience: 'Empresas com um processo recorrente que não se encaixa em ferramentas genéricas',
    summary: 'Engenharia de uma aplicação proporcional ao problema, com fluxo, responsabilidades e indicadores definidos antes da implementação.',
    pain: 'Ferramentas generalistas podem aumentar a complexidade quando a equipe adapta sua rotina a menus, etapas ou cobranças que não resolvem o processo principal.',
    outcome: 'Uma solução dimensionada para o fluxo real, com evolução progressiva e responsabilidade técnica claramente estabelecida.',
    image: '/imagens/services/dashboards.jpg',
    architecture: [
      { title: 'Diagnóstico operacional', detail: 'Mapeamento de entradas, responsáveis, aprovações, exceções e resultado esperado.' },
      { title: 'Arquitetura proporcional', detail: 'Interface, dados, segurança e integrações dimensionados para o estágio atual da operação.' },
      { title: 'Governança e continuidade', detail: 'Critérios de publicação, monitoramento, acesso e manutenção definidos com transparência.' },
      { title: 'Validação antes de virar SaaS', detail: 'Uma demanda interna só se transforma em produto recorrente quando o padrão é comprovado entre usuários reais.' },
    ],
    questions: [
      { question: 'Qual a diferença entre um sistema sob medida e um SaaS?', answer: 'Um sistema sob medida atende um processo específico de uma operação. Um SaaS exige validação para múltiplos clientes, regras de acesso, recorrência e sustentação de produto.' },
      { question: 'É possível começar pequeno?', answer: 'Sim. A primeira entrega deve resolver um fluxo central; novas capacidades entram depois de validação de uso, risco e retorno.' },
    ],
    related: ['app-para-empresas', 'catalogo-para-representantes', 'automacao-whatsapp'],
  },
  {
    slug: 'automacao-whatsapp',
    title: 'Automação de WhatsApp para atendimento comercial',
    category: 'Automações',
    audience: 'Empresas que recebem contatos repetidos ou precisam de triagem inicial',
    summary: 'Fluxos que coletam contexto, organizam a intenção e encaminham a conversa para o atendimento adequado.',
    pain: 'Mensagens sem origem, perguntas repetidas e encaminhamentos manuais fazem a equipe recomeçar o atendimento a cada novo contato.',
    outcome: 'Uma entrada mais organizada, com identificação da necessidade, rastreio de origem e transferência responsável para pessoas.',
    image: '/imagens/services/automations.jpg',
    architecture: [
      { title: 'Gate antes da conversa', detail: 'Formulário registra negócio, solução, problema e faixa de investimento antes de abrir o WhatsApp.' },
      { title: 'Mensagem contextual', detail: 'O atendimento recebe uma síntese da intenção e da página de origem em vez de um contato genérico.' },
      { title: 'Orquestração proporcional', detail: 'Integrações com formulários, webhook e automações entram conforme a necessidade efetiva.' },
      { title: 'Métricas do funil', detail: 'Origem, início do formulário, envio e abertura da conversa são registrados sem exposição indevida de dados.' },
    ],
    questions: [
      { question: 'A automação substitui a equipe?', answer: 'Não. Ela organiza a entrada e reduz tarefas repetitivas. Decisões comerciais e assuntos sensíveis permanecem com atendimento humano.' },
      { question: 'É obrigatório usar uma plataforma complexa?', answer: 'Não. O desenho pode começar com formulário, webhook e mensagem contextual; integrações mais sofisticadas dependem de validação.' },
    ],
    related: ['landing-page', 'catalogo-digital', 'site-para-clinicas'],
  },
  {
    slug: 'infraestrutura-digital',
    title: 'Infraestrutura digital e governança operacional',
    category: 'Infraestrutura',
    audience: 'Empresas que precisam de domínio, estabilidade, segurança e responsabilidade técnica',
    summary: 'Uma base operacional que conecta domínio, publicação, rastreamento, formulários e critérios de continuidade.',
    pain: 'A empresa perde controle quando domínio, hospedagem, analytics e canais de captação ficam distribuídos sem responsável, documentação ou visão de conjunto.',
    outcome: 'Responsabilidade técnica identificada, ativos documentados e uma estrutura preparada para evoluir de forma controlada.',
    image: '/imagens/services/dashboards.jpg',
    architecture: [
      { title: 'Identidade e publicação', detail: 'Domínio, hospedagem e ambientes associados ao ativo correto, sem projetos paralelos desnecessários.' },
      { title: 'Captação e continuidade', detail: 'Formulário, entrega do lead e canal de atendimento validados como uma única jornada.' },
      { title: 'Medição essencial', detail: 'Eventos de aquisição e conversão com parâmetros de origem e critérios objetivos de acompanhamento.' },
      { title: 'Responsabilidade operacional', detail: 'Acessos, escopo, manutenção e evolução documentados de acordo com a realidade da empresa.' },
    ],
    questions: [
      { question: 'Isso exige um CRM?', answer: 'Não. Uma operação inicial pode trabalhar com registro de leads, origem e status simples. Um CRM completo só faz sentido quando a necessidade estiver comprovada.' },
      { question: 'Vocês prometem posição no Google?', answer: 'Não. Aplicamos boas práticas técnicas e conteúdo útil, sem prometer posições, volume de tráfego ou retorno que ainda não foram medidos.' },
    ],
    related: ['sistema-sob-medida', 'landing-page', 'automacao-whatsapp'],
  },
];

export type LocalPage = {
  slug: string;
  solution: string;
  city: string;
  title: string;
  context: string;
  priorities: string[];
};

export const LOCAL_PAGES: LocalPage[] = [
  {
    slug: 'site-para-dentistas-em-campinas',
    solution: 'site-para-dentistas',
    city: 'Campinas',
    title: 'Site para dentistas em Campinas',
    context: 'Para operações odontológicas em Campinas, a arquitetura precisa conectar a especialidade procurada, a localização efetiva da unidade e o caminho para solicitar uma avaliação.',
    priorities: ['Páginas por serviços realmente oferecidos', 'Identificação clara da unidade e área atendida', 'Pedido de avaliação separado por interesse', 'Conteúdo revisado pela equipe responsável'],
  },
  {
    slug: 'site-para-dentistas-em-sorocaba',
    solution: 'site-para-dentistas',
    city: 'Sorocaba',
    title: 'Site para dentistas em Sorocaba',
    context: 'Para consultórios odontológicos em Sorocaba, o foco é reduzir dúvidas sobre atendimento, explicar a especialidade da unidade e entregar ao visitante um pedido de contato objetivo.',
    priorities: ['Presença institucional para o consultório', 'Informações comerciais consistentes', 'Jornada móvel até o pedido de atendimento', 'Separação entre informação e orientação clínica'],
  },
  {
    slug: 'site-para-clinicas-em-campinas',
    solution: 'site-para-clinicas',
    city: 'Campinas',
    title: 'Site para clínicas em Campinas',
    context: 'Uma clínica em Campinas pode precisar apresentar várias especialidades e canais de atendimento. A página organiza essas rotas sem afirmar credenciais, cobertura ou unidades que não existam.',
    priorities: ['Especialidades e equipe identificadas', 'Localização e horários reais', 'Triagem por necessidade e disponibilidade', 'Revisão profissional das informações de saúde'],
  },
  {
    slug: 'landing-page-para-advogados-em-sao-paulo',
    solution: 'site-para-advogados',
    city: 'São Paulo',
    title: 'Landing page para advogados em São Paulo',
    context: 'Para uma campanha jurídica em São Paulo, a página deve separar informação institucional, escopo de atuação e triagem inicial, sem transformar comunicação profissional em promessa de resultado.',
    priorities: ['Área de atuação claramente identificada', 'Recorte geográfico efetivamente atendido', 'Triagem antes do WhatsApp', 'Revisão conforme normas profissionais aplicáveis'],
  },
];

export type Comparison = {
  slug: string;
  name: string;
  title: string;
  summary: string;
  platformFit: string;
  customFit: string;
  considerations: ArchitectureItem[];
  officialUrl: string;
  questions: Faq[];
};

export const COMPARISONS: Comparison[] = [
  {
    slug: 'wix',
    name: 'Wix',
    title: 'Alternativa ao Wix para empresas',
    summary: 'Compare uma plataforma de criação autônoma com uma arquitetura sob medida acompanhada por uma unidade externa de tecnologia.',
    platformFit: 'O Wix pode atender bem quem deseja montar e administrar uma presença digital usando os recursos disponibilizados pela própria plataforma.',
    customFit: 'Uma arquitetura exclusiva faz sentido quando posicionamento, jornada comercial, integrações e responsabilidade operacional precisam refletir um processo específico.',
    considerations: [
      { title: 'Autonomia ou execução acompanhada', detail: 'Avalie se a equipe pretende construir sozinha ou precisa de direção, implementação e governança.' },
      { title: 'Recursos disponíveis ou fluxo específico', detail: 'Compare as funções atuais da plataforma com as necessidades reais de captação e operação.' },
      { title: 'Custo total e responsabilidade', detail: 'Considere assinatura, tempo interno, integrações e manutenção. Consulte os valores diretamente na fonte oficial.' },
    ],
    officialUrl: 'https://www.wix.com/plans',
    questions: [{ question: 'Wix é uma plataforma ruim?', answer: 'Não. É uma solução legítima para determinados perfis. A escolha depende do grau de autonomia, personalização e responsabilidade técnica que a empresa precisa.' }],
  },
  {
    slug: 'wordpress',
    name: 'WordPress',
    title: 'Alternativa ao WordPress para empresas',
    summary: 'Entenda quando um CMS aberto resolve a necessidade e quando uma arquitetura própria com governança definida é mais adequada.',
    platformFit: 'O WordPress é um software aberto com extensibilidade, gestão de conteúdo e ampla disponibilidade de plugins e temas.',
    customFit: 'Uma solução sob medida pode ser preferível quando o objetivo central envolve um fluxo comercial específico e uma operação técnica coordenada.',
    considerations: [
      { title: 'Conteúdo editorial', detail: 'O WordPress é especialmente pertinente quando publicação e gestão de conteúdo são centrais no projeto.' },
      { title: 'Manutenção e dependências', detail: 'Avalie quem responde por hospedagem, atualizações, extensões, segurança e compatibilidade.' },
      { title: 'Arquitetura orientada ao processo', detail: 'Compare a necessidade real de uma solução própria com a alternativa de configurar um CMS bem mantido.' },
    ],
    officialUrl: 'https://wordpress.org/about/features/',
    questions: [{ question: 'WordPress pode ser seguro e performático?', answer: 'Sim. Segurança e desempenho dependem de configuração, hospedagem, manutenção e escolhas técnicas; não devem ser julgados apenas pelo nome da plataforma.' }],
  },
  {
    slug: 'loja-integrada',
    name: 'Loja Integrada',
    title: 'Alternativa à Loja Integrada',
    summary: 'Compare uma plataforma de e-commerce pronta com um catálogo comercial ou uma operação própria desenhada para sua realidade.',
    platformFit: 'A Loja Integrada pode ser adequada quando a empresa precisa de uma loja virtual com planos, checkout, meios de pagamento e integrações próprios da plataforma.',
    customFit: 'Um catálogo ou fluxo próprio pode fazer mais sentido quando a venda depende de orçamento, representação comercial, regras específicas ou atendimento consultivo.',
    considerations: [
      { title: 'Checkout ou orçamento', detail: 'Defina se o cliente compra diretamente ou se a decisão acontece com cotação, negociação e atendimento humano.' },
      { title: 'Catálogo e limites', detail: 'Compare produtos, visitas, funções e condições de cada plano na página oficial antes de decidir.' },
      { title: 'Operação existente', detail: 'Considere estoque, ERP, marketplace, atendimento e a capacidade real da equipe de manter cada alternativa.' },
    ],
    officialUrl: 'https://lojaintegrada.com.br/planos/',
    questions: [{ question: 'Um catálogo próprio sempre é melhor que uma loja pronta?', answer: 'Não. Para vendas com checkout padronizado, uma plataforma pronta pode ser mais adequada. Para representação, cotação ou regras específicas, uma arquitetura própria pode reduzir atrito.' }],
  },
  {
    slug: 'linktree',
    name: 'Linktree',
    title: 'Alternativa ao Linktree para negócios',
    summary: 'Avalie quando uma página de links basta e quando uma jornada própria com oferta, contexto e diagnóstico oferece uma experiência mais completa.',
    platformFit: 'Uma página de links é útil quando o objetivo principal é reunir atalhos simples para conteúdos, canais e perfis.',
    customFit: 'Uma página própria é mais adequada quando a operação precisa explicar uma oferta, coletar contexto e conduzir o visitante até uma decisão específica.',
    considerations: [
      { title: 'Lista de links ou jornada', detail: 'Uma sequência de atalhos e uma página comercial orientada à decisão resolvem problemas diferentes.' },
      { title: 'Domínio e contexto', detail: 'Avalie identidade, informações necessárias e o nível de controle desejado sobre a experiência.' },
      { title: 'Captação mensurável', detail: 'Defina quais eventos, formulários e dados de origem precisam acompanhar o contato.' },
    ],
    officialUrl: 'https://linktr.ee/',
    questions: [{ question: 'Uma página de links pode continuar existindo?', answer: 'Sim. Ela pode direcionar para uma página própria, um diagnóstico ou uma solução específica sem precisar ser eliminada.' }],
  },
];

export type Guide = {
  slug: string;
  title: string;
  summary: string;
  sections: ArchitectureItem[];
  solution: string;
  tool?: string;
  questions: Faq[];
};

export const GUIDES: Guide[] = [
  {
    slug: 'quanto-custa-um-site-profissional',
    title: 'Quanto custa um site profissional?',
    summary: 'O investimento depende da arquitetura, do conteúdo, das integrações, da responsabilidade técnica e da continuidade após a publicação.',
    sections: [
      { title: 'Número e profundidade das páginas', detail: 'Uma página de campanha, um site institucional e uma biblioteca de soluções exigem volumes diferentes de estratégia, produção e validação.' },
      { title: 'Conteúdo e direção visual', detail: 'Diagnóstico, copy, fotografias, demonstrações e revisão podem alterar o esforço mais do que a quantidade de telas.' },
      { title: 'Integrações e captação', detail: 'Formulários, WhatsApp contextual, automações e rastreamento devem entrar no cálculo conforme a necessidade real.' },
      { title: 'Manutenção e propriedade', detail: 'Antes de comparar propostas, confirme domínio, hospedagem, responsabilidades, atualizações e o que acontece após a entrega.' },
    ],
    solution: 'landing-page',
    tool: 'calculadora-preco-site',
    questions: [{ question: 'Existe um preço único para qualquer site?', answer: 'Não. Escopo, conteúdo, integrações e suporte mudam o investimento. Uma estimativa só é confiável quando seus critérios estão explícitos.' }],
  },
  {
    slug: 'quanto-custa-criar-um-app',
    title: 'Quanto custa criar um aplicativo para uma empresa?',
    summary: 'O custo de um aplicativo depende do problema resolvido, dos usuários, dos fluxos, dos dados e das integrações que realmente precisam existir.',
    sections: [
      { title: 'Aplicativo web ou publicação em lojas', detail: 'Uma aplicação web responsiva pode atender muitos processos. Distribuição em lojas traz requisitos e etapas adicionais.' },
      { title: 'Usuários, permissões e dados', detail: 'Login, perfis diferentes, informações sensíveis e regras de acesso ampliam responsabilidade e complexidade.' },
      { title: 'Integrações indispensáveis', detail: 'Pagamentos, agenda, ERP e notificações devem ser avaliados individualmente antes de entrarem no escopo.' },
      { title: 'Primeira versão e evolução', detail: 'Defina a tarefa central que precisa funcionar primeiro e deixe funcionalidades especulativas para depois da validação.' },
    ],
    solution: 'app-para-empresas',
    questions: [{ question: 'É possível reduzir o investimento inicial?', answer: 'Sim. Uma primeira versão focada em um processo real pode reduzir escopo e risco. O valor final depende do diagnóstico técnico.' }],
  },
  {
    slug: 'quanto-custa-um-saas',
    title: 'Quanto custa desenvolver um SaaS?',
    summary: 'Um SaaS exige mais do que telas: produto validado, múltiplos clientes, controle de acesso, cobrança, suporte e continuidade operacional.',
    sections: [
      { title: 'Validar a dor antes da plataforma', detail: 'Comece demonstrando que pessoas diferentes enfrentam o mesmo problema e aceitariam uma solução recorrente.' },
      { title: 'Estrutura para múltiplos clientes', detail: 'Isolamento de dados, autenticação, permissões e administração aumentam a responsabilidade do projeto.' },
      { title: 'Cobrança e operação', detail: 'Assinatura, inadimplência, suporte, termos e proteção de dados fazem parte do produto, não apenas do desenvolvimento.' },
      { title: 'Lançamento progressivo', detail: 'Uma solução interna pode virar microproduto depois de medir uso, capacidade de entrega e modelo de receita.' },
    ],
    solution: 'sistema-sob-medida',
    questions: [{ question: 'Todo sistema interno deve virar SaaS?', answer: 'Não. A transformação só se justifica quando existe problema repetido, demanda validada e capacidade de sustentar clientes recorrentes.' }],
  },
  {
    slug: 'site-ou-instagram',
    title: 'Site ou Instagram: o que uma empresa precisa?',
    summary: 'Instagram e site cumprem funções diferentes. A escolha depende de descoberta, profundidade da informação, controle e jornada de contato.',
    sections: [
      { title: 'Instagram para descoberta e distribuição', detail: 'Uma rede social pode demonstrar rotina, repertório e relacionamento, dependendo das regras e do alcance da plataforma.' },
      { title: 'Site para contexto e propriedade', detail: 'Um domínio próprio organiza oferta, serviços, prova disponível, conteúdo e formas de contato com mais profundidade.' },
      { title: 'Busca e intenção comercial', detail: 'Páginas específicas ajudam quem procura diretamente um serviço ou uma solução a entender o próximo passo.' },
      { title: 'Integração entre os canais', detail: 'O caminho mais coerente costuma conectar conteúdos sociais a páginas específicas e a um diagnóstico contextual.' },
    ],
    solution: 'landing-page',
    questions: [{ question: 'Preciso abandonar o Instagram depois de criar um site?', answer: 'Não. Os canais podem trabalhar juntos: a rede social distribui conteúdo e o site organiza a decisão e a captação.' }],
  },
  {
    slug: 'landing-page-ou-site',
    title: 'Landing page ou site: qual escolher?',
    summary: 'Uma landing page concentra uma oferta; um site institucional organiza vários serviços, públicos e níveis de informação.',
    sections: [
      { title: 'Quando uma landing page resolve', detail: 'Campanhas, lançamentos e ofertas específicas tendem a pedir uma jornada objetiva e um CTA predominante.' },
      { title: 'Quando o site institucional é necessário', detail: 'Empresas com vários serviços, públicos ou necessidades de autoridade precisam de uma arquitetura mais ampla.' },
      { title: 'Como unir as duas estruturas', detail: 'Um site central pode abrigar páginas de campanha e rotas por nicho sem perder a coerência da marca.' },
      { title: 'O que medir', detail: 'Acompanhe origem, início do diagnóstico, envio, abertura do WhatsApp e qualidade do contato.' },
    ],
    solution: 'landing-page',
    tool: 'calculadora-roi',
    questions: [{ question: 'Uma landing page pode ficar dentro do domínio principal?', answer: 'Sim. Uma rota específica pode concentrar uma oferta enquanto aproveita identidade, governança e mensuração do domínio central.' }],
  },
  {
    slug: 'catalogo-digital-ou-pdf',
    title: 'Catálogo digital ou PDF: qual funciona melhor?',
    summary: 'PDF e catálogo digital resolvem situações diferentes. Atualização, busca, consulta móvel e contexto comercial definem a escolha.',
    sections: [
      { title: 'Quando o PDF é suficiente', detail: 'Um material estático pode atender linhas pequenas, campanhas pontuais ou situações que exigem um arquivo offline.' },
      { title: 'Quando o catálogo digital reduz atrito', detail: 'Produtos frequentes, busca por referência, atualizações constantes e solicitações de orçamento favorecem uma experiência navegável.' },
      { title: 'Controle comercial', detail: 'Defina se preços serão públicos, como as linhas serão agrupadas e quem atualiza as informações.' },
      { title: 'Pedido com contexto', detail: 'A seleção de produtos pode chegar ao atendimento acompanhada de itens, quantidades e dados do interessado.' },
    ],
    solution: 'catalogo-para-representantes',
    questions: [{ question: 'O catálogo digital elimina todos os arquivos?', answer: 'Não necessariamente. A operação pode manter PDFs como material complementar e usar o catálogo navegável como versão comercial sempre atualizada.' }],
  },
];

export type ToolDefinition = { slug: string; title: string; summary: string; result: string };

export const TOOLS: ToolDefinition[] = [
  { slug: 'calculadora-preco-site', title: 'Calculadora de investimento em site', summary: 'Estime uma faixa orientativa a partir de páginas, integrações e valor-hora informado por você.', result: 'Faixa de investimento orientativa' },
  { slug: 'calculadora-perda-vendas', title: 'Calculadora de oportunidades comerciais', summary: 'Compare a conversão atual com uma meta informada e visualize a diferença potencial de receita.', result: 'Diferença potencial de receita' },
  { slug: 'auditoria-de-site', title: 'Triagem inicial de presença digital', summary: 'Informe seu domínio e responda critérios objetivos para identificar prioridades declaradas.', result: 'Prioridades iniciais declaradas' },
  { slug: 'gerador-de-briefing', title: 'Gerador de briefing digital', summary: 'Organize negócio, oferta, público, objetivo e requisitos em um briefing pronto para discussão.', result: 'Briefing estruturado' },
  { slug: 'calculadora-roi', title: 'Calculadora de ROI comercial', summary: 'Simule retorno considerando investimento, leads, taxa de fechamento e ticket médio.', result: 'Cenário orientativo de retorno' },
];

export type Demonstration = { slug: string; title: string; segment: string; solution: string; image: string; description: string };

export const DEMONSTRATIONS: Demonstration[] = [
  { slug: 'clinica-premium', title: 'Clínica premium', segment: 'Saúde e odontologia', solution: 'site-para-clinicas', image: '/imagens/nichos/saude.jpg', description: 'Especialidades, seleção de atendimento e simulação de pedido de avaliação.' },
  { slug: 'restaurante-premium', title: 'Restaurante premium', segment: 'Gastronomia', solution: 'site-para-restaurantes', image: '/imagens/nichos/comercio.jpg', description: 'Cardápio filtrável, seleção de pratos e resumo de pedido demonstrativo.' },
  { slug: 'representacao-comercial', title: 'Representação comercial', segment: 'Catálogo e distribuição', solution: 'catalogo-para-representantes', image: '/imagens/nichos/industria.jpg', description: 'Busca por produto, filtro de categorias e montagem de uma cotação ilustrativa.' },
  { slug: 'imobiliaria-premium', title: 'Imobiliária premium', segment: 'Mercado imobiliário', solution: 'site-para-imobiliarias', image: '/imagens/nichos/servicos.jpg', description: 'Filtros de busca e experiência de consulta a imóveis fictícios.' },
];

export type SeoEntry = { path: string; title: string; description: string; category: string; headings: string[]; questions: Faq[] };

export const GROWTH_SEO: SeoEntry[] = [
  {
    path: '/solucoes',
    title: 'Soluções digitais por segmento e operação | Rei das Vendas',
    description: 'Sites, landing pages, catálogos, aplicativos, sistemas e automações desenhados para o problema real de cada operação.',
    category: 'CollectionPage',
    headings: SOLUTIONS.map((item) => item.title),
    questions: [],
  },
  {
    path: '/diagnostico',
    title: 'Mapeamento de Perfil Diamante | Rei das Vendas',
    description: 'Informe seu negócio, a solução necessária, o problema comercial e a faixa de investimento antes do atendimento pelo WhatsApp.',
    category: 'WebPage',
    headings: [
      'Qual é o seu negócio?',
      'Qual solução sua operação precisa?',
      'Qual problema comercial deve ser resolvido?',
      'Qual é a faixa de investimento prevista?',
      'Qual é o WhatsApp para continuidade do atendimento?',
    ],
    questions: [],
  },
  ...SOLUTIONS.map((item) => ({ path: `/solucoes/${item.slug}`, title: `${item.title} | Rei das Vendas`, description: item.summary, category: 'Service', headings: item.architecture.map((entry) => `${entry.title}: ${entry.detail}`), questions: item.questions })),
  ...LOCAL_PAGES.map((item) => ({ path: `/solucoes/${item.slug}`, title: `${item.title} | Rei das Vendas`, description: item.context, category: 'Service', headings: item.priorities, questions: [] })),
  ...COMPARISONS.map((item) => ({ path: `/alternativas/${item.slug}`, title: `${item.title} | Rei das Vendas`, description: item.summary, category: 'Article', headings: item.considerations.map((entry) => `${entry.title}: ${entry.detail}`), questions: item.questions })),
  ...GUIDES.map((item) => ({ path: `/${item.slug}`, title: `${item.title} | Rei das Vendas`, description: item.summary, category: 'Article', headings: item.sections.map((entry) => `${entry.title}: ${entry.detail}`), questions: item.questions })),
  ...TOOLS.map((item) => ({ path: `/ferramentas/${item.slug}`, title: `${item.title} | Rei das Vendas`, description: item.summary, category: 'WebApplication', headings: [item.result], questions: [] })),
  ...DEMONSTRATIONS.map((item) => ({ path: `/demonstracoes/${item.slug}`, title: `${item.title} — arquitetura demonstrativa | Rei das Vendas`, description: item.description, category: 'WebPage', headings: [item.segment, item.description], questions: [] })),
  { path: '/ferramentas', title: 'Ferramentas gratuitas de diagnóstico digital | Rei das Vendas', description: 'Calculadoras, briefing e triagem inicial para avaliar escopo, oportunidades e retorno comercial.', category: 'CollectionPage', headings: TOOLS.map((item) => item.title), questions: [] },
  { path: '/demonstracoes', title: 'Arquiteturas demonstrativas por segmento | Rei das Vendas', description: 'Explore demonstrações interativas para clínicas, restaurantes, imobiliárias e representação comercial.', category: 'CollectionPage', headings: DEMONSTRATIONS.map((item) => item.title), questions: [] },
];

export const SOLUTION_BY_SLUG = new Map(SOLUTIONS.map((item) => [item.slug, item]));
export const LOCAL_BY_SLUG = new Map(LOCAL_PAGES.map((item) => [item.slug, item]));
export const COMPARISON_BY_SLUG = new Map(COMPARISONS.map((item) => [item.slug, item]));
export const GUIDE_BY_SLUG = new Map(GUIDES.map((item) => [item.slug, item]));
export const TOOL_BY_SLUG = new Map(TOOLS.map((item) => [item.slug, item]));
export const DEMONSTRATION_BY_SLUG = new Map(DEMONSTRATIONS.map((item) => [item.slug, item]));
export const SEO_BY_PATH = new Map(GROWTH_SEO.map((item) => [item.path, item]));
