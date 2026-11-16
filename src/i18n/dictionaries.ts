import type { Locale } from "./config";

// Textes d'interface. Le type de `en` est dérivé de `fr` :
// TypeScript signale toute clé manquante dans une des deux langues.

const fr = {
  ids: { projects: "projets", experience: "parcours", contact: "contact" },
  nav: { label: "Navigation principale", projects: "Projets", experience: "Parcours", contact: "Contact" },
  skip: "Aller au contenu",
  theme: "Basculer entre thème clair et sombre",
  language: { label: "Langue", switchTo: "Read in English" },
  sections: { projects: "Projets", experience: "Parcours", contact: "Contact" },
  project: { pro: "Pro", perso: "Perso", code: "Voir le code", technologies: "Technologies" },
  notFound: { title: "Page introuvable", text: "Cette page n’existe pas, ou plus.", back: "Retour à l’accueil" },
};

export type Dictionary = typeof fr;

const en: Dictionary = {
  ids: { projects: "projects", experience: "experience", contact: "contact" },
  nav: { label: "Main navigation", projects: "Projects", experience: "Experience", contact: "Contact" },
  skip: "Skip to content",
  theme: "Toggle light and dark theme",
  language: { label: "Language", switchTo: "Lire en français" },
  sections: { projects: "Projects", experience: "Experience", contact: "Contact" },
  project: { pro: "Work", perso: "Personal", code: "View code", technologies: "Technologies" },
  notFound: { title: "Page not found", text: "This page doesn’t exist, or no longer does.", back: "Back to home" },
};

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
