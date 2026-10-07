// Single source of truth for everything search engines and answer engines
// read about the site: names, copy, canonical URL, social profiles and the
// public route list. Metadata, JSON-LD, robots.txt, sitemap.xml, llms.txt,
// the web manifest and the generated icons all derive from this file, so
// rebranding the template means editing the values below and nothing else.

export const siteConfig = {
  name: "Acme Inc.",
  shortName: "Acme",
  tagline: "The starting point for your next product",
  // Used as the default meta description and as the summary in llms.txt.
  // Aim for 140 to 160 characters and say plainly what the product does: answer
  // engines quote this verbatim when they describe the site.
  description:
    "Acme Inc. is a production-ready Next.js starter with authentication screens, a full UI kit and search and AI discoverability built in.",
  keywords: ["Acme", "Next.js starter", "SaaS template"],
  // BCP 47 language tag for <html lang> and the Open Graph locale.
  language: "en",
  locale: "en_US",
  // Brand colours, kept in step with --background and --primary in
  // globals.css. Used where CSS variables are not available: the browser
  // chrome (theme-color), the web manifest and generated images.
  colors: {
    background: "#ffffff",
    backgroundDark: "#0a0a0a",
    primary: "#171717",
    primaryForeground: "#fafafa",
  },
  // X handle including the @, or undefined to leave the twitter:site tag out.
  twitterHandle: undefined as string | undefined,
  // Public profiles of the organisation (X, LinkedIn, GitHub, Crunchbase,
  // Wikipedia...). Emitted as schema.org sameAs, which is how search and
  // answer engines tie the site to a known entity.
  sameAs: [] as string[],
  contactEmail: undefined as string | undefined,
  // Whether AI model-training crawlers (GPTBot, ClaudeBot, Google-Extended...)
  // may read the site. Answer-engine crawlers that fetch pages to cite them in
  // live answers are always allowed; flip this to opt out of training only.
  allowAiTraining: true,
};

/**
 * The canonical origin, without a trailing slash.
 *
 * Set NEXT_PUBLIC_SITE_URL in production. Without it, Vercel deployments fall
 * back to the project's production domain (or the deployment URL on previews)
 * and everything else to localhost, so canonical URLs are never left relative.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelHost =
    process.env.VERCEL_ENV === "production"
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL
      : process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const siteUrl = resolveSiteUrl();

/**
 * Whether this deployment should be indexed at all. Previews, local dev and
 * anything with SITE_NOINDEX=true answer with noindex everywhere (meta tag,
 * X-Robots-Tag header and robots.txt) so staging copies never compete with
 * production in search results.
 */
export const isIndexable =
  process.env.SITE_NOINDEX !== "true" &&
  (process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production");

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export type SiteRoute = {
  path: string;
  title: string;
  description: string;
  // False keeps the page out of the index, the sitemap and llms.txt while
  // still letting crawlers follow its links.
  index: boolean;
  changeFrequency?: ChangeFrequency;
  priority?: number;
};

/**
 * Every public page, in the order it should appear in sitemap.xml and
 * llms.txt. Add an entry here whenever you add a page, then pass it to
 * pageMetadata() from that page.
 */
export const routes = {
  home: {
    path: "/",
    title: siteConfig.name,
    description: siteConfig.description,
    index: true,
    changeFrequency: "weekly",
    priority: 1,
  },
  // Auth screens carry no content worth ranking and would only show up as
  // thin pages, so they stay out of the index.
  login: {
    path: "/login",
    title: "Log in",
    description: `Log in to your ${siteConfig.name} account.`,
    index: false,
  },
  signup: {
    path: "/signup",
    title: "Sign up",
    description: `Create your ${siteConfig.name} account.`,
    index: false,
  },
} satisfies Record<string, SiteRoute>;

export const indexableRoutes: SiteRoute[] = Object.values(routes).filter(
  (route) => route.index,
);
