import { Toaster } from 'react-hot-toast'
import { Inter } from 'next/font/google'
import { getDictionary } from '@/app/i18n/getDictionary'
import { Language } from '@/app/i18n/settings'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }, { lang: 'es' }, { lang: 'fr' }, { lang: 'de' }]
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Language }
}) {
  const dict = await getDictionary(lang)

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
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
              theme: {
                primary: '#4aed88',
              },
            },
            error: {
              duration: 4000,
              theme: {
                primary: '#ff4b4b',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  )
} 