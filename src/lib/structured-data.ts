import type {
  Article,
  BreadcrumbList,
  FAQPage,
  Organization,
  WebPage,
  WebSite,
} from "schema-dts";

import { absoluteUrl, siteConfig, siteUrl } from "@/lib/site";

// schema.org builders for JSON-LD. Search engines use these for rich results
// and knowledge panels; answer engines use them to work out which entity a
// page is about and which facts on it are authoritative. Render the output
// with <JsonLd /> from @/components/json-ld.
//
// Entities link to each other by @id, so a page only needs to reference the
// organisation and website the root layout already describes.

export const ORGANIZATION_ID = `${siteUrl}/#organization`;
export const WEBSITE_ID = `${siteUrl}/#website`;

export function organizationJsonLd(): Organization {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.svg"),
    description: siteConfig.description,
    ...(siteConfig.sameAs.length > 0 && { sameAs: siteConfig.sameAs }),
    ...(siteConfig.contactEmail && { email: siteConfig.contactEmail }),
  };
}

export function websiteJsonLd(): WebSite {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function webPageJsonLd({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): WebPage {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
  };
}

/** Trail from the home page down to the current page, home first. */
export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * Question and answer pairs. Answer engines lift these almost word for word,
 * so keep each answer self-contained and make sure the same text is visible
 * on the page.
 */
export function faqJsonLd(
  questions: { question: string; answer: string }[],
): FAQPage {
  return {
    "@type": "FAQPage",
    mainEntity: questions.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function articleJsonLd({
  path,
  title,
  description,
  datePublished,
  dateModified,
  authorName,
  image,
}: {
  path: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  image?: string;
}): Article {
  return {
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    mainEntityOfPage: absoluteUrl(path),
    headline: title,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    inLanguage: siteConfig.language,
    publisher: { "@id": ORGANIZATION_ID },
    author: authorName
      ? { "@type": "Person", name: authorName }
      : { "@id": ORGANIZATION_ID },
    ...(image && { image: absoluteUrl(image) }),
  };
}
