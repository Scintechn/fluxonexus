import type { Dictionary } from "./types";
import { pt } from "./pt";

export const locales = ["pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const hreflangMap: Record<Locale, string> = {
  pt: "pt-PT",
};

const dictionaries: Record<Locale, Dictionary> = { pt };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
