import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { applySeo } from '@/lib/seo';
import { BRAND } from '@/lib/brand';
import { Shield, Lock, Eye, Database, Mail, UserCheck, Clock, FileText } from 'lucide-react';

const EASE_OUT = [0.16, 1, 0.3, 1];

const SECTIONS = [
  {
    icon: Database,
    id: 'coleta',
    title: '1. Dados que coletamos',
    content: `Coletamos apenas o essencial para entregar nossos serviços:

• **Dados de identificação**: Nome, e-mail e telefone fornecidos voluntariamente nos formulários
• **Dados de navegação**: Páginas visitadas, tempo de permanência e origem do acesso (via cookies analíticos)
• **Dados de comunicação**: Histórico de conversas e preferências de contato

Não coletamos dados sensíveis como informações financeiras, dados de saúde ou qualquer informação que não seja estritamente necessária.`,
  },
  {
    icon: Eye,
    id: 'finalidade',
    title: '2. Como usamos seus dados',
    content: `Seus dados são utilizados exclusivamente para:

• **Atendimento**: Responder suas solicitações e fornecer suporte personalizado
• **Propostas comerciais**: Enviar orçamentos e informações sobre nossos serviços quando solicitado
• **Melhoria contínua**: Entender como você usa nosso site para torná-lo cada vez melhor
• **Comunicação**: Enviar atualizações relevantes sobre projetos em andamento

Nunca vendemos, alugamos ou compartilhamos seus dados com terceiros para fins comerciais.`,
  },
  {
    icon: Lock,
    id: 'seguranca',
    title: '3. Segurança e armazenamento',
    content: `Levamos a segurança dos seus dados a sério:

• **Criptografia**: Todas as transmissões são protegidas por HTTPS com certificados SSL/TLS
• **Acesso restrito**: Apenas membros autorizados da equipe têm acesso aos dados
• **Infraestrutura**: Utilizamos servidores em nuvem com padrões de segurança enterprise
• **Backup**: Realizamos cópias de segurança regulares para prevenir perdas

Seus dados são armazenados em servidores seguros e mantidos pelo tempo necessário para cumprir as finalidades descritas ou conforme exigido por lei.`,
  },
  {
    icon: UserCheck,
    id: 'direitos',
    title: '4. Seus direitos (LGPD)',
    content: `A Lei Geral de Proteção de Dados (Lei 13.709/2018) garante seus direitos. Você pode:

• **Acessar**: Solicitar uma cópia de todos os dados que temos sobre você
• **Corrigir**: Pedir a correção de dados incompletos, inexatos ou desatualizados
• **Deletar**: Solicitar a exclusão dos seus dados pessoais
• **Portar**: Receber seus dados em formato estruturado para transferência
• **Revogar**: Retirar seu consentimento a qualquer momento

Para exercer qualquer desses direitos, entre em contato pelo e-mail abaixo. Responderemos em até 15 dias úteis.`,
  },
  {
    icon: FileText,
    id: 'cookies',
    title: '5. Cookies',
    content: `Utilizamos cookies para melhorar sua experiência:

• **Essenciais**: Necessários para o funcionamento básico do site (sessão, preferências)
• **Analíticos**: Nos ajudam a entender como você usa o site (Google Analytics)
• **Marketing**: Utilizados para campanhas de remarketing quando autorizados

Você pode gerenciar suas preferências de cookies a qualquer momento através do banner de consentimento ou das configurações do seu navegador.`,
  },
  {
    icon: Clock,
    id: 'retencao',
    title: '6. Tempo de retenção',
    content: `Mantemos seus dados apenas pelo tempo necessário:

• **Leads e contatos**: Até 2 anos após o último contato, salvo solicitação de exclusão
• **Clientes**: Durante a vigência do contrato e por 5 anos após para fins fiscais
• **Dados de navegação**: Até 26 meses (padrão do Google Analytics)

Após esses períodos, os dados são automaticamente anonimizados ou excluídos.`,
  },
];

export default function Politica() {
  useEffect(() => {
    applySeo({
      title: 'Política de Privacidade & LGPD — Rei das Vendas',
      description: 'Saiba como tratamos seus dados pessoais com transparência e segurança. Conformidade total com a LGPD.',
      canonicalPath: '/politica',
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
              <Shield className="w-4 h-4" />
              Transparência e Segurança
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold text-white">
              Política de Privacidade{' '}
              <span className="text-gradient-gold">& LGPD</span>
            </h1>
            <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto">
              Seus dados são tratados com o mesmo cuidado que damos aos nossos próprios. Aqui você encontra tudo sobre como coletamos, usamos e protegemos suas informações.
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
                <h3 className="text-lg font-semibold text-white mb-2">Dúvidas ou solicitações?</h3>
                <p className="text-white/50 text-sm mb-4">
                  Entre em contato com nosso Encarregado de Dados (DPO) para exercer seus direitos ou tirar dúvidas sobre esta política.
                </p>
                <a
                  href={`mailto:${BRAND.email}?subject=LGPD - Solicitação de Dados`}
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
