import { Dictionary } from '@/types/dictionary';

export function getDummyTripPlan(dict: Dictionary, data: any) {
  return {
    itinerary: {
      destination: data.destination,
      duration: 2,
      dailyPlans: [
        {
          day: 1,
          activities: [
            {
              time: "09:00",
              activity: dict.common.interestOptions.culture,
              location: data.destination + " Center"
            },
            {
              time: "14:00",
              activity: dict.common.interestOptions.food,
              location: data.destination + " Restaurant"
            }
          ]
        },
        {
          day: 2,
          activities: [
            {
              time: "10:00",
              activity: dict.common.interestOptions.nature,
              location: data.destination + " Park"
            },
            {
              time: "16:00",
              activity: dict.common.interestOptions.shopping,
              location: data.destination + " Mall"
            }
          ]
        }
      ],
      weatherForecast: {
        summary: "Sunny with some clouds",
        temperature: { min: 18, max: 27 },
        precipitation: "10%"
      },
      recommendations: {
        restaurants: [
          { name: data.destination + " Bistro", type: dict.common.interestOptions.food, rating: 4.5 }
        ],
        attractions: [
          { name: data.destination + " Museum", type: dict.common.interestOptions.culture, rating: 4.7 }
        ]
      }
    }
  };
} 