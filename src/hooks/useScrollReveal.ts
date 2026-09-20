import { useEffect } from "react";

export function useScrollReveal(reducedMotion: boolean) {
  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (reducedMotion) {
      elements.forEach((element) => {
        element.style.setProperty("--reveal-delay", "0ms");
        element.classList.add("is-visible");
      });
      return;
    }

    document.querySelectorAll<HTMLElement>("section").forEach((section) => {
      const sectionElements = [...section.querySelectorAll<HTMLElement>("[data-reveal]")];
      sectionElements.forEach((element, index) => {
        element.style.setProperty("--reveal-delay", `${Math.min(index * 85, 340)}ms`);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.16, rootMargin: "0px 0px -8%" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [reducedMotion]);
}
