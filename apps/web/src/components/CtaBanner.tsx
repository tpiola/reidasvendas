import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Check, ArrowRight } from 'lucide-react';
import { PremiumButton } from '@/components/PremiumButton';
import { BRAND } from '@/lib/brand';

interface CtaBannerProps {
  title?: string;
  subtitle?: string;
  variant?: 'gold' | 'dark' | 'glass';
  showForm?: boolean;
  className?: string;
}

export function CtaBanner({
  title = 'Pronto para transformar sua presença digital?',
  subtitle = 'Agende um diagnóstico gratuito e descubra como podemos ajudar sua empresa a vender mais com infraestrutura digital profissional.',
  variant = 'gold',
  showForm = true,
  className = '',
}: CtaBannerProps) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const baseClasses =
    variant === 'gold'
      ? 'bg-gradient-to-br from-[#D6A84F] via-[#E8C46A] to-[#D6A84F] text-[#030303]'
      : variant === 'dark'
        ? 'bg-[#030303] border border-[rgba(214,168,79,0.15)] text-white'
        : 'bg-[rgba(255,255,255,0.02)] border border-[rgba(214,168,79,0.1)] backdrop-blur-xl text-white';

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-3xl px-6 py-12 text-center md:px-12 md:py-16 lg:px-20 ${baseClasses} ${className}`}
    >
      {/* Shine overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-[rgba(255,255,255,0.08)] blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-80 w-80 rounded-full bg-[rgba(255,255,255,0.05)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        <h2 className="font-serif text-2xl font-bold md:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p
          className={`mt-4 text-sm leading-relaxed md:text-base ${
            variant === 'gold' ? 'text-[rgba(3,3,3,0.7)]' : 'text-[#A1A1AA]'
          }`}
        >
          {subtitle}
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {showForm && !sent && (
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md items-center gap-2 rounded-full bg-[rgba(255,255,255,0.15)] p-1 backdrop-blur-sm"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                required
                aria-label="Seu e-mail"
                className={`flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder-opacity-50 ${
                  variant === 'gold'
                    ? 'text-[#030303] placeholder-[rgba(3,3,3,0.5)]'
                    : 'text-white placeholder-[rgba(255,255,255,0.3)]'
                }`}
              />
              <button
                type="submit"
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                  variant === 'gold'
                    ? 'bg-[#030303] text-[#D6A84F] hover:bg-[#1a1a1a]'
                    : 'bg-gradient-to-r from-[#D6A84F] to-[#F2D38A] text-[#030303]'
                }`}
              >
                <Send className="h-4 w-4" />
                Enviar
              </button>
            </form>
          )}

          {showForm && sent && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 rounded-full bg-[rgba(255,255,255,0.12)] px-6 py-3 text-sm font-semibold backdrop-blur-sm"
            >
              <Check className="h-5 w-5 text-green-400" />
              {variant === 'gold' ? 'Recebemos seu contato!' : 'E-mail registrado!'}
            </motion.div>
          )}

          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
              variant === 'gold'
                ? 'bg-[rgba(3,3,3,0.1)] text-[#030303] hover:bg-[rgba(3,3,3,0.2)]'
                : 'bg-[rgba(214,168,79,0.12)] text-[#D6A84F] hover:bg-[rgba(214,168,79,0.2)]'
            }`}
          >
            <MessageCircle className="h-4 w-4" />
            Fale conosco
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.section>
  );
}
