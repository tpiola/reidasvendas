import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';

export default function Termos() {
  useEffect(() => {
    applySeo({
      title: 'Termos de Uso — Rei das Vendas',
      description: 'Condições de uso do site Rei das Vendas e dos serviços de diagnóstico e automação.',
      canonicalPath: '/termos',
    });
  }, []);

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <nav className="mb-8 text-xs text-black/60" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-black transition-colors">Início</Link>
          <span className="mx-2">›</span>
          <span>Termos de Uso</span>
        </nav>

        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Termos de Uso
        </h1>

        <p className="mt-2 text-xs text-black/60">Última atualização: abril de 2026</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-black/70">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-xs text-amber-800">
            <strong>Versão inicial — </strong>antes de ir para produção, ajuste cláusulas comerciais, limitações de responsabilidade e políticas de suporte com seu jurídico.
          </div>

          <section aria-labelledby="aceitacao-heading">
            <h2 id="aceitacao-heading" className="text-base font-semibold text-black">
              1. Aceitação dos termos
            </h2>
            <p className="mt-3">
              Ao acessar e utilizar este site, você concorda com estes Termos de Uso. Se
              não concordar com qualquer disposição, não utilize o site.
            </p>
          </section>

          <section aria-labelledby="servicos-heading">
            <h2 id="servicos-heading" className="text-base font-semibold text-black">
              2. Serviços oferecidos
            </h2>
            <p className="mt-3">
              A Rei das Vendas oferece diagnóstico de conversão e automação para
              negócios locais, além de proposta de implementação de sistema de aquisição de
              leads. O diagnóstico não implica qualquer contratação ou obrigação.
            </p>
          </section>

          <section aria-labelledby="propriedade-heading">
            <h2 id="propriedade-heading" className="text-base font-semibold text-black">
              3. Propriedade intelectual
            </h2>
            <p className="mt-3">
              Todo o conteúdo deste site — textos, imagens, logotipos e código — é
              propriedade da Rei das Vendas. É proibida a reprodução sem autorização prévia
              por escrito.
            </p>
          </section>

          <section aria-labelledby="limitacoes-heading">
            <h2 id="limitacoes-heading" className="text-base font-semibold text-black">
              4. Limitação de responsabilidade
            </h2>
            <p className="mt-3">
              As informações e resultados apresentados são baseados em médias e estudos de
              caso. Resultados individuais podem variar. A Rei das Vendas não garante
              resultados específicos e não se responsabiliza por decisões tomadas com base
              no conteúdo do site.
            </p>
          </section>

          <section aria-labelledby="modificacoes-heading">
            <h2 id="modificacoes-heading" className="text-base font-semibold text-black">
              5. Modificações
            </h2>
            <p className="mt-3">
              Reservamo-nos o direito de alterar estes termos a qualquer momento. Alterações
              significativas serão comunicadas por e-mail aos usuários cadastrados.
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
        headline="Quer uma operação que responda com previsibilidade?"
        description="Solicite diagnóstico estratégico. Você recebe rota de execução, padrão de captura e automações para reduzir perda de leads."
        intent="termos"
      />
    </>
  );
}
