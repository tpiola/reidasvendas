import { useState } from 'react';
import {
  Sparkles, Lock, Shield, Clock, ArrowRight, CheckCircle2,
  Send, Mail, MessageCircle, Building2, User, Phone,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND } from '@/lib/brand';
import { PremiumButton } from '@/components/PremiumButton';
import { Reveal, springGentle } from '@/hooks/useAnimation';

export function EnterpriseCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#030303] via-[#0A1628] to-[#030303] py-20 sm:py-28">
      {/* Animated grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gold glow accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[20%] top-[10%] h-[400px] w-[400px] rounded-full bg-[rgba(212,175,55,0.04)] blur-[200px]" />
        <div className="absolute bottom-[10%] right-[20%] h-[300px] w-[300px] rounded-full bg-[rgba(10,22,40,0.5)] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: Text + Info */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.06)] px-4 py-1.5 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  Projeto Enterprise Privado
                </span>
              </div>

              <h2 className="font-serifs mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                Inicie seu{' '}
                <span className="text-gradient-gold">Projeto Enterprise</span>
                {' '}Privado
              </h2>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#A1A1AA]">
                Projetos sob medida para empresas que exigem excelência. 
                Sem trial massivo. Atendimento personalizado do diagnóstico ao lançamento.
              </p>

              {/* Trust items */}
              <div className="mt-8 space-y-4">
                {[
                  { icon: Building2, text: 'Projetos exclusivos — zero template genérico' },
                  { icon: Shield, text: 'LGPD compliance & segurança enterprise' },
                  { icon: Clock, text: 'Resposta em até 24h. Diagnóstico gratuito.' },
                  { icon: CheckCircle2, text: 'Suporte dedicado pós-lançamento' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(212,175,55,0.1)]">
                      <item.icon className="h-3.5 w-3.5 text-[#D4AF37]" />
                    </div>
                    <span className="text-sm text-[#A1A1AA]">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* WhatsApp alternative */}
              <div className="mt-8 border-t border-[rgba(212,175,55,0.08)] pt-6">
                <p className="text-xs text-[#71717A]">Prefere falar direto?</p>
                <a
                  href={BRAND.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] transition-all hover:gap-3"
                >
                  <MessageCircle className="h-4 w-4" />
                  Fale pelo WhatsApp
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Right: Lead Form */}
            <div className="relative">
              <div className="rounded-2xl border border-[rgba(212,175,55,0.12)] bg-gradient-to-br from-[rgba(212,175,55,0.03)] to-[rgba(10,22,40,0.2)] p-6 sm:p-8 backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-8 text-center"
                    >
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(212,175,55,0.1)]">
                        <CheckCircle2 className="h-8 w-8 text-[#D4AF37]" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-white">Recebemos sua solicitação!</h3>
                      <p className="mt-2 text-sm text-[#A1A1AA]">
                        Nossa equipe entrará em contato em até 24h para agendar seu diagnóstico gratuito.
                      </p>
                      <a
                        href={BRAND.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[rgba(212,175,55,0.1)] px-6 py-3 text-sm font-semibold text-[#D4AF37] transition-all hover:bg-[rgba(212,175,55,0.18)]"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Falar agora pelo WhatsApp
                      </a>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div className="text-center">
                        <h3 className="font-serif text-lg font-bold text-white">
                          Solicitar Projeto Enterprise
                        </h3>
                        <p className="mt-1 text-xs text-[#71717A]">
                          Preencha e nossa equipe retorna em até 24h
                        </p>
                      </div>

                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717A]" />
                        <input
                          type="text"
                          name="name"
                          placeholder="Seu nome"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-[rgba(212,175,55,0.1)] bg-[rgba(212,175,55,0.03)] py-3 pl-10 pr-4 text-sm text-white placeholder-[#71717A] outline-none transition-all focus:border-[#D4AF37] focus:bg-[rgba(212,175,55,0.06)] focus:ring-1 focus:ring-[#D4AF37]/30"
                        />
                      </div>

                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717A]" />
                        <input
                          type="text"
                          name="company"
                          placeholder="Nome da empresa"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-[rgba(212,175,55,0.1)] bg-[rgba(212,175,55,0.03)] py-3 pl-10 pr-4 text-sm text-white placeholder-[#71717A] outline-none transition-all focus:border-[#D4AF37] focus:bg-[rgba(212,175,55,0.06)] focus:ring-1 focus:ring-[#D4AF37]/30"
                        />
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717A]" />
                        <input
                          type="email"
                          name="email"
                          placeholder="E-mail profissional"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-[rgba(212,175,55,0.1)] bg-[rgba(212,175,55,0.03)] py-3 pl-10 pr-4 text-sm text-white placeholder-[#71717A] outline-none transition-all focus:border-[#D4AF37] focus:bg-[rgba(212,175,55,0.06)] focus:ring-1 focus:ring-[#D4AF37]/30"
                        />
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717A]" />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Telefone / WhatsApp"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-[rgba(212,175,55,0.1)] bg-[rgba(212,175,55,0.03)] py-3 pl-10 pr-4 text-sm text-white placeholder-[#71717A] outline-none transition-all focus:border-[#D4AF37] focus:bg-[rgba(212,175,55,0.06)] focus:ring-1 focus:ring-[#D4AF37]/30"
                        />
                      </div>

                      <div className="relative">
                        <textarea
                          name="message"
                          placeholder="Conte-nos sobre seu projeto (opcional)"
                          value={formData.message}
                          onChange={handleChange}
                          rows={3}
                          className="w-full resize-none rounded-xl border border-[rgba(212,175,55,0.1)] bg-[rgba(212,175,55,0.03)] py-3 px-4 text-sm text-white placeholder-[#71717A] outline-none transition-all focus:border-[#D4AF37] focus:bg-[rgba(212,175,55,0.06)] focus:ring-1 focus:ring-[#D4AF37]/30"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B88932] py-3 text-sm font-bold text-[#030303] transition-all hover:from-[#E0B944] hover:to-[#C49A35] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] active:scale-[0.98]"
                      >
                        <Send className="h-4 w-4" />
                        Solicitar Projeto Enterprise
                      </button>

                      <p className="flex items-center justify-center gap-1.5 text-[10px] text-[#71717A]">
                        <Lock className="h-3 w-3" />
                        Seus dados estão seguros. Sem spam. Sem trial massivo.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
