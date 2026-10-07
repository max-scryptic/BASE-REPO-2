import { ImageResponse } from "next/og";

import { BRAND_MARK_PATHS } from "@/components/brand-logo";
import { OG_IMAGE_ALT, OG_IMAGE_SIZE } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

// Default social card for every page, also used for the Twitter card. To give
// a route its own, drop an opengraph-image.tsx (or .png) next to its page and
// pass `image: "file"` to pageMetadata() there.
export const alt = OG_IMAGE_ALT;
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  const { colors } = siteConfig;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: colors.background,
          color: colors.primary,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 96,
              height: 96,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              background: colors.primary,
            }}
          >
            <svg
              width={58}
              height={58}
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.primaryForeground}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {BRAND_MARK_PATHS.map((d) => (
                <path key={d} d={d} />
              ))}
            </svg>
          </div>
          <div style={{ fontSize: 44, fontWeight: 600 }}>{siteConfig.name}</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: 960,
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>
    ),
    size,
  );
}
