'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
type FeedItem = {
  id: string;
  tag: string;
  title: string;
  description: string;
  href: string;
  cta: string;
};
export default function DynamicFeed({ items }: { items: FeedItem[] }) {
  const container = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ start: true, end: false });
  const update = () => {
    const node = container.current;
    if (node)
      setPosition({
        start: node.scrollLeft < 4,
        end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 4,
      });
  };
  function move(direction: number) {
    const node = container.current;
    if (node)
      node.scrollBy({
        left: direction * (node.clientWidth * 0.85),
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      });
  }
  return (
    <>
      <div className="dynamic-feed-controls" aria-label="Controles do conteúdo">
        <button
          type="button"
          aria-label="Conteúdo anterior"
          disabled={position.start}
          onClick={() => move(-1)}
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Próximo conteúdo"
          disabled={position.end}
          onClick={() => move(1)}
        >
          →
        </button>
      </div>
      <div
        className="dynamic-proof-feed proof-feed"
        role="region"
        aria-label="Guias e critérios de trabalho — sem rotação automática"
        tabIndex={0}
        ref={container}
        onScroll={update}
      >
        {items.map((item) => (
          <article key={item.id}>
            <span>{item.tag}</span>
            <h3>
              <Link href={item.href}>{item.title}</Link>
            </h3>
            <p>{item.description}</p>
            <Link href={item.href} className="text-link">
              {item.cta} ↗
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
