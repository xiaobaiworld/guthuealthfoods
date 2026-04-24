import type { Metadata } from "next";

import FoodsSearchIndex from "@/components/content/FoodsSearchIndex";
import JsonLd from "@/components/seo/JsonLd";
import { getAllItems, type ContentItem } from "@/lib/content";
import { buildCollectionSchema } from "@/lib/schema";
import { buildCollectionMetadata } from "@/lib/seo";
import { getFoodPath } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "zh" }>;
}): Promise<Metadata> {
  const { lang } = await params;

  return buildCollectionMetadata({
    lang,
    title: lang === "en" ? "Health Foods Library" : "健康食品资料库",
    description:
      lang === "en"
        ? "Browse the full bilingual food library for Gut Health Foods."
        : "浏览肠道健康食品的完整双语食品资料库。",
    pathname: `/${lang}/foods`,
  });
}

export default async function FoodsIndex({
  params,
}: {
  params: Promise<{ lang: "en" | "zh" }>;
}) {
  const { lang } = await params;
  const [foods, categories] = await Promise.all([
    getAllItems("foods", lang),
    getAllItems("categories", lang),
  ]);
  const categoryTitleBySlug = new Map(categories.map((category) => [category.slug, category.title]));
  const title = lang === "en" ? "Health Foods Library" : "健康食品资料库";
  const description =
    lang === "en"
      ? "Browse the full bilingual food library for Gut Health Foods."
      : "浏览肠道健康食品的完整双语食品资料库。";
  const schema = buildCollectionSchema({
    lang,
    title,
    description,
    pathname: `/${lang}/foods`,
  });

  function getCategoryMeta(food: ContentItem) {
    if (!food.category) {
      return undefined;
    }

    return categoryTitleBySlug.get(food.category) ?? food.category;
  }

  return (
    <div className="site-shell stack-xl">
      <JsonLd data={schema} />

      <section className="page-intro">
        <p className="eyebrow">{lang === "en" ? "Food library" : "食品资料库"}</p>
        <h1>{lang === "en" ? "All health food profiles" : "全部健康食品条目"}</h1>
        <p>
          {lang === "en"
            ? `This page includes ${foods.length} food detail pages.`
            : `当前页面包含 ${foods.length} 个食品详情页。`}
        </p>
      </section>

      <FoodsSearchIndex
        lang={lang}
        foods={foods.map((food) => ({
          slug: food.slug,
          title: food.title,
          description: food.description,
          category: getCategoryMeta(food),
          tags: food.tags,
          href: getFoodPath(lang, food.slug),
        }))}
      />
    </div>
  );
}
