// Informations générales du site. Tout ce qui est personnel se règle ici.
// Un champ `{ fr, en }` est traduit ; une simple chaîne vaut pour les deux langues.

import type { Localized, MaybeLocalized } from "../i18n/config";
import type { PaletteName } from "./palettes";

export const site = {
  name: "Lucas Thomas",
  handle: "lucas.thomas",
  role: { fr: "Ingénieur Data & IA", en: "Data & AI Engineer" } as Localized,
  lead: {
    fr: "Je construis des pipelines de données, des agents et des outils d’IA, du prototype jusqu’à la prod. Aujourd’hui chez Groupe Combronde, dans le transport et la logistique.",
    en: "I build data pipelines, agents and AI tools, from prototype to production. Currently at Groupe Combronde, in transport and logistics.",
  } as Localized,
  description: {
    fr: "Portfolio de Lucas Thomas, ingénieur Data & IA : pipelines de données, agents, LLM et outils d’IA du prototype à la prod.",
    en: "Portfolio of Lucas Thomas, Data & AI engineer: data pipelines, agents, LLMs and AI tools from prototype to production.",
  } as Localized,
  contactText: {
    fr: "Un projet data ou IA, une question, une opportunité : écris-moi.",
    en: "A data or AI project, a question, an opportunity: drop me a line.",
  } as Localized,

  // URL publique du site, pour les métadonnées (Open Graph, hreflang).
  // Renseignée automatiquement par le workflow GitHub Pages. Avec un domaine perso, l'écrire ici.
  url: process.env.SITE_URL || "http://localhost:3000",
  // Laisser une chaîne vide masque le lien correspondant.
  github: "https://github.com/eXor6orks",
  linkedin: "https://www.linkedin.com/in/lucas-thomas-519662268/",
  email: "lucas.thomas.dev@gmail.com",

  // Palette utilisée en production (voir src/content/palettes.ts).
  palette: "papier" as PaletteName,
};

export type TimelineItem = {
  where: MaybeLocalized;
  what: MaybeLocalized;
  when: MaybeLocalized;
  current?: boolean;
};

export const timeline: TimelineItem[] = [
  {
    where: "Groupe Combronde",
    what: { fr: "Ingénieur Data & IA", en: "Data & AI Engineer" },
    when: { fr: "2026 – aujourd’hui", en: "2026 – present" },
    current: true,
  },
  {
    where: "Groupe Combronde",
    what: { fr: "Ingénieur en alternance", en: "Engineering apprentice (work-study)" },
    when: "2023 – 2026",
  },
  {
    where: "3iL Ingénieurs, Limoges",
    what: { fr: "Diplôme d’ingénieur", en: "Engineering degree (MSc)" },
    when: "2023 - 2026",
  },
  {
    where: { fr: "Bucarest, Erasmus", en: "Bucharest, Erasmus" },
    what: { fr: "Mastère spécialisé en intelligence artificielle", en: "Specialised master’s in artificial intelligence" },
    when: { fr: "Sep 2025 - Fev 2026", en: "Sep 2025 - Feb 2026" }, // TODO: année du mastère
  },
];
