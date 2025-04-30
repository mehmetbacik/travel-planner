import { getDictionary } from '../i18n/getDictionary'
import { Locale } from '../i18n/settings'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import TripPlanner from '@/components/TripPlanner'

export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)

  return (
    <main className="min-h-screen">
      <Hero dict={dict} />
      <Features dict={dict} />
      <TripPlanner dict={dict} />
    </main>
  )
} 