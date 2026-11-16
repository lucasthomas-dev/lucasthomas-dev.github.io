import type { NextConfig } from "next";

// Sous-chemin du site. Sur GitHub Pages, un dépôt "user/projet" est servi sous "/projet" ;
// le workflow .github/workflows/deploy.yml le renseigne automatiquement. En local : vide.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Export 100 % statique dans out/ (requis par GitHub Pages, qui n'a pas de serveur).
  output: "export",
  // Génère fr/index.html plutôt que fr.html : URLs propres sur tout hébergeur statique.
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  experimental: {
    // 404 commune à tout le site (src/app/global-not-found.tsx), servie en 404.html.
    globalNotFound: true,
  },
};

export default nextConfig;
