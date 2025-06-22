import { getDictionary } from '../../i18n/getDictionary';
import { Locale } from '../../i18n/settings';

export default async function PlannerPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  return (
    <main style={{ padding: 32 }}>
      <h1>{dict.planner.title}</h1>
      <p>{dict.planner.subtitle}</p>
    </main>
  );
} 