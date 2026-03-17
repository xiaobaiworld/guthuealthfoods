# Guthu Health Foods SEO And Google Plan

## Objective

Use the same practical approach proven in `../antiinfla`:

1. ship crawlable static pages first
2. make metadata, canonical rules, sitemap, and structured data consistent
3. connect Google Search Console and Google Analytics only after public URLs are stable
4. treat Ads and conversion tracking as optional follow-up work, not launch blockers

This project is different from `antiinfla` in one important way:

- Guthu Health Foods is bilingual from the start

That means SEO planning must include locale routing, canonical rules, and `hreflang` handling earlier than `antiinfla` needed.

## Reference Lessons From `antiinfla`

The parts worth copying are:

- page-family-based SEO planning instead of page-by-page improvisation
- canonical URLs on every public page
- page-type JSON-LD kept simple and low-risk
- `robots.txt` and `sitemap.xml` treated as launch requirements
- Google setup documented as a separate track with explicit required inputs
- analytics added after page architecture is stable

The parts not to copy directly are:

- English-first assumptions
- late multilingual planning
- static HTML-only implementation details that do not match this Next.js repo

## Track A: SEO Foundation

### Goal

Make the site indexable, understandable, and safe to expand.

### Required before launch

1. define the production domain
2. define canonical URL rules for `/en` and `/zh`
3. define `hreflang` mapping between paired pages
4. generate metadata per page type
5. publish `robots.txt`
6. publish `sitemap.xml`
7. add page-type JSON-LD

### Page types to support

1. homepage by locale
2. food list pages
3. food detail pages
4. mission or about pages
5. legal pages

### Metadata standard

Every public page should have:

- unique title
- unique meta description
- canonical URL
- Open Graph title, description, URL, and type
- locale-aware alternate URLs
- indexability decision

### Canonical and locale rules

Because this site is bilingual from day one, define these rules early:

1. each language page has its own canonical URL
2. each page exposes alternate language URLs when a translated equivalent exists
3. untranslated pages must not fake `hreflang` pairs
4. homepage, list pages, and detail pages should keep stable slug mapping across languages where possible

Suggested URL direction:

- `/en/...`
- `/zh/...`

### Structured data plan

Keep schema simple and defensible.

- homepage: `WebSite` and `Organization`
- food detail pages: `Article` or `WebPage` with clear entity naming
- food collections: `CollectionPage`
- about page: `AboutPage`

Do not add medical or product schema unless the content truly supports it.

### Content quality controls

To stay aligned with search quality and LLM readability:

- use stable heading structure on every food page
- keep summary information near the top
- avoid treatment claims and unsupported outcomes
- keep Chinese and English copy semantically aligned
- maintain visible related-page links

## Track B: Technical SEO Delivery

### Goal

Turn the SEO rules into repeatable Next.js implementation.

### Implementation tasks

1. create a shared SEO config module with site name, domain, default OG image, and locale map
2. implement layout-level metadata defaults
3. implement page-level `generateMetadata` for real routed pages
4. add `app/robots.ts`
5. add `app/sitemap.ts`
6. add reusable JSON-LD helpers
7. add a simple internal QA checklist for canonicals, alternates, sitemap coverage, and broken links

### Important dependency order

Do not implement final sitemap and `hreflang` logic until these exist:

1. real content parser
2. real content source files
3. real detail-page routes

Otherwise the SEO layer will be built on placeholder URLs and need immediate rework.

## Track C: Google Search Console

### Goal

Prepare indexing and coverage monitoring once the production domain is live.

### Inputs needed

- final production domain
- DNS access for domain verification
- public sitemap URL

### Steps

1. create a Search Console property for the root domain
2. verify domain ownership through DNS
3. submit the sitemap URL
4. monitor indexing coverage, alternate-page issues, and mobile usability

### Success checks

- sitemap accepted
- homepage indexed
- no large canonical mismatch warnings
- no broken alternate-language signals

## Track D: Google Analytics 4

### Goal

Measure traffic and content performance without cluttering the codebase.

### Recommendation

Start with GA4 only.

Do not add Google Ads or conversion tracking until there is a real business action worth measuring.

### Inputs needed

- GA4 Measurement ID in the format `G-...`
- consent requirement decision for the target market
- list of events worth tracking

### First event set

Keep events small and useful:

1. `language_switch`
2. `food_card_click`
3. `food_detail_view`
4. `outbound_click` for external trusted references if later added

### Implementation direction in Next.js

1. keep the GA ID in environment variables
2. load `gtag` only when the ID exists
3. centralize page-view and event helpers in one module
4. add event hooks only to meaningful interactions

### Do not do yet

- no noisy micro-events
- no duplicate page-view tracking
- no Ads conversion scaffolding before actual conversion goals exist

## Proposed Execution Order

1. finish Phase 3 content parser and real content routing
2. define domain and locale URL rules
3. implement shared SEO config and metadata defaults
4. add page-level metadata and JSON-LD for live pages
5. add sitemap and robots
6. run local SEO QA
7. connect Search Console after deployment
8. add GA4 with one environment-based integration
9. add a small, explicit event layer

## Definition Of Done

SEO track is done when:

- every live public page has unique metadata
- canonical and alternate locale links are correct
- `robots.txt` and `sitemap.xml` are live and accurate
- structured data exists for each public page type
- there are no placeholder URLs in metadata

Google track is done when:

- Search Console is verified for the real domain
- sitemap is submitted successfully
- GA4 loads only in production with a real ID
- core events appear in GA4 Realtime and DebugView
