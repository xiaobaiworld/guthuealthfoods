import type { Language } from "@/lib/content";

export const siteConfig = {
  name: "Gut Health Foods",
  description:
    "Bilingual health food reference site with structured guides, category pages, and food profiles.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.guthealthfoods.net",
};

export function getBasePath(lang: Language) {
  return `/${lang}`;
}

export function getFoodPath(lang: Language, slug: string) {
  return `${getBasePath(lang)}/foods/${slug}`;
}

export function getCategoryPath(lang: Language, slug: string) {
  return `${getBasePath(lang)}/foods/category/${slug}`;
}

export function getGuidePath(lang: Language, slug: string) {
  return `${getBasePath(lang)}/guides/${slug}`;
}

export function getPagePath(lang: Language, slug: string) {
  return `${getBasePath(lang)}/${slug}`;
}

export function buildAbsoluteUrl(pathname: string) {
  return new URL(pathname, siteConfig.url).toString();
}
