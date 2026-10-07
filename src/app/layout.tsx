import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { EmDashGuard } from "@/components/em-dash-guard";
import { JsonLd } from "@/components/json-ld";
import { DEFAULT_TITLE, pageTitle, robotsFor } from "@/lib/seo";
import { siteConfig, siteUrl } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Site-wide defaults. Pages override these through pageMetadata() from
// @/lib/seo; icons, the manifest and the Open Graph image come from the file
// conventions next to this layout (icon.svg, apple-icon.tsx, manifest.ts,
// opengraph-image.tsx).
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: DEFAULT_TITLE,
    template: pageTitle("%s", siteConfig.name),
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  // No canonical or og:url here: every page below would inherit them and point
  // search engines at the home page. pageMetadata() sets both per page.
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: DEFAULT_TITLE,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
  },
  robots: robotsFor(true),
  // Ownership tokens for search consoles, read from the environment so each
  // deployment can verify its own property. Empty values are left out.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    yandex: process.env.YANDEX_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  // Stops iOS from turning numbers and addresses in copy into links.
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: siteConfig.colors.background },
    { media: "(prefers-color-scheme: dark)", color: siteConfig.colors.backgroundDark },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.language}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <EmDashGuard />
        {children}
      </body>
    </html>
  );
}
