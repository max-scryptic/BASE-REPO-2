This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## SEO and AEO

Everything search engines and AI answer engines (ChatGPT, Claude, Perplexity, Google AI Overviews) read is built in and driven by one file, `src/lib/site.ts`. To launch:

1. Edit `siteConfig` in `src/lib/site.ts`: name, tagline, description, colours, X handle, `sameAs` profiles and whether AI training crawlers are allowed.
2. Set `NEXT_PUBLIC_SITE_URL` to the production origin (see `.env.example`), plus any search console verification tokens.
3. Swap the brand mark in `src/components/brand-logo.tsx` and `src/app/icon.svg`, then run `npm run generate:favicon`.
4. Register each new page in `routes` and export `metadata = pageMetadata(routes.<name>)` from it.

What you get:

| Concern | Where |
| --- | --- |
| Title, description, canonical URL, Open Graph, Twitter card | `pageMetadata()` in `src/lib/seo.ts`, defaults in `src/app/layout.tsx` |
| Robots meta with full-length snippets and large image previews | `robotsFor()` in `src/lib/seo.ts` |
| `robots.txt`, explicitly allowing AI search crawlers and optionally training crawlers | `src/app/robots.ts`, `src/lib/crawlers.ts` |
| `sitemap.xml` | `src/app/sitemap.ts` |
| `llms.txt` for language models and agents | `src/app/llms.txt/route.ts` |
| Organization, WebSite and WebPage JSON-LD, plus breadcrumb, FAQ and article builders | `src/lib/structured-data.ts`, `src/components/json-ld.tsx` |
| Generated social card, favicon, SVG icon, Apple touch icon, web manifest | `src/app/opengraph-image.tsx`, `favicon.ico`, `icon.svg`, `apple-icon.tsx`, `manifest.ts` |
| Theme colour, `lang`, format detection | `src/app/layout.tsx` |
| Metadata in the initial HTML for AI crawlers, which do not run JavaScript | `htmlLimitedBots` in `next.config.ts` |
| Noindex on previews and local builds (meta tag, `X-Robots-Tag`, `robots.txt`) | `isIndexable` in `src/lib/site.ts`, `next.config.ts` |

After deploying, submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools (Bing also feeds ChatGPT search and Copilot), and check pages with the [Rich Results Test](https://search.google.com/test/rich-results).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
