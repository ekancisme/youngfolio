import { useCallback, useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { useLanguage } from "../i18n/LanguageProvider";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const { lang, t, toggleLanguage } = useLanguage();
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), { threshold: 0.08 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <nav className={`navbar ${pastHero ? "navbar--scrolled" : ""}`} aria-label={t.nav.primary}>
        <a className="brand" href="#top" aria-label={t.nav.home}><span>LÊ THẾ CƯỜNG</span><span className="brand-mark" aria-hidden="true">✳︎</span></a>
        <div className="navbar-right">
          <div className="desktop-links"><a href="#work">{t.nav.work}</a>, <a href="#about">{t.nav.about}</a>, <a href="#stack">{t.nav.stack}</a>, <a href="#contact">{t.nav.contact}</a></div>
          <a className="github-link" href="https://github.com/ekancisme" target="_blank" rel="noreferrer" aria-label={t.nav.githubAria}>{t.nav.github}</a>
          <button className="lang-toggle" type="button" onClick={toggleLanguage} aria-label={t.nav.language} lang={lang === "en" ? "vi" : "en"}>{lang === "en" ? "VI" : "EN"}</button>
        </div>
        <button className={`menu-button ${open ? "menu-button--open" : ""}`} type="button" aria-label={open ? t.nav.closeMenu : t.nav.openMenu} aria-expanded={open} onClick={() => setOpen(value => !value)}><span /><span /><span /></button>
      </nav>
      <MobileMenu open={open} onClose={close} />
    </>
  );
}