import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "../i18n/LanguageProvider";

export type Project = {
  index: string;
  title: string;
  kind: string;
  description: string;
  stack: readonly string[];
  image: string;
  imagePosition?: string;
  liveUrl: string;
  repoUrl: string;
};

export function ProjectCard({ project, reducedMotion }: { project: Project; reducedMotion: boolean }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const liveLink = useRef<HTMLAnchorElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    window.requestAnimationFrame(() => trigger.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    liveLink.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key !== "Tab") return;
      const focusable = dialog.current?.querySelectorAll<HTMLElement>("a[href],button:not([disabled])");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (reducedMotion || event.pointerType === "touch") return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--pointer-x", `${(x * 100).toFixed(1)}%`);
    card.style.setProperty("--pointer-y", `${(y * 100).toFixed(1)}%`);
    card.style.setProperty("--tilt-x", `${((0.5 - y) * 3.5).toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${((x - 0.5) * 3.5).toFixed(2)}deg`);
  };

  const resetPointerMotion = (event: React.PointerEvent<HTMLButtonElement>) => {
    const card = event.currentTarget;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <>
      <button
        ref={trigger}
        className="project-card"
        type="button"
        onClick={() => setOpen(true)}
        onPointerMove={onPointerMove}
        onPointerLeave={resetPointerMotion}
        data-reveal
        aria-label={t.project.openLinks.replace("{title}", project.title)}
      >
        <div className="project-media">
          <img src={project.image} alt={t.project.alt.replace("{title}", project.title)} loading="lazy" decoding="async" style={{ objectPosition: project.imagePosition }} />
          <span className="project-open">{t.project.view} <span aria-hidden="true">↗</span></span>
        </div>
        <div className="project-top"><span>{project.index}</span><span>{project.kind}</span><span className="project-arrow" aria-hidden="true">↗</span></div>
        <div className="project-body"><h3>{project.title}</h3><p>{project.description}</p></div>
        <div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      </button>

      {open && (
        <div className="project-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
          <div ref={dialog} className="project-dialog" role="dialog" aria-modal="true" aria-labelledby={`${project.title}-dialog-title`}>
            <button className="dialog-close" type="button" onClick={close} aria-label={t.project.close}>×</button>
            <p>{t.project.choose}</p>
            <h3 id={`${project.title}-dialog-title`}>{project.title}</h3>
            <div className="dialog-links">
              <a ref={liveLink} href={project.liveUrl} target="_blank" rel="noreferrer"><span>{t.project.live}</span><span aria-hidden="true">↗</span></a>
              <a href={project.repoUrl} target="_blank" rel="noreferrer"><span>{t.project.repo}</span><span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
