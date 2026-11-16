// Page 404 de tout le site (exportée en 404.html, que GitHub Pages sert pour toute URL inconnue).
// Elle ne passe pas par le layout [lang] : polices, palette et thème sont repris ici.

import "./globals.css";
import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Pixelify_Sans } from "next/font/google";
import Link from "next/link";
import { paletteCss } from "@/content/palettes";
import { site } from "@/content/site";
import { getDictionary } from "@/i18n/dictionaries";

const pixel = Pixelify_Sans({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-pixel", display: "swap" });
const body = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "404",
  robots: { index: false },
};

const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function GlobalNotFound() {
  const fr = getDictionary("fr").notFound;
  const en = getDictionary("en").notFound;

  return (
    <html lang="fr" className={`${pixel.variable} ${body.variable}`} data-palette={site.palette} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <style dangerouslySetInnerHTML={{ __html: paletteCss() }} />
      </head>
      <body>
        <div className="wrap">
          <main className="hero">
            <h1>404</h1>
            <p className="role">{fr.title}</p>
            <p className="lead">{fr.text}</p>
            <p className="lead" lang="en">
              {en.title}. {en.text}
            </p>
            <div className="links">
              <Link href="/fr">{fr.back}</Link>
              <Link href="/en" lang="en">
                {en.back}
              </Link>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
