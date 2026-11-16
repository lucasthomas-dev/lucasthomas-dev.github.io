"use client";

// Cercle 8×8 en pixels : moitié gauche pleine, moitié droite en contour.
const ROWS: [number, number][] = [
  [2, 5], [1, 6], [0, 7], [0, 7], [0, 7], [0, 7], [1, 6], [2, 5],
];

const PIXELS = ROWS.flatMap(([from, to], y) => {
  const out: { x: number; y: number }[] = [];
  for (let x = from; x <= to; x++) {
    const edge = x === from || x === to || y === 0 || y === 7;
    if (x < 4 || edge) out.push({ x, y });
  }
  return out;
});

function currentTheme(): "light" | "dark" {
  const forced = document.documentElement.dataset.theme;
  if (forced === "light" || forced === "dark") return forced;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // stockage indisponible : le choix vaut pour la page en cours
    }
  }

  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label={label} title={label}>
      <svg viewBox="0 0 8 8" width="16" height="16" aria-hidden="true" shapeRendering="crispEdges">
        {PIXELS.map(({ x, y }) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
        ))}
      </svg>
    </button>
  );
}
