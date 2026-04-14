import type { Metadata } from "next";
import { notFound } from "next/navigation";

import RichContentPage from "@/components/content/RichContentPage";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { LANGUAGES, getAllSlugs, getAlternateItem, getItemBySlug } from "@/lib/content";
import { buildBreadcrumbSchema, buildContentSchema } from "@/lib/schema";
import { buildContentMetadata } from "@/lib/seo";
import { getBasePath } from "@/lib/site";

export async function generateStaticParams() {
  const params = await Promise.all(
    LANGUAGES.map(async (lang) => {
      const slugs = await getAllSlugs("pages", lang);
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
  const item = await getItemBySlug("pages", lang, slug);
  return item ? buildContentMetadata(item) : {};
}

export default async function StaticPage({
  params,
}: {
  params: Promise<{ lang: "en" | "zh"; slug: string }>;
}) {
  const { lang, slug } = await params;
  const item = await getItemBySlug("pages", lang, slug);

  if (!item) {
    notFound();
  }

  const alternateItem = await getAlternateItem(item);
  const breadcrumbs = [
    { label: lang === "en" ? "Home" : "首页", href: getBasePath(lang) },
    { label: item.title },
  ];
  const schema = [
    buildContentSchema(item),
    buildBreadcrumbSchema([
      { name: lang === "en" ? "Home" : "首页", pathname: getBasePath(lang) },
      { name: item.title, pathname: `/${lang}/${item.slug}` },
    ]),
  ];

  return (
    <div className="site-shell">
      <JsonLd data={schema} />
      <Breadcrumbs items={breadcrumbs} />
      <RichContentPage
        item={item}
        alternatePath={alternateItem ? `/${alternateItem.lang}/${alternateItem.slug}` : undefined}
      />
    </div>
  );
}
