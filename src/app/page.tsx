import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";
import { webPageJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata(routes.home);

export default function Home() {
  return (
    <main className="flex-1 bg-[#f4f4f4]">
      <JsonLd data={webPageJsonLd(routes.home)} />
    </main>
  );
}
