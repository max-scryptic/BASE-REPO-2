import { ImageResponse } from "next/og";

import { BRAND_MARK_PATHS } from "@/components/brand-logo";
import { siteConfig } from "@/lib/site";

// iOS home screen icon. iOS rounds the corners itself, so the tile is square.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: siteConfig.colors.primary,
        }}
      >
        <svg
          width={108}
          height={108}
          viewBox="0 0 24 24"
          fill="none"
          stroke={siteConfig.colors.primaryForeground}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {BRAND_MARK_PATHS.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
      </div>
    ),
    size,
  );
}
