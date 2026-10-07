import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { pageTitle } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

// Replaces Next.js's built-in 404, whose "404: This page could not be found."
// title breaks the pipe-delimited title format. Next.js adds noindex to 404
// responses on its own, so only the title is set here.
export const metadata: Metadata = {
  title: { absolute: pageTitle("Page not found", siteConfig.name) },
};

export default function NotFound() {
  return (
    <main className="flex min-h-svh px-4 py-6 sm:px-6 sm:py-8 md:p-10">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>
            <h1>Page not found</h1>
          </EmptyTitle>
          <EmptyDescription>
            The page you are looking for does not exist or has moved.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  );
}
