import { getDictionary } from "../../i18n/getDictionary";
import { Locale } from "../../i18n/settings";
import Hero from "@/components/contact/Hero";
import Contact from "@/components/contact/Contact/Contact";

export default async function ContactPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const lang = params.lang;
  const dict = await getDictionary(lang);

  return (
    <main>
      <Hero dict={dict} />
      <Contact lang={lang} dict={dict}/>
    </main>
  );
}
