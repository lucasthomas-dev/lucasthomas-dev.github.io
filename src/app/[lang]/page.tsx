import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";
import { site, timeline } from "@/content/site";
import { hasLocale, localize } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const links = [
    site.email && { label: "Email", href: `mailto:${site.email}`, external: false, primary: true },
    site.github && { label: "GitHub", href: site.github, external: true, primary: false },
    site.linkedin && { label: "LinkedIn", href: site.linkedin, external: true, primary: false },
  ].filter(Boolean) as { label: string; href: string; external: boolean; primary: boolean }[];

  return (
    <>
      <header className="hero" id="top">
        <h1>{site.name}</h1>
        <p className="role">{site.role[lang]}</p>
        <p className="lead">{site.lead[lang]}</p>
        <div className="links">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={l.primary ? "primary" : undefined}
              {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {l.label}
            </a>
          ))}
        </div>
      </header>

      <main id="contenu">
        <section id={dict.ids.projects} aria-labelledby="projects-title">
          <h2 id="projects-title">{dict.sections.projects}</h2>
          <ul className="projects">
            {projects.map((p) => (
              <ProjectCard key={localize(p.title, "fr")} project={p} lang={lang} dict={dict} />
            ))}
          </ul>
        </section>

        <section id={dict.ids.experience} aria-labelledby="experience-title">
          <h2 id="experience-title">{dict.sections.experience}</h2>
          <ul className="timeline">
            {timeline.map((item) => {
              const where = localize(item.where, lang);
              const what = localize(item.what, lang);
              return (
                <li key={`${where}-${what}`} className={item.current ? "current" : undefined}>
                  <h3>{where}</h3>
                  <span className="what">{what}</span>
                  <span className="when">{localize(item.when, lang)}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="contact" id={dict.ids.contact} aria-labelledby="contact-title">
          <h2 id="contact-title">{dict.sections.contact}</h2>
          <p>{site.contactText[lang]}</p>
          <a className="mail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </section>
      </main>
    </>
  );
}
