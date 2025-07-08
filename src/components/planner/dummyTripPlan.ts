import { Dictionary } from '@/types/dictionary';

export function getDummyTripPlan(dict: Dictionary, data: any) {
  // Çoklu destinasyon desteği
  const plans = data.destinations.map((dest: any, idx: number) => ({
    destination: dest.destination,
    duration: 2,
    dailyPlans: [
      {
        day: 1,
        activities: [
          {
            time: "09:00",
            activity: dict.common.interestOptions.culture,
            location: dest.destination + " Center"
          },
          {
            time: "14:00",
            activity: dict.common.interestOptions.food,
            location: dest.destination + " Restaurant"
          }
        ]
      },
      {
        day: 2,
        activities: [
          {
            time: "10:00",
            activity: dict.common.interestOptions.nature,
            location: dest.destination + " Park"
          },
          {
            time: "16:00",
            activity: dict.common.interestOptions.shopping,
            location: dest.destination + " Mall"
          }
        ]
      }
    ],
    weatherForecast: {
      summary: "Sunny with some clouds",
      temperature: { min: 18 + idx, max: 27 + idx },
      precipitation: "10%"
    },
    recommendations: {
      restaurants: [
        { name: dest.destination + " Bistro", type: dict.common.interestOptions.food, rating: 4.5 }
      ],
      attractions: [
        { name: dest.destination + " Museum", type: dict.common.interestOptions.culture, rating: 4.7 }
      ]
    }
  }));

  return {
    itineraries: plans
  };
} 