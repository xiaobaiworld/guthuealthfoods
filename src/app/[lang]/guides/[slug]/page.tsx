import type { Metadata } from "next";
import { notFound } from "next/navigation";

import RichContentPage from "@/components/content/RichContentPage";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import {
  LANGUAGES,
  getAllSlugs,
  getAlternateItem,
  getFeaturedCategoryItems,
  getFeaturedItems,
  getItemBySlug,
} from "@/lib/content";
import { buildBreadcrumbSchema, buildContentSchema } from "@/lib/schema";
import { buildContentMetadata } from "@/lib/seo";
import { getBasePath, getGuidePath } from "@/lib/site";

export async function generateStaticParams() {
  const params = await Promise.all(
    LANGUAGES.map(async (lang) => {
      const slugs = await getAllSlugs("guides", lang);
      return slugs.map((slug) => ({ lang, slug }));
    }),
  );

  return params.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "zh"; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const item = await getItemBySlug("guides", lang, slug);
  return item ? buildContentMetadata(item) : {};
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ lang: "en" | "zh"; slug: string }>;
}) {
  const { lang, slug } = await params;
  const item = await getItemBySlug("guides", lang, slug);

  if (!item) {
    notFound();
  }

  const alternateItem = await getAlternateItem(item);
  const [featuredItems, featuredCategoryItems] = await Promise.all([
    getFeaturedItems(item),
    getFeaturedCategoryItems(item),
  ]);
  const breadcrumbs = [
    { label: lang === "en" ? "Home" : "首页", href: getBasePath(lang) },
    { label: lang === "en" ? "Guides" : "指南", href: `/${lang}/guides` },
    { label: item.title },
  ];
  const schema = [
    buildContentSchema(item),
    buildBreadcrumbSchema([
      { name: lang === "en" ? "Home" : "首页", pathname: getBasePath(lang) },
      { name: lang === "en" ? "Guides" : "指南", pathname: `/${lang}/guides` },
      { name: item.title, pathname: getGuidePath(lang, item.slug) },
    ]),
  ];

  return (
    <div className="site-shell">
      <JsonLd data={schema} />
      <Breadcrumbs items={breadcrumbs} />
      <RichContentPage
        item={item}
        alternatePath={alternateItem ? getGuidePath(alternateItem.lang, alternateItem.slug) : undefined}
        featuredItems={featuredItems}
        featuredCategoryItems={featuredCategoryItems}
      />
    </div>
  );
}
