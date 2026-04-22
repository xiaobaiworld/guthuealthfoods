"use client";

import { useDeferredValue, useMemo, useState } from "react";

import ContentCard from "./ContentCard";

interface SearchFoodItem {
  slug: string;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  href: string;
}

interface FoodsSearchIndexProps {
  lang: "en" | "zh";
  foods: SearchFoodItem[];
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export default function FoodsSearchIndex({ lang, foods }: FoodsSearchIndexProps) {
  const [query, setQuery] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const activeQuery = isComposing ? query : deferredQuery;
  const normalizedQuery = normalize(activeQuery);

  const filteredFoods = useMemo(() => {
    if (!normalizedQuery) {
      return foods;
    }

    return foods.filter((food) => {
      const haystack = normalize(
        [
          food.title,
          food.description,
          food.category ?? "",
          ...(food.tags ?? []),
        ].join(" "),
      );

      return haystack.includes(normalizedQuery);
    });
  }, [foods, normalizedQuery]);

  const searchPlaceholder = lang === "en" ? "Search foods..." : "搜索食品...";
  const resultsText =
    lang === "en"
      ? `${filteredFoods.length} foods found`
      : `找到 ${filteredFoods.length} 个食品`;
  const emptyTitle = lang === "en" ? "No matching foods found" : "没有找到匹配的食品";
  const emptyDescription =
    lang === "en"
      ? "Try another keyword such as oats, berries, yogurt, or oils."
      : "可以换一个关键词试试，比如燕麦、莓果、酸奶或油脂。";

  return (
    <section className="content-section">
      <div className="foods-search">
        <div className="foods-search__bar">
          <div className="foods-search__control">
            <span className="foods-search__icon" aria-hidden="true">
              ⌕
            </span>
            <input
              id="foods-search-input"
              type="text"
              inputMode="search"
              aria-label={searchPlaceholder}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              onCompositionStart={() => {
                setIsComposing(true);
              }}
              onCompositionEnd={(event) => {
                setIsComposing(false);
                setQuery(event.currentTarget.value);
              }}
              placeholder={searchPlaceholder}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <p className="foods-search__summary">{resultsText}</p>
        </div>
      </div>

      {filteredFoods.length > 0 ? (
        <div className="card-grid">
          {filteredFoods.map((food) => (
            <ContentCard
              key={food.slug}
              title={food.title}
              description={food.description}
              href={food.href}
              meta={food.category}
              tags={food.tags}
            />
          ))}
        </div>
      ) : (
        <div className="foods-search__empty">
          <h3>{emptyTitle}</h3>
          <p>{emptyDescription}</p>
        </div>
      )}
    </section>
  );
}
