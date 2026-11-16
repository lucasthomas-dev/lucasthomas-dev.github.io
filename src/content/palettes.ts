// Palettes de couleurs. Chaque token est une paire [clair, sombre].
// Pour passer de l'une à l'autre : `npm run dev`, puis le sélecteur en bas à droite (visible en dev seulement).
// Pour l'adopter : `palette` dans src/content/site.ts.
// Pour vérifier les contrastes : `npm run check:palettes`.

export type Pair = readonly [light: string, dark: string];

export type Palette = {
  label: string;
  bg: Pair; // fond de page
  surface: Pair; // fond des cartes et boutons
  ink: Pair; // texte principal
  muted: Pair; // texte secondaire
  line: Pair; // séparateurs fins
  edge: Pair; // bordures et ombres franches
  accent: Pair; // couleur d'accent
  onAccent: Pair; // texte posé sur l'accent
  chip: Pair; // fond des étiquettes
};

export const palettes = {
  papier: {
    label: "Papier",
    bg: ["#f4efe6", "#14121b"],
    surface: ["#fffcf6", "#1d1a27"],
    ink: ["#1e1a2b", "#efe9df"],
    muted: ["#5f5870", "#a69eb6"],
    line: ["#ddd4c4", "#2e2a3b"],
    edge: ["#1e1a2b", "#060509"],
    accent: ["#b83e14", "#ff9361"],
    onAccent: ["#fffcf6", "#14121b"],
    chip: ["#efe6d6", "#2a2637"],
  },
  terminal: {
    label: "Terminal",
    bg: ["#eef1ea", "#0c120e"],
    surface: ["#fbfdf8", "#131b16"],
    ink: ["#15201a", "#d9f2de"],
    muted: ["#4f5f55", "#8fb09a"],
    line: ["#d3dbd0", "#22302a"],
    edge: ["#15201a", "#020403"],
    accent: ["#1b7339", "#5fdc8a"],
    onAccent: ["#fbfdf8", "#0c120e"],
    chip: ["#e2e9de", "#1b261f"],
  },
} satisfies Record<string, Palette>;

export type PaletteName = keyof typeof palettes;

const TOKENS = {
  bg: "--bg",
  surface: "--surface",
  ink: "--ink",
  muted: "--muted",
  line: "--line",
  edge: "--edge",
  accent: "--accent",
  onAccent: "--on-accent",
  chip: "--chip",
} as const;

/** Génère le CSS de toutes les palettes, avec light-dark() pour les deux thèmes. */
export function paletteCss(): string {
  return Object.entries(palettes)
    .map(([name, p]) => {
      const vars = (Object.keys(TOKENS) as (keyof typeof TOKENS)[])
        .map((k) => `${TOKENS[k]}:light-dark(${p[k][0]},${p[k][1]})`)
        .join(";");
      return `:root[data-palette="${name}"]{${vars}}`;
    })
    .join("\n");
}
