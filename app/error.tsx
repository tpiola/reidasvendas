'use client';
export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="container page-hero">
      <h1>Esta página precisa de uma nova tentativa.</h1>
      <p>
        Seu pedido não foi confirmado por esta mensagem. Você também pode
        continuar pelo WhatsApp.
      </p>
      <button className="button button-primary" onClick={reset}>
        Tentar novamente
      </button>
      <a className="text-link" href="/go/whatsapp?src=erro">
        Continuar no WhatsApp
      </a>
    </section>
  );
}
