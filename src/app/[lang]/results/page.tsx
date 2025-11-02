import { getDictionary } from '../../i18n/getDictionary'
import { Locale } from '../../i18n/settings'
import Hero from "@/components/results/Hero";
import TripResults from '@/components/results/TripResults'

export default async function ResultsPage({
  params: { lang },
  searchParams
}: {
  params: { lang: Locale }
  searchParams: { destination: string }
}) {
  const dict = await getDictionary(lang)

  return (
    <div>
      <Hero dict={dict} />
      <TripResults dict={dict} destination={searchParams.destination} />
    </div>
  )
} 