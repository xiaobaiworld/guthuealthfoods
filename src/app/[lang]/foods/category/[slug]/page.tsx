import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ContentCard from "@/components/content/ContentCard";
import RichContentPage from "@/components/content/RichContentPage";
import JsonLd from "@/components/seo/JsonLd";
import {
  LANGUAGES,
  getAllItems,
  getAllSlugs,
  getAlternateItem,
  getItemBySlug,
} from "@/lib/content";
import { buildContentSchema } from "@/lib/schema";
import { buildContentMetadata } from "@/lib/seo";
import { getFoodPath } from "@/lib/site";

export async function generateStaticParams() {
  const params = await Promise.all(
    LANGUAGES.map(async (lang) => {
      const slugs = await getAllSlugs("categories", lang);
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
  const item = await getItemBySlug("categories", lang, slug);
  return item ? buildContentMetadata(item) : {};
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ lang: "en" | "zh"; slug: string }>;
}) {
  const { lang, slug } = await params;
  const item = await getItemBySlug("categories", lang, slug);

  if (!item) {
    notFound();
  }

  const [alternateItem, foods] = await Promise.all([
    getAlternateItem(item),
    getAllItems("foods", lang),
  ]);
  const schema = buildContentSchema(item);

  const matchingFoods = foods.filter((food) => food.category === item.slug);

  return (
    <div className="site-shell stack-xl">
      <JsonLd data={schema} />
      <RichContentPage
        item={item}
        alternatePath={alternateItem ? `/${alternateItem.lang}/foods/category/${alternateItem.slug}` : undefined}
      />
      <section className="related-block">
        <div className="section-heading">
          <p className="section-heading__kicker">{lang === "en" ? "Food profiles" : "食品条目"}</p>
          <h2>{lang === "en" ? "Pages in this collection" : "本分类下的页面"}</h2>
        </div>
        <div className="card-grid">
          {matchingFoods.map((food) => (
            <ContentCard
              key={food.slug}
              title={food.title}
              description={food.description}
              href={getFoodPath(lang, food.slug)}
              tags={food.tags}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
