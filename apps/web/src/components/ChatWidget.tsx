import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@altiq/ui';
import { useTts } from '@/hooks/useTts';

type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
};

export function ChatWidget({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { supported: ttsSupported, speaking, speak, stop } = useTts();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState('');
  const [audioOn, setAudioOn] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: 'Olá. Descreva seu cenário (nicho, objetivo e prazo) para eu indicar a melhor rota.',
    },
  ]);
  const listRef = useRef<HTMLDivElement | null>(null);

  const canUse = useMemo(() => Boolean(import.meta.env.VITE_CHAT_ENABLED), []);

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput('');
    setBusy(true);
    setMessages((m) => [...m, { role: 'user', text }]);

    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = (await r.json()) as { ok?: boolean; text?: string };
      const reply = data?.ok && typeof data.text === 'string' ? data.text : 'No momento, não consegui responder. Tente novamente.';
      setMessages((m) => [...m, { role: 'assistant', text: reply }]);
      if (audioOn && ttsSupported) speak(reply);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', text: 'Falha de conexão. Tente novamente em instantes.' }]);
    } finally {
      setBusy(false);
    }
  }

  if (!canUse) return null;

  return (
    <div className={cn('fixed bottom-5 left-5 z-50', className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 w-[min(92vw,360px)] overflow-hidden rounded-3xl border border-white/10 bg-[#090D12] text-white shadow-2xl shadow-black/50"
            role="dialog"
            aria-label="Chat Rei das Vendas"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">Rei das Vendas Assistant</p>
                <p className="mt-1 text-sm font-semibold text-white/90">Diagnóstico rápido</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={!ttsSupported}
                  onClick={() => {
                    if (!ttsSupported) return;
                    if (speaking) {
                      stop();
                      return;
                    }
                    setAudioOn((v) => !v);
                  }}
                  className="inline-flex h-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 hover:bg-white/10 disabled:opacity-60"
                  aria-label="Alternar áudio"
                >
                  Áudio
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                  aria-label="Fechar"
                >
                  ×
                </button>
              </div>
            </div>

            <div ref={listRef} className="max-h-[340px] space-y-3 overflow-auto px-5 py-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={
                    m.role === 'user'
                      ? 'ml-auto w-fit max-w-[85%] rounded-2xl bg-white px-4 py-3 text-sm text-black'
                      : 'mr-auto w-fit max-w-[85%] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85'
                  }
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') send();
                  }}
                  placeholder="Descreva seu objetivo e prazo…"
                  className="h-11 w-full rounded-2xl border border-white/10 bg-black/60 px-4 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Mensagem"
                  disabled={busy}
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={busy || !input.trim()}
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-xs font-semibold uppercase tracking-[0.18em] text-black disabled:opacity-60"
                  aria-label="Enviar"
                >
                  Enviar
                </button>
              </div>
              <p className="mt-3 text-[11px] font-medium text-white/45">
                Respostas demonstrativas. Para propostas e atendimento humano, use o formulário ou WhatsApp.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="group inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-black text-white shadow-2xl shadow-black/50 transition-all hover:-translate-y-0.5 hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label={open ? 'Fechar chat' : 'Abrir chat'}
      >
        <span className="text-lg leading-none">⌁</span>
      </button>
    </div>
  );
}
