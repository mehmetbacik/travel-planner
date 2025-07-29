import { getDictionary } from "../i18n/getDictionary";
import { Locale } from "../i18n/settings";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Destinations from "@/components/home/Destinations";
import Testimonials from "@/components/home/Testimonials";
import InteractiveWorldMap from "@/components/home/InteractiveWorldMap";

export default async function Home({ params }: { params: { lang: Locale } }) {
  const lang = params.lang;
  const dict = await getDictionary(lang);

  return (
    <main>
      <Hero dict={dict} currentLang={lang} />
      <Features dict={dict} />
      <Destinations dict={dict}/>
      <Testimonials dict={dict}/>
      <InteractiveWorldMap dict={dict}/>
    </main>
  );
}
