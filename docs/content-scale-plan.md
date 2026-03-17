# Guthu Health Foods Content Scale Plan

## Goal

Build this project for 100+ public pages, not for a small demo set.

The plan should support:

- bilingual publishing from day one
- local-first batch production
- multiple local commits before any remote deployment
- minimal user interruption during implementation
- delayed manual input only for domain and Google account setup

## Target Page Inventory

### Core page families

1. locale homepages
2. food detail pages
3. food category or collection pages
4. evergreen guides
5. about / mission pages
6. legal pages

### Recommended first full target

- 2 homepages
- 48 food topics x 2 languages = 96 pages
- 8 category pages x 2 languages = 16 pages
- 4 evergreen guide pages x 2 languages = 8 pages
- 4 brand / legal pages x 2 languages = 8 pages

Projected total:

- 130 public pages

This is the right planning scale for the repository.

## Why Batch Execution Matters

At this size, page building must not depend on manual page-by-page coding.

The project needs:

- one shared content model
- one shared detail-page template
- one shared list-page template
- centralized metadata generation
- centralized structured data generation
- automated sitemap generation
- repeatable QA checks

## Phase Breakdown

### Phase A: Foundation for scale

Build the minimum system that makes 100+ pages realistic.

Deliverables:

1. `src/lib/content.ts` parser layer
2. content directories for foods, categories, guides, and static pages
3. typed content schema for frontmatter
4. helper functions for:
   - get all items by type
   - get item by slug and locale
   - get related items
   - get alternate locale item

### Phase B: Shared page systems

Build reusable route and component systems.

Deliverables:

1. food detail route
2. category route
3. guide route
4. legal/static page route
5. shared blocks for hero, summary, facts, related links, and structured sections

### Phase C: First release batch

Do not aim at all 100+ pages immediately.

Publish the first controlled batch:

- 12 food topics x 2 languages = 24 pages
- 4 category pages x 2 languages = 8 pages
- 2 guides x 2 languages = 4 pages
- 2 homepages
- 4 static pages

First batch target:

- 38 pages

That is enough to validate architecture, routing, metadata, and template quality.

### Phase D: Expansion batches

After the first batch is stable, expand in waves.

Suggested wave model:

1. Wave 1: 38 pages
2. Wave 2: add 24 to 32 pages
3. Wave 3: add 24 to 32 pages
4. Wave 4: complete remaining pages and cleanup

Each wave should end with:

- local build
- local link and metadata review
- local git commit

Remote deployment happens only after one larger milestone is complete.

## Suggested Content Counts

### Foods

Start with 48 food topics because they are the best long-term SEO base.

Suggested category spread:

- leafy greens and vegetables: 10
- berries and fruits: 10
- herbs and spices: 8
- nuts and seeds: 8
- legumes, grains, and staple foods: 6
- oils, drinks, and specialty items: 6

### Categories

Recommended base categories:

1. leafy greens
2. fruits
3. herbs and spices
4. nuts and seeds
5. legumes and grains
6. healthy oils
7. drinks
8. functional foods

### Guides

Recommended starter guides:

1. best health foods to start with
2. daily healthy eating guide
3. healthy foods by category
4. beginner grocery guide

### Static pages

Required early:

1. about
2. mission or sourcing
3. privacy
4. terms

## File and Data Structure

Suggested structure:

- `content/foods/en/*.md`
- `content/foods/zh/*.md`
- `content/categories/en/*.md`
- `content/categories/zh/*.md`
- `content/guides/en/*.md`
- `content/guides/zh/*.md`
- `content/pages/en/*.md`
- `content/pages/zh/*.md`

Each content item should include:

- `slug`
- `title`
- `description`
- `summary`
- `category`
- `tags`
- `publishedAt`
- `updatedAt`
- `draft`
- `translationKey`
- `relatedSlugs`

## Commit and Release Strategy

### Local commit rules

Commit locally after each bounded implementation step:

1. parser layer
2. route system
3. first content batch
4. metadata and schema layer
5. QA and sitemap layer
6. each major expansion wave

### Remote push rules

Do not push every small step.

Push only after:

- a full content wave is stable
- metadata is not placeholder-based
- sitemap output is accurate
- broken-link review is complete

### Remote server timing

Recommended first remote deployment point:

- after the first 30 to 40 real public pages are complete

Recommended larger deployment point:

- after 100+ public pages are complete and QA passes

## Required User Input, Delayed To Late Stage

The user should only need to participate when the work genuinely depends on external accounts or infrastructure.

Hold user input until these late-stage items:

1. production domain confirmation
2. server destination details
3. DNS / Search Console verification
4. GA4 Measurement ID

Everything else should be handled locally first.

## Recommended Immediate Next Steps

1. finish the content parser system in `src/lib/content.ts`
2. define the bilingual content frontmatter model
3. create the first food detail route and one category route
4. replace mock homepage links with real routes
5. prepare the first 12 food topics as structured content sources

## Definition Of Success

The scale plan is working when:

- adding one new food topic only requires adding content files, not writing new route code
- all page types share metadata logic
- all page types share structured data helpers
- content expansion happens in batches instead of ad hoc edits
- the project can grow past 100 pages without route or SEO drift
