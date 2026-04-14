import type { Metadata } from "next";
import { notFound } from "next/navigation";

import RichContentPage from "@/components/content/RichContentPage";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import {
  LANGUAGES,
  getAllSlugs,
  getAlternateItem,
  getItemBySlug,
  getRelatedItems,
} from "@/lib/content";
import { buildBreadcrumbSchema, buildContentSchema } from "@/lib/schema";
import { buildContentMetadata } from "@/lib/seo";
import { getBasePath, getFoodPath } from "@/lib/site";

export async function generateStaticParams() {
  const params = await Promise.all(
    LANGUAGES.map(async (lang) => {
      const slugs = await getAllSlugs("foods", lang);
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
  const item = await getItemBySlug("foods", lang, slug);
  return item ? buildContentMetadata(item) : {};
}

export default async function FoodDetailPage({
  params,
}: {
  params: Promise<{ lang: "en" | "zh"; slug: string }>;
}) {
  const { lang, slug } = await params;
  const item = await getItemBySlug("foods", lang, slug);

  if (!item) {
    notFound();
  }

  const [alternateItem, relatedItems] = await Promise.all([
    getAlternateItem(item),
    getRelatedItems(item),
  ]);
  const breadcrumbs = [
    { label: lang === "en" ? "Home" : "首页", href: getBasePath(lang) },
    { label: lang === "en" ? "Foods" : "食品", href: `/${lang}/foods` },
    { label: item.title },
  ];
  const schema = [
    buildContentSchema(item),
    buildBreadcrumbSchema([
      { name: lang === "en" ? "Home" : "首页", pathname: getBasePath(lang) },
      { name: lang === "en" ? "Foods" : "食品", pathname: `/${lang}/foods` },
      { name: item.title, pathname: getFoodPath(lang, item.slug) },
    ]),
  ];

  return (
    <div className="site-shell">
      <JsonLd data={schema} />
      <Breadcrumbs items={breadcrumbs} />
      <RichContentPage
        item={item}
        alternatePath={alternateItem ? getFoodPath(alternateItem.lang, alternateItem.slug) : undefined}
        relatedItems={relatedItems}
      />
    </div>
  );
}
