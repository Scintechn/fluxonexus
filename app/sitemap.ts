import type { MetadataRoute } from "next";
import { business } from "@/lib/business";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/servicos", "/sobre", "/contactos"];
  const now = new Date();
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${business.siteUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1.0 : 0.7,
    })),
  );
}
