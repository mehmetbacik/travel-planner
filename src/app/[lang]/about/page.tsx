import { getDictionary } from "../../i18n/getDictionary";
import { Locale } from "../../i18n/settings";
import Hero from "@/components/about/Hero";
import About from "@/components/about/About/About";

export default async function AboutPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const lang = params.lang;
  const dict = await getDictionary(lang);

  return (
    <div>
      <Hero dict={dict} />
      <About dict={dict} />
    </div>
  );
}
