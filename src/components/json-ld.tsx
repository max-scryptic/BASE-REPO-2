import type { Thing } from "schema-dts"

/*
 * Renders schema.org structured data. Several entities go out as one @graph so
 * their @id references resolve against each other.
 *
 * A plain <script> rather than next/script: this is data, not code, and it has
 * to be in the server HTML for crawlers that never run JavaScript. `<` is
 * escaped so a value containing "</script>" cannot break out of the tag.
 */

type JsonLdProps = {
  data: Thing | Thing[]
}

export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...(data as object) }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  )
}
