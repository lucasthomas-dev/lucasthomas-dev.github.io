import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible, Pixelify_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { PaletteSwitcher } from "@/components/PaletteSwitcher";
import { SiteNav } from "@/components/SiteNav";
import { paletteCss, palettes } from "@/content/palettes";
import { site } from "@/content/site";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import "../globals.css";

// Titres, nav, badges, boutons, dates.
const pixel = Pixelify_Sans({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-pixel", display: "swap" });
// Texte courant.
const body = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-body", display: "swap" });

// Seules les langues de generateStaticParams existent (obligatoire en export statique).
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const title = `${site.name} – ${site.role[lang]}`;
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s – ${site.name}` },
    description: site.description[lang],
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      title,
      description: site.description[lang],
      url: `/${lang}`,
    },
  };
}

const defaultPalette = palettes[site.palette];

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: defaultPalette.bg[0] },
    { media: "(prefers-color-scheme: dark)", color: defaultPalette.bg[1] },
  ],
};

// Applique le thème choisi avant le premier rendu, pour éviter un flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const fonts = [pixel, body].map((f) => f.variable).join(" ");

  return (
    <html lang={lang} className={fonts} data-palette={site.palette} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <style dangerouslySetInnerHTML={{ __html: paletteCss() }} />
      </head>
      <body>
        <a className="skip" href="#contenu">
          {dict.skip}
        </a>
        <div className="wrap">
          <SiteNav lang={lang} dict={dict} />
          {children}
          <footer>
            <span>
              © {new Date().getFullYear()} {site.name}
            </span>
          </footer>
        </div>
        {process.env.NODE_ENV === "development" ? <PaletteSwitcher initial={site.palette} /> : null}
      </body>
    </html>
  );
}
