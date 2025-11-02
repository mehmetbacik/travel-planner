import { getDictionary } from "../../i18n/getDictionary";
import { Locale } from "../../i18n/settings";
import Hero from "@/components/planner/Hero";
import TripPlanner from "@/components/planner/Planner/TripPlanner";

export default async function PlannerPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const lang = params.lang;
  const dict = await getDictionary(lang);

  return (
    <div>
      <Hero dict={dict} />
      <TripPlanner dict={dict} lang={lang} />
    </div>
  );
}
