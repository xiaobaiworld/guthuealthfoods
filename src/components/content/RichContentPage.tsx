import type { ContentItem } from "@/lib/content";

import ContentCard from "./ContentCard";

interface RichContentPageProps {
  item: ContentItem;
  alternatePath?: string;
  relatedItems?: ContentItem[];
}

export default function RichContentPage({
  item,
  alternatePath,
  relatedItems = [],
}: RichContentPageProps) {
  void alternatePath;

  return (
    <article className="rich-page">
      <header className="rich-page__hero">
        <p className="eyebrow">{item.heroKicker ?? item.collection}</p>
        <h1>{item.heroTitle ?? item.title}</h1>
        <p className="rich-page__subtitle">{item.heroSubtitle ?? item.description}</p>
      </header>

      <div className="rich-page__layout">
        <div className="rich-page__main prose" dangerouslySetInnerHTML={{ __html: item.html }} />
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
      </div>

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
