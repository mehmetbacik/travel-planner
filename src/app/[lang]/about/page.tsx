import { getDictionary } from "../../i18n/getDictionary";
import { Locale } from "../../i18n/settings";
import Hero from "@/components/about/Hero";

export default async function AboutPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const lang = params.lang;
  const dict = await getDictionary(lang);

  return (
    <main>
      <Hero dict={dict} />
    </main>
  );
}
