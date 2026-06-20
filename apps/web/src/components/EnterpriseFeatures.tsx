import {
  LayoutDashboard, Users, BarChart3, Shield, TrendingUp,
  Zap, Sparkles, Lock, Eye, Globe, Palette,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionLabel, Reveal, staggerContainer, staggerItem } from '@/hooks/useAnimation';

const enterpriseFeatures = [
  {
    icon: LayoutDashboard,
    title: 'Generative Drag-Drop',
    description: 'Monte layouts complexos com drag-drop inteligente. A IA completa o design automaticamente baseada na sua marca.',
    badge: 'AI-Powered',
  },
  {
    icon: Users,
    title: 'Colaboração em Tempo Real',
    description: 'Equipe inteira edita junto. Comentários, aprovações e versionamento — tudo ao vivo, sem conflitos.',
    badge: 'Team',
  },
  {
    icon: BarChart3,
    title: 'AI SEO & Analytics',
    description: 'SEO otimizado por IA que analisa concorrência e sugere palavras-chave. Analytics integrado com relatórios automáticos.',
    badge: 'AI',
  },
  {
    icon: Shield,
    title: 'SSO & Segurança Enterprise',
    description: 'Autenticação SSO, criptografia de ponta a ponta, certificação LGPD e compliance corporativo total.',
    badge: 'Enterprise',
  },
  {
    icon: TrendingUp,
    title: 'Analytics em Tempo Real',
    description: 'Painel vivo com métricas de conversão, tráfego, comportamento do usuário e ROI. Decisão baseada em dados reais.',
    badge: 'Live',
  },
  {
    icon: Zap,
    title: 'API & Webhooks Abertos',
    description: 'Integração com qualquer ferramenta via API REST + Webhooks. Conecte seu CRM, ERP, e-mail marketing e mais.',
    badge: 'Dev',
  },
];

export function EnterpriseFeatures() {
  return (
    <SectionWrapper dark>
      <div id="enterprise-features" className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.06)] px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Enterprise
            </span>
          </div>
          <SectionLabel>Features Premium</SectionLabel>
          <h2 className="font-serif mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Tudo que um{' '}
            <span className="text-gradient-gold">império digital</span>
            {' '}precisa
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
            Ferramentas enterprise-level combinadas com inteligência artificial para criar, escalar e gerenciar sua presença digital.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger-children"
        >
          {enterpriseFeatures.map((feature) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              className="group relative overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.08)] bg-[rgba(212,175,55,0.02)] p-6 sm:p-7 transition-all duration-500 hover:border-[rgba(212,175,55,0.25)] hover:bg-[rgba(212,175,55,0.04)] hover:shadow-[0_0_40px_rgba(212,175,55,0.06)] hover:-translate-y-1"
            >
              {/* Gold accent top line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.3)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                {/* Badge */}
                <div className="mb-4 inline-flex items-center rounded-full border border-[rgba(212,175,55,0.15)] bg-[rgba(212,175,55,0.06)] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#D4AF37]">
                  {feature.badge}
                </div>

                {/* Icon */}
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(212,175,55,0.1)] text-[#D4AF37] transition-all duration-300 group-hover:bg-[rgba(212,175,55,0.18)] group-hover:scale-110">
                  <feature.icon className="h-5 w-5" />
                </div>

                <h3 className="font-serif text-base font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-[rgba(212,175,55,0.12)] bg-[rgba(212,175,55,0.03)] px-8 py-4 backdrop-blur-sm">
              <Lock className="h-5 w-5 text-[#D4AF37]" />
              <span className="text-sm text-[#A1A1AA]">
                Infraestrutura enterprise com{' '}
                <span className="font-semibold text-[#D4AF37]">99.9% uptime</span>
                {' '}•{' '}
                <span className="font-semibold text-[#D4AF37]">criptografia ponta-a-ponta</span>
                {' '}•{' '}
                <span className="font-semibold text-[#D4AF37]">LGPD compliance</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
