import { type ReactNode, type PointerEvent, type HTMLAttributes } from "react";
import { Link } from "react-router-dom";

export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const move = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - box.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - box.top}px`);
  };
  return (
    <article className={`obs-card ${className}`} onPointerMove={move}>
      {children}
    </article>
  );
}
export function MagneticCTA({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) {
  const props: HTMLAttributes<HTMLElement> = {
    className: "obs-cta",
    onPointerMove: (e) => {
      if (
        e.pointerType !== "mouse" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      const b = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.transform = `translate(${(e.clientX - b.left - b.width / 2) * 0.07}px, ${(e.clientY - b.top - b.height / 2) * 0.12}px)`;
    },
    onPointerLeave: (e) => {
      e.currentTarget.style.transform = "";
    },
  };
  const content = (
    <>
      {children}
      <span aria-hidden="true">↗</span>
    </>
  );
  return to.startsWith("#") ? (
    <a href={to} {...props}>
      {content}
    </a>
  ) : (
    <Link to={to} {...props}>
      {content}
    </Link>
  );
}
export function ParallaxStage({ children }: { children: ReactNode }) {
  return <div className="obs-stage">{children}</div>;
}
export function StickyStackSection({ children }: { children: ReactNode }) {
  return <div className="obs-stack">{children}</div>;
}
