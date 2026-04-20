import type { Metadata } from "next";

import ContentCard from "@/components/content/ContentCard";
import JsonLd from "@/components/seo/JsonLd";
import { getAllItems } from "@/lib/content";
import { buildCollectionSchema } from "@/lib/schema";
import { buildCollectionMetadata } from "@/lib/seo";
import { getGuidePath } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "zh" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildCollectionMetadata({
    lang,
    title: lang === "en" ? "Nutrition Guides" : "营养指南",
    description:
      lang === "en"
        ? "Explore practical nutrition guides built around the Gut Health Foods library."
        : "浏览围绕肠道健康食品知识库整理的实用营养指南。",
    pathname: `/${lang}/guides`,
  });
}

export default async function GuidesIndex({
  params,
}: {
  params: Promise<{ lang: "en" | "zh" }>;
}) {
  const { lang } = await params;
  const guides = await getAllItems("guides", lang);
  const title = lang === "en" ? "Nutrition Guides" : "营养指南";
  const description =
    lang === "en"
      ? "Explore practical nutrition guides built around the Gut Health Foods library."
      : "浏览围绕肠道健康食品知识库整理的实用营养指南。";
  const schema = buildCollectionSchema({
    lang,
    title,
    description,
    pathname: `/${lang}/guides`,
  });

  return (
    <div className="site-shell stack-xl">
      <JsonLd data={schema} />
      <section className="page-intro">
        <p className="eyebrow">{lang === "en" ? "Guide library" : "指南内容库"}</p>
        <h1>{lang === "en" ? "Practical nutrition guides" : "实用营养指南"}</h1>
        <p>
          {lang === "en"
            ? "Browse practical pages that help readers start with foods, categories, and everyday eating decisions."
            : "这些页面会用更直接的方式帮助读者从食物清单、分类入口和日常饮食问题开始浏览。"}
        </p>
      </section>

      <div className="card-grid">
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
    </div>
  );
}
