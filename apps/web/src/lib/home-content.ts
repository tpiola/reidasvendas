import { IMPLANTACAO, brl } from './ofertas.ts';

const website = IMPLANTACAO.find((item) => item.id === 'site-profissional')!;

/** Respostas iguais para visitantes e para o HTML entregue sem JavaScript. */
export const HOME_FAQS = [
  { question: 'Quanto custa um site profissional?', answer: `O plano de site profissional custa ${brl(website.valor!)}, inclui até 6 páginas e tem prazo de ${website.prazo}. Integrações extras, mídia paga e serviços de terceiros são definidos no escopo.` },
  { question: 'Preciso contratar uma assinatura?', answer: 'A implantação e a assinatura são ofertas separadas. A assinatura cuida da operação e evolução conforme o plano escolhido. Responsabilidades, propriedade e condições ficam por escrito antes do pagamento.' },
  { question: 'O primeiro contato é pago?', answer: 'O contato inicial é sem compromisso de contratação. Se o projeto exigir um diagnóstico aprofundado, o escopo e o valor serão apresentados antes de contratar.' },
  { question: 'Vocês atendem fora de Franca?', answer: 'Sim. O Rei das Vendas atua a partir de Franca, SP, e atende empresas em todo o Brasil de forma remota. A conversa define oferta, público, prioridade e requisitos do projeto.' },
];
