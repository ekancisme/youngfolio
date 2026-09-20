import { useEffect, useRef } from "react";

const EXIT_DISTANCE = 0.72;

export function useHeroScrollMotion(disabled: boolean) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    if (disabled) {
      hero.style.setProperty("--hero-exit-progress", "0");
      return;
    }

    let frame: number | null = null;

    const update = () => {
      frame = null;
      const rect = hero.getBoundingClientRect();
      const distance = Math.max(1, hero.offsetHeight * EXIT_DISTANCE);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      hero.style.setProperty("--hero-exit-progress", progress.toFixed(4));
    };

    const requestUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [disabled]);

  return heroRef;
}
