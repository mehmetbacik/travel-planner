'use client';

import { Toaster } from 'react-hot-toast';
import { NotificationProvider } from '@/components/ui/Notification';
import { Locale } from '../i18n/settings';
import dynamic from 'next/dynamic';
import { Dictionary } from '@/types/dictionary';

const Navbar = dynamic(() => import('@/components/layout/Navbar/Navbar'), {
  ssr: false,
  loading: () => <div className="h-16 bg-white shadow-sm" />
});

const Footer = dynamic(() => import('@/components/layout/Footer/Footer'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100" />
});

interface ClientLayoutProps {
  children: React.ReactNode;
  lang: Locale;
  dict: Dictionary;
}

export default function ClientLayout({ children, lang, dict }: ClientLayoutProps) {
  return (
    <>
      <Navbar currentLang={lang} dict={dict} />
      <main className="flex-grow">
        <NotificationProvider />
        {children}
      </main>
      <Footer currentLang={lang} dict={dict} />
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
    </>
  );
} 