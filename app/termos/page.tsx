import PageShell from '@/components/PageShell';
import { metadata as meta } from '@/lib/site';
export const metadata = meta(
  'Termos de uso',
  'Condições de navegação, conteúdo, simulações e contratação dos serviços Rei das Vendas.',
  '/termos',
);
export default function Page() {
  return (
    <PageShell
      title="Informação clara antes de qualquer compromisso."
      description="Termos de uso do site Rei das Vendas. Atualizados em 23 de outubro de 2026."
      path="/termos"
    >
      <div className="prose">
        <h2>Uso e finalidade</h2>
        <p>
          Este site apresenta serviços e conteúdo educativo. Navegar, usar uma
          calculadora ou iniciar uma conversa não estabelece um contrato de
          prestação de serviços.
        </p>
        <h2>Propostas e condições</h2>
        <p>
          Escopo, preço, prazo, materiais, terceiros, suporte, propriedade e
          condições de cancelamento são definidos na proposta aprovada. A
          conversa inicial é distinta do diagnóstico profissional remunerado.
          Verba de mídia, domínio e ferramentas não estão automaticamente
          incluídos na gestão ou no desenvolvimento.
        </p>
        <p>
          Garantia de 30 dias. As condições aplicáveis constam na proposta. Este
          texto não amplia nem restringe direitos legais do contratante.
        </p>
        <h2>Resultados e simulações</h2>
        <p>
          Simulações são hipóteses matemáticas informadas pelo visitante. Não
          representam previsão, resultado de cliente, lucro ou garantia. Não
          garantimos volume de vendas, aprovação de anúncios ou posições no
          Google. Limites de mensuração e responsabilidades são discutidos na
          contratação.
        </p>
        <h2>Conteúdo e propriedade intelectual</h2>
        <p>
          Textos, marca e componentes autorais são protegidos pela legislação
          aplicável. Bibliotecas e materiais de terceiros seguem suas
          respectivas licenças. A propriedade dos ativos de um projeto
          contratado será definida por escrito; não se presume cessão irrestrita
          por navegar no site.
        </p>
        <h2>Uso indevido e serviços externos</h2>
        <p>
          Não utilize formulários para spam, tentativa de acesso indevido ou
          envio de dados de terceiros sem fundamento. Links para plataformas
          externas seguem as condições desses serviços. A disponibilidade de
          terceiros pode variar.
        </p>
        <h2>Contato e solução de dúvidas</h2>
        <p>
          Use o WhatsApp (16) 99233-3344 para dúvidas e solicitações. Eventuais
          cláusulas de foro ou resolução de controvérsia constam do contrato,
          respeitados os direitos aplicáveis do consumidor.
        </p>
        <p>
          <a href="/privacidade">Leia também a política de privacidade.</a>
        </p>
      </div>
    </PageShell>
  );
}
