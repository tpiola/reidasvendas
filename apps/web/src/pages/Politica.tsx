import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '@/lib/seo';

export default function Politica() {
  useEffect(() => {
    applySeo({
      title: 'Politica de Privacidade — Rei das Vendas',
      description: 'Saiba como a Rei das Vendas coleta, usa, armazena e protege seus dados pessoais em conformidade com a LGPD.',
      canonicalPath: '/politica',
    });
  }, []);

  return (
    <main className="page-surface mx-auto max-w-3xl px-6 py-16 md:py-24">
      <nav className="mb-8 text-xs text-surface-muted" aria-label="Breadcrumb">
        <Link to="/" className="text-surface transition-colors hover:opacity-80">Inicio</Link>
        <span className="mx-2">›</span>
        <span>Politica de Privacidade</span>
      </nav>

      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
        Politica de Privacidade
      </h1>

      <p className="mt-2 text-xs text-surface-muted">Ultima atualizacao: junho de 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-surface-muted">
        {/* 1. Dados coletados */}
        <section aria-labelledby="coleta-heading">
          <h2 id="coleta-heading" className="text-base font-semibold text-surface">
            1. Dados que coletamos
          </h2>
          <p className="mt-3">
            Quando voce utiliza nossos servicos ou preenche formularios em nosso site, podemos coletar as seguintes informacoes:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 pl-2">
            <li>Nome completo</li>
            <li>Endereco de e-mail</li>
            <li>Numero de WhatsApp / telefone</li>
            <li>Ramo ou segmento do seu negocio</li>
            <li>Informacoes sobre sua necessidade ou projeto</li>
            <li>Dados de navegacao (cookies analiticos e essenciais)</li>
          </ul>
          <p className="mt-2">
            Nao coletamos dados sensiveis como origem racial, conviccao religiosa, opiniao politica,
            dados geneticos ou biometricos.
          </p>
        </section>

        {/* 2. Uso dos dados */}
        <section aria-labelledby="uso-heading">
          <h2 id="uso-heading" className="text-base font-semibold text-surface">
            2. Como usamos seus dados
          </h2>
          <p className="mt-3">
            Utilizamos os dados coletados exclusivamente para as seguintes finalidades:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 pl-2">
            <li>Responder a solicitacoes de diagnostico ou orcamento</li>
            <li>Enviar propostas comerciais personalizadas</li>
            <li>Prestar suporte e acompanhamento de projetos</li>
            <li>Melhorar a experiencia de navegacao e conversao do site</li>
            <li>Enviar comunicacoes relacionadas aos servicos contratados</li>
            <li>Cumprir obrigacoes legais e regulatorias</li>
          </ul>
          <p className="mt-2">
            Nao utilizamos seus dados para tomada de decisoes automatizadas que produzam efeitos
            juridicos sem revisao humana.
          </p>
        </section>

        {/* 3. Compartilhamento */}
        <section aria-labelledby="compartilhamento-heading">
          <h2 id="compartilhamento-heading" className="text-base font-semibold text-surface">
            3. Compartilhamento de dados
          </h2>
          <p className="mt-3">
            A Rei das Vendas nao vende, aluga ou compartilha seus dados pessoais com terceiros
            para fins comerciais. Seus dados podem ser compartilhados apenas nas seguintes situacoes:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 pl-2">
            <li>Com prestadores de servico que atuam em nosso nome (plataforma de CRM, envio de e-mails), mediante contrato de confidencialidade</li>
            <li>Para cumprimento de obrigacao legal, ordem judicial ou requisicao de autoridade competente</li>
            <li>Com seu consentimento explicito para finalidade especifica</li>
          </ul>
          <p className="mt-2">
            Todos os parceiros estao em conformidade com a LGPD e possuem medidas de seguranca
            adequadas para proteger seus dados.
          </p>
        </section>

        {/* 4. Cookies */}
        <section aria-labelledby="cookies-heading">
          <h2 id="cookies-heading" className="text-base font-semibold text-surface">
            4. Cookies e tecnologias de rastreamento
          </h2>
          <p className="mt-3">
            Utilizamos cookies e tecnologias similares para melhorar o funcionamento do site e
            sua experiencia de navegacao. Os cookies sao divididos em:
          </p>
          <div className="mt-3 space-y-3">
            <div className="rounded-xl border border-[color:var(--border-subtle)] p-4">
              <p className="font-semibold text-surface">Cookies essenciais</p>
              <p className="mt-1 text-xs">
                Necessarios para o funcionamento basico do site. Nao podem ser desativados.
                Incluem cookies de sessao, preferencias de tema e seguranca.
              </p>
            </div>
            <div className="rounded-xl border border-[color:var(--border-subtle)] p-4">
              <p className="font-semibold text-surface">Cookies analiticos</p>
              <p className="mt-1 text-xs">
                Utilizados para medir desempenho e otimizar a conversao. Coletam dados
                anonimizados de navegacao. Sao ativados somente com seu consentimento.
              </p>
            </div>
          </div>
          <p className="mt-3">
            Voce pode recusar cookies analiticos a qualquer momento atraves do banner exibido na
            primeira visita. Para gerenciar cookies essenciais, utilize as configuracoes do seu
            navegador.
          </p>
        </section>

        {/* 5. LGPD - Direitos do titular */}
        <section aria-labelledby="lgpd-heading">
          <h2 id="lgpd-heading" className="text-base font-semibold text-surface">
            5. Seus direitos (LGPD - Lei 13.709/2018)
          </h2>
          <p className="mt-3">
            Em conformidade com a Lei Geral de Protecao de Dados (LGPD), voce possui os seguintes
            direitos sobre seus dados pessoais:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 pl-2">
            <li><strong>Confirmacao e acesso</strong> — saber se tratamos seus dados e quais dados</li>
            <li><strong>Correcao</strong> — solicitar a correcao de dados incompletos, inexatos ou desatualizados</li>
            <li><strong>Anonimizacao, bloqueio ou eliminacao</strong> — dados desnecessarios ou tratados em desacordo com a lei</li>
            <li><strong>Portabilidade</strong> — transferir seus dados para outro fornecedor de servico</li>
            <li><strong>Eliminacao</strong> — solicitar a exclusao dos dados tratados com seu consentimento</li>
            <li><strong>Informacao</strong> — saber com quem compartilhamos seus dados</li>
            <li><strong>Revogacao do consentimento</strong> — retirar seu consentimento a qualquer momento</li>
            <li><strong>Oposicao</strong> — opor-se ao tratamento para finalidades que nao sejam obrigatorias</li>
          </ul>
          <p className="mt-3">
            Para exercer qualquer um desses direitos, entre em contato pelo e-mail{' '}
            <a href="mailto:contato@reidasvendas.com.br" className="text-surface underline hover:opacity-80">
              contato@reidasvendas.com.br
            </a>
            . Responderemos em ate 15 dias uteis.
          </p>
        </section>

        {/* 6. Armazenamento e seguranca */}
        <section aria-labelledby="seguranca-heading">
          <h2 id="seguranca-heading" className="text-base font-semibold text-surface">
            6. Armazenamento e seguranca dos dados
          </h2>
          <p className="mt-3">
            Adotamos medidas tecnicas e organizacionais para proteger seus dados pessoais contra
            acesso nao autorizado, destruicao, perda, alteracao ou qualquer forma de tratamento
            inadequado:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 pl-2">
            <li>Criptografia SSL/TLS em todas as transmissoes de dados</li>
            <li>Acesso restrito a colaboradores autorizados</li>
            <li>Politica interna de seguranca da informacao</li>
            <li>Auditoria periodica de seguranca</li>
            <li>Armazenamento em servidores seguros com backup regular</li>
          </ul>
          <p className="mt-2">
            Seus dados serao mantidos pelo periodo necessario para cumprir as finalidades
            descritas nesta politica, salvo se a lei exigir prazos maiores.
          </p>
        </section>

        {/* 7. Contato */}
        <section aria-labelledby="contato-heading">
          <h2 id="contato-heading" className="text-base font-semibold text-surface">
            7. Contato com o Encarregado (DPO)
          </h2>
          <p className="mt-3">
            Caso tenha duvidas sobre esta Politica de Privacidade ou sobre o tratamento de seus
            dados, entre em contato com nosso Encarregado de Protecao de Dados (DPO):
          </p>
          <div className="mt-3 rounded-xl border border-[color:var(--border-subtle)] p-4 text-xs">
            <p><strong>E-mail:</strong>{' '}
              <a href="mailto:contato@reidasvendas.com.br" className="text-surface underline hover:opacity-80">
                contato@reidasvendas.com.br
              </a>
            </p>
            <p className="mt-1"><strong>WhatsApp:</strong>{' '}
              <a href="https://wa.me/5516992333344" target="_blank" rel="noreferrer" className="text-surface underline hover:opacity-80">
                (16) 99233-3344
              </a>
            </p>
            <p className="mt-1"><strong>Endereco:</strong> Franca / SP</p>
            <p className="mt-1"><strong>Horario de atendimento:</strong> Seg a Sex, das 8h as 18h</p>
          </div>
        </section>

        {/* 8. Atualizacoes */}
        <section aria-labelledby="atualizacoes-heading">
          <h2 id="atualizacoes-heading" className="text-base font-semibold text-surface">
            8. Atualizacoes desta politica
          </h2>
          <p className="mt-3">
            Esta Politica de Privacidade pode ser atualizada periodicamente para refletir mudancas
            em nossas praticas ou na legislacao aplicavel. Recomendamos que voce a revise
            regularmente.
          </p>
          <p className="mt-2">
            Em caso de alteracoes significativas, notificaremos os titulares pelos meios de
            contato disponiveis ou atraves de aviso em nosso site.
          </p>
        </section>
      </div>

      <div className="mt-10 border-t border-black/8 pt-8">
        <Link
          to="/"
          className="btn-ghost inline-flex h-10 items-center gap-2 rounded-xl px-4 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60"
        >
          &larr; Voltar para a Home
        </Link>
      </div>
    </main>
  );
}
