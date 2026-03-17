import type { Metadata } from "next";

import ContentCard from "@/components/content/ContentCard";
import ContentSection from "@/components/content/ContentSection";
import JsonLd from "@/components/seo/JsonLd";
import { getAllItems } from "@/lib/content";
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
        ? "Browse the full bilingual food library for Guthu Health Foods."
        : "浏览 Guthu 健康食品的完整双语食品资料库。",
    pathname: `/${lang}/foods`,
  });
}

export default async function FoodsIndex({
  params,
}: {
  params: Promise<{ lang: "en" | "zh" }>;
}) {
  const { lang } = await params;
  const foods = await getAllItems("foods", lang);
  const title = lang === "en" ? "Health Foods Library" : "健康食品资料库";
  const description =
    lang === "en"
      ? "Browse the full bilingual food library for Guthu Health Foods."
      : "浏览 Guthu 健康食品的完整双语食品资料库。";
  const schema = buildCollectionSchema({
    lang,
    title,
    description,
    pathname: `/${lang}/foods`,
  });

  return (
    <div className="site-shell stack-xl">
      <JsonLd data={schema} />
      <section className="page-intro">
        <p className="eyebrow">{lang === "en" ? "Food library" : "食品资料库"}</p>
        <h1>{lang === "en" ? "All health food profiles" : "全部健康食品条目"}</h1>
        <p>
          {lang === "en"
            ? `This route now exposes ${foods.length} food detail pages in ${lang.toUpperCase()}.`
            : `当前路由已在 ${lang.toUpperCase()} 语言下生成 ${foods.length} 个食品详情页。`}
        </p>
      </section>

      <ContentSection title={lang === "en" ? "Browse the complete set" : "浏览完整条目"}>
        <div className="card-grid">
          {foods.map((food) => (
            <ContentCard
              key={food.slug}
              title={food.title}
              description={food.description}
              href={getFoodPath(lang, food.slug)}
              meta={food.category}
              tags={food.tags}
            />
          ))}
        </div>
      </ContentSection>
    </div>
  );
}
