import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';

type Provider = 'google' | 'apple' | 'facebook';

export default function Connect() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    applySeo({
      title: 'Conecte-se — Rei das Vendas',
      description: 'Entre para salvar templates, acompanhar propostas e continuar o builder.',
      canonicalPath: '/conecte-se',
      robots: 'noindex,nofollow',
    });
  }, []);

  const startSocial = (p: Provider) => {
    const url = new URL('/contato', window.location.origin);
    url.searchParams.set('intent', 'social');
    url.searchParams.set('provider', p);
    window.location.href = url.toString();
  };

  return (
    <>
      <main className="min-h-[calc(100vh-4rem)] bg-white">
        <div className="mx-auto max-w-6xl px-6 pt-24">
        <div className="flex items-center justify-between text-xs">
          <Link to="/" className="inline-flex items-center gap-2 text-black/60 hover:text-black">
            <span aria-hidden="true">←</span>
            Voltar
          </Link>
          <Link to="/comecar" className="text-black/60 hover:text-black">
            Criar uma conta
          </Link>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <div className="text-center">
            <div className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-black/10">
              <span className="text-[11px] font-black tracking-[0.18em]">A</span>
            </div>
            <h1 className="mt-6 text-2xl font-semibold tracking-tight md:text-3xl">Acesso à conta</h1>
          </div>

          <div className="mt-12 grid gap-12 md:grid-cols-12 md:items-start">
            <form
              className="md:col-span-5"
              onSubmit={(e) => {
                e.preventDefault();
                const url = new URL('/contato', window.location.origin);
                url.searchParams.set('intent', 'login');
                url.searchParams.set('email', email);
                window.location.href = url.toString();
              }}
            >
              <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/55" htmlFor="email">
                Endereço de email
              </label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@exemplo.com"
                className="mt-2 h-11 w-full border-b border-black/20 bg-transparent px-0 text-sm outline-none placeholder:text-black/35 focus-visible:border-black"
              />

              <label className="mt-8 block text-[11px] font-semibold uppercase tracking-[0.18em] text-black/55" htmlFor="password">
                Senha
              </label>
              <div className="mt-2 flex items-center gap-3 border-b border-black/20">
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={show ? 'text' : 'password'}
                  placeholder="Senha"
                  className="h-11 w-full bg-transparent px-0 text-sm outline-none placeholder:text-black/35"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="text-xs font-semibold text-black/55 hover:text-black"
                >
                  {show ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>

              <button
                type="submit"
                className="mt-10 inline-flex h-12 w-full items-center justify-center rounded-xl bg-black/10 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-black/40"
                disabled
              >
                Conecte-se
              </button>
            </form>

            <div className="md:col-span-2 md:flex md:justify-center">
              <div className="relative flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.18em] text-black/35 md:h-full">
                <span className="bg-white px-3">ou</span>
                <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-black/10 md:block" />
                <div className="mt-8 h-px w-full bg-black/10 md:hidden" />
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="grid gap-3">
                <button
                  type="button"
                  onClick={() => startSocial('google')}
                  className="inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-black/15 bg-white px-6 text-sm font-semibold text-black/80 transition-colors hover:bg-black/5"
                >
                  <span className="text-base">G</span>
                  Continuar com o Google
                </button>
                <button
                  type="button"
                  onClick={() => startSocial('apple')}
                  className="inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-black/15 bg-white px-6 text-sm font-semibold text-black/80 transition-colors hover:bg-black/5"
                >
                  <span className="text-base"></span>
                  Continuar com a Apple
                </button>
                <button
                  type="button"
                  onClick={() => startSocial('facebook')}
                  className="inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-black/15 bg-white px-6 text-sm font-semibold text-black/80 transition-colors hover:bg-black/5"
                >
                  <span className="text-base">f</span>
                  Continuar com o Facebook
                </button>
              </div>

              <div className="mt-10 text-center">
                <a className="text-xs font-semibold text-black/55 hover:text-black" href="/contato?intent=recover">
                  Não consegue iniciar sessão?
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>

      <LeadCaptureSection
        id="diagnostico"
        source="footer"
        headline="Prefere avançar direto para o diagnóstico?"
        description="Se o objetivo é estrutura e execução, solicite um diagnóstico estratégico e receba os próximos passos com rota e escopo inicial."
        intent="login"
      />
    </>
  );
}
