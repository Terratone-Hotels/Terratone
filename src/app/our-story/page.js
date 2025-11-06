import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import HorizontalScroller from "@/components/HorizontalScroller"; // client-side animation wrapper

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("our_story").catch(() => notFound());

  return (
    <main className="our-story-page">
      <HorizontalScroller>
        <SliceZone slices={page.data.slices} components={components} />
      </HorizontalScroller>
    </main>
  );
}

export async function generateMetadata() {
  const client = createClient();
  const page = await client.getSingle("our_story").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
