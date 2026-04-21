import Link from "next/link";

import { getAnalyticsContentTypeFromHref } from "@/lib/analytics";

interface ContentCardProps {
  title: string;
  description: string;
  href: string;
  meta?: string;
  tags?: string[];
}

export default function ContentCard({
  title,
  description,
  href,
  meta,
  tags = [],
}: ContentCardProps) {
  const contentType = getAnalyticsContentTypeFromHref(href);
  const slug = href.split("/").filter(Boolean).pop();

  return (
    <article className="content-card">
      {meta ? <p className="content-card__meta">{meta}</p> : null}
      <h3 className="content-card__title">
        <Link
          href={href}
          data-analytics-event="content_card_click"
          data-analytics-category="content"
          data-analytics-label={href}
          data-analytics-content-type={contentType}
          data-analytics-slug={slug}
          data-analytics-destination={href}
        >
          {title}
        </Link>
      </h3>
      <p className="content-card__description">{description}</p>
      {tags.length > 0 ? (
        <ul className="tag-list" aria-label="Tags">
          {tags.slice(0, 3).map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
