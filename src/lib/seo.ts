import type { Metadata } from "next";

import type { ContentItem, Language } from "@/lib/content";
import {
  buildAbsoluteUrl,
  getBasePath,
  getCategoryPath,
  getFoodPath,
  getGuidePath,
  getPagePath,
  siteConfig,
} from "@/lib/site";

type AlternateEntry = Partial<Record<Language, string>>;

function buildLanguageAlternates(entries: AlternateEntry) {
  return Object.fromEntries(
    Object.entries(entries).map(([lang, pathname]) => [lang, buildAbsoluteUrl(pathname)]),
  );
}

export function buildPageMetadata({
  lang,
  title,
  description,
  pathname,
  alternates,
  type = "website",
}: {
  lang: Language;
  title: string;
  description: string;
  pathname: string;
  alternates?: AlternateEntry;
  type?: "website" | "article";
}): Metadata {
  const allAlternates = alternates ?? { [lang]: pathname };
  const canonical = buildAbsoluteUrl(pathname);

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical,
      languages: buildLanguageAlternates(allAlternates),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type,
      locale: lang === "en" ? "en_US" : "zh_CN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function buildHomeMetadata(lang: Language): Metadata {
  const title = lang === "en" ? "Gut Health Foods" : "肠道健康食品";
  const description =
    lang === "en"
      ? "Bilingual health food reference site with structured guides, category pages, and food profiles."
      : "面向中英文读者的健康食品知识站，包含食物条目、分类页面和专题指南。";

  return buildPageMetadata({
    lang,
    title,
    description,
    pathname: getBasePath(lang),
    alternates: {
      en: getBasePath("en"),
      zh: getBasePath("zh"),
    },
  });
}

export function buildCollectionMetadata({
  lang,
  title,
  description,
  pathname,
}: {
  lang: Language;
  title: string;
  description: string;
  pathname: string;
}) {
  return buildPageMetadata({ lang, title, description, pathname });
}

export function buildContentMetadata(item: ContentItem): Metadata {
  const pathFactory =
    item.collection === "foods"
      ? getFoodPath
      : item.collection === "categories"
        ? getCategoryPath
        : item.collection === "guides"
          ? getGuidePath
          : getPagePath;

  const pathname = pathFactory(item.lang, item.slug);

  return buildPageMetadata({
    lang: item.lang,
    title: item.title,
    description: item.description,
    pathname,
    alternates: {
      en: pathFactory("en", item.slug),
      zh: pathFactory("zh", item.slug),
    },
    type: item.collection === "pages" ? "website" : "article",
  });
}
