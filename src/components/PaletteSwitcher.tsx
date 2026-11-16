"use client";

// Outil de développement : passer d'une palette à l'autre en direct.
// Affiché uniquement avec `npm run dev` (voir app/[lang]/layout.tsx).

import { useEffect, useState } from "react";
import { palettes, type PaletteName } from "@/content/palettes";

const KEY = "dev-palette";
const names = Object.keys(palettes) as PaletteName[];

export function PaletteSwitcher({ initial }: { initial: PaletteName }) {
  const [active, setActive] = useState<PaletteName>(initial);

  useEffect(() => {
    const saved = localStorage.getItem(KEY) as PaletteName | null;
    if (saved && saved in palettes) apply(saved);
  }, []);

  function apply(name: PaletteName) {
    document.documentElement.dataset.palette = name;
    localStorage.setItem(KEY, name);
    setActive(name);
  }

  return (
    <div className="palette-switcher" role="group" aria-label="Palette (dev)">
      <span>palette</span>
      {names.map((name) => {
        const p = palettes[name];
        return (
          <button key={name} type="button" onClick={() => apply(name)} aria-pressed={active === name} title={p.label}>
            <i
              aria-hidden="true"
              style={{
                background: `linear-gradient(135deg, ${p.bg[0]} 0 25%, ${p.accent[0]} 25% 50%, ${p.accent[1]} 50% 75%, ${p.bg[1]} 75%)`,
              }}
            />
            {p.label}
          </button>
        );
      })}
    </div>
  );
}
