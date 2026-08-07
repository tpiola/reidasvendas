const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
const email = process.env.NEXT_PUBLIC_EMAIL ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const BRAND = {
  name: "Rei das Vendas",
  overline: "TECNOLOGIA + IA PARA NEGÓCIOS LOCAIS",
  positioning: "Transformamos negócios locais em experiências digitais cinematográficas — no mesmo dia.",
  tagline: "Unidade Externa de Tecnologia e Governança de Resultados",
  whatsappNumber,
  email,
  siteUrl,
  instagram: "",
};

export const NAV_ITEMS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Preços", href: "#precos" },
  { label: "FAQ", href: "#faq" },
] as const;

export const SERVICES = [
  {
    number: "01",
    title: "VÍDEO CINEMATOGRÁFICO DO ESPAÇO",
    description: "Um tour visual do seu negócio para apresentar ambiente, cuidado e detalhes antes da visita.",
    badge: "Formato Reels / Stories",
  },
  {
    number: "02",
    title: "SITE PREMIUM ANIMADO",
    description: "Uma presença rápida, responsiva e construída para levar quem pesquisa até a próxima ação.",
    badge: "Performance verificada antes da entrega",
  },
  {
    number: "03",
    title: "CAMPANHA DE ANÚNCIOS",
    description: "Cinco criativos com direção de arte, preparados para Instagram, Facebook e Google.",
    badge: "5 criativos únicos",
  },
  {
    number: "04",
    title: "PERFIL NO GOOGLE",
    description: "Categoria, serviços, horários, fotos e avaliações organizados para quem já procura o que sua empresa oferece.",
    badge: "Otimização completa no mesmo dia",
  },
] as const;

export const PROCESS = [
  ["08:00", "Briefing", "Uma conversa objetiva para entender negócio, diferenciais e público."],
  ["09:00", "Criação com IA", "Produção do vídeo, site, criativos e estrutura do Perfil no Google a partir do negócio real."],
  ["13:00", "Apresentação", "Primeira versão apresentada para feedback direto."],
  ["15:00", "Ajustes", "Refinamento do material aprovado no briefing."],
  ["18:00", "Entrega", "Site publicado, vídeo e criativos entregues, Perfil no Google organizado."],
] as const;

export const PRICING = [
  {
    id: "essencial",
    name: "ESSENCIAL",
    price: "R$ 697",
    message: "Olá! Quero o Plano Essencial do Rei das Vendas.",
    featured: false,
    features: ["Vídeo cinematográfico de até 35s", "5 criativos para redes sociais", "Otimização do Perfil no Google", "1 rodada de revisão", "Entrega no mesmo dia"],
  },
  {
    id: "completo",
    name: "COMPLETO",
    price: "R$ 1.497",
    message: "Olá! Quero o Plano Completo do Rei das Vendas.",
    featured: true,
    features: ["Tudo do Essencial", "Site premium animado na Vercel", "Copywriting profissional", "2 rodadas de revisão", "Entrega no mesmo dia"],
  },
  {
    id: "premium",
    name: "PREMIUM",
    price: "R$ 2.997",
    message: "Olá! Quero o Plano Premium do Rei das Vendas.",
    featured: false,
    features: ["Tudo do Completo", "12 posts para 3 meses de conteúdo", "Gestão de anúncios no primeiro mês", "Revisões ilimitadas", "Entrega no mesmo dia"],
  },
] as const;

export const FAQ_ITEMS = [
  ["Preciso ter fotos profissionais do meu negócio?", "Não. Partimos do material que sua empresa já possui e, se necessário, orientamos uma captação simples com o próprio celular."],
  ["Como funciona a entrega no mesmo dia?", "O briefing acontece pela manhã, a produção segue ao longo do dia, a versão é apresentada à tarde e a entrega final acontece à noite."],
  ["O site é meu?", "Sim. O projeto é entregue com código-fonte e publicação. O ativo é do seu negócio."],
  ["Preciso pagar mensalidade?", "Não. O projeto é pago uma vez. Existe manutenção opcional por R$ 97/mês, sem fidelidade."],
  ["E se eu não gostar do resultado?", "Cada plano inclui revisão. O refinamento acontece no mesmo fluxo de produção; se a entrega completa não acontecer no mesmo dia, não há cobrança."],
  ["Vocês fazem anúncios pagos?", "Os planos incluem os criativos prontos para anunciar. A gestão de mídia está incluída apenas no Premium."],
  ["Como funciona o pagamento?", "O pagamento acontece na entrega, depois de você ver o resultado. As opções comerciais são Pix, cartão e boleto."],
  ["Vocês atendem minha cidade?", "Sim. O processo atende negócios locais em todo o Brasil de forma remota, do briefing à entrega."],
  ["Por que tão rápido? A qualidade não cai?", "A IA acelera pesquisa, variações e produção; a decisão visual, a revisão e a publicação continuam sob controle humano."],
  ["O que acontece depois da entrega?", "Você recebe site publicado, arquivo do vídeo e criativos em alta resolução, além de suporte inicial para a entrega."],
  ["Vocês mexem no meu Perfil da Empresa no Google?", "Sim. Ajustamos categoria, serviços, horários, fotos e respostas às avaliações pendentes. Precisamos apenas de acesso de gerente; você continua proprietário."],
  ["Preciso dar minha senha do Google?", "Nunca. Você adiciona o Rei das Vendas como gerente pelo painel do Google e pode remover o acesso quando quiser. Não pedimos sua senha."],
] as const;

export const GENERAL_WHATSAPP_MESSAGE = "Olá! Quero transformar meu negócio com o Rei das Vendas.";

export function whatsappUrl(message = GENERAL_WHATSAPP_MESSAGE) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function emailUrl() {
  return `mailto:${email}?subject=${encodeURIComponent("Quero transformar meu negócio com o Rei das Vendas")}`;
}
