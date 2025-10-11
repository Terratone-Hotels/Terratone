import { createClient } from "@/prismicio";
import HeaderClient from "./Header"; // Import the new Client component

// This remains an async Server Component to fetch the Prismic data
export default async function HeaderWrapper() {
  const client = createClient();
  const header = await client.getSingle("header_settings");
  const { data } = header;

  return (
    <HeaderClient headerData={data} />
  )
}