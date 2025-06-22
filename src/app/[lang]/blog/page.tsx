import { getDictionary } from '../../i18n/getDictionary';
import { Locale } from '../../i18n/settings';

export default async function BlogPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  return (
    <main style={{ padding: 32 }}>
      <h1>{dict.nav.blog}</h1>
      <p>Blog content will be here.</p>
    </main>
  );
} 