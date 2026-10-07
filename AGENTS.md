<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SEO and AEO

Search and answer-engine setup is centralised. Keep it that way when adding pages:

- Site-wide facts (name, tagline, description, colours, social profiles, AI training opt-out) live in `src/lib/site.ts` as `siteConfig`. Do not hard-code the brand name, URL or description anywhere else.
- Every page is registered in `routes` in `src/lib/site.ts` and exports `export const metadata = pageMetadata(routes.<name>)` (or `generateMetadata` returning `pageMetadata({...})` for dynamic routes). Never export a hand-written `openGraph` or `twitter` object: Next.js merges metadata shallowly and the page would lose the site defaults and the social image.
- Use `index: false` for pages with no search value (auth, settings, thank-you pages). Do not add them to `robots.ts` disallow, or crawlers cannot see the noindex.
- `sitemap.xml` and `llms.txt` are generated from `routes`; data-driven pages (posts, products) must be appended in `src/app/sitemap.ts` and `src/app/llms.txt/route.ts`.
- Add schema.org JSON-LD with `<JsonLd />` and the builders in `src/lib/structured-data.ts` (breadcrumbs, FAQ, article, web page). Any FAQ or answer in JSON-LD must also be visible on the page.
- Each indexable page has exactly one `<h1>`, content inside `<main>`, and headings in order. Write the first paragraph under a heading as a direct, self-contained answer: answer engines quote it.
- If the brand mark changes, update `BRAND_MARK_PATHS` in `src/components/brand-logo.tsx` and `src/app/icon.svg`, then run `npm run generate:favicon`.
