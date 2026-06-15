import { useState } from 'react';
import { Send, MessageCircle, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Reveal } from '@/hooks/useAnimation';
import { PremiumButton } from '@/components/PremiumButton';
import { GoldParticles } from '@/components/GoldParticles';

export default function Contato() {
  const [form, setForm] = useState({ nome: '', email: '', whatsapp: '', mensagem: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, pagina: '/contato', timestamp: new Date().toISOString() }),
      });
    } catch { /* silent */ }
    setSent(true);
  };

  return (
    <main>
      <GoldParticles count={20} />

      {/* Hero */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(214,168,79,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal><span className="section-label">Contato</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl">
              Vamos{' '}<span className="text-gradient-gold">Conversar</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#A1A1AA]">
              Preencha o formulário ou fale diretamente pelo WhatsApp. Respondemos em até 24h.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form + Info */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 md:grid-cols-2">
            {/* Form */}
            <Reveal className="rounded-2xl p-6 sm:p-8 glass-card">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(214,168,79,0.1)] text-[#D6A84F]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-white">Mensagem Enviada!</h3>
                  <p className="mt-2 text-sm text-[#A1A1AA]">Recebemos seu contato e responderemos em breve.</p>
                  <PremiumButton href={BRAND.whatsapp} className="mt-6" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Falar pelo WhatsApp
                  </PremiumButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="label-field mb-1.5 block">Nome completo</label>
                    <input type="text" required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Seu nome completo" className="input-field" />
                  </div>
                  <div>
                    <label className="label-field mb-1.5 block">E-mail</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="seu@email.com" className="input-field" />
                  </div>
                  <div>
                    <label className="label-field mb-1.5 block">WhatsApp</label>
                    <input type="tel" required value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="(16) 99999-0000" className="input-field" />
                  </div>
                  <div>
                    <label className="label-field mb-1.5 block">Mensagem</label>
                    <textarea required rows={4} value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} placeholder="Conte um pouco sobre seu projeto..." className="input-field resize-none py-3" style={{ height: 'auto' }} />
                  </div>
                  <button type="submit" className="btn-gold w-full justify-center">
                    <Send className="h-4 w-4" />
                    Enviar Mensagem
                  </button>
                </form>
              )}
            </Reveal>

            {/* Info */}
            <div className="space-y-6">
              <Reveal delay={0.1}>
                <div className="glass-card rounded-2xl p-6 sm:p-8">
                  <h3 className="font-serif text-lg font-semibold text-white">Informações de Contato</h3>
                  <div className="mt-6 space-y-4">
                    <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#A1A1AA] transition hover:text-white">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.1)] text-[#D6A84F]"><MessageCircle className="h-5 w-5" /></span>
                      Fale pelo WhatsApp
                    </a>
                    <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 text-sm text-[#A1A1AA] transition hover:text-white">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.1)] text-[#D6A84F]"><Mail className="h-5 w-5" /></span>
                      {BRAND.email}
                    </a>
                    <div className="flex items-center gap-3 text-sm text-[#A1A1AA]">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.1)] text-[#D6A84F]"><MapPin className="h-5 w-5" /></span>
                      {BRAND.address}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="glass-card rounded-2xl p-6 sm:p-8">
                  <h3 className="font-serif text-lg font-semibold text-white">Horários</h3>
                  <div className="mt-4 space-y-2 text-sm text-[#71717A]">
                    <p>Segunda a Sexta: 9h às 18h</p>
                    <p>Sábado: 9h às 13h</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="glass-card overflow-hidden rounded-2xl">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119122.3!2d-47.45!3d-20.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0b2a5c9c9e2b5%3A0x5f8b8f9a0e2c8f4a!2sFranca%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1" width="100%" height="200" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Localização Rei das Vendas" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
