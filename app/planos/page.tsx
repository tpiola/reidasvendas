/* eslint-disable @next/next/no-html-link-for-pages -- WhatsApp redirects require full navigation and a per-click event ID; never prefetch this endpoint. */
import Link from 'next/link';
import Pricing from '@/components/Pricing';
import JsonLd from '@/components/JsonLd';
import { metadata as createMetadata, breadcrumb } from '@/lib/site';

export const metadata = createMetadata(
  'Planos de site e presença digital por assinatura',
  'Compare planos de site, SEO local, WhatsApp e manutenção para pequenas empresas. Implantação, recorrência, limites e custo do primeiro ano claros.',
  '/planos',
);
const questions = [
  [
    'O que estou escolhendo aqui?',
    'Você escolhe um escopo de referência para discutir com a Rei das Vendas. A contratação depende de uma proposta com entregas, limites, prazo e condições. Este site não realiza cobranças nem ativa uma assinatura automaticamente.',
  ],
  [
    'Por que existe implantação além da mensalidade?',
    'A implantação cobre o trabalho inicial de organização e construção previsto no escopo. A recorrência cobre a continuidade combinada, como manutenção, acompanhamento e ajustes. Essa separação evita esconder o custo inicial na mensalidade.',
  ],
  [
    'Como funciona o ciclo anual?',
    'O valor equivalente mensal serve apenas para comparação. No ciclo anual, o valor de 12 meses de recorrência recebe o desconto informado e é pago uma vez por ano. O valor mensal equivalente não é uma parcela. A implantação é separada e não recebe esse desconto. As condições finais constam na proposta.',
  ],
  [
    'Posso pedir qualquer mudança no site?',
    'Cada plano tem uma capacidade de ajustes e um escopo. Novas páginas, integrações, campanhas e mudanças estruturais podem exigir orçamento separado. O limite é descrito antes da contratação; não prometemos trabalho ilimitado.',
  ],
  [
    'Anúncios e redes sociais entram em todos os planos?',
    'Não. Verba de mídia, gestão de campanhas e produção para redes sociais são serviços distintos, incluídos apenas quando estiverem expressamente previstos. A assinatura mantém uma base de presença digital e operação conforme o plano escolhido.',
  ],
  [
    'Como ficam o domínio, o cancelamento e meus materiais?',
    'Titularidade, acesso, exportação, prazo e efeitos do cancelamento precisam estar definidos na proposta. O domínio deve permanecer sob controle do contratante. Não presuma transferência irrestrita de licenças de terceiros ou ausência de prazo mínimo sem conferir o contrato.',
  ],
];

export default function PlansPage() {
  return (
    <>
      <section className="subscription-plans-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Caminho da página">
            <Link href="/">Início</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Planos</span>
          </nav>
          <p className="subscription-kicker">Site + presença + continuidade</p>
          <h1>
            Seu próximo site precisa
            <br />
            de um próximo passo.
          </h1>
          <p>
            Compare a implantação e o cuidado contínuo. Escolha o ponto de
            partida que cabe na sua operação; o escopo final é validado antes de
            contratar.
          </p>
          <a className="subscription-dark-link" href="/go/whatsapp?src=planos">
            Prefiro conversar sobre meu cenário ↗
          </a>
        </div>
      </section>
      <section
        className="subscription-section container"
        aria-labelledby="plans-title"
      >
        <div className="subscription-heading">
          <div>
            <p className="subscription-kicker">Planos propostos</p>
            <h2 id="plans-title">
              Comece pelo escopo.
              <br />
              Entenda o custo inteiro.
            </h2>
          </div>
          <p>
            Sem mensalidade que esconde a implantação. Sem dizer “ilimitado”
            quando o trabalho tem uma capacidade definida.
          </p>
        </div>
        <Pricing comparison />
      </section>
      <section className="subscription-inclusions">
        <div className="container subscription-inclusions-grid">
          <div>
            <h2>
              A proposta fecha
              <br />
              os detalhes que importam.
            </h2>
            <p>
              O plano é uma referência de trabalho. Sua empresa, seus materiais
              e suas integrações precisam ser considerados antes da implantação.
            </p>
          </div>
          <ul>
            <li>
              <strong>Escopo e critérios de entrega</strong>
              <span>
                O que será construído, com quais materiais e como a entrega será
                conferida.
              </span>
            </li>
            <li>
              <strong>Rotina e capacidade de ajustes</strong>
              <span>
                O que pode ser solicitado, como entra na fila e o que exige
                orçamento adicional.
              </span>
            </li>
            <li>
              <strong>Contas, dados e continuidade</strong>
              <span>
                Responsabilidade sobre os ativos, acesso, cancelamento e
                transição documentados.
              </span>
            </li>
          </ul>
        </div>
      </section>
      <section className="subscription-section container subscription-faq">
        <div>
          <h2>
            Antes de escolher,
            <br />
            tire essas dúvidas.
          </h2>
          <p>Um contrato claro também faz parte da experiência.</p>
        </div>
        <div className="faq-list">
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <div>
                <p>{answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
      <section className="subscription-final">
        <div className="container">
          <div>
            <h2>Não sabe qual plano faz sentido?</h2>
            <p>
              Conte como o cliente encontra sua empresa e o que acontece depois
              do primeiro contato.
            </p>
          </div>
          <a className="button" href="/go/whatsapp?src=planos_final">
            Escolher com orientação ↗
          </a>
        </div>
      </section>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: questions.map(([question, answer]) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: { '@type': 'Answer', text: answer },
          })),
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Presença digital por assinatura',
          serviceType: 'Site, SEO local, WhatsApp e manutenção',
          provider: { '@id': 'https://www.reidasvendas.com.br/#organization' },
          areaServed: [
            { '@type': 'City', name: 'Franca' },
            { '@type': 'Country', name: 'Brasil' },
          ],
          url: 'https://www.reidasvendas.com.br/planos',
        }}
      />
      <JsonLd data={breadcrumb([{ name: 'Planos', path: '/planos' }])} />
    </>
  );
}
