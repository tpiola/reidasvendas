import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { BRAND } from '@/lib/brand';
import { buildAssistGreeting, matchAssistReply, type AssistReply } from '@/lib/assist-responses';
import { getVisitorFirstName } from '@/lib/visitor';
import { ChatWidget } from '@/components/ChatWidget';

const STORAGE_KEY = 'rdv-assist-opened';
const PROMPT_DELAY_MS = 12000;

type ChatLine = { role: 'user' | 'assistant'; text: string; links?: AssistReply['links'] };

function GuidedAssist() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<ChatLine[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    setFirstName(getVisitorFirstName());
  }, [open]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      try {
        if (!sessionStorage.getItem(STORAGE_KEY)) setVisible(true);
      } catch {
        setVisible(true);
      }
    }, PROMPT_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open || lines.length > 0) return;
    setLines([{ role: 'assistant', text: buildAssistGreeting(firstName) }]);
  }, [open, firstName, lines.length]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [lines, open]);

  function dismiss() {
    setVisible(false);
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
  }

  function send() {
    const text = input.trim();
    if (!text) return;
    setInput('');
    const reply = matchAssistReply(text);
    setLines((prev) => [
      ...prev,
      { role: 'user', text },
      { role: 'assistant', text: reply.text, links: reply.links },
    ]);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 left-5 z-[55]">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 12 }}
            className="mb-3 w-[min(92vw,360px)] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#090D12] text-white shadow-2xl"
            role="dialog"
            aria-label="Assistente Rei das Vendas"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A84C]/80">
                  Rei das Vendas
                </p>
                <p className="text-sm font-semibold text-white/90">Atendimento guiado</p>
              </div>
              <button
                type="button"
                className="text-white/40 hover:text-white"
                aria-label="Fechar"
                onClick={dismiss}
              >
                ×
              </button>
            </div>
            <div ref={listRef} className="max-h-56 space-y-3 overflow-y-auto px-4 py-3 text-sm">
              {lines.map((line, i) => (
                <div
                  key={`${line.role}-${i}`}
                  className={line.role === 'user' ? 'text-right text-white/70' : 'text-white/55'}
                >
                  <p>{line.text}</p>
                  {line.links?.length ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {line.links.map((link) =>
                        link.external ? (
                          <a
                            key={link.href + link.label}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0057FF]"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            key={link.href + link.label}
                            to={link.href}
                            className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0057FF]"
                            onClick={dismiss}
                          >
                            {link.label}
                          </Link>
                        ),
                      )}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <form
              className="flex gap-2 border-t border-white/10 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ex.: clínica, funil, prazo…"
                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30"
                autoComplete="name"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-[#0057FF] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
              >
                Enviar
              </button>
            </form>
            <div className="flex gap-2 border-t border-white/10 px-3 py-2">
              <Link
                to="/diagnostico"
                className="flex-1 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-[#C9A84C]"
                onClick={dismiss}
              >
                Diagnóstico
              </Link>
              <a
                href={BRAND.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-white/45"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="btn-glow flex h-12 items-center gap-2 rounded-full px-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" aria-hidden />
          {firstName ? `Oi, ${firstName}` : 'Ajuda?'}
        </button>
      ) : null}
    </div>
  );
}

export function AssistWidget() {
  const aiChatEnabled = Boolean(import.meta.env.VITE_CHAT_ENABLED);
  if (aiChatEnabled) return <ChatWidget />;
  return <GuidedAssist />;
}
