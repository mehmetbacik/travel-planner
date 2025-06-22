import { getDictionary } from '../../i18n/getDictionary';
import { Locale } from '../../i18n/settings';

export default async function ContactPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  return (
    <main style={{ padding: 32 }}>
      <h1>{dict.nav.contact}</h1>
      <p>{dict.common.contact}</p>
    </main>
  );
} 