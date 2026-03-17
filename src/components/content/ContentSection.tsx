import type { ReactNode } from "react";

interface ContentSectionProps {
  kicker?: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export default function ContentSection({
  kicker,
  title,
  description,
  children,
}: ContentSectionProps) {
  return (
    <section className="content-section">
      <div className="section-heading">
        {kicker ? <p className="section-heading__kicker">{kicker}</p> : null}
        <h2>{title}</h2>
        {description ? <p className="section-heading__description">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
