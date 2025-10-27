import { createClient } from "@/prismicio";
import Footer from "@/components/Footer"

export default async function FooterServer() {
  const client=createClient();
  const footer = await client.getSingle("footer_settings");
  return <Footer footerData={footer}/>
  
}