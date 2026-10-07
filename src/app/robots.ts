import type { MetadataRoute } from "next";

import { AI_SEARCH_CRAWLERS, AI_TRAINING_CRAWLERS } from "@/lib/crawlers";
import { absoluteUrl, isIndexable, siteConfig, siteUrl } from "@/lib/site";

// Paths no crawler needs. Keep noindexed pages (login, signup) out of this
// list: a crawler has to be able to fetch a page to see its noindex tag.
const DISALLOW = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  // A crawler that matches a named group ignores the * group entirely, so
  // every group repeats the same disallow list.
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_SEARCH_CRAWLERS, allow: "/", disallow: DISALLOW },
      siteConfig.allowAiTraining
        ? { userAgent: AI_TRAINING_CRAWLERS, allow: "/", disallow: DISALLOW }
        : { userAgent: AI_TRAINING_CRAWLERS, disallow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
