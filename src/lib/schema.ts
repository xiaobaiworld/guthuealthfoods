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

function getLocaleName(lang: Language) {
  return lang === "en" ? "English" : "Chinese";
}

function getCollectionPath(item: ContentItem) {
  if (item.collection === "foods") {
    return getFoodPath(item.lang, item.slug);
  }
  if (item.collection === "categories") {
    return getCategoryPath(item.lang, item.slug);
  }
  if (item.collection === "guides") {
    return getGuidePath(item.lang, item.slug);
  }
  return getPagePath(item.lang, item.slug);
}

export function buildHomeSchema(lang: Language) {
  const url = buildAbsoluteUrl(getBasePath(lang));

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url,
      inLanguage: lang,
      description:
        lang === "en"
          ? "Bilingual health food reference site with structured guides, category pages, and food profiles."
          : "面向中英文用户的健康食品资料站，包含食品条目、分类页与指南页。",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: buildAbsoluteUrl("/favicon.ico"),
    },
  ];
}

export function buildCollectionSchema({
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
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    url: buildAbsoluteUrl(pathname),
    description,
    inLanguage: lang,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function buildContentSchema(item: ContentItem) {
  const url = buildAbsoluteUrl(getCollectionPath(item));
  const base = {
    "@context": "https://schema.org",
    headline: item.title,
    name: item.title,
    description: item.description,
    url,
    inLanguage: item.lang,
    datePublished: item.publishedAt,
    dateModified: item.updatedAt,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  if (item.collection === "categories") {
    return {
      ...base,
      "@type": "CollectionPage",
    };
  }

  if (item.collection === "pages") {
    return {
      ...base,
      "@type": item.slug === "about" || item.slug === "mission" ? "AboutPage" : "WebPage",
    };
  }

  return {
    ...base,
    "@type": "Article",
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: buildAbsoluteUrl("/favicon.ico"),
      },
    },
    about: [item.title, item.category ?? getLocaleName(item.lang)],
    keywords: item.tags,
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; pathname: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildAbsoluteUrl(item.pathname),
    })),
  };
}
