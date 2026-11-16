import type { Project } from "@/content/projects";
import { localize, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function ProjectCard({ project, lang, dict }: { project: Project; lang: Locale; dict: Dictionary }) {
  const { status, link } = project;
  return (
    <li className="card">
      <div className="card-top">
        <h3>{localize(project.title, lang)}</h3>
        <span className={`status ${status}`}>{dict.project[status]}</span>
      </div>
      <p>{localize(project.text, lang)}</p>
      <ul className="tags" aria-label={dict.project.technologies}>
        {project.tags.map((tag) => {
          const label = localize(tag, lang);
          return <li key={label}>{label}</li>;
        })}
      </ul>
      {link ? (
        <a className="src" href={link} target="_blank" rel="noopener noreferrer">
          {dict.project.code} <span aria-hidden="true">→</span>
        </a>
      ) : null}
    </li>
  );
}
