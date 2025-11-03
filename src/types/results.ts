export interface TripPlan {
  itineraries: Array<{
    destination: string;
    duration: number;
    dailyPlans: Array<{
      day: number;
      activities: Array<{
        time: string;
        activity: string;
        location: string;
      }>;
    }>;
    weatherForecast: {
      summary: string;
      temperature: { min: number; max: number };
      precipitation: string;
    };
    recommendations: {
      restaurants: Array<{ name: string; type: string; rating: number }>;
      attractions: Array<{ name: string; type: string; rating: number }>;
    };
    aiRecommendations?: {
      activities: string[];
      localTips: string[];
      budgetTips: string[];
      weatherInfo: string;
    };
  }>;
  formData?: {
    destinations: Array<{
      destination: string;
      startDate: string;
      endDate: string;
    }>;
    interests: string[];
    budget: number;
    currency: string;
  };
}