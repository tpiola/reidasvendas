import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="container page-hero">
      <p>Página não encontrada</p>
      <h1>Vamos encontrar o caminho certo.</h1>
      <p>
        Este endereço não está disponível. Os serviços e o diagnóstico continuam
        aqui.
      </p>
      <Link className="button button-primary" href="/servicos">
        Conhecer os serviços
      </Link>
    </section>
  );
}
