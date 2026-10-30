import { servicePath } from '@/lib/service-path';
import Link from 'next/link';
import content from '@/data/content.json';
export default function ServiceCards() {
  return (
    <div className="service-grid">
      {content.services.map((s) => (
        <article className="service-card" key={s.slug}>
          <p className="muted">{s.category}</p>
          <h2>
            <Link href={servicePath(s.slug)}>{s.title}</Link>
          </h2>
          <p>{s.description}</p>
          <Link className="text-link" href={servicePath(s.slug)}>
            Ver escopo <span aria-hidden="true">↗</span>
          </Link>
        </article>
      ))}
    </div>
  );
}
