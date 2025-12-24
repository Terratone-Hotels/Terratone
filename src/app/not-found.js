import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { createClient } from "@/prismicio";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default async function NotFound() {
  const client = createClient();
  const page = await client.getSingle("not_found");

  const { data } = page;
  
  

  return (
    <section className="h-screen">
      {/* Top-left Image */}
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="absolute top-15 left-4 w-[125px] h-[125px] md:top-25 md:left-10 md:w-[200px] md:h-[190px] lg:w-[260px] lg:h-[260px] xl:top-20 xl:left-30 xl:w-[280px] xl:h-[280px]">
          <PrismicNextImage
            field={data.image_one}
            className="object-cover w-full h-full blur-xs"
          />
        </div>

        {/* Texts */}
        <div className="flex flex-col text-center gap-6 justify-center items-center z-20">
          <p className="font-serif text-[21px] xl:text-[45px] text-[#8E8E8E]">
            {data.text_one}
          </p>

          <h1 className="font-serif text-[175px] xl:text-[370px] leading-25 xl:leading-69">
            {data.four_zero_four}
          </h1>

          <p className="font-barlow text-[1rem] xl:text-[28px]">
            {data.text_two}
          </p>

          <div className="text-sm">
            <PrismicNextLink
              field={data.fallback_link}
              className="font-barlow  underline tracking-widest"
            >
              {data.fallback_label}
            </PrismicNextLink>
          </div>
        </div>

        {/* Bottom-right Image */}
        <div className="absolute w-[187px] h-[151px] bottom-4 right-3 md:w-[290px] md:h-[200px] md:bottom-3 md:right-5 lg:w-[350px] xl:w-[420px] xl:h-[300px] xl:bottom-10 xl:right-10">
          <PrismicNextImage
            field={data.image_two}
            className="object-cover w-full h-full blur-xs"
          />
        </div>
      </div>
    </section>
  );
}
