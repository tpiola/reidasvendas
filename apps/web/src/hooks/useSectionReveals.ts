import { useEffect } from "react";
/** Progressive enhancement: no initial opacity or JS-gated content. */
export function useSectionReveals() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || !("IntersectionObserver" in window)) return;
    const active = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (entry.boundingClientRect.top < 100 || reduce.matches) continue;
          const animation = entry.target.animate(
            [{ transform: "translateY(12px)" }, { transform: "translateY(0)" }],
            { duration: 260, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
          );
          active.add(animation);
          void animation.finished
            .then(() => active.delete(animation))
            .catch(() => undefined);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    document
      .querySelectorAll(
        ".obs-section-heading, .commercial-concern-grid article, .commercial-method li, .obs-case",
      )
      .forEach((element) => observer.observe(element));
    const preferenceChanged = () => {
      if (reduce.matches) active.forEach((animation) => animation.cancel());
    };
    reduce.addEventListener("change", preferenceChanged);
    return () => {
      observer.disconnect();
      active.forEach((animation) => animation.cancel());
      reduce.removeEventListener("change", preferenceChanged);
    };
  }, []);
}
