import Link from "next/link";

export interface DataCardProps {
  title: string;
  description: string;
  href: string;
  tags?: string[];
  date?: string;
  imageUrl?: string;
}

export default function DataCard({
  title,
  description,
  href,
  tags,
  date,
  imageUrl,
}: DataCardProps) {
  return (
    <article className="content-card">
      {imageUrl ? (
        <div className="content-card__image">
          <img src={imageUrl} alt={title} loading="lazy" />
        </div>
      ) : null}

      {(date || (tags && tags.length > 0)) ? (
        <div className="content-card__meta">
          {date ? <time dateTime={date}>{date}</time> : null}
          {tags && tags.length > 0 ? (
            <div className="tag-list">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <h3 className="content-card__title">
        <Link href={href}>{title}</Link>
      </h3>
      <p className="content-card__description">{description}</p>
      <div className="content-card__cta">Read more</div>
    </article>
  );
}
