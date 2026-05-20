import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { applySeo } from '@/lib/seo';
import { BRAND } from '@/lib/brand';
import { FileText, Scale, Shield, AlertCircle, RefreshCw, Mail } from 'lucide-react';

const EASE_OUT = [0.16, 1, 0.3, 1];

const SECTIONS = [
  {
    icon: FileText,
    id: 'aceitacao',
    title: '1. Aceitação dos Termos',
    content: `Ao acessar e utilizar o site ${BRAND.domain}, você declara que leu, compreendeu e concorda com estes Termos de Uso em sua totalidade.

Se você não concordar com qualquer disposição aqui apresentada, solicitamos que não utilize nossos serviços. O uso continuado do site após eventuais alterações constitui aceitação dos novos termos.`,
  },
  {
    icon: Scale,
    id: 'servicos',
    title: '2. Descrição dos Serviços',
    content: `A ${BRAND.name} oferece serviços de:

• **Consultoria estratégica**: Análise de presença digital e identificação de oportunidades
• **Desenvolvimento web**: Criação de sites, landing pages e sistemas personalizados
• **Automação**: Implementação de fluxos automatizados para captação e nurturing de leads
• **Otimização**: Melhoria contínua de conversão e performance

Os diagnósticos gratuitos são oferecidos sem qualquer obrigação de contratação posterior.`,
  },
  {
    icon: Shield,
    id: 'propriedade',
    title: '3. Propriedade Intelectual',
    content: `Todo o conteúdo presente neste site é protegido por direitos autorais:

• **Textos, imagens e vídeos**: Propriedade exclusiva da ${BRAND.name}
• **Logotipos e marcas**: Registrados e protegidos pela legislação vigente
• **Código-fonte**: Protegido por direitos autorais e segredos comerciais

É expressamente proibida a reprodução, distribuição ou modificação de qualquer conteúdo sem autorização prévia por escrito.`,
  },
  {
    icon: AlertCircle,
    id: 'responsabilidade',
    title: '4. Limitação de Responsabilidade',
    content: `Importante esclarecer sobre nossos limites de responsabilidade:

• **Resultados**: Os cases e números apresentados são baseados em resultados reais de clientes, mas cada negócio é único. Não garantimos resultados específicos.
• **Decisões**: Não nos responsabilizamos por decisões comerciais tomadas com base no conteúdo informativo do site.
• **Terceiros**: Links para sites externos são fornecidos por conveniência. Não nos responsabilizamos pelo conteúdo de terceiros.
• **Disponibilidade**: Embora nos esforcemos para manter o site disponível 24/7, não garantimos funcionamento ininterrupto.`,
  },
  {
    icon: RefreshCw,
    id: 'modificacoes',
    title: '5. Modificações dos Termos',
    content: `Reservamo-nos o direito de modificar estes termos a qualquer momento:

• Alterações significativas serão comunicadas por e-mail aos usuários cadastrados
• A data de "última atualização" no topo desta página sempre refletirá a versão mais recente
• O uso continuado dos serviços após modificações constitui aceitação das alterações
• Recomendamos revisitar esta página periodicamente`,
  },
];

export default function Termos() {
  useEffect(() => {
    applySeo({
      title: 'Termos de Uso — Rei das Vendas',
      description: 'Condições de uso do site e dos serviços da Rei das Vendas. Leia antes de utilizar nossos serviços.',
      canonicalPath: '/termos',
    });
  }, []);

  return (
    <main className="bg-[#030305] min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.12)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/60 mb-6">
              <Scale className="w-4 h-4" />
              Documento Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold text-white">
              Termos de{' '}
              <span className="text-gradient-gold">Uso</span>
            </h1>
            <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto">
              Condições gerais para utilização do site e dos serviços oferecidos pela {BRAND.name}. Leia com atenção antes de prosseguir.
            </p>
            <p className="mt-4 text-sm text-white/30">
              Última atualização: Janeiro de 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-32">
        <div className="mx-auto max-w-4xl px-6">
          {/* Quick nav */}
          <motion.nav
            className="mb-16 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">Navegação rápida</p>
            <div className="flex flex-wrap gap-3">
              {SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs text-white/50 border border-white/10 rounded-full hover:border-[#C9A84C]/30 hover:text-[#C9A84C] transition-all"
                >
                  <section.icon className="w-3.5 h-3.5" />
                  {section.title.split('. ')[1]}
                </a>
              ))}
            </div>
          </motion.nav>

          {/* Sections */}
          <div className="space-y-12">
            {SECTIONS.map((section, i) => (
              <motion.section
                key={section.id}
                id={section.id}
                className="scroll-mt-32"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: i * 0.05 }}
              >
                <div className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-[#C9A84C]/20 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-white mb-4">{section.title}</h2>
                      <div className="prose prose-invert prose-sm max-w-none">
                        {section.content.split('\n\n').map((paragraph, pi) => (
                          <p key={pi} className="text-white/50 leading-relaxed mb-4 last:mb-0 whitespace-pre-line">
                            {paragraph.split('**').map((part, parti) => 
                              parti % 2 === 1 ? <strong key={parti} className="text-white/70">{part}</strong> : part
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            ))}
          </div>

          {/* Contact */}
          <motion.div
            className="mt-16 p-8 rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/[0.03]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#C9A84C]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Dúvidas sobre os termos?</h3>
                <p className="text-white/50 text-sm mb-4">
                  Se você tiver qualquer dúvida sobre estes Termos de Uso, entre em contato conosco.
                </p>
                <a
                  href={`mailto:${BRAND.email}?subject=Dúvida sobre Termos de Uso`}
                  className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#F0D080] transition-colors text-sm font-medium"
                >
                  <Mail className="w-4 h-4" />
                  {BRAND.email}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Back */}
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
            >
              <span>←</span>
              Voltar para a Home
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
