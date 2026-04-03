import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export const LANGUAGES = ["en", "zh"] as const;
export const COLLECTIONS = ["foods", "categories", "guides", "pages"] as const;

export type Language = (typeof LANGUAGES)[number];
export type Collection = (typeof COLLECTIONS)[number];

export interface ContentFrontmatter {
  slug: string;
  title: string;
  description: string;
  summary: string;
  category?: string;
  tags?: string[];
  publishedAt: string;
  updatedAt: string;
  draft?: boolean;
  translationKey: string;
  relatedSlugs?: string[];
  heroTitle?: string;
  heroSubtitle?: string;
  heroKicker?: string;
  readingTime?: string;
}

export interface ContentItem extends ContentFrontmatter {
  lang: Language;
  collection: Collection;
  content: string;
  html: string;
}

const CONTENT_ROOT = path.join(process.cwd(), "content");

function getCollectionDir(collection: Collection, lang: Language) {
  return path.join(CONTENT_ROOT, collection, lang);
}

function getFilePath(collection: Collection, lang: Language, slug: string) {
  return path.join(getCollectionDir(collection, lang), `${slug}.md`);
}

function ensureCollectionDirExists(collection: Collection, lang: Language) {
  const dir = getCollectionDir(collection, lang);
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir).filter((file) => file.endsWith(".md"));
}

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

async function parseFile(
  collection: Collection,
  lang: Language,
  fileName: string,
): Promise<ContentItem> {
  const fullPath = path.join(getCollectionDir(collection, lang), fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as ContentFrontmatter;

  return {
    ...frontmatter,
    draft: Boolean(frontmatter.draft),
    tags: frontmatter.tags ?? [],
    relatedSlugs: frontmatter.relatedSlugs ?? [],
    lang,
    collection,
    content,
    html: await markdownToHtml(content),
  };
}

export async function getAllItems(
  collection: Collection,
  lang: Language,
): Promise<ContentItem[]> {
  const files = ensureCollectionDirExists(collection, lang);
  const items = await Promise.all(files.map((file) => parseFile(collection, lang, file)));
  const publishedItems = items.filter((item) => !item.draft);

  if (collection === "foods" && lang === "zh") {
    const englishFiles = ensureCollectionDirExists(collection, "en");
    const englishItems = await Promise.all(
      englishFiles.map((file) => parseFile(collection, "en", file)),
    );
    const englishTitleMap = new Map(
      englishItems
        .filter((item) => !item.draft)
        .map((item) => [item.translationKey || item.slug, item.title] as const),
    );

    return publishedItems.sort((a, b) => {
      const aEnglishTitle = englishTitleMap.get(a.translationKey || a.slug) ?? a.slug;
      const bEnglishTitle = englishTitleMap.get(b.translationKey || b.slug) ?? b.slug;
      return aEnglishTitle.localeCompare(bEnglishTitle);
    });
  }

  return publishedItems.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getItemBySlug(
  collection: Collection,
  lang: Language,
  slug: string,
): Promise<ContentItem | null> {
  const fullPath = getFilePath(collection, lang, slug);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const item = await parseFile(collection, lang, `${slug}.md`);
  return item.draft ? null : item;
}

export async function getAllSlugs(collection: Collection, lang: Language) {
  const items = await getAllItems(collection, lang);
  return items.map((item) => item.slug);
}

export async function getAlternateItem(item: ContentItem) {
  const alternateLang = item.lang === "en" ? "zh" : "en";
  return getItemBySlug(item.collection, alternateLang, item.slug);
}

export async function getRelatedItems(item: ContentItem) {
  const slugs = item.relatedSlugs ?? [];
  const related = await Promise.all(
    slugs.map((slug) => getItemBySlug("foods", item.lang, slug)),
  );

  return related.filter((entry): entry is ContentItem => entry !== null);
}

export async function getFeaturedFoods(lang: Language, limit = 6) {
  const foods = await getAllItems("foods", lang);
  return foods.slice(0, limit);
}

export async function getFeaturedCategories(lang: Language, limit = 4) {
  const categories = await getAllItems("categories", lang);
  return categories.slice(0, limit);
}

export async function getFeaturedGuides(lang: Language, limit = 3) {
  const guides = await getAllItems("guides", lang);
  return guides.slice(0, limit);
}
