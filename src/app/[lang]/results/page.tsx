import { getDictionary } from '../../i18n/getDictionary'
import { Locale } from '../../i18n/settings'
import TripResults from '@/components/planner/TripResults'

export default async function ResultsPage({
  params: { lang },
  searchParams
}: {
  params: { lang: Locale }
  searchParams: { destination: string }
}) {
  const dict = await getDictionary(lang)

  return (
    <main className="min-h-screen bg-gray-50">
      <TripResults dict={dict} destination={searchParams.destination} />
    </main>
  )
} 