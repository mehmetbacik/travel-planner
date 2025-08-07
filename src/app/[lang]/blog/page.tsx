import { getDictionary } from "../../i18n/getDictionary";
import { Locale } from "../../i18n/settings";
import Hero from "@/components/blog/Hero";
import Blog from "@/components/blog/Blog";

export default async function BlogPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const lang = params.lang;
  const dict = await getDictionary(lang);

  return (
    <main>
      <Hero dict={dict} />
      <Blog />
    </main>
  );
}
