import { absoluteUrl, indexableRoutes, siteConfig } from "@/lib/site";

// /llms.txt (https://llmstxt.org): a plain Markdown map of the site for
// language models and AI agents, built from the same route list as the
// sitemap. Add longer guidance under "Details" or link to Markdown copies of
// key pages under a new section as the site grows.

export const dynamic = "force-static";

export function GET() {
  const pages = indexableRoutes
    .map((route) => `- [${route.title}](${absoluteUrl(route.path)}): ${route.description}`)
    .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

## Pages

${pages}

## Optional

- [Sitemap](${absoluteUrl("/sitemap.xml")}): Every indexable URL on the site.
`;

  return new Response(body, {
    // text/plain rather than text/markdown so browsers display it instead of
    // downloading it.
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
