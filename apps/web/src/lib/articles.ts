export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  published: string;
  displayDate: string;
  readTime: string;
  sections: ArticleSection[];
};

export const ARTICLES: Article[] = [
  {
    slug: 'presenca-digital-o-que-e',
    title: 'Presença digital, sem teatro: o que precisa estar sob controle',
    description: 'Um guia operacional para conferir domínio, busca local, páginas, contato, dados e responsabilidades antes de comprar mais ferramentas.',
    category: 'Operação comercial',
    published: '2026-08-25',
    displayDate: '25 ago 2026',
    readTime: '7 min',
    sections: [
      {
        heading: 'Comece pela tarefa, não pela plataforma',
        paragraphs: [
          'Presença digital não é a soma de um site, um perfil social e algumas campanhas. É a capacidade de alguém encontrar a empresa, entender o que ela resolve, verificar se é confiável e iniciar uma conversa sem reconstruir o contexto do zero.',
          'Esse encadeamento é mais útil do que qualquer lista de canais. Ele mostra onde a jornada quebra: a empresa pode aparecer no mapa e ainda esconder o serviço; pode ter uma página bonita e ainda encaminhar todo mundo para a mesma conversa genérica; pode receber contatos e não saber de qual busca vieram.',
        ],
      },
      {
        heading: 'Os cinco controles mínimos',
        paragraphs: [
          'Antes de adicionar automação, verifique se a base tem responsáveis e acessos definidos. Sem isso, cada melhoria vira dependência de uma pessoa, uma agência ou uma conta esquecida.',
        ],
        bullets: [
          'Domínio: titular, renovação, DNS e acesso documentados.',
          'Publicação: um repositório principal, uma branch de produção e um projeto de deploy.',
          'Informação: nome, telefone, horário, endereço e serviços consistentes entre site e perfis oficiais.',
          'Contato: origem, página e intenção preservadas quando a conversa começa.',
          'Medição: eventos que respondem perguntas reais, sem coletar dados por hábito.',
        ],
      },
      {
        heading: 'Um teste de trinta minutos',
        paragraphs: [
          'Abra uma janela anônima no celular e procure a empresa pelo nome. Depois procure pelo serviço e pela cidade. Compare título, descrição, telefone, horário e endereço com o que aparece no site. Entre por uma página interna e tente chegar ao contato sem usar o menu.',
          'Por fim, faça uma solicitação de teste. O atendimento consegue saber qual página trouxe a pessoa, qual necessidade foi escolhida e o que já foi informado? Se a resposta for não, a perda não está necessariamente no tráfego. Está na passagem entre interesse e atendimento.',
        ],
      },
      {
        heading: 'Quando não construir um site novo',
        paragraphs: [
          'Uma reconstrução completa é desperdício quando o problema cabe em uma correção de rota, uma página bem escrita, um formulário menor ou a revisão do perfil da empresa no Google. O escopo só deve crescer quando a restrição exige nova arquitetura, integração ou responsabilidade operacional.',
          'A pergunta certa não é “qual tecnologia está faltando?”. É “qual decisão o cliente não consegue tomar e qual informação a equipe perde depois que ele age?”.',
        ],
      },
      {
        heading: 'O que vale acompanhar',
        paragraphs: [
          'Impressões, cliques e visitas ajudam a localizar o início da jornada. Para orientar o trabalho, conecte esses sinais a ações que tenham significado: diagnóstico iniciado, diagnóstico concluído, serviço selecionado e conversa aberta com contexto.',
          'A medição não precisa parecer sofisticada. Precisa permitir que alguém compare períodos, identifique uma ruptura e saiba qual decisão será tomada em seguida.',
        ],
      },
    ],
  },
  {
    slug: 'um-projeto-um-deploy-um-dominio',
    title: 'Um projeto, um deploy, um domínio: a regra que evita versões concorrentes',
    description: 'Como organizar repositório, produção, aliases e rollback para que cada projeto tenha uma única origem verificável.',
    category: 'Publicação e continuidade',
    published: '2026-08-25',
    displayDate: '25 ago 2026',
    readTime: '8 min',
    sections: [
      {
        heading: 'Versões concorrentes parecem inofensivas até o primeiro incidente',
        paragraphs: [
          'Dois repositórios com nomes parecidos, uma configuração na raiz e outra dentro do aplicativo, um domínio apontando para um projeto antigo: cada item isolado parece administrável. Juntos, eles tornam impossível responder com rapidez a uma pergunta básica — qual código está no ar agora?',
          'A confusão costuma aparecer como sintoma: uma correção chega ao preview e não à produção, um domínio exibe metadados antigos, o time reverte o lugar errado ou um deploy automático continua publicando uma branch abandonada.',
        ],
      },
      {
        heading: 'O mapa canônico de cada projeto',
        paragraphs: [
          'Cada produto ativo deve caber em uma linha de inventário. Essa linha conecta identidade, código e publicação sem alternativas implícitas.',
        ],
        bullets: [
          'Produto: nome público e finalidade.',
          'Código: organização, repositório e branch de produção.',
          'Deploy: equipe, projeto e diretório de raiz.',
          'Domínio: endereço principal e redirecionamentos aceitos.',
          'Responsável: quem aprova, publica e recupera.',
        ],
      },
      {
        heading: 'Uma configuração de build, no lugar em que a plataforma lê',
        paragraphs: [
          'Monorepos pedem disciplina adicional. A configuração efetiva deve ficar no nível ligado ao projeto de deploy. Um segundo arquivo dentro do aplicativo, com comandos diferentes, cria uma promessa que talvez nunca seja executada.',
          'O mesmo vale para scripts paralelos de publicação. Se a produção sai pela integração entre Git e Vercel, qualquer fluxo legado precisa ser arquivado, documentado como histórico ou removido da rota ativa. Caminho alternativo não é redundância quando ninguém testa os dois; é ambiguidade.',
        ],
      },
      {
        heading: 'A verificação termina no domínio público',
        paragraphs: [
          'Build aprovado e preview acessível são etapas, não conclusão. A conferência final precisa usar o domínio que clientes e mecanismos de busca encontram. Verifique resposta HTTP, redirecionamento entre www e endereço principal, canonical, título, robots, sitemap e os fluxos que gravam dados.',
          'Também confira os erros de execução depois de gerar tráfego real de teste. Uma página estática pode responder 200 enquanto uma função usada no formulário falha em silêncio.',
        ],
      },
      {
        heading: 'Rollback é parte do caminho único',
        paragraphs: [
          'Ter uma origem canônica não elimina recuperação; melhora a recuperação. O rollback deve apontar para um deploy anterior do mesmo projeto, associado a um commit conhecido. Não deve depender de ressuscitar outro repositório ou trocar o domínio para uma aplicação parecida.',
          'Com esse desenho, incidentes deixam rastros legíveis: commit, build, domínio, horário e responsável. A equipe discute a falha concreta, não qual versão “parece ser” a correta.',
        ],
      },
      {
        heading: 'Por que isso também é SEO e conversão',
        paragraphs: [
          'Mecanismos de busca precisam encontrar um endereço estável, metadados coerentes e redirecionamentos determinísticos. Pessoas precisam reconhecer a mesma promessa da busca até o contato. Quando versões concorrentes exibem conteúdo, canonical ou formulários diferentes, ambos perdem confiança.',
          'A organização técnica não fica nos bastidores. Ela sustenta a continuidade da mensagem e impede que uma melhoria comercial seja publicada no lugar errado.',
        ],
      },
    ],
  },
];

export const ARTICLE_BY_SLUG = new Map(ARTICLES.map((article) => [article.slug, article]));
