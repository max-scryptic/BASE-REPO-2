import type { NextConfig } from "next";
import { HTML_LIMITED_BOT_UA_RE } from "next/dist/shared/lib/router/utils/html-bots";

import { AI_SEARCH_CRAWLERS, AI_TRAINING_CRAWLERS } from "./src/lib/crawlers";
import { isIndexable } from "./src/lib/site";

// Dynamically rendered pages stream their metadata after the first byte, which
// only works for clients that run JavaScript. Next.js already serves blocking
// metadata to the search and social crawlers it knows about; this extends its
// list with the AI crawlers, which read raw HTML only. Setting the option
// replaces the default list, hence building on top of it.
const htmlLimitedBots = new RegExp(
  [HTML_LIMITED_BOT_UA_RE.source, ...AI_SEARCH_CRAWLERS, ...AI_TRAINING_CRAWLERS].join("|"),
  "i",
);

const nextConfig: NextConfig = {
  htmlLimitedBots,
  poweredByHeader: false,
  async headers() {
    if (isIndexable) return [];

    // Belt and braces for previews and local builds: also covers responses
    // that carry no robots meta tag (images, llms.txt, route handlers).
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
