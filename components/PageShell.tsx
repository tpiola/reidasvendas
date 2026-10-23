import Link from 'next/link';
import JsonLd from './JsonLd';
import { breadcrumb } from '@/lib/site';
export default function PageShell({
  title,
  description,
  path,
  children,
}: {
  title: string;
  description: string;
  path: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="page-hero container">
        <nav aria-label="Caminho da página" className="breadcrumbs">
          <Link href="/">Início</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">
            {path.startsWith('/servicos/')
              ? 'Serviço'
              : path.startsWith('/blog/')
                ? 'Artigo'
                : path.startsWith('/guia/')
                  ? 'Guia'
                  : title.split('.')[0]}
          </span>
        </nav>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <div className="container content-section">{children}</div>
      <JsonLd data={breadcrumb([{ name: title, path }])} />
    </>
  );
}
