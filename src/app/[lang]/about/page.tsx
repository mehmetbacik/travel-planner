import { getDictionary } from '../../i18n/getDictionary';
import { Locale } from '../../i18n/settings';

export default async function AboutPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  return (
    <main style={{ padding: 32 }}>
      <h1>{dict.nav.about}</h1>
      <p>{dict.common.aboutUs}</p>
    </main>
  );
} 