# Portfolio – Lucas Thomas

Portfolio d'ingénieur Data & IA, en Next.js (App Router, TypeScript), bilingue français / anglais. Le site est exporté en HTML statique (`out/`) et déployé sur GitHub Pages.

## Lancer en local

```bash
npm install
npm run dev              # http://localhost:3000 (redirige vers /fr/ ou /en/)
npm run build            # export statique dans out/
npm run typecheck
npm run check:palettes   # contrastes WCAG de toutes les palettes
```

## Modifier le contenu

| Quoi | Où |
|---|---|
| Nom, rôle, accroche, liens GitHub / LinkedIn, email, URL du site, palette | `src/content/site.ts` |
| Parcours | `src/content/site.ts` (`timeline`) |
| Projets (titre, Pro/Perso, texte, technos, lien vers le code) | `src/content/projects.ts` |
| Textes d'interface (nav, titres, boutons, 404) | `src/i18n/dictionaries.ts` |
| Palettes de couleurs | `src/content/palettes.ts` |
| Styles | `src/app/globals.css` |

Un champ traduit s'écrit `{ fr: "…", en: "…" }` ; une simple chaîne vaut pour les deux langues. Un lien vide (`""`) n'est pas affiché.

## Langues

- `/fr/` et `/en/`. La page `/` choisit la langue dans le navigateur (le site est statique, sans serveur) : d'abord le choix mémorisé par le sélecteur FR / EN, sinon la langue du navigateur, sinon le français.
- Les balises `hreflang` et `canonical` sont générées pour le référencement.
- Ajouter une langue : l'ajouter dans `src/i18n/config.ts`, puis TypeScript signale chaque texte à traduire.

## Palettes

Deux palettes sont définies dans `src/content/palettes.ts` : Papier (orange brûlé, celle du site) et Terminal (vert), chacune en clair et en sombre.

- En `npm run dev`, un sélecteur en bas à droite permet de passer de l'une à l'autre en direct. Il n'apparaît pas en production.
- Pour en adopter une : changer `palette` dans `src/content/site.ts`.
- Pour en créer une : copier un bloc dans `palettes.ts`, ajuster les couleurs, puis lancer `npm run check:palettes`.

## Typographies

| Police | Usage |
|---|---|
| Pixelify Sans | Titres, nav, badges, boutons, dates |
| Atkinson Hyperlegible | Texte courant et étiquettes de technos |

## Structure

```
src/
  app/[lang]/       layout (polices, métadonnées, nav, footer), page d'accueil
  app/(home)/       page "/" qui redirige vers la bonne langue
  app/global-not-found.tsx   page 404 (bilingue)
  components/       ProjectCard, SiteNav, LanguageSwitcher, ThemeToggle, PaletteSwitcher
  content/          site, projets, palettes
  i18n/             langues et dictionnaires
scripts/            check-palettes.ts
```

## Déploiement (GitHub Pages)

Le workflow `.github/workflows/deploy.yml` construit le site et le publie à chaque push sur `main`.

1. Une seule fois : sur GitHub, Settings → Pages → Build and deployment → Source : **GitHub Actions**.
2. Pousser sur `main`. Le déploiement se suit dans l'onglet Actions.
3. Le site est servi sous `https://<compte>.github.io/<dépôt>/`. Le sous-chemin (`basePath`) et l'URL publique sont renseignés automatiquement par le workflow : rien à modifier si le dépôt est renommé.
4. Domaine personnalisé : Settings → Pages → Custom domain, puis écrire l'URL dans `site.url` (`src/content/site.ts`).

Limites de l'export statique : pas de proxy, de cookies ni de routes dynamiques sans `generateStaticParams`.

## Ajouter un blog plus tard

Créer `src/app/[lang]/blog/page.tsx` (liste) et `src/app/[lang]/blog/[slug]/page.tsx` (article), avec les articles en MDX (`@next/mdx`) ou en Markdown lus au build via `generateStaticParams`, par exemple `content/blog/fr/mon-article.mdx` et `content/blog/en/my-article.mdx`. La nav et le sélecteur de langue fonctionnent déjà sur toutes les pages.
