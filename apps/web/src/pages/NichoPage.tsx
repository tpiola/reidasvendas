/**
 * NICHOPAGE.TSX — Rei das Vendas
 * Pagina dinamica /nichos/:slug
 * Hero com imagem do nicho + nome + frase
 * Solucoes recomendadas + conteudo especifico + CTA
 * SEO com geo Franca-SP
 */

import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { nichos, servicos } from '@/data/plataforma';
import { applySeo } from '@/lib/seo';
import { Reveal } from '@/components/Reveal';

const CONTEUDO_ESPECIFICO: Record<string, { porque: string; solucoes: string }> = {
  calcados: {
    porque: 'Franca e o maior polo calcadista do estado de Sao Paulo, com centenas de fabricas, lojas e distribuidoras. A presenca digital ja nao e diferencial — e requisito para continuar vendendo. Compradores buscam catalogo online, representantes querem fechar negocios pelo celular e o mercado exige agilidade.',
    solucoes: 'Um catalogo digital com fotos em alta resolucao, integracao com sistema de gestao para precos atualizados em tempo real, e um dashboard de vendas por representante sao as ferramentas que mais geram resultado para o setor calcadista.',
  },
  comercio: {
    porque: 'O comercio varejista de Franca enfrenta concorrencia direta de grandes redes e do e-commerce nacional. A saida e usar a tecnologia para criar uma experiencia local que as gigantes nao conseguem oferecer: atendimento personalizado, entrega rapida e relacao de confianca.',
    solucoes: 'Um site com catalogo de produtos e integracao com WhatsApp permite que o cliente veja o produto, tire duvidas e compre em minutos. Um app de fidelidade com notificacao de promocoes faz o cliente voltar sempre.',
  },
  industria: {
    porque: 'As industrias de Franca — metalmecanica, quimica, textil, alimenticia — precisam de presenca digital B2B que gere negocios. Um site institucional bem posicionado no Google e a principal ferramenta de prospeccao passiva, gerando leads qualificados sem custo de anúncio.',
    solucoes: 'Portal corporativo com portfolio de produtos, area do cliente para pedidos recorrentes e dashboard de indicadores de producao sao as solucoes que mais impactam o faturamento industrial.',
  },
  saude: {
    porque: 'Clinicas e consultorios de Franca perdem pacientes por falta de organizacao digital. Agendamento por telefone, prontuario em papel e falta de lembretes de consulta geram absenteismo e insatisfacao. A digitalizacao resolve esses problemas e ainda atrai novos pacientes.',
    solucoes: 'Site institucional com agendamento online, prontuario digital basico e lembretes automaticos via WhatsApp reduzem o absenteismo em ate 40% e melhoram a experiencia do paciente.',
  },
  educacao: {
    porque: 'Escolas e cursos de Franca precisam se comunicar com alunos e responsaveis de forma eficiente. Portal do aluno, matricula online, comunicados e conteudo digital sao esperados pelas familias. Instituicoes sem essas ferramentas perdem alunos para concorrentes mais modernos.',
    solucoes: 'Portal do aluno com boletim online, comunicados, matricula digital e area de conteudo complementar. Um app com notificacoes push para lembretes de provas e eventos.',
  },
  servicos: {
    porque: 'Prestadores de servico de Franca — mecanicas, saloes, barbearias, escritorios — dependem do boca a boca e do Google. Um site simples com informacoes claras e WhatsApp integrado ja faz a diferenca. A automacao de agendamento e follow-up transforma o atendimento.',
    solucoes: 'Site com portfolio de servicos, precos e agendamento online. Automacao de lembrete de horario marcado e follow-up pos-servico. Um CRM leve para organizar clientes e historico.',
  },
};

const SEO_META: Record<string, { title: string; description: string; keywords: string }> = {
  calcados: {
    title: 'Solucoes Digitais para o Polo Calcadista de Franca-SP | Rei das Vendas',
    description: 'Sites, apps e dashboards para fabricas e lojas de calcados em Franca-SP. Catalogo digital, vendas online e gestao inteligente para o maior polo calcadista do estado.',
    keywords: 'calcados Franca, solucoes digitais calcados, site para fabrica de calcados, catalogo online calcados, Franca SP polo calcadista',
  },
  comercio: {
    title: 'Solucoes Digitais para Comercio Varejista em Franca-SP | Rei das Vendas',
    description: 'Sites, apps e automacoes para lojas de rua, shoppings e mercados de Franca-SP. Sua vitrine na internet vendendo 24 horas por dia.',
    keywords: 'comercio Franca, loja virtual Franca, site para comercio Franca SP, varejo digital Franca, delivery Franca',
  },
  industria: {
    title: 'Transformacao Digital para Industrias em Franca-SP | Rei das Vendas',
    description: 'Portais corporativos, dashboards e automacoes para industrias de Franca-SP. Digitalizacao de processos B2B e indicadores em tempo real.',
    keywords: 'industria Franca, transformacao digital industria, portal B2B Franca, dashboard industrial Franca, automacao industrial Franca',
  },
  saude: {
    title: 'Solucoes Digitais para Saude e Bem-Estar em Franca-SP | Rei das Vendas',
    description: 'Sites, apps e automacoes para clinicas, consultorios e academias de Franca-SP. Agendamento online, prontuario digital e teleconsulta.',
    keywords: 'saude Franca, site para clinica Franca, agendamento online Franca, consultorio digital Franca, prontuario eletronico Franca',
  },
  educacao: {
    title: 'Solucoes Digitais para Educacao em Franca-SP | Rei das Vendas',
    description: 'Portais educacionais, apps e automacoes para escolas, cursos e faculdades de Franca-SP. Matricula online e comunicacao integrada.',
    keywords: 'educacao Franca, site para escola Franca, portal do aluno Franca, EAD Franca, matricula online Franca',
  },
  servicos: {
    title: 'Solucoes Digitais para Prestadores de Servico em Franca-SP | Rei das Vendas',
    description: 'Sites, automacoes e CRM para mecanicas, saloes, barbearias e escritorios de Franca-SP. Agendamento online e follow-up automatico.',
    keywords: 'servicos Franca, site para oficina Franca, agendamento online Franca, automacao para prestadores Franca, CRM Franca',
  },
};

export default function NichoPage() {
  const { slug } = useParams();
  const nicho = useMemo(
    () => nichos.find((n) => n.id === slug) ?? null,
    [slug],
  );

  useEffect(() => {
    if (!nicho) return;
    const meta = SEO_META[nicho.id];
    if (!meta) return;
    applySeo({
      title: meta.title,
      description: meta.description,
      canonicalPath: `/nichos/${nicho.id}`,
    });
    const metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
    if (metaKeywords) {
      metaKeywords.setAttribute('content', meta.keywords);
    } else {
      const el = document.createElement('meta');
      el.setAttribute('name', 'keywords');
      el.setAttribute('content', meta.keywords);
      document.head.appendChild(el);
    }
  }, [nicho]);

  if (!nicho) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--page-fg)]">
          Nicho nao encontrado
        </h1>
        <p className="mt-3 text-sm text-[color:var(--page-fg-muted)]">
          O nicho solicitado nao existe em nosso portfolio.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex h-12 items-center justify-center rounded-lg bg-[#0057FF] px-6 text-sm font-semibold text-white transition-all hover:bg-[#0057FF]/90"
            to="/"
          >
            Voltar para Home
          </Link>
          <Link
            className="inline-flex h-12 items-center justify-center rounded-lg border border-[color:var(--border-subtle)] px-6 text-sm font-semibold text-[color:var(--page-fg)] transition-all hover:bg-[color:var(--surface)]"
            to="/solucoes"
          >
            Ver todas as solucoes
          </Link>
        </div>
      </main>
    );
  }

  const servicosNicho = servicos.filter((s) =>
    nicho.servicosPrincipais.includes(s.id),
  );

  const conteudo = CONTEUDO_ESPECIFICO[nicho.id];

  return (
    <main className="page-surface overflow-x-hidden">
      {/* HERO */}
      <section className="relative isolate min-h-[60dvh] overflow-hidden bg-[#0a0a0a]" aria-labelledby="nicho-hero-title">
        <div className="absolute inset-0">
          <img
            src={nicho.imagemUrl}
            alt=""
            className="h-full w-full object-cover"
            style={{ filter: 'brightness(0.35)' }}
            aria-hidden="true"
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(0,87,255,0.2) 0%, transparent 40%, #0a0a0a 80%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--page-bg) 0%, transparent 100%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex min-h-[60dvh] max-w-7xl flex-col items-start justify-center px-6 pb-16 pt-28">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#0057FF]/80">
              Nicho
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1
              id="nicho-hero-title"
              className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {nicho.nome}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#C9A84C]/90 sm:text-lg">
              {nicho.fraseDeEfeito}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              {nicho.descricao}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <Link
              to="/diagnostico"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-[#0057FF] px-7 text-sm font-semibold text-white transition-all hover:bg-[#0057FF]/90 hover:shadow-[0_0_30px_rgba(0,87,255,0.3)]"
            >
              Solicitar Diagnostico Gratuito
            </Link>
          </Reveal>
        </div>
      </section>

      {/* POR QUE PRECISA DE PRESENCA DIGITAL */}
      {conteudo && (
        <section className="py-16 md:py-24" aria-label="Por que precisa de presenca digital">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C9A84C]/80">
                  Por que investir
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--page-fg)] sm:text-3xl">
                  Por que {nicho.nome.toLowerCase()} precisa de presenca digital
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-8 text-sm leading-relaxed text-[color:var(--page-fg)] sm:text-base">
                {conteudo.porque}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* SOLUCOES RECOMENDADAS */}
      <section className="border-t border-[color:var(--border-subtle)] bg-[color:var(--page-surface)] py-16 md:py-24" aria-label="Solucoes recomendadas">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#0057FF]/80">
                Solucoes
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--page-fg)] sm:text-3xl">
                Solucoes recomendadas
              </h2>
              <p className="mt-2 text-sm text-[color:var(--page-fg-muted)]">
                Ferramentas especificas para o setor {nicho.nome.toLowerCase()}
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicosNicho.map((s, index) => (
              <Reveal key={s.id} delay={0.05 * index}>
                <Link
                  to={`/servicos/${s.id}`}
                  className="group block rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-6 transition-all hover:border-[#0057FF]/30 hover:shadow-lg hover:shadow-[#0057FF]/5"
                >
                  <h3 className="text-base font-semibold text-[color:var(--page-fg)] group-hover:text-[#0057FF] transition-colors">
                    {s.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--page-fg-muted)]">
                    {s.descricao.slice(0, 120)}...
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.beneficios.slice(0, 3).map((b) => (
                      <span
                        key={b}
                        className="inline-flex items-center rounded-full bg-[#0057FF]/8 px-2.5 py-0.5 text-[10px] font-medium text-[#0057FF]/80"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[#0057FF]">
                    Ver solucao
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {conteudo && (
            <Reveal delay={0.2}>
              <div className="mt-10 rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-6">
                <p className="text-sm leading-relaxed text-[color:var(--page-fg)]">
                  {conteudo.solucoes}
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* CTA ESPECIFICO */}
      <section className="py-16 md:py-20" aria-label="Chamada final">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--page-fg)] sm:text-3xl">
              Seu negocio {nicho.nome.toLowerCase()} merece crescer
            </h2>
            <p className="mt-3 text-sm text-[color:var(--page-fg-muted)]">
              Diagnostico gratuito e sem compromisso para negocios de {nicho.nome.toLowerCase()} em Franca-SP.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/diagnostico"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#0057FF] px-7 text-sm font-semibold text-white transition-all hover:bg-[#0057FF]/90 hover:shadow-[0_0_30px_rgba(0,87,255,0.3)] active:scale-[0.98]"
              >
                Solicitar Diagnostico Gratuito
              </Link>
              <Link
                to="/solucoes"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-[color:var(--border-subtle)] px-7 text-sm font-semibold text-[color:var(--page-fg)] transition-all hover:bg-[color:var(--surface)]"
              >
                Ver todas as solucoes
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
