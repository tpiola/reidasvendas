/* eslint-disable @next/next/no-html-link-for-pages -- WhatsApp route handlers require full navigation and a fresh event ID, without prefetch. */
import PageShell from '@/components/PageShell';
import { metadata as meta } from '@/lib/site';
export const metadata = meta(
  'Sobre a Rei das Vendas em Franca',
  'Marketing digital e tecnologia comercial com diagnóstico, processo e execução para empresas de Franca/SP e região.',
  '/sobre',
);
export default function Page() {
  return (
    <PageShell
      title="Diagnóstico antes de indicação."
      description="Marketing, tecnologia e processo comercial precisam conversar. A Rei das Vendas organiza esse caminho com responsabilidade por cada entrega."
      path="/sobre"
    >
      <div className="prose">
        <h2>Franca é o ponto de partida.</h2>
        <p>
          Atendemos empresas de Franca/SP, região e projetos remotos no Brasil.
          Site, anúncio, conteúdo e acompanhamento entram no plano quando
          respondem a uma necessidade real.
        </p>
        <h2>Disciplina para investigar. Clareza para executar.</h2>
        <p>
          A marca foi criada por Thiago Piola. A experiência como farmacêutico
          inspira o cuidado de entender o cenário antes de indicar uma ação. Na
          operação comercial, isso significa ouvir o gestor, levantar fatos,
          desenhar o processo e acompanhar o que mudou.
        </p>
        <p>
          Formação farmacêutica não equivale a certificação de marketing. Nossa
          autoridade deve ser avaliada pelo trabalho entregue, pelo escopo e por
          evidências verificáveis.
        </p>
        <h2>O que orienta o trabalho</h2>
        <ul>
          <li>Contas, domínio e acessos com propriedade definida.</li>
          <li>Informação real, sem resultados ou depoimentos fabricados.</li>
          <li>
            Experiência móvel, acessibilidade e privacidade desde a construção.
          </li>
          <li>Decisões com métrica, contexto e limite reconhecido.</li>
        </ul>
        <a
          className="button button-primary"
          href="/go/whatsapp?src=sobre&page=/sobre"
        >
          Conversar com a Rei das Vendas
        </a>
      </div>
    </PageShell>
  );
}
