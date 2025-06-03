import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import { Inter } from 'next/font/google';
import { getDictionary } from '@/app/i18n/getDictionary';
import { NotificationProvider } from '@/components/ui/Notification';
import { Locale } from '../i18n/settings';

const inter = Inter({ subsets: ['latin'] });

// Client-side only components
const Navbar = dynamic(() => import('@/components/layout/Navbar'), {
  ssr: false,
  loading: () => <div className="h-16 bg-white shadow-sm" /> // Loading placeholder
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100" /> // Loading placeholder
});

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
    <html lang={lang} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Navbar currentLang={lang} />
        <main className="min-h-screen">
          <NotificationProvider />
          {children}
        </main>
        <Footer currentLang={lang} />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              duration: 3000,
              style: {
                background: '#4aed88',
              },
            },
            error: {
              duration: 4000,
              style: {
                background: '#ff4b4b',
              },
            },
          }}
        />
      </body>
    </html>
  );
} 