// Vérifie les contrastes WCAG de chaque palette : `npm run check:palettes`.
// Seuil AA pour le texte courant : 4.5.
import { palettes, type Pair } from "../src/content/palettes.ts";

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

type Key = keyof (typeof palettes)["papier"];
const checks: [fg: Key, bg: Key, min: number][] = [
  ["ink", "bg", 4.5], ["ink", "surface", 4.5], ["ink", "chip", 4.5],
  ["muted", "bg", 4.5], ["muted", "surface", 4.5], ["muted", "chip", 4.5],
  ["accent", "bg", 4.5], ["accent", "surface", 4.5],
  ["onAccent", "accent", 4.5],
];

let failures = 0;
for (const [name, p] of Object.entries(palettes)) {
  for (const [mode, i] of [["clair", 0], ["sombre", 1]] as const) {
    const bad = checks
      .map(([fg, bg, min]) => ({ fg, bg, min, ratio: contrast((p[fg] as Pair)[i], (p[bg] as Pair)[i]) }))
      .filter((c) => c.ratio < c.min);
    failures += bad.length;
    const status = bad.length ? "✗" : "✓";
    console.log(`${status} ${name} (${mode})${bad.map((c) => `\n    ${c.fg} sur ${c.bg} : ${c.ratio.toFixed(2)} < ${c.min}`).join("")}`);
  }
}
process.exit(failures ? 1 : 0);
