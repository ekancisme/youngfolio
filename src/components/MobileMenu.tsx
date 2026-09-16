import { useEffect, useRef } from "react";
import { useLanguage } from "../i18n/LanguageProvider";

type Props = { open: boolean; onClose: () => void };

export function MobileMenu({ open, onClose }: Props) {
  const { lang, t, toggleLanguage } = useLanguage();
  const firstLink = useRef<HTMLAnchorElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  const links = [
    [t.nav.work, "#work"],
    [t.nav.about, "#about"],
    [t.nav.stack, "#stack"],
    [t.nav.contact, "#contact"],
  ];

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const focusable = menu.current?.querySelectorAll<HTMLElement>("a[href],button:not([disabled])");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", keydown);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", keydown); };
  }, [open, onClose]);

  return (
    <div ref={menu} className={`mobile-menu ${open ? "mobile-menu--open" : ""}`} aria-hidden={!open} role="dialog" aria-modal={open ? "true" : undefined} aria-label={t.mobile.menu}>
      <div className="mobile-menu__links">
        {links.map(([label, href], index) => <a ref={index === 0 ? firstLink : undefined} key={href} href={href} onClick={onClose} tabIndex={open ? 0 : -1}>{label}</a>)}
        <a href="https://github.com/ekancisme" target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>{t.mobile.github}</a>
        <a href="/Le-The-Cuong-CV.pdf" download tabIndex={open ? 0 : -1}>{t.mobile.cv}</a>
        <button className="lang-toggle lang-toggle--menu" type="button" onClick={toggleLanguage} aria-label={t.nav.language} lang={lang === "en" ? "vi" : "en"} tabIndex={open ? 0 : -1}>{lang === "en" ? "Tiếng Việt" : "English"}</button>
      </div>
    </div>
  );
}