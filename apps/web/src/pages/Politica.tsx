import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';

export default function Politica() {
  useEffect(() => {
    applySeo({
      title: 'Política de Privacidade — Rei das Vendas',
      description: 'Como tratamos seus dados pessoais e suas permissões de contato. LGPD.',
      canonicalPath: '/politica',
    });
  }, []);

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <nav className="mb-8 text-xs text-black/60" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-black transition-colors">Início</Link>
          <span className="mx-2">›</span>
          <span>Política de Privacidade</span>
        </nav>

        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Política de Privacidade
        </h1>

        <p className="mt-2 text-xs text-black/60">Última atualização: abril de 2026</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-black/70">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-xs text-amber-800">
            <strong>Versão inicial — </strong>antes de ir para produção, adeque este documento com seu jurídico (LGPD), mapeie bases legais, prazos de retenção e fornecedores.
          </div>

          <section aria-labelledby="coleta-heading">
            <h2 id="coleta-heading" className="text-base font-semibold text-black">
              1. Dados coletados
            </h2>
            <p className="mt-3">
              Ao preencher o formulário, coletamos: e-mail (obrigatório) e, de forma
              opcional, nome, WhatsApp e cidade. Nenhum dado sensível é coletado.
            </p>
          </section>

          <section aria-labelledby="finalidade-heading">
            <h2 id="finalidade-heading" className="text-base font-semibold text-black">
              2. Finalidade
            </h2>
            <p className="mt-3">
              Os dados são utilizados exclusivamente para: (a) responder ao seu pedido de
              diagnóstico, (b) enviar proposta comercial se houver interesse mútuo, e (c)
              melhorar a experiência de conversão do site.
            </p>
          </section>

          <section aria-labelledby="armazenamento-heading">
            <h2 id="armazenamento-heading" className="text-base font-semibold text-black">
              3. Armazenamento e segurança
            </h2>
            <p className="mt-3">
              Os dados são transmitidos via webhook seguro (HTTPS) para nossa plataforma
              de CRM/automação. Não compartilhamos seus dados com terceiros para fins
              comerciais.
            </p>
          </section>

          <section aria-labelledby="direitos-heading">
            <h2 id="direitos-heading" className="text-base font-semibold text-black">
              4. Seus direitos (LGPD)
            </h2>
            <p className="mt-3">
              Você pode solicitar acesso, correção, portabilidade ou remoção dos seus dados
              a qualquer momento. Basta enviar um e-mail para{' '}
              <a href="mailto:contato@reidasvendas.com.br" className="underline hover:text-black">
                contato@reidasvendas.com.br
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="cookies-heading">
            <h2 id="cookies-heading" className="text-base font-semibold text-black">
              5. Cookies
            </h2>
            <p className="mt-3">
              Utilizamos cookies essenciais para funcionamento do site (sessão, preferências)
              e, com seu consentimento, cookies analíticos para medir performance e otimizar
              conversão. Você pode recusar cookies analíticos pelo banner exibido na primeira
              visita.
            </p>
          </section>
        </div>

        <div className="mt-10 border-t border-black/8 pt-8">
          <Link
            to="/"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-black/15 px-4 text-xs font-semibold text-black/70 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            ← Voltar para a Home
          </Link>
        </div>
      </main>

      <LeadCaptureSection
        id="diagnostico"
        source="footer"
        headline="Quer uma estrutura premium para capturar e responder?"
        description="Solicite diagnóstico estratégico. A Rei das Vendas organiza arquitetura, captura e automação para transformar presença em operação."
        intent="politica"
      />
    </>
  );
}
