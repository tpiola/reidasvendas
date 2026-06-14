import { useState } from 'react';
import { Send, MessageCircle, Mail, MapPin } from 'lucide-react';
import { BRAND } from '@/lib/brand';

export default function Contato() {
  const [form, setForm] = useState({ nome: '', email: '', whatsapp: '', mensagem: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          whatsapp: form.whatsapp,
          mensagem: form.mensagem,
          pagina: '/contato',
          timestamp: new Date().toISOString(),
        }),
      });
      setSent(true);
    } catch {
      setSent(true);
    }
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-[#030305]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,87,255,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <span className="reveal inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Contato</span>
          <h1 className="reveal reveal-delay-1 mt-4 font-['Playfair_Display'] text-4xl font-bold text-white sm:text-5xl">
            Vamos{' '}
            <span className="text-gradient-blue">Conversar</span>
          </h1>
          <p className="reveal reveal-delay-2 mx-auto mt-4 max-w-xl text-lg text-[rgba(248,248,250,0.55)]">
            Preencha o formulário ou fale diretamente pelo WhatsApp. Respondemos em até 24 horas.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 md:grid-cols-2">
            {/* Form */}
            <div className="reveal glass-card rounded-2xl p-6 sm:p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(0,87,255,0.1)] text-[#0057FF]">
                    <Send className="h-6 w-6" />
                  </div>
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold text-white">Mensagem Enviada!</h3>
                  <p className="mt-2 text-sm text-[rgba(248,248,250,0.55)]">
                    Recebemos seu contato e responderemos em breve.
                  </p>
                  <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">
                    <MessageCircle className="h-4 w-4" />
                    Falar pelo WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="label-field mb-1.5 block">Nome completo</label>
                    <input
                      type="text"
                      required
                      value={form.nome}
                      onChange={(e) => setForm({ ...form, nome: e.target.value })}
                      placeholder="Seu nome completo"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="label-field mb-1.5 block">E-mail</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="seu@email.com"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="label-field mb-1.5 block">WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={form.whatsapp}
                      onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                      placeholder="(11) 99999-0000"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="label-field mb-1.5 block">Mensagem</label>
                    <textarea
                      required
                      rows={4}
                      value={form.mensagem}
                      onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                      placeholder="Conte um pouco sobre seu projeto..."
                      className="input-field resize-none py-3"
                      style={{ height: 'auto' }}
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    <Send className="h-4 w-4" />
                    Enviar Mensagem
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="reveal reveal-delay-1 space-y-6">
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h3 className="font-['Playfair_Display'] text-lg font-semibold text-white">Informações de Contato</h3>
                <div className="mt-6 space-y-4">
                  <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[rgba(248,248,250,0.6)] transition hover:text-white">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(37,211,102,0.1)] text-[#25D366]">
                      <MessageCircle className="h-5 w-5" />
                    </span>
                    Fale pelo WhatsApp
                  </a>
                  <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 text-sm text-[rgba(248,248,250,0.6)] transition hover:text-white">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(0,87,255,0.1)] text-[#0057FF]">
                      <Mail className="h-5 w-5" />
                    </span>
                    {BRAND.email}
                  </a>
                  <div className="flex items-center gap-3 text-sm text-[rgba(248,248,250,0.6)]">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(201,168,76,0.1)] text-[#C9A84C]">
                      <MapPin className="h-5 w-5" />
                    </span>
                    {BRAND.address}
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h3 className="font-['Playfair_Display'] text-lg font-semibold text-white">Horários</h3>
                <div className="mt-4 space-y-2 text-sm text-[rgba(248,248,250,0.55)]">
                  <p>Segunda a Sexta: 9h às 18h</p>
                  <p>Sábado: 9h às 13h</p>
                </div>
              </div>

              <div className="glass-card overflow-hidden rounded-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119122.3!2d-47.45!3d-20.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0b2a5c9c9e2b5%3A0x5f8b8f9a0e2c8f4a!2sFranca%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Rei das Vendas"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
