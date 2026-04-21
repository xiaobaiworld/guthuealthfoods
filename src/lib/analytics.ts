export type AnalyticsPageType =
  | "home"
  | "food_library"
  | "food_detail"
  | "food_category"
  | "guide_library"
  | "guide_detail"
  | "site_page"
  | "unknown";

export interface AnalyticsPageContext {
  lang?: "en" | "zh";
  pageType: AnalyticsPageType;
  slug?: string;
}

export function getAnalyticsPageContext(pathname: string): AnalyticsPageContext {
  const segments = pathname.split("/").filter(Boolean);
  const lang = segments[0] === "en" || segments[0] === "zh" ? segments[0] : undefined;

  if (!lang) {
    return { pageType: "unknown" };
  }

  if (segments.length === 1) {
    return { lang, pageType: "home" };
  }

  if (segments[1] === "foods" && segments.length === 2) {
    return { lang, pageType: "food_library" };
  }

  if (segments[1] === "foods" && segments[2] === "category" && segments[3]) {
    return { lang, pageType: "food_category", slug: segments[3] };
  }

  if (segments[1] === "foods" && segments[2]) {
    return { lang, pageType: "food_detail", slug: segments[2] };
  }

  if (segments[1] === "guides" && segments.length === 2) {
    return { lang, pageType: "guide_library" };
  }

  if (segments[1] === "guides" && segments[2]) {
    return { lang, pageType: "guide_detail", slug: segments[2] };
  }

  if (segments[1]) {
    return { lang, pageType: "site_page", slug: segments[1] };
  }

  return { lang, pageType: "unknown" };
}

export function getAnalyticsContentTypeFromHref(href: string): string {
  if (href.includes("/foods/category/")) {
    return "food_category";
  }

  if (href.includes("/foods/")) {
    return "food_detail";
  }

  if (href.includes("/guides/")) {
    return "guide_detail";
  }

  if (href.endsWith("/foods")) {
    return "food_library";
  }

  if (href.endsWith("/guides")) {
    return "guide_library";
  }

  return "page";
}
