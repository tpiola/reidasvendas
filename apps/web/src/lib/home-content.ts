/**
 * Compatibilidade de importação.
 *
 * A FAQ comercial da home agora vive em `conversao.ts`, junto do resto do dossiê
 * (patologias, protocolo, laudos e limite de escopo). O script de pré-renderização
 * importa daqui de propósito: é o que garante que o HTML entregue sem JavaScript
 * traga exatamente as mesmas respostas que o visitante lê na tela.
 */
export { HOME_FAQS } from './conversao.ts';
