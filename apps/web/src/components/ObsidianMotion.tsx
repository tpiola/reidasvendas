import {
  useRef,
  type ReactNode,
  type PointerEvent,
  type HTMLAttributes,
} from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
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
  const reduce = useReducedMotion();
  const props: HTMLAttributes<HTMLElement> = {
    className: "obs-cta",
    onPointerMove: (e) => {
      if (reduce || e.pointerType !== "mouse") return;
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
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [18, -18]);
  return (
    <motion.div ref={ref} style={{ y: reduce ? 0 : y }} className="obs-stage">
      {children}
    </motion.div>
  );
}
export function StickyStackSection({ children }: { children: ReactNode }) {
  return <div className="obs-stack">{children}</div>;
}
