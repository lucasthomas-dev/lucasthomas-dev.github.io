// Projets affichés sur la page d'accueil.
// Un champ `{ fr, en }` est traduit ; une simple chaîne vaut pour les deux langues.

import type { MaybeLocalized } from "../i18n/config";

export type Project = {
  title: MaybeLocalized;
  status: "pro" | "perso" | "student";
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
    tags: ["Agents", { fr: "LLM locaux", en: "Local LLMs" }, "Tool calling", "Ollama"],
    link: "https://github.com/lucasthomas-dev/ChatWithLLM",
  },
  {
    title: "MCP Database",
    status: "perso",
    text: {
      fr: "Un serveur MCP qui donne aux agents IA un accès en lecture à des bases SQL (MySQL, PostgreSQL) : exploration du schéma, lectures filtrées et paginées, et des droits définis table par table.",
      en: "An MCP server that gives AI agents read access to SQL databases (MySQL, PostgreSQL): schema exploration, filtered and paginated reads, and per-table permissions.",
    },
    tags: ["Python", "MCP", "SQLAlchemy"],
    link: "https://github.com/lucasthomas-dev/MCP_DataBase",
  },
  {
    title: "SifTron",
    status: "perso",
    text: {
      fr: "Un moteur de recherche vectorielle écrit de zéro en Rust. Ses index IVF et HNSW sont 15× plus rapides que la recherche exhaustive, pour 99 % de rappel.",
      en: "A vector search engine written from scratch in Rust. Its IVF and HNSW indexes are 15× faster than exhaustive search at 99% recall.",
    },
    tags: ["Rust", { fr: "Recherche ANN", en: "ANN search" }, "HNSW"],
    link: "https://github.com/lucasthomas-dev/SifTron",
  },
  {
    title: { fr: "Veille arXiv", en: "arXiv watch" },
    status: "perso",
    text: {
      fr: "Un pipeline local qui surveille les nouvelles publications arXiv et résume les papiers qui comptent.",
      en: "A local pipeline that monitors new arXiv papers and summarises the ones that matter.",
    },
    tags: ["Python", "LLM", { fr: "Veille", en: "Tech watch" }],
    link: "https://github.com/lucasthomas-dev/arXiv-agent",
  },
  {
    title: { fr: "Ré-identification de personnes", en: "Person re-identification" },
    status: "student",
    text: {
      fr: "Reconnaître une même personne d’une caméra à l’autre, sans serveur central : chaque caméra détecte les silhouettes (YOLO), les reconnaît avec sa propre carte auto-organisatrice (SOM) et interroge ses voisines pour les inconnus.",
      en: "Recognising the same person across cameras with no central server: each camera detects people (YOLO), identifies them with its own self-organising map (SOM) and asks its peers about anyone it doesn’t know.",
    },
    tags: ["Python", { fr: "Vision par ordinateur", en: "Computer vision" }, "YOLO"],
    link: "https://github.com/lucasthomas-dev/People-Re-Identification",
  },
];
