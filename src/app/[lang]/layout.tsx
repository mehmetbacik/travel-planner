import { Inter } from 'next/font/google';
import { getDictionary } from '@/app/i18n/getDictionary';
import { Locale } from '../i18n/settings';
import ClientLayout from './ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }, { lang: 'es' }, { lang: 'fr' }, { lang: 'de' }];
}

export default async function LocaleLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen flex flex-col">
      <ClientLayout lang={lang} dict={dict}>
        {children}
      </ClientLayout>
    </div>
  );
} 