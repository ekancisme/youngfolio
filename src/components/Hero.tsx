import { ActionPills } from "./ActionPills";
import { MouseScrubVideo } from "./MouseScrubVideo";
import { TypewriterText } from "./TypewriterText";
import { useHeroScrollMotion } from "../hooks/useHeroScrollMotion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useT } from "../i18n/LanguageProvider";

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const heroRef = useHeroScrollMotion(reducedMotion);
  const t = useT();
  return (
    <section ref={heroRef} className="hero" id="top" aria-labelledby="hero-title">
      <MouseScrubVideo reducedMotion={reducedMotion} />
      <div className="hero-content">
        <h1 id="hero-title" className="sr-only">{t.hero.title}</h1>
        <p className="blurred-intro">{t.hero.intro}</p>
        <TypewriterText reducedMotion={reducedMotion} />
        <ActionPills reducedMotion={reducedMotion} />
      </div>
    </section>
  );
}
