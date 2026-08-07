import { whatsappUrl } from "@/lib/constants";
import Link from "next/link";

export default function NotFound() {
  return <main id="conteudo" className="grid min-h-[100svh] place-items-center px-6 text-center"><div><p className="font-mono text-xs uppercase tracking-[.15em] text-[#d4a853]">404</p><h1 className="mt-4 font-display text-5xl text-[#f5f0e8]">Página não encontrada.</h1><p className="mx-auto mt-4 max-w-md text-[#a89f8f]">O endereço pode ter mudado. Volte ao início ou fale diretamente com o Rei das Vendas.</p><div className="mt-8 flex justify-center gap-3"><Link className="inline-flex min-h-12 items-center rounded-xl bg-[#d4a853] px-6 font-semibold text-[#0a0a0a]" href="/">Voltar ao início</Link><a className="inline-flex min-h-12 items-center rounded-xl border border-white/10 px-6 text-[#f5f0e8]" href={whatsappUrl()}>WhatsApp</a></div></div></main>;
}
