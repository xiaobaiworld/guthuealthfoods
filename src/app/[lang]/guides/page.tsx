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
        ? "Explore the growing guide library for Guthu Health Foods."
        : "浏览 Guthu 健康食品不断扩展的指南内容库。",
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
      ? "Explore the growing guide library for Guthu Health Foods."
      : "浏览 Guthu 健康食品不断扩展的指南内容库。";
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
        <h1>{lang === "en" ? "Editorial guide pages" : "编辑型指南页面"}</h1>
        <p>
          {lang === "en"
            ? "These pages anchor the broader topic structure around the food library."
            : "这些页面用于支撑食品资料库之外的主题性内容结构。"}
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
