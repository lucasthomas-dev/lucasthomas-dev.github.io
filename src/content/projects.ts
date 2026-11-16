// Projets affichés sur la page d'accueil.
// Un champ `{ fr, en }` est traduit ; une simple chaîne vaut pour les deux langues.

import type { MaybeLocalized } from "../i18n/config";

export type Project = {
  title: MaybeLocalized;
  status: "pro" | "perso";
  text: MaybeLocalized;
  tags: MaybeLocalized[];
  // Lien vers le code. Absent ou vide : pas de bouton « Voir le code ».
  link?: string;
};

export const projects: Project[] = [
  {
    title: "Centrale",
    status: "perso",
    text: {
      fr: "Mon home lab d’agents auto-hébergés : un agent central doté d’une mémoire, des agents de résumé, la détection vocale et du tool calling.",
      en: "My self-hosted agent home lab: a central agent with memory, summarisation agents, voice detection and tool calling.",
    },
    tags: ["Agents", { fr: "LLM locaux", en: "Local LLMs" }, "Tool calling"],
    link: "", // TODO: lien GitHub
  },
  {
    title: "VectorDB",
    status: "perso",
    text: {
      fr: "Une base de données vectorielle écrite de zéro en Rust, pensée pour combiner recherche par similarité et filtrage sur les métadonnées.",
      en: "A vector database written from scratch in Rust, designed to combine similarity search with metadata filtering.",
    },
    tags: ["Rust", { fr: "Recherche ANN", en: "ANN search" }, { fr: "Filtrage", en: "Filtering" }],
    link: "", // TODO: lien GitHub
  },
  {
    title: { fr: "Veille arXiv", en: "arXiv watch" },
    status: "perso",
    text: {
      fr: "Un pipeline local qui surveille les nouvelles publications arXiv et résume les papiers qui comptent.",
      en: "A local pipeline that monitors new arXiv papers and summarises the ones that matter.",
    },
    tags: ["Python", "LLM", { fr: "Veille", en: "Tech watch" }],
    link: "", // TODO: lien GitHub
  },
];
