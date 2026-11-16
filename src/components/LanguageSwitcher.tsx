"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_STORAGE_KEY, locales, type Locale } from "@/i18n/config";

export function LanguageSwitcher({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname() ?? `/${lang}`;
  // Même page, dans l'autre langue : on remplace le premier segment.
  const rest = pathname.split("/").slice(2).filter(Boolean).join("/");

  function remember(locale: Locale) {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // stockage indisponible : la langue reste celle de l'URL
    }
  }

  return (
    <ul className="lang" aria-label={label}>
      {locales.map((locale) => (
        <li key={locale}>
          <Link
            href={`/${locale}${rest ? `/${rest}` : ""}`}
            hrefLang={locale}
            lang={locale}
            aria-current={locale === lang ? "true" : undefined}
            onClick={() => remember(locale)}
          >
            {locale.toUpperCase()}
          </Link>
        </li>
      ))}
    </ul>
  );
}
