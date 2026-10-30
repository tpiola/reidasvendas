import { metadata as meta } from '@/lib/site';
import PageShell from '@/components/PageShell';
import ServiceCards from '@/components/ServiceCards';
import { PILARES } from '@/data/commercial-contract';
import Link from 'next/link';
export const metadata = meta(
  'Sites, SEO local e automação em Franca',
  'Criação de sites, gestão de tráfego, social media, SEO local e CRM. Conheça escopos e formas de contratação.',
  '/servicos',
);
export default function Page() {
  return (
    <PageShell
      title="Marketing e operação na mesma direção."
      description="Você pode contratar uma entrega específica ou conectar aquisição, atendimento e acompanhamento. O problema define o escopo."
      path="/servicos"
    >
      <div className="callout">
        <h2>Prefere continuidade em vez de uma entrega avulsa?</h2>
        <p>
          Os planos reúnem site, SEO local, WhatsApp, manutenção e
          acompanhamento. Cada plano tem limites de entrega e implantação
          separados.
        </p>
        <Link className="button" href="/planos" data-event="click_cta_planos">
          Comparar assinaturas
        </Link>
      </div>
      <ServiceCards />
      <section className="content-section" id="investimento">
        <h2>Investimento com escopo definido.</h2>
        <p>
          Implantação direta e diagnóstico profissional são caminhos diferentes.
          Confira as entregas avulsas abaixo. Escopo, contratação e dependências
          constam na proposta.
        </p>
        <div className="service-grid">
          {[
            {
              nome: 'Página de campanha',
              faixa: 'R$ 1.497',
              resumo:
                'Uma oferta em uma página. Prazo de 5 dias úteis após recebimento do material.',
            },
            {
              nome: 'Site profissional',
              faixa: 'R$ 3.297',
              resumo:
                'Até seis páginas. Prazo de 12 dias úteis após recebimento do material.',
            },
            {
              nome: 'Loja ou catálogo com pedido',
              faixa: 'R$ 5.497',
              resumo:
                'Catálogo e caminho de pedido. Prazo de 20 dias úteis após catálogo e fotos.',
            },
          ].map((s) => (
            <article className="service-card" key={s.nome}>
              <h3>{s.nome}</h3>
              <strong className="price">{s.faixa}</strong>
              <p>{s.resumo}</p>
              <Link className="text-link" href="/diagnostico">
                Definir meu escopo ↗
              </Link>
            </article>
          ))}
        </div>
        <h3>Para operações com tráfego e processos ativos</h3>
        <dl className="price-list">
          {PILARES.map((s) => (
            <div key={s.id}>
              <dt>{s.nome}</dt>
              <dd>{s.faixa}</dd>
              <dd>{s.ancoragem}</dd>
            </div>
          ))}
        </dl>
        <p>
          Mensalidade opcional para implantação direta. Domínio, hospedagem,
          mídia e ferramentas de terceiros são descritos separadamente. Garantia
          de 30 dias. As condições aplicáveis constam na proposta e nos termos.
        </p>
      </section>
    </PageShell>
  );
}
