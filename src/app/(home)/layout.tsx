// Layout minimal de la racine "/" : sa seule page redirige vers /fr/ ou /en/.

export default function HomeRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
