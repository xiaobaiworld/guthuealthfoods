import type { Metadata } from "next";
import { notFound } from "next/navigation";

import RichContentPage from "@/components/content/RichContentPage";
import JsonLd from "@/components/seo/JsonLd";
import {
  LANGUAGES,
  getAllSlugs,
  getAlternateItem,
  getItemBySlug,
} from "@/lib/content";
import { buildContentSchema } from "@/lib/schema";
import { buildContentMetadata } from "@/lib/seo";
import { getGuidePath } from "@/lib/site";

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
  const schema = buildContentSchema(item);

  return (
    <div className="site-shell">
      <JsonLd data={schema} />
      <RichContentPage
        item={item}
        alternatePath={alternateItem ? getGuidePath(alternateItem.lang, alternateItem.slug) : undefined}
      />
    </div>
  );
}
