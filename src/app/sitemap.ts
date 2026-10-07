import type { MetadataRoute } from "next";

import { absoluteUrl, indexableRoutes } from "@/lib/site";

// Generated from the route list in @/lib/site, so a page shows up here as soon
// as it is registered there with index: true. For data-driven pages (posts,
// products) append their URLs below, or split into several sitemaps with
// generateSitemaps once you pass a few thousand URLs.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return indexableRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
