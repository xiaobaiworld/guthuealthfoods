import type { MetadataRoute } from "next";

import { COLLECTIONS, LANGUAGES, getAllItems } from "@/lib/content";
import {
  buildAbsoluteUrl,
  getBasePath,
  getCategoryPath,
  getFoodPath,
  getGuidePath,
  getPagePath,
} from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of LANGUAGES) {
    entries.push({
      url: buildAbsoluteUrl(getBasePath(lang)),
      lastModified: new Date("2026-03-17"),
    });

    entries.push({
      url: buildAbsoluteUrl(`/${lang}/foods`),
      lastModified: new Date("2026-03-17"),
    });

    entries.push({
      url: buildAbsoluteUrl(`/${lang}/guides`),
      lastModified: new Date("2026-03-17"),
    });
  }

  for (const lang of LANGUAGES) {
    for (const collection of COLLECTIONS) {
      const items = await getAllItems(collection, lang);

      for (const item of items) {
        const pathname =
          collection === "foods"
            ? getFoodPath(lang, item.slug)
            : collection === "categories"
              ? getCategoryPath(lang, item.slug)
              : collection === "guides"
                ? getGuidePath(lang, item.slug)
                : getPagePath(lang, item.slug);

        entries.push({
          url: buildAbsoluteUrl(pathname),
          lastModified: new Date(item.updatedAt),
        });
      }
    }
  }

  return entries;
}
