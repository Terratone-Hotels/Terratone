import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("discover").catch(() => notFound());

  return (
    <div className="">
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={{
          pin_section_heading: page.data.pin_section_heading,
          left_headings: page.data.left_headings,
        }}
      />
    </div>
  );
}

export async function generateMetadata() {
  const client = createClient();
  const page = await client.getSingle("discover").catch(() => notFound());

  return {
    title: page.data.meta_title || "Discover",
    description:
      page.data.meta_description || "Discover unique experiences and stories.",
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
