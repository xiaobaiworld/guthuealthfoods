import Image from "next/image";
import type { ContentItem } from "@/lib/content";

import ContentCard from "./ContentCard";

interface RichContentPageProps {
  item: ContentItem;
  alternatePath?: string;
  relatedItems?: ContentItem[];
  featuredItems?: ContentItem[];
  featuredCategoryItems?: ContentItem[];
}

export default function RichContentPage({
  item,
  alternatePath,
  relatedItems = [],
  featuredItems = [],
  featuredCategoryItems = [],
}: RichContentPageProps) {
  void alternatePath;

  const isGuide = item.collection === "guides";
  const showHeroKicker = item.collection === "foods";
  const heroKicker = showHeroKicker ? item.heroKicker ?? item.collection : "";
  const heroTitle = item.heroTitle ?? item.title;
  const heroDescription = isGuide
    ? item.summary || item.heroSubtitle || item.description
    : item.heroSubtitle || item.description;
  const heroImageAlt = isGuide
    ? item.lang === "en"
      ? `Cover image for ${heroTitle}`
      : `${heroTitle}页面配图`
    : item.lang === "en"
      ? `Photo of ${heroTitle}`
      : `${heroTitle}图片`;
  const openImageLabel =
    item.lang === "en" ? `Open full image for ${heroTitle}` : `打开${heroTitle}原图`;
  const showSidebar = false;
  const showGuideHeroBody = Boolean(isGuide && item.heroBody);
  const showMainContent = !(
    isGuide &&
    (featuredItems.length > 0 || featuredCategoryItems.length > 0) &&
    !item.html.trim()
  );
  const articleClassName = `rich-page${isGuide ? " rich-page--guide" : ""}`;

  return (
    <article className={articleClassName}>
      <header className={`rich-page__hero${item.image ? " rich-page__hero--with-media" : ""}`}>
        <div className="rich-page__hero-copy">
          {heroKicker ? <p className="eyebrow">{heroKicker}</p> : null}
          <h1>{heroTitle}</h1>
          <p className="rich-page__subtitle">{heroDescription}</p>
          {showGuideHeroBody ? <p className="rich-page__hero-body">{item.heroBody}</p> : null}
        </div>
        {item.image ? (
          <div className="rich-page__hero-media">
            <a
              href={item.image}
              target="_blank"
              rel="noreferrer"
              className="rich-page__hero-image-link"
              aria-label={openImageLabel}
              data-analytics-event="food_image_open"
              data-analytics-category="media"
              data-analytics-label={item.image}
              data-analytics-content-type={isGuide ? "guide_media" : "food_media"}
              data-analytics-slug={item.slug}
              data-analytics-lang={item.lang}
              data-analytics-page-type={isGuide ? "guide_detail" : "food_detail"}
              data-analytics-destination={item.image}
            >
              <Image
                src={item.image}
                alt={heroImageAlt}
                width={640}
                height={640}
                className="rich-page__hero-image"
                unoptimized
              />
            </a>
          </div>
        ) : null}
      </header>

      {showMainContent ? (
        <div className={`rich-page__layout${showSidebar ? "" : " rich-page__layout--single"}`}>
          <div className="rich-page__main prose" dangerouslySetInnerHTML={{ __html: item.html }} />
          {showSidebar ? (
            <aside className="rich-page__sidebar">
              <section className="sidebar-panel">
                <h2>{item.lang === "en" ? "Summary" : "摘要"}</h2>
                <p>{item.summary}</p>
              </section>
              {item.tags && item.tags.length > 0 ? (
                <section className="sidebar-panel">
                  <h2>{item.lang === "en" ? "Key Tags" : "关键标签"}</h2>
                  <ul className="tag-list">
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </aside>
          ) : null}
        </div>
      ) : null}

      {featuredCategoryItems.length > 0 ? (
        <section className="related-block">
          <div className="section-heading">
            <p className="section-heading__kicker">
              {item.lang === "en" ? "Browse by category" : "按分类浏览"}
            </p>
            <h2>{item.lang === "en" ? "Category hubs" : "分类入口"}</h2>
          </div>
          <div className="category-link-grid">
            {featuredCategoryItems.map((category) => (
              <a
                key={category.slug}
                className="category-link-pill"
                href={`/${item.lang}/foods/category/${category.slug}`}
                data-analytics-event="content_card_click"
                data-analytics-category="content"
                data-analytics-label={`/${item.lang}/foods/category/${category.slug}`}
                data-analytics-content-type="food_category"
                data-analytics-slug={category.slug}
                data-analytics-lang={item.lang}
                data-analytics-page-type={isGuide ? "guide_detail" : "food_detail"}
                data-analytics-destination={`/${item.lang}/foods/category/${category.slug}`}
              >
                {category.title}
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {featuredItems.length > 0 ? (
        <section className="related-block">
          {isGuide ? null : (
            <div className="section-heading">
              <p className="section-heading__kicker">
                {item.lang === "en" ? "Recommended foods" : "推荐食品"}
              </p>
              <h2>{item.lang === "en" ? "Foods to start with" : "适合开始的食品"}</h2>
            </div>
          )}
          <div className="card-grid">
            {featuredItems.map((featured) => (
              <ContentCard
                key={featured.slug}
                title={featured.title}
                description={featured.description}
                href={`/${item.lang}/foods/${featured.slug}`}
                tags={featured.tags}
              />
            ))}
          </div>
        </section>
      ) : null}

      {relatedItems.length > 0 ? (
        <section className="related-block">
          <div className="section-heading">
            <p className="section-heading__kicker">
              {item.lang === "en" ? "Related reading" : "相关阅读"}
            </p>
            <h2>{item.lang === "en" ? "Continue exploring" : "继续探索"}</h2>
          </div>
          <div className="card-grid">
            {relatedItems.map((related) => (
              <ContentCard
                key={related.slug}
                title={related.title}
                description={related.description}
                href={`/${item.lang}/foods/${related.slug}`}
                tags={related.tags}
              />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
