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
    architecture: [
      { title: 'Áreas de atuação com contexto', detail: 'Páginas próprias para demandas empresariais, trabalhistas, familiares ou outras especialidades efetivamente atendidas.' },
      { title: 'Triagem antes da conversa', detail: 'Formulário que identifica assunto, cidade e estágio da demanda antes do encaminhamento ao WhatsApp.' },
      { title: 'Presença local verificável', detail: 'Informações institucionais consistentes, localização e conteúdo informativo, sujeitos à revisão das regras profissionais aplicáveis.' },
      { title: 'Revisão editorial', detail: 'Comunicação revisável, sem alegações de êxito garantido, sem exposição indevida e sem dados sensíveis desnecessários.' },
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
    summary: 'A presença que faz o paciente escolher sua clínica no primeiro clique: especialidades claras, equipe apresentada e agendamento sem fricção, com toda a responsabilidade da comunicação em saúde preservada.',
    pain: 'Enquanto sua agenda depende de indicação e mensagem solta no Instagram, a clínica concorrente já aparece primeiro no Google, mostra agendamento online e fecha a consulta que podia ser sua.',
    outcome: 'Menos paciente perdido entre a busca e o WhatsApp: descoberta, confiança institucional e pedido de agendamento na mesma jornada.',
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
    summary: 'A diferença entre aparecer nas primeiras posições de "dentista perto de mim" e ser só mais um perfil perdido no Instagram: procedimentos claros, prova de atuação e pedido de avaliação sem fricção.',
    pain: 'Todo dia alguém pesquisa "dentista perto de mim" e fecha com quem responde primeiro no Google e no WhatsApp — não necessariamente com quem atende melhor.',
    outcome: 'Cada busca local vira uma chance real de avaliação agendada, em vez de mais um clique perdido para o consultório concorrente.',
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
    demonstration: 'imobiliaria-premium',
    architecture: [
      { title: 'Busca por intenção', detail: 'Filtros por finalidade, tipo, região e faixa de valor, conforme o inventário disponível.' },
      { title: 'Ficha de imóvel utilizável', detail: 'Fotos, características, contexto e próximos passos claros sem inflar disponibilidade.' },
      { title: 'Pedido de visita contextual', detail: 'Interesse, imóvel e contato chegam juntos à equipe responsável pelo atendimento.' },
      { title: 'Gestão do catálogo', detail: 'Processo de atualização do inventário e responsabilidades definidas desde o diagnóstico.' },
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
    architecture: [
      { title: 'Diagnóstico operacional', detail: 'Mapeamento de entradas, responsáveis, aprovações, exceções e resultado esperado.' },
      { title: 'Arquitetura proporcional', detail: 'Interface, dados, segurança e integrações dimensionados para o estágio atual da operação.' },
      { title: 'Publicação e continuidade', detail: 'Critérios de publicação, monitoramento, acesso e manutenção definidos com transparência.' },
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
    title: 'Infraestrutura digital e gestão da operação',
    category: 'Infraestrutura',
    audience: 'Empresas que precisam de domínio, estabilidade, segurança e responsabilidade técnica',
    summary: 'Uma base operacional que conecta domínio, publicação, rastreamento, formulários e critérios de continuidade.',
    pain: 'A empresa perde controle quando domínio, hospedagem, analytics e canais de captação ficam distribuídos sem responsável, documentação ou visão de conjunto.',
    outcome: 'Responsabilidade técnica identificada, ativos documentados e uma estrutura preparada para evoluir de forma controlada.',
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
  {
    slug: 'site-institucional-premium',
    title: 'Site institucional premium para negócios locais',
    category: 'Presença e autoridade',
    audience: 'Empresas locais que precisam ser encontradas, compreendidas e acionadas com confiança',
    summary: 'Estratégia, conteúdo, design e engenharia reunidos em uma presença própria, rápida e preparada para busca, campanhas e atendimento.',
    pain: 'Quando a empresa depende apenas de redes sociais ou de uma página genérica, o cliente encontra informação fragmentada e não sabe por que escolher, onde ir ou como avançar.',
    outcome: 'Uma base digital exclusiva que apresenta o negócio, distribui intenção entre serviços e transforma procura em uma próxima ação mensurável.',
    architecture: [
      { title: 'Narrativa comercial própria', detail: 'Oferta, público, objeções e diferenciais reais organizados sem copiar linguagem de concorrentes ou templates.' },
      { title: 'Arquitetura para busca e decisão', detail: 'Páginas por serviço, contexto local, navegação móvel e caminhos de contato coerentes com a operação.' },
      { title: 'Performance como experiência', detail: 'Imagens dimensionadas, código enxuto, estabilidade visual e monitoramento da publicação.' },
      { title: 'Propriedade e continuidade', detail: 'Domínio, acessos, eventos, responsabilidades e processo de evolução documentados.' },
    ],
    questions: [
      { question: 'O projeto parte de um modelo pronto?', answer: 'Não. Referências podem orientar decisões, mas estrutura, copy, visual e integrações são definidos para o contexto de cada negócio.' },
      { question: 'O site já fica preparado para campanhas?', answer: 'Sim, quando esse canal faz parte do escopo. A arquitetura preserva origem, intenção e eventos de conversão sem prometer resultado antes de medir.' },
    ],
    related: ['landing-page', 'seo-local-google-business', 'automacao-whatsapp'],
  },
  {
    slug: 'site-para-profissionais-liberais',
    title: 'Site para profissionais liberais',
    category: 'Presença e autoridade',
    audience: 'Profissionais que vendem conhecimento, reputação, atendimento ou serviço especializado',
    summary: 'Uma presença autoral que transforma trajetória, especialidade e forma de atendimento em uma jornada clara para quem precisa decidir.',
    pain: 'Currículo, conteúdo e contato costumam ficar espalhados em perfis e mensagens, dificultando a compreensão do posicionamento e do próximo passo.',
    outcome: 'Autoridade organizada, linguagem adequada à profissão e uma entrada comercial compatível com a responsabilidade de cada atividade.',
    architecture: [
      { title: 'Posicionamento sem personagem', detail: 'Uma voz reconhecível, baseada em repertório, método e serviços efetivamente prestados.' },
      { title: 'Páginas por intenção', detail: 'Especialidades e contextos de contratação recebem conteúdo próprio e encaminhamento adequado.' },
      { title: 'Prova verificável', detail: 'Projetos, credenciais e depoimentos entram somente quando têm origem e autorização.' },
      { title: 'Contato com contexto', detail: 'A solicitação chega com assunto, perfil e necessidade antes da conversa.' },
    ],
    questions: [
      { question: 'Serve para qualquer profissão?', answer: 'A arquitetura se adapta, mas profissões regulamentadas exigem revisão humana e respeito às normas específicas de comunicação.' },
    ],
    related: ['site-institucional-premium', 'landing-page', 'agendamento-online'],
  },
  {
    slug: 'ecommerce-profissional',
    title: 'E-commerce profissional e operação de venda online',
    category: 'Venda e comércio',
    audience: 'Marcas, lojas e indústrias que precisam vender online com catálogo, checkout e operação conectados',
    summary: 'A loja que decide se o pedido fecha com você ou abandona o carrinho na concorrência: catálogo que vende sozinho, checkout sem fricção e operação que continua depois do clique em comprar.',
    pain: 'Ter uma loja no ar não é o mesmo que vender: catálogo confuso, checkout lento no celular ou frete que só aparece na última tela manda o cliente direto para quem já resolveu isso.',
    outcome: 'Cada visita com intenção de compra convertida — carrinho recuperado, campanha mensurada e operação pronta para crescer sem depender de sorte.',
    architecture: [
      { title: 'Descoberta e catálogo', detail: 'Categorias, busca, filtros, páginas de produto e conteúdo alinhados à forma real de compra.' },
      { title: 'Carrinho e checkout', detail: 'Pagamento, frete, políticas e estados de erro validados nos dispositivos prioritários.' },
      { title: 'Aquisição mensurável', detail: 'Campanhas, feeds, eventos e origem conectados à jornada comercial.' },
      { title: 'Operação depois da compra', detail: 'Pedidos, notificações, atendimento e integrações avaliados antes da publicação.' },
    ],
    questions: [
      { question: 'Vocês usam Shopify ou uma solução própria?', answer: 'A escolha depende de catálogo, checkout, integrações, equipe e custo total. A recomendação compara operação e responsabilidade antes da tecnologia.' },
    ],
    related: ['catalogo-digital', 'infraestrutura-digital', 'analytics-e-cro'],
  },
  {
    slug: 'funil-de-qualificacao',
    title: 'Diagnóstico, orçamento e qualificação comercial',
    category: 'Captação e atendimento',
    audience: 'Negócios que recebem contatos sem informação suficiente para responder com velocidade',
    summary: 'Uma jornada curta que identifica necessidade, prioridade e contexto antes de entregar a conversa ao responsável certo.',
    pain: 'Quando todo contato começa com “quanto custa?”, a equipe repete perguntas, demora a responder e perde a origem da oportunidade.',
    outcome: 'Solicitações mais completas, resposta mais rápida e dados suficientes para priorizar sem criar um formulário interminável.',
    architecture: [
      { title: 'Perguntas mínimas', detail: 'Três ou quatro decisões iniciais revelam o problema sem exigir dados desnecessários.' },
      { title: 'Resultado parcial', detail: 'A pessoa entende a direção provável antes de informar contato ou abrir o WhatsApp.' },
      { title: 'Contexto preservado', detail: 'Origem, solução, urgência e respostas acompanham o handoff para atendimento humano.' },
      { title: 'Validação e proteção', detail: 'Dados são validados na borda, com consentimento, honeypot e limites de requisição.' },
    ],
    questions: [
      { question: 'Um formulário maior qualifica melhor?', answer: 'Não necessariamente. O objetivo é coletar o mínimo que muda a resposta comercial e revelar mais detalhes progressivamente.' },
    ],
    related: ['automacao-whatsapp', 'landing-page', 'analytics-e-cro'],
  },
  {
    slug: 'agendamento-online',
    title: 'Agendamento online integrado ao atendimento',
    category: 'Captação e atendimento',
    audience: 'Operações que vendem horários, avaliações, visitas, aulas ou reuniões',
    summary: 'Serviço, unidade, preferência e disponibilidade organizados em uma jornada móvel com confirmação explícita.',
    pain: 'Agendamentos se perdem quando disponibilidade, local, serviço e dados do interessado são combinados manualmente em várias mensagens.',
    outcome: 'Menos troca repetitiva, regras visíveis e um pedido de horário com informação suficiente para confirmar.',
    architecture: [
      { title: 'Escolha orientada', detail: 'Serviço, profissional ou unidade aparecem conforme a operação realmente oferece.' },
      { title: 'Disponibilidade conectável', detail: 'Integrações com agenda são avaliadas segundo API, regras e responsabilidade por atualização.' },
      { title: 'Confirmação sem ambiguidade', detail: 'Estados pendente, confirmado, reagendado e cancelado são comunicados com clareza.' },
      { title: 'Continuidade do atendimento', detail: 'Lembretes e handoff humano respeitam consentimento e horário comercial.' },
    ],
    questions: [
      { question: 'A confirmação precisa ser automática?', answer: 'Não. O fluxo pode apenas organizar o pedido e deixar a confirmação final com a equipe quando a operação exigir.' },
    ],
    related: ['funil-de-qualificacao', 'automacao-whatsapp', 'app-para-empresas'],
  },
  {
    slug: 'desenvolvimento-saas',
    title: 'Desenvolvimento de SaaS e produtos recorrentes',
    category: 'Produtos digitais',
    audience: 'Empresas e especialistas que identificaram um problema repetível e precisam validar um produto comercial',
    summary: 'Estratégia, experiência e engenharia para transformar um processo validado em produto com acesso, cobrança e operação contínua.',
    pain: 'Funcionalidades demais antes de provar uso consomem orçamento e criam uma plataforma difícil de lançar, vender e sustentar.',
    outcome: 'Uma primeira versão utilizável, com hipótese comercial explícita, isolamento de dados, cobrança e observabilidade proporcionais ao estágio do produto.',
    architecture: [
      { title: 'Validação do problema', detail: 'Usuário, tarefa, frequência, disposição de pagamento e alternativa atual entram antes do roadmap.' },
      { title: 'Produto mínimo operável', detail: 'Autenticação, fluxo central, administração e estados de falha suficientes para uso real.' },
      { title: 'Receita e acesso', detail: 'Planos, cobrança, permissões e suporte são tratados como produto, não como acabamento.' },
      { title: 'Observabilidade e evolução', detail: 'Erros, uso, custo e feedback orientam os próximos releases.' },
    ],
    questions: [
      { question: 'Vocês constroem a ideia inteira de uma vez?', answer: 'Não. O primeiro release deve comprovar a tarefa central e o modelo de uso antes de ampliar a superfície do produto.' },
    ],
    related: ['sistema-sob-medida', 'app-para-empresas', 'portal-do-cliente'],
  },
  {
    slug: 'portal-do-cliente',
    title: 'Portal, área do cliente e assinaturas digitais',
    category: 'Produtos digitais',
    audience: 'Empresas que precisam oferecer acesso recorrente a pedidos, documentos, serviços, conteúdo ou suporte',
    summary: 'Uma área segura e reconhecível para centralizar relacionamento, entrega e autosserviço sem expor dados entre clientes.',
    pain: 'Documentos e atualizações distribuídos entre e-mail, mensagens e planilhas aumentam retrabalho e deixam o cliente sem visão do andamento.',
    outcome: 'Informação organizada por acesso, estados claros e menos dependência de atendimento para tarefas repetitivas.',
    architecture: [
      { title: 'Identidade e permissão', detail: 'Login, recuperação e acesso definidos por papel e pelo menor privilégio necessário.' },
      { title: 'Visão do relacionamento', detail: 'Pedidos, entregas, documentos ou serviços aparecem conforme o fluxo real.' },
      { title: 'Comunicação rastreável', detail: 'Notificações indicam mudança relevante sem transformar o portal em mais um canal ruidoso.' },
      { title: 'Proteção e auditoria', detail: 'Dados, sessões, ações críticas e recuperação entram no desenho desde o início.' },
    ],
    questions: [
      { question: 'É possível cobrar assinatura pelo portal?', answer: 'Sim, quando planos, entrega, cancelamento e responsabilidades estiverem definidos. O meio de pagamento e as taxas são confirmados no escopo.' },
    ],
    related: ['desenvolvimento-saas', 'app-para-empresas', 'infraestrutura-digital'],
  },
  {
    slug: 'seo-local-google-business',
    title: 'SEO local e estrutura para Google Business Profile',
    category: 'Distribuição',
    audience: 'Negócios locais e profissionais elegíveis que precisam alinhar site, serviços, busca e presença oficial',
    summary: 'Base técnica, conteúdo e consistência de informações para melhorar a compreensão do negócio em buscas locais.',
    pain: 'Nome, telefone, serviços e áreas atendidas divergentes entre site, perfil e diretórios reduzem confiança e tornam a jornada de busca confusa.',
    outcome: 'Uma presença coerente, com páginas úteis, dados estruturados compatíveis com o conteúdo e ativos preparados para verificação do proprietário.',
    architecture: [
      { title: 'Elegibilidade e propriedade', detail: 'O perfil só é proposto quando o negócio atende às regras e permanece sob controle do proprietário.' },
      { title: 'Serviços e contexto local', detail: 'Páginas autorais explicam o que é prestado, para quem e onde, sem doorway pages em escala.' },
      { title: 'Consistência de entidade', detail: 'Nome, telefone, domínio, áreas atendidas e canais oficiais seguem a mesma informação verificada.' },
      { title: 'Medição sem garantia', detail: 'Impressões, cliques e conversas podem ser acompanhados; posição ou volume de vendas não são prometidos.' },
    ],
    questions: [
      { question: 'Vocês garantem primeiro lugar no Google?', answer: 'Não. Aplicamos fundamentos técnicos e conteúdo útil, mas ranking depende de fatores externos e não pode ser garantido.' },
    ],
    related: ['site-institucional-premium', 'distribuicao-multicanal', 'analytics-e-cro'],
  },
  {
    slug: 'distribuicao-multicanal',
    title: 'Estrutura digital para aquisição multicanal',
    category: 'Distribuição',
    audience: 'Empresas que precisam conectar busca, conteúdo, campanhas e atendimento sem perder a origem do contato',
    summary: 'Uma arquitetura comum para distribuir ofertas entre Google, redes, e-mail e WhatsApp com páginas e eventos coerentes.',
    pain: 'Quando cada canal aponta para uma mensagem diferente e todo contato termina no mesmo link genérico, intenção e aprendizado se perdem.',
    outcome: 'Canais conectados a páginas adequadas, contexto preservado e um mapa de conversão capaz de orientar investimento.',
    architecture: [
      { title: 'Mensagem por intenção', detail: 'Cada campanha ou conteúdo leva à página que continua a promessa apresentada.' },
      { title: 'Origem preservada', detail: 'UTM, página, solução e ação acompanham o diagnóstico e o handoff comercial.' },
      { title: 'Políticas por plataforma', detail: 'Privacidade, consentimento, claims e funcionalidade seguem as exigências aplicáveis ao canal.' },
      { title: 'Expansão controlada', detail: 'Novos canais entram quando existe capacidade de responder, medir e aprender.' },
    ],
    questions: [
      { question: 'É preciso anunciar em todos os canais?', answer: 'Não. Capilaridade não é dispersão. A prioridade considera intenção, capacidade de atendimento e evidência disponível.' },
    ],
    related: ['landing-page', 'seo-local-google-business', 'analytics-e-cro'],
  },
  {
    slug: 'analytics-e-cro',
    title: 'Analytics, CRO e evolução da conversão',
    category: 'Operação e evolução',
    audience: 'Operações que já recebem tráfego e precisam saber onde priorizar a próxima melhoria',
    summary: 'Mensuração de eventos, leitura de comportamento e ciclos de otimização para reduzir atrito sem fabricar causalidade.',
    pain: 'Visitas, seguidores e cliques isolados não mostram onde a pessoa desistiu nem se o atendimento recebeu contexto suficiente.',
    outcome: 'Um funil observável, hipóteses priorizadas e releases pequenos capazes de comprovar ou rejeitar uma melhoria.',
    architecture: [
      { title: 'Eventos essenciais', detail: 'Origem, visualização relevante, início, avanço, envio e handoff são definidos com nomes e finalidade claros.' },
      { title: 'Privacidade e qualidade', detail: 'Consentimento, filtros internos e validação reduzem coleta desnecessária e dados enganosos.' },
      { title: 'Hipóteses verificáveis', detail: 'Cada mudança declara problema, público, resultado esperado e critério de leitura.' },
      { title: 'Release e aprendizado', detail: 'A evolução contínua prioriza impacto e reversibilidade, não volume de alterações.' },
    ],
    questions: [
      { question: 'CRO garante aumento de vendas?', answer: 'Não. O trabalho reduz incerteza e testa melhorias; vendas também dependem de oferta, demanda, preço, atendimento e operação.' },
    ],
    related: ['distribuicao-multicanal', 'infraestrutura-digital', 'funil-de-qualificacao'],
  },
  {
    slug: 'operacao-digital',
    title: 'Operação digital: o site que continua trabalhando',
    category: 'Operação e evolução',
    audience: 'Para quem já tem site (ou vai publicar um) e precisa que ele atenda, agende e mostre resultado.',
    summary: 'Um ciclo mensal que junta atendimento no WhatsApp, painel de leads e monitoramento de pedidos em um lugar só.',
    pain: 'Site publicado e parado não traz retorno. O atendimento demora, os contatos se perdem sem origem e o negócio não sabe o que melhorar porque nada é medido.',
    outcome: 'Atendimento que responde sem começar do zero, leads visíveis e uma fila de melhorias baseada no uso real, não em achismo.',
    architecture: [
      { title: 'Atendimento no WhatsApp que responde e agenda', detail: 'O WhatsApp recebe o contato com contexto, responde o que é repetido e chama uma pessoa na hora certa para decidir.' },
      { title: 'Painel de acompanhamento', detail: 'Leads, origem, status e próximos passos aparecem na tela para o dono, sem planilha nem relatório manual.' },
      { title: 'Monitoramento de oportunidades', detail: 'Pedidos e sinais de interesse que chegam por canais diferentes ficam registrados e entram na fila antes de esfriar.' },
      { title: 'Ciclo mensal de melhoria', detail: 'Testes pequenos, medidos e decididos pelo que o uso real mostrou, sem prometer posição no Google nem volume.' },
    ],
    questions: [
      { question: 'Isso substitui a equipe de atendimento?', answer: 'Não. A operação organiza a entrada, responde o repetitivo e passa o contexto. Decisão de venda e caso sensível continuam com gente.' },
      { question: 'Preciso de um site novo para contratar a operação?', answer: 'Não. Dá para montar em cima do site que você já tem, desde que domínio, acessos e medição estejam arrumados.' },
      { question: 'Vocês garantem mais vendas com a operação?', answer: 'Não. O trabalho facilita o contato e mostra o que está acontecendo. Venda depende de oferta, procura e atendimento, e isso passa a ser medido junto.' },
    ],
    related: ['automacao-whatsapp', 'infraestrutura-digital', 'analytics-e-cro'],
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
    summary: 'Compare uma plataforma de criação autônoma com uma arquitetura sob medida acompanhada por uma equipe externa de tecnologia.',
    platformFit: 'O Wix pode atender bem quem deseja montar e administrar uma presença digital usando os recursos disponibilizados pela própria plataforma.',
    customFit: 'Um site sob medida faz sentido quando posicionamento, jornada comercial, integrações e responsabilidade operacional precisam refletir um processo específico.',
    considerations: [
      { title: 'Autonomia ou execução acompanhada', detail: 'Avalie se a equipe pretende construir sozinha ou precisa de direção, implementação e acompanhamento.' },
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
    summary: 'Entenda quando um CMS aberto resolve a necessidade e quando uma arquitetura própria com responsabilidades definidas é mais adequada.',
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
    questions: [{ question: 'Uma landing page pode ficar dentro do domínio principal?', answer: 'Sim. Uma rota específica pode concentrar uma oferta enquanto aproveita identidade, estrutura e mensuração do domínio central.' }],
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

export type Demonstration = { slug: string; title: string; segment: string; solution: string; description: string };

export const DEMONSTRATIONS: Demonstration[] = [
  { slug: 'clinica-premium', title: 'Clínica — fluxo de atendimento', segment: 'Saúde e odontologia', solution: 'site-para-clinicas', description: 'Especialidades, seleção de atendimento e simulação de pedido de avaliação.' },
  { slug: 'restaurante-premium', title: 'Restaurante — cardápio e pedido', segment: 'Gastronomia', solution: 'site-para-restaurantes', description: 'Cardápio filtrável, seleção de pratos e resumo de pedido demonstrativo.' },
  { slug: 'representacao-comercial', title: 'Representação comercial', segment: 'Catálogo e distribuição', solution: 'catalogo-para-representantes', description: 'Busca por produto, filtro de categorias e montagem de uma cotação ilustrativa.' },
  { slug: 'imobiliaria-premium', title: 'Imobiliária — busca e interesse', segment: 'Mercado imobiliário', solution: 'site-para-imobiliarias', description: 'Filtros de busca e experiência de consulta a imóveis fictícios.' },
];

export type SeoEntry = { path: string; title: string; description: string; category: string; headings: string[]; questions: Faq[] };

export const GROWTH_SEO: SeoEntry[] = [
  {
    path: '/solucoes',
    title: 'Sites, lojas, aplicativos e soluções digitais | Rei das Vendas',
    description: 'Explore 24 possibilidades de presença, comércio, atendimento, produto, distribuição e operação digital para negócios locais.',
    category: 'CollectionPage',
    headings: SOLUTIONS.map((item) => item.title),
    questions: [],
  },
  {
    path: '/diagnostico',
    title: 'Mapeamento do perfil do seu negócio | Rei das Vendas',
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
