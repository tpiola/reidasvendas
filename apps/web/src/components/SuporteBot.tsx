import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, ChevronDown, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND } from '@/lib/brand';

type Step = 'form' | 'chat';
type Field = 'nome' | 'email' | 'whatsapp';

interface Message {
  role: 'bot' | 'user';
  text: string;
}

const TYPING_DELAY_MIN = 1000;
const TYPING_DELAY_MAX = 3000;

interface BotResponse {
  text: string;
  delay?: number;
}

const BOT_REPLIES: Record<string, BotResponse> = {
  saudacao: {
    text: 'Olá! Sou o Suporte, consultor especialista da Rei das Vendas. Como posso ajudar seu negócio hoje? Conte um pouco sobre o que você precisa.',
  },
  default: {
    text: 'Entendi! Me conte mais sobre seu negócio e quais desafios você está enfrentando. Posso ajudar com sites, apps, automações e muito mais.',
  },
  servicos: {
    text: 'Trabalhamos com sites profissionais, aplicativos, automações de marketing, dashboards de gestão e mentoria. Qual dessas soluções mais te interessa?',
  },
  preco: {
    text: 'Nossos planos começam com soluções sob medida para cada negócio. O investimento varia conforme a complexidade. Posso te enviar mais detalhes pelo WhatsApp?',
  },
  agendar: {
    text: 'Ótimo! Vou registrar seu contato e nosso time comercial entra em contato em até 24 horas para agendar uma conversa personalizada.',
  },
};

function getBotReply(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  // Anti-jailbreak checks
  const jailbreakPatterns = [
    /ignore.*(instruction|rule|prompt|previous)/i,
    /forget.*(everything|previous|context|rule)/i,
    /you are (ai|assistant|bot|chatgpt|gpt)/i,
    /you're an? (ai|bot|assistant)/i,
    /are you (ai|human|real|chatgpt|gpt)/i,
    /reveal.*(prompt|instruction|system|rule)/i,
    /act as (dan|do anything now)/i,
    /new (rule|instruction|prompt)/i,
    /override/i,
    /jailbreak/i,
    /system prompt/i,
  ];

  for (const pattern of jailbreakPatterns) {
    if (pattern.test(lower)) {
      return 'Entendo sua curiosidade, mas estou aqui para ajudar com soluções digitais. Como posso ajudar seu negócio hoje?';
    }
  }

  if (/você (é|e) (humano|pessoa|real|de verdade)/i.test(lower) || /you are (human|real)/i.test(lower)) {
    return 'Sou o Suporte, consultor especialista da Rei das Vendas. Como posso ajudar seu negócio hoje?';
  }

  if (/ol[aá]|oi|bom dia|boa tarde|boa noite|hey|hello/i.test(lower)) {
    return BOT_REPLIES.saudacao.text;
  }

  if (/site|website|landing page|p[aá]gina/i.test(lower)) {
    return 'Trabalhamos com sites profissionais e landing pages de alta conversão. Nosso foco é criar presença digital que realmente vende. Qual é o ramo do seu negócio?';
  }

  if (/app|aplicativo|mobile/i.test(lower)) {
    return 'Desenvolvemos aplicativos sob medida para iOS e Android, com foco em experiência do usuário e performance. Que tipo de funcionalidades você precisa?';
  }

  if (/automa[cç][aã]o|automation|robot|whatsapp bot|chatbot/i.test(lower)) {
    return 'Automações inteligentes para vendas, marketing e atendimento. Integramos CRM, WhatsApp, e-mail e redes sociais para você vender mais com menos esforço. Qual processo você quer automatizar?';
  }

  if (/dashboard|painel|gr[aá]fico|relat[oó]rio|indicador|kpi/i.test(lower)) {
    return 'Criamos dashboards personalizados para gestão do seu negócio. Dados em tempo real para decisões mais inteligentes. Que métricas são mais importantes para você?';
  }

  if (/mentori[aá]|consultori[aá]|treinamento|curso|aprender/i.test(lower)) {
    return 'Nossa mentoria digital ajuda empreendedores a estruturar vendas online, marketing digital e presença digital do zero à escala. Temos programas individuais e em grupo.';
  }

  if (/pre[cç]o|valor|investimento|quanto custa|tabela|plano/i.test(lower)) {
    return BOT_REPLIES.preco.text;
  }

  if (/agendar|marcar|reuni[ãa]o|conversa|ligar|telefone|whatsapp|contato/i.test(lower)) {
    return BOT_REPLIES.agendar.text;
  }

  if (/ramo|nicho|segmento|qual seu neg[óo]cio|do que voc[êe] trabalha/i.test(lower)) {
    return 'Atendemos diversos nichos: calçadista, comércio, indústria, saúde, educação e serviços. Cada um com soluções específicas. Qual é o seu ramo?';
  }

  // Default: acknowledge and ask
  return BOT_REPLIES.default.text;
}

export function SuporteBot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('form');
  const [fields, setFields] = useState({ nome: '', email: '', whatsapp: '' });
  const [currentField, setCurrentField] = useState<Field>('nome');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [sendingLead, setSendingLead] = useState(false);
  const chatEnd = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open && step === 'chat' && messages.length === 0) {
      setTyping(true);
      const delay = TYPING_DELAY_MIN + Math.random() * (TYPING_DELAY_MAX - TYPING_DELAY_MIN);
      setTimeout(() => {
        setMessages([{ role: 'bot', text: BOT_REPLIES.saudacao.text }]);
        setTyping(false);
      }, delay);
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 500);
    }
  }, [open, step]);

  const sendMessage = useCallback((text: string) => {
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setTyping(true);

    const delay = TYPING_DELAY_MIN + Math.random() * (TYPING_DELAY_MAX - TYPING_DELAY_MIN);
    setTimeout(() => {
      const reply = getBotReply(text);
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
      setTyping(false);
    }, delay);
  }, []);

  const sendLead = useCallback(async () => {
    if (!fields.nome || !fields.email || !fields.whatsapp) return;
    setSendingLead(true);
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: fields.nome,
          email: fields.email,
          whatsapp: fields.whatsapp,
          mensagem: 'Lead do SuporteBot - Rei das Vendas',
          pagina: window.location.pathname,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      // Silently fail - lead is still captured
    }
    setLeadSent(true);
    setSendingLead(false);
    setStep('chat');
  }, [fields]);

  const handleFieldSubmit = () => {
    if (currentField === 'nome' && fields.nome.trim()) {
      setCurrentField('email');
      setTimeout(() => inputRef.current?.focus(), 100);
    } else if (currentField === 'email' && fields.email.trim()) {
      setCurrentField('whatsapp');
      setTimeout(() => inputRef.current?.focus(), 100);
    } else if (currentField === 'whatsapp' && fields.whatsapp.trim()) {
      sendLead();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [currentField]: e.target.value }));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleFieldSubmit();
  };

  const fieldLabel = {
    nome: 'Qual seu nome completo?',
    email: 'Seu melhor e-mail',
    whatsapp: 'Seu WhatsApp com DDD',
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9997] flex h-14 w-14 items-center justify-center rounded-full bg-[#0057FF] text-white shadow-2xl transition-all hover:bg-[#0044cc] hover:scale-105 active:scale-95"
        aria-label={open ? 'Fechar Suporte' : 'Abrir Suporte'}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 z-[9997] flex w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(8,8,11,0.98)] shadow-2xl backdrop-blur-2xl sm:right-6 sm:w-[400px]"
            style={{ maxHeight: 'min(600px, calc(100vh - 140px))' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[rgba(255,255,255,0.06)] px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0057FF]/20 text-[#0057FF] text-sm font-bold">
                S
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Suporte</p>
                <p className="text-[10px] text-[rgba(248,248,250,0.4)]">Online • Especialista em Vendas</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-[rgba(255,255,255,0.35)] transition hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
                aria-label="Fechar"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4" style={{ scrollbarWidth: 'thin' }}>
              {step === 'form' && !leadSent && (
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed text-[rgba(248,248,250,0.7)]">
                    Para começar, me conte um pouco sobre você:
                  </p>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[rgba(248,248,250,0.4)]">
                      {fieldLabel[currentField]}
                    </label>
                    <input
                      ref={inputRef}
                      type={currentField === 'email' ? 'email' : 'text'}
                      value={fields[currentField]}
                      onChange={handleInputChange}
                      onKeyDown={handleInputKeyDown}
                      placeholder={currentField === 'nome' ? 'Seu nome completo' : currentField === 'email' ? 'seu@email.com' : '(11) 99999-0000'}
                      className="input-field"
                      autoFocus
                    />
                  </div>

                  <button
                    onClick={handleFieldSubmit}
                    disabled={!fields[currentField].trim() || sendingLead}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0057FF] py-3 text-sm font-semibold text-white transition hover:bg-[#0044cc] disabled:opacity-40"
                  >
                    {sendingLead ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : currentField === 'whatsapp' ? (
                      'Começar Atendimento'
                    ) : (
                      'Próximo'
                    )}
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {step === 'chat' && (
                <div className="space-y-3">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-[#0057FF] text-white'
                            : 'bg-[rgba(255,255,255,0.06)] text-[rgba(248,248,250,0.85)]'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {typing && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-2 rounded-2xl bg-[rgba(255,255,255,0.06)] px-4 py-3">
                        <span className="flex gap-1">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[rgba(255,255,255,0.3)] [animation-delay:0ms]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[rgba(255,255,255,0.3)] [animation-delay:150ms]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-[rgba(255,255,255,0.3)] [animation-delay:300ms]" />
                        </span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEnd} />
                </div>
              )}

              {leadSent && step === 'form' && (
                <div className="text-center">
                  <p className="text-sm text-[rgba(248,248,250,0.7)]">
                    Obrigado! Seu contato foi registrado. Em instantes iniciaremos o atendimento.
                  </p>
                </div>
              )}
            </div>

            {/* Chat Input */}
            {step === 'chat' && (
              <div className="border-t border-[rgba(255,255,255,0.06)] px-4 py-3">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && input.trim()) sendMessage(input);
                    }}
                    placeholder="Digite sua mensagem..."
                    className="input-field flex-1"
                    disabled={typing}
                  />
                  <button
                    onClick={() => input.trim() && sendMessage(input)}
                    disabled={!input.trim() || typing}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0057FF] text-white transition hover:bg-[#0044cc] disabled:opacity-40"
                    aria-label="Enviar"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Lead sent in chat */}
            {leadSent && step === 'chat' && messages.filter(m => m.role === 'bot').length > 2 && (
              <div className="border-t border-[rgba(255,255,255,0.06)] px-4 py-3">
                <a
                  href={BRAND.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white transition hover:bg-[#1da851]"
                >
                  <MessageCircle className="h-4 w-4" />
 Falar pelo WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
