import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useT } from "../i18n/LanguageProvider";
import { ProjectCard, type Project } from "./ProjectCard";

export function PortfolioSections() {
  const reducedMotion = usePrefersReducedMotion();
  const t = useT();
  useScrollReveal(reducedMotion);

  const projects: readonly Project[] = [
    {
      index: "01",
      title: "LexiGrow",
      kind: t.projects.lexigrow.kind,
      description: t.projects.lexigrow.description,
      stack: ["React 19", "Node.js", "Express", "MongoDB", "Gemini AI", "OAuth / JWT"],
      image: "/projects/lexigrow.webp",
      imagePosition: "center center",
      liveUrl: "https://lexigrow.ltcuong24.io.vn/",
      repoUrl: "https://github.com/ekancisme/lexigrow",
    },
    {
      index: "02",
      title: "Drivon",
      kind: t.projects.drivon.kind,
      description: t.projects.drivon.description,
      stack: ["Java 17", "Spring Boot 3", "React", "MongoDB", "WebSocket", "Spring Security"],
      image: "/projects/drivon.webp",
      imagePosition: "center top",
      liveUrl: "https://youngltc.id.vn/",
      repoUrl: "https://github.com/ekancisme/drivon",
    },
  ];

  return (
    <div className="portfolio-sections">
      <section className="about section-shell" id="about" aria-labelledby="about-title">
        <div className="section-kicker" data-reveal><span>{t.about.kicker}</span><span>{t.about.location}</span></div>
        <div className="about-grid">
          <h2 id="about-title" data-reveal>{t.about.titleBefore}<em>{t.about.titleEm}</em>{t.about.titleAfter}</h2>
          <div className="about-copy" data-reveal>
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <a className="text-link" href="/Le-The-Cuong-CV.pdf" target="_blank" rel="noreferrer">{t.about.resume} <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="availability" data-reveal><span className="pulse-dot" /><span>{t.about.availability}</span><span>2026</span></div>
      </section>

      <section className="experience section-shell" id="experience" aria-labelledby="experience-title">
        <div className="section-kicker section-kicker--light" data-reveal><span>{t.experience.kicker}</span><span>{t.experience.kickerRight}</span></div>
        <div className="experience-grid">
          <h2 id="experience-title" data-reveal>{t.experience.title}</h2>
          <article className="timeline-card" data-reveal>
            <div className="timeline-date">{t.experience.internDate}</div>
            <div><p className="eyebrow">{t.experience.internCompany}</p><h3>{t.experience.internRole}</h3></div>
            <div className="timeline-details"><p>{t.experience.internDetail1}</p><p>{t.experience.internDetail2}</p></div>
          </article>
          <article className="timeline-card timeline-card--education" data-reveal>
            <div className="timeline-date">{t.experience.eduDate}</div>
            <div><p className="eyebrow">{t.experience.eduSchool}</p><h3>{t.experience.eduMajor}</h3></div>
            <div className="timeline-details"><p>{t.experience.eduDetail}</p></div>
          </article>
        </div>
      </section>

      <section className="work section-shell" id="work" aria-labelledby="work-title">
        <div className="section-kicker" data-reveal><span>{t.work.kicker}</span><span>{t.work.kickerRight}</span></div>
        <h2 id="work-title" className="work-title" data-reveal>{t.work.title}</h2>
        <div className="project-list">
          {projects.map((project) => <ProjectCard project={project} reducedMotion={reducedMotion} key={project.title} />)}
        </div>
      </section>

      <section className="stack" id="stack" aria-labelledby="stack-title">
        <div className="marquee" aria-hidden="true"><div>REACT · SPRING BOOT · TYPESCRIPT · NODE.JS · APPLIED AI · 3D WEB · REACT · SPRING BOOT · TYPESCRIPT · NODE.JS · APPLIED AI · 3D WEB ·</div></div>
        <div className="section-shell stack-inner">
          <div className="section-kicker section-kicker--light" data-reveal><span>{t.stack.kicker}</span><span>{t.stack.kickerRight}</span></div>
          <h2 id="stack-title" data-reveal>{t.stack.title}</h2>
          <div className="skill-grid">
            {t.skills.map(([title, ...skills], groupIndex) => <article data-reveal key={title}><span className="skill-index">0{groupIndex + 1}</span><h3>{title}</h3><ul>{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></article>)}
          </div>
        </div>
      </section>

      <section className="contact section-shell" id="contact" aria-labelledby="contact-title">
        <div className="section-kicker" data-reveal><span>{t.contact.kicker}</span><span>{t.contact.kickerRight}</span></div>
        <div className="contact-main">
          <p data-reveal>{t.contact.prompt}</p>
          <a id="contact-title" href="mailto:lethecuong2k4@gmail.com" data-reveal>{t.contact.cta}<span aria-hidden="true">↗</span></a>
        </div>
        <footer><span>{t.footer.rights}</span><div><a href="https://github.com/ekancisme" target="_blank" rel="noreferrer">{t.footer.github}</a><a href="/Le-The-Cuong-CV.pdf" target="_blank" rel="noreferrer">{t.footer.resume}</a><a href="#top">{t.footer.top}</a></div></footer>
      </section>
    </div>
  );
}
