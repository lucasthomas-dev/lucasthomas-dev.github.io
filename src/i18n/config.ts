export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

// Clé localStorage où le sélecteur FR / EN mémorise le choix, relue par la page "/".
export const LOCALE_STORAGE_KEY = "locale";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Un texte traduit dans chaque langue. */
export type Localized<T = string> = Record<Locale, T>;

/** Accepte soit une valeur commune aux deux langues, soit une valeur traduite. */
export type MaybeLocalized = string | Localized;

export function localize(value: MaybeLocalized, lang: Locale): string {
  return typeof value === "string" ? value : value[lang];
}
