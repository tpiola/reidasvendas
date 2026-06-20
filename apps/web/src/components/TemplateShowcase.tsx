import { Eye, Sparkles, ArrowRight, Pill, Stethoscope, Building2, Palette, Cpu, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionLabel, Reveal, staggerContainer, staggerItem } from '@/hooks/useAnimation';

const templates = [
  {
    title: 'Farmácia Premium Dracena',
    category: 'Farmácia',
    icon: Pill,
    gradient: 'from-[#0A1628] via-[rgba(212,175,55,0.05)] to-[#030303]',
    tags: ['E-commerce', 'Delivery', 'CRM', 'Dashboard'],
    colors: ['#D4AF37', '#0A1628', '#030303'],
    description: 'Plataforma completa com catálogo inteligente, delivery integrado e gestão de estoque em tempo real.',
  },
  {
    title: 'Clínica Bem-Estar',
    category: 'Saúde',
    icon: Stethoscope,
    gradient: 'from-[#0D9488] via-[rgba(13,148,136,0.05)] to-[#030303]',
    tags: ['Agendamento', 'Teleconsulta', 'Prontuário', 'CRM'],
    colors: ['#0D9488', '#0A1628', '#030303'],
    description: 'Sistema completo para clínicas com agendamento online, teleconsulta e prontuário eletrônico.',
  },
  {
    title: 'Enterprise Dashboard',
    category: 'Corporativo',
    icon: Building2,
    gradient: 'from-[#030303] via-[rgba(212,175,55,0.03)] to-[#0A1628]',
    tags: ['Analytics', 'BI', 'Reports', 'Multi-team'],
    colors: ['#D4AF37', '#0A1628', '#1E293B'],
    description: 'Painel executivo com indicadores de performance, BI integrado e reports automáticos.',
  },
];

export function TemplateShowcase() {
  return (
    <SectionWrapper id="portfolio">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <SectionLabel>Portfólio Premium</SectionLabel>
          <h2 className="font-serif mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Templates{' '}
            <span className="text-gradient-gold">ultra-realistas</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
            Cada template é 100% customizado pela IA. Escolha seu segmento e veja o poder do design generativo.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-children"
        >
          {templates.map((template) => (
            <motion.div
              key={template.title}
              variants={staggerItem}
              className="group relative overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.1)] transition-all duration-500 hover:border-[rgba(212,175,55,0.25)] hover:shadow-[0_0_50px_rgba(212,175,55,0.08)] hover:-translate-y-2"
            >
              {/* Preview Area - Gradient + decorative elements */}
              <div className={`relative h-56 overflow-hidden bg-gradient-to-br ${template.gradient}`}>
                {/* Decorative grid background */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(212,175,55,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(212,175,55,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Abstract shape decoration */}
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-[rgba(212,175,55,0.1)]" />
                <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full border border-[rgba(212,175,55,0.06)]" />

                {/* Color palette dots */}
                <div className="absolute bottom-4 left-4 flex gap-1.5">
                  {template.colors.map((color, i) => (
                    <div
                      key={i}
                      className="h-3 w-3 rounded-full border border-[rgba(255,255,255,0.1)]"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                {/* Category icon badge */}
                <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(212,175,55,0.1)] backdrop-blur-sm">
                  <template.icon className="h-5 w-5 text-[#D4AF37]" />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-[rgba(3,3,3,0.7)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.1)] px-4 py-2 text-xs font-bold text-[#D4AF37] backdrop-blur-sm">
                    <Eye className="h-3.5 w-3.5" />
                    Preview
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                {/* Category */}
                <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[rgba(212,175,55,0.15)] bg-[rgba(212,175,55,0.05)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#D4AF37]">
                  <Sparkles className="h-2.5 w-2.5" />
                  {template.category}
                </span>

                <h3 className="font-serif mt-3 text-base font-semibold text-white">{template.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#71717A]">{template.description}</p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-[rgba(255,255,255,0.03)] px-2 py-0.5 text-[10px] text-[#A1A1AA]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  to="/contato"
                  className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D4AF37] transition-all hover:gap-2"
                >
                  Ver template completo
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
