"use client";

import dynamic from "next/dynamic";

// Client wrapper — `ssr: false` is only allowed in Client Components.
const SnowEasterEggClient = dynamic(
  () => import("@/components/SnowEasterEggClient"),
  { ssr: false },
);

export default function SnowEasterEggLazy() {
  return <SnowEasterEggClient />;
}
