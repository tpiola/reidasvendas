import PageShell from '@/components/PageShell';
import { CookieSettingsButton } from '@/lib/consent';
import { metadata as meta } from '@/lib/site';
export const metadata = meta(
  'Política de privacidade e cookies',
  'Como a Rei das Vendas trata pedidos de contato, preferências de cookies, medição e direitos sobre dados.',
  '/privacidade',
);
export default function Page() {
  return (
    <PageShell
      title="Seus dados têm finalidade. Sua escolha tem controle."
      description="Política de privacidade da Rei das Vendas. Atualizada em 23 de outubro de 2026."
      path="/privacidade"
    >
      <div className="prose">
        <h2>Quem atende sua solicitação</h2>
        <p>
          Rei das Vendas, marca de serviços de marketing digital e tecnologia
          comercial com atuação em Franca/SP. Para tratar de privacidade ou
          identificar o responsável pelo seu atendimento, use o WhatsApp{' '}
          <a href="https://wa.me/5516992333344">(16) 99233-3344</a>.
        </p>
        <h2>O que coletamos e para quê</h2>
        <p>
          Se você solicitar contato, usamos nome, telefone, empresa e desafio
          informado para entender e responder ao pedido. Não pedimos dados de
          saúde, documentos, senhas ou listas de clientes. Os dados fornecidos
          para preparar uma conversa no WhatsApp só saem do navegador quando
          você abre o aplicativo e decide enviar a mensagem.
        </p>
        <p>
          Quando o formulário de recebimento estiver disponível, os dados são
          encaminhados ao sistema de atendimento usado pela Rei das Vendas. A
          confirmação só aparece depois que esse sistema aceitar o pedido.
        </p>
        <h2>Base legal e comunicações</h2>
        <p>
          O pedido de proposta e os procedimentos preliminares relacionados a
          uma contratação ocorrem a seu pedido. O formulário também registra sua
          autorização de contato. Campanhas futuras exigem uma escolha própria
          quando aplicável; preencher um diagnóstico não inscreve você em
          publicidade. Cookies opcionais dependem de consentimento por
          finalidade.
        </p>
        <h2 id="cookies">Cookies e armazenamento</h2>
        <ul>
          <li>
            <strong>Necessários:</strong> preferência de privacidade, com
            validade de 180 dias, e controles de segurança de formulários.
          </li>
          <li>
            <strong>Análise de uso:</strong> quando habilitado na operação e
            autorizado, Google Analytics mede páginas e interações. A URL
            enviada exclui parâmetros e textos livres.
          </li>
          <li>
            <strong>Publicidade:</strong> quando habilitado e autorizado, Meta
            Pixel e Conversions API medem contato e lead; sinais de anúncios
            Google seguem a mesma escolha.
          </li>
        </ul>
        <p>
          As opções de análise e publicidade começam desligadas. Rejeitar não
          limita o site. Ao revogar, os próximos envios são bloqueados, os
          cookies opcionais acessíveis ao site são removidos e a página é
          recarregada. Isso não apaga automaticamente dados já recebidos por
          fornecedores.
        </p>
        <CookieSettingsButton className="button button-secondary" />
        <h2>Fornecedores e transferências internacionais</h2>
        <p>
          A hospedagem utiliza Vercel e o código é mantido no GitHub.
          WhatsApp/Meta recebe a mensagem que você decidir enviar e trata dados
          segundo suas próprias condições. Google Analytics, Meta e o sistema de
          atendimento só devem receber dados conforme as finalidades descritas.
          Esses fornecedores podem processar dados fora do Brasil, sujeitos às
          salvaguardas e condições contratuais aplicáveis.
        </p>
        <p>
          Consulte{' '}
          <a href="https://policies.google.com/privacy" rel="noreferrer">
            Google
          </a>
          ,{' '}
          <a href="https://www.facebook.com/privacy/policy/" rel="noreferrer">
            Meta
          </a>
          ,{' '}
          <a
            href="https://www.whatsapp.com/legal/privacy-policy"
            rel="noreferrer"
          >
            WhatsApp
          </a>{' '}
          e{' '}
          <a href="https://vercel.com/legal/privacy-policy" rel="noreferrer">
            Vercel
          </a>
          .
        </p>
        <h2>Planos, diagnóstico rápido e pagamentos</h2>
        <p>
          Escolher um plano e responder ao diagnóstico rápido não inicia uma
          cobrança. O contexto não sensível de implantação pode ficar neste
          navegador por até 30 minutos e não é enviado ao analytics. O plano e o
          ciclo são usados para dar continuidade à solicitação.
        </p>
        <p>
          Quando a contratação online estiver habilitada, o checkout hospedado
          da Stripe recebe os dados de pagamento e identificação solicitados por
          ela. Este site não recebe o número completo do cartão. O servidor
          trata identificadores de operação, plano, valor e status estritamente
          necessários para conciliar cobrança, renovação, falha ou cancelamento,
          sem copiar esses dados para ferramentas de publicidade
          automaticamente.
        </p>
        <p>
          O adaptador de pagamento está preparado, mas a cobrança ainda não está
          ativa nesta oferta. O fornecedor efetivo, seus termos, a identidade
          jurídica do contratante e a política de retenção devem ser confirmados
          antes de habilitar pagamentos. Emissão fiscal e recibo seguem a
          contratação e obrigações aplicáveis; este site não emite uma nota
          fiscal automaticamente.
        </p>
        <h2>Retenção e segurança</h2>
        <p>
          Preferências de cookies expiram em 180 dias. Chaves pseudonimizadas de
          controle de tentativas expiram em até dez minutos. O adaptador de
          pagamento usa armazenamento durável de registros mínimos com prazos
          técnicos documentados; a retenção contratual e fiscal precisa ser
          confirmada antes da ativação. Pedidos de contato devem ser revisados
          em até 180 dias após a última interação, para exclusão ou definição de
          outra necessidade legal/contratual. Documentos contratuais seguem os
          prazos legais aplicáveis. Não registramos o texto do seu desafio em
          ferramentas de analytics.
        </p>
        <p>
          Tráfego HTTPS, validação de entrada e controles de acesso reduzem
          risco, sem promessa de segurança absoluta. A retenção efetiva no CRM e
          nos fornecedores deve ser confirmada pelo responsável em cada
          operação.
        </p>
        <h2>Seus direitos</h2>
        <p>
          Você pode pedir confirmação, acesso, correção, informações sobre
          compartilhamento, portabilidade quando aplicável, anonimização,
          bloqueio ou eliminação e revogação do consentimento. Fale pelo
          WhatsApp comercial e informe que o assunto é privacidade. Podemos
          pedir uma validação proporcional de identidade antes de entregar ou
          alterar dados.
        </p>
        <h2>Crianças e alterações</h2>
        <p>
          O site é voltado a gestores e representantes de empresas. Não
          direcionamos publicidade a crianças. Esta política será atualizada
          quando houver mudança de finalidade ou fornecedor relevante, com nova
          escolha quando necessária.
        </p>
      </div>
    </PageShell>
  );
}
