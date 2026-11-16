import Link from "next/link";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function SiteNav({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  // Liens en "/<lang>#ancre" pour qu'ils fonctionnent aussi depuis de futures pages (blog).
  // <Link> ajoute le sous-chemin du site (basePath) quand il est servi sous GitHub Pages.
  const items = [
    { id: dict.ids.projects, label: dict.nav.projects },
    { id: dict.ids.experience, label: dict.nav.experience },
    { id: dict.ids.contact, label: dict.nav.contact },
  ];

  return (
    <nav aria-label={dict.nav.label}>
      <Link className="home" href={`/${lang}`}>
        {site.handle}
      </Link>
      <div className="nav-right">
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <Link href={`/${lang}#${item.id}`}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <div className="nav-tools">
          <LanguageSwitcher lang={lang} label={dict.language.label} />
          <ThemeToggle label={dict.theme} />
        </div>
      </div>
    </nav>
  );
}
