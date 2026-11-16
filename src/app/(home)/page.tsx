import type { Metadata } from "next";
import { LOCALE_STORAGE_KEY, defaultLocale, locales } from "@/i18n/config";

// Le site est statique (pas de serveur pour lire Accept-Language) :
// la langue est choisie dans le navigateur, puis on redirige.
// Ordre : choix mémorisé par le sélecteur FR / EN, langue du navigateur, français par défaut.
// Les URLs sont relatives ("fr/") pour fonctionner aussi sous un sous-chemin GitHub Pages.

export const metadata: Metadata = {
  title: "Lucas Thomas",
  robots: { index: false },
};

const redirectScript = `(function(){
var supported=${JSON.stringify(locales)},lang=null;
try{lang=localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)})}catch(e){}
if(supported.indexOf(lang)<0){
  lang=${JSON.stringify(defaultLocale)};
  var prefs=navigator.languages||[navigator.language||""];
  for(var i=0;i<prefs.length;i++){var c=String(prefs[i]).slice(0,2).toLowerCase();if(supported.indexOf(c)>=0){lang=c;break}}
}
location.replace(lang+"/"+location.hash);
})()`;

export default function HomeRedirect() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${defaultLocale}/`} />
      </noscript>
      <p>
        <a href="fr/">Français</a> · <a href="en/">English</a>
      </p>
    </>
  );
}
