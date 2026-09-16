import { useEffect, useRef, useState } from "react";
import { EMAIL } from "../i18n/translations";
import { useT } from "../i18n/LanguageProvider";

export function ActionPills({ reducedMotion }: { reducedMotion: boolean }) {
  const t = useT();
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const restore = useRef<number | null>(null);

  const actions = [
    [t.actions.lexigrow, "https://github.com/ekancisme/lexigrow"],
    [t.actions.drivon, "https://github.com/ekancisme/drivon"],
    [t.actions.github, "https://github.com/ekancisme"],
  ] as const;

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setTimeout(() => setVisible(true), 400);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);
  useEffect(() => () => { if (restore.current) window.clearTimeout(restore.current); }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      if (restore.current) window.clearTimeout(restore.current);
      restore.current = window.setTimeout(() => setCopied(false), 1600);
    } catch { window.location.href = `mailto:${EMAIL}`; }
  };

  return (
    <div className={`actions ${reducedMotion || visible ? "actions--visible" : ""}`}>
      {actions.map(([label, href]) => <a className="action-pill" href={href} target="_blank" rel="noreferrer" key={href}>{label}</a>)}
      <a className="action-pill" href="/Le-The-Cuong-CV.pdf" download>{t.actions.resume}</a>
      <button className="email-pill" type="button" onClick={copyEmail}>
        <span>{copied ? t.actions.copied : t.actions.reach}</span><span className="copy-icon" aria-hidden="true" />
      </button>
      <span className="sr-only" aria-live="polite">{copied ? t.actions.copiedSr : ""}</span>
    </div>
  );
}