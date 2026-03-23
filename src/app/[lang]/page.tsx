import Link from "next/link";
import type { Metadata } from "next";

import ContentCard from "@/components/content/ContentCard";
import ContentSection from "@/components/content/ContentSection";
import JsonLd from "@/components/seo/JsonLd";
import { getFeaturedCategories, getFeaturedFoods, getFeaturedGuides } from "@/lib/content";
import { buildHomeSchema } from "@/lib/schema";
import { buildHomeMetadata } from "@/lib/seo";
import { getCategoryPath, getFoodPath, getGuidePath } from "@/lib/site";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "zh" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildHomeMetadata(lang);
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "en" | "zh" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const schema = buildHomeSchema(lang);
  const [foods, categories, guides] = await Promise.all([
    getFeaturedFoods(lang, 6),
    getFeaturedCategories(lang, 4),
    getFeaturedGuides(lang, 3),
  ]);

  return (
    <div className="home-page">
      <JsonLd data={schema} />
      <header className="home-hero">
        <div className="site-shell">
          <p className="eyebrow">
            {lang === "en" ? "Bilingual health food knowledge base" : "双语健康食品知识库"}
          </p>
          <h1>{dict.hero.title}</h1>
          <p className="home-hero__subtitle">{dict.hero.subtitle}</p>
          <div className="hero-actions">
            <Link href={`/${lang}/foods`} className="button button--primary">
              {lang === "en" ? "Explore foods" : "浏览食品"}
            </Link>
            <Link href={`/${lang}/guides`} className="button button--secondary">
              {lang === "en" ? "Read guides" : "阅读指南"}
            </Link>
          </div>
        </div>
      </header>

      <div className="site-shell stack-xl">
        <ContentSection
          kicker={lang === "en" ? "Food library" : "食品库"}
          title={lang === "en" ? "Featured food profiles" : "精选食品条目"}
          description={
            lang === "en"
              ? "Browse the complete set of food profiles in our growing bilingual library."
              : "浏览我们持续扩充的双语健康食品条目库。"
          }
        >
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

        <ContentSection
          kicker={lang === "en" ? "Collections" : "分类集合"}
          title={lang === "en" ? "Browse by category" : "按分类浏览"}
        >
          <div className="card-grid card-grid--compact">
            {categories.map((category) => (
              <ContentCard
                key={category.slug}
                title={category.title}
                description={category.description}
                href={getCategoryPath(lang, category.slug)}
                tags={category.tags}
              />
            ))}
          </div>
        </ContentSection>

        <ContentSection
          kicker={lang === "en" ? "Guides" : "指南"}
          title={lang === "en" ? "Start with foundational guides" : "先从基础指南开始"}
        >
          <div className="card-grid card-grid--compact">
            {guides.map((guide) => (
              <ContentCard
                key={guide.slug}
                title={guide.title}
                description={guide.description}
                href={getGuidePath(lang, guide.slug)}
                tags={guide.tags}
              />
            ))}
          </div>
        </ContentSection>
      </div>
    </div>
  );
}
