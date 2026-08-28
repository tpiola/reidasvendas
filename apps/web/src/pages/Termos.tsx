import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND } from '@/lib/brand';

const scopeRows = [
  {
    label: 'Proposta',
    detail: 'Cada projeto parte de um diagnóstico e vira uma proposta escrita com o que está incluído, o que depende do cliente e o que é opcional — nada é contratado antes disso.',
  },
  {
    label: 'Entrega individual',
    detail: 'Escopo fechado (site, loja, aplicativo, automação) com prazo e responsabilidades definidos na proposta aceita.',
  },
  {
    label: 'Operação contínua',
    detail: 'Assinatura mensal para manter, evoluir e monitorar uma base já publicada — cancelável conforme o ciclo vigente na proposta aceita.',
  },
];

const boundaries = [
  'Mídia paga, licenças de terceiros e serviços externos (hospedagem, domínio, gateways de pagamento, APIs) aparecem separados do trabalho do Rei das Vendas e seguem os termos de cada fornecedor.',
  'Domínio, código-fonte, acessos e dados do projeto são do cliente e ficam definidos por escrito antes do início — nenhuma dependência oculta do desenvolvedor.',
  'Nenhuma proposta promete posição de ranking, volume de vendas ou prazo incompatível com o escopo contratado.',
  'Alterações fora do escopo aceito são tratadas como um novo item de proposta, não como correção.',
];

export default function Termos() {
  return (
    <main id="main-content" className="rdv-privacy">
      <section className="rdv-privacy__hero">
        <div className="rdv-shell">
          <p className="rdv-kicker">Termos de uso / 28 ago. 2026</p>
          <h1>O que muda de mãos, e quando.</h1>
          <p>
            Estes termos regem o uso de reidasvendas.com.br e a contratação de qualquer entrega ou operação
            descrita em /planos. A proposta escrita aceita por você prevalece sobre este documento em caso de
            conflito específico de escopo, prazo ou valor.
          </p>
        </div>
      </section>

      <section className="rdv-privacy__ledger" aria-labelledby="terms-scope-title">
        <div className="rdv-shell">
          <p className="rdv-kicker">01 / modelos de relação</p>
          <h2 id="terms-scope-title">Como o trabalho é contratado</h2>
          <dl>
            {scopeRows.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="rdv-privacy__text" aria-label="Pagamento, propriedade e responsabilidade">
        <div className="rdv-shell">
          <article>
            <p className="rdv-kicker">02 / pagamento</p>
            <h2>Como e quando</h2>
            <p>
              Valores e condições de pagamento constam apenas na proposta escrita aceita — este site não publica
              preço porque o escopo varia por projeto. Atraso ou não pagamento pode suspender a entrega ou a
              operação contínua conforme definido na proposta.
            </p>
          </article>
          <article>
            <p className="rdv-kicker">03 / propriedade</p>
            <h2>O que é seu desde o início</h2>
            <p>
              Domínio, código-fonte, conteúdo e acessos de um projeto entregue pertencem ao cliente. Bibliotecas,
              templates e ferramentas internas reutilizadas entre projetos continuam de titularidade do Rei das
              Vendas quando não fazem parte do escopo vendido.
            </p>
          </article>
          <article>
            <p className="rdv-kicker">04 / responsabilidade</p>
            <h2>Limites do que é prometido</h2>
            <p>
              O Rei das Vendas responde pela qualidade técnica e pelo escopo aceito. Resultado de negócio
              (vendas, ranking, conversão) depende de fatores fora do controle do desenvolvedor — nenhuma
              proposta garante esse tipo de resultado, conforme os princípios publicados em /planos.
            </p>
          </article>
          <article>
            <p className="rdv-kicker">05 / cancelamento</p>
            <h2>Saída de qualquer lado</h2>
            <p>
              Uma operação contínua pode ser cancelada por qualquer parte conforme o aviso prévio definido na
              proposta aceita. Uma entrega individual já iniciada é cobrada proporcionalmente ao que foi
              executado até a data de cancelamento.
            </p>
          </article>
        </div>
      </section>

      <section className="rdv-privacy__rights" aria-labelledby="terms-boundaries-title">
        <div className="rdv-shell">
          <div>
            <p className="rdv-kicker">06 / fronteiras do escopo</p>
            <h2 id="terms-boundaries-title">O que fica de fora, por padrão.</h2>
          </div>
          <ul>
            {boundaries.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p>
            Dúvida sobre um caso específico: <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>. Litígios não
            resolvidos diretamente seguem a legislação brasileira, no foro da comarca de Franca, SP.
          </p>
        </div>
      </section>

      <section className="rdv-privacy__notes" aria-label="Dados e atualização">
        <div className="rdv-shell">
          <article>
            <h2>Dados pessoais</h2>
            <p>O tratamento de dados enviados pelo site segue a <Link to="/politica">política de privacidade</Link>, não este documento.</p>
          </article>
          <article>
            <h2>Atualizações</h2>
            <p>Estes termos mudam quando o modelo de contratação muda. A data no início da página indica a versão publicada; a proposta aceita mantém as condições vigentes no momento da contratação.</p>
          </article>
        </div>
      </section>

      <section className="rdv-privacy__closing">
        <div className="rdv-shell">
          <a className="rdv-action rdv-action--outline rdv-action--lg" href={`mailto:${BRAND.email}`}>
            <Mail aria-hidden="true" /> Tirar uma dúvida
          </a>
          <Link className="rdv-primary-action" to="/diagnostico">
            Abrir diagnóstico <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
