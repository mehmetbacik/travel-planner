import { getDictionary } from '../i18n/getDictionary'
import { Locale } from '../i18n/settings'
import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'

export default async function Home({
  params,
}: {
  params: { lang: Locale }
}) {
  const lang = params.lang
  const dict = await getDictionary(lang)

  return (
    <main>
      <Hero dict={dict} />
      <Features dict={dict} />
    </main>
  )
} 