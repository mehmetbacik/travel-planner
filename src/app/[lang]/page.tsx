import { getDictionary } from '../i18n/getDictionary'
import { Locale } from '../i18n/settings'
import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import TripPlanner from '@/components/planner/TripPlanner'

export default async function Home({
  params,
}: {
  params: { lang: Locale }
}) {
  const lang = params.lang
  const dict = await getDictionary(lang)

  return (
    <main className="min-h-screen">
      <Hero dict={dict} />
      <TripPlanner dict={dict} />
      <Features dict={dict} />
    </main>
  )
} 