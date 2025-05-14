"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dictionary } from "@/types/dictionary";
import { useRouter } from "next/navigation";

interface TripResultsProps {
  dict: Dictionary;
  destination: string;
}

interface TripPlan {
  itinerary: {
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
      temperature: {
        min: number;
        max: number;
      };
      precipitation: string;
    };
    recommendations: {
      restaurants: Array<{
        name: string;
        type: string;
        rating: number;
      }>;
      attractions: Array<{
        name: string;
        type: string;
        rating: number;
      }>;
    };
  };
}

export default function TripResults({ dict, destination }: TripResultsProps) {
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedPlan = localStorage.getItem("tripPlan");
    if (storedPlan) {
      setTripPlan(JSON.parse(storedPlan));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{dict.planner.loading}</p>
        </div>
      </div>
    );
  }

  if (!tripPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Trip Plan Found
          </h2>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">
              {dict.planner.customizedItinerary} {destination}
            </h1>
            <p className="text-lg opacity-90">
              {tripPlan.itinerary.duration} {dict.planner.day}s
            </p>
          </div>

          {/* Weather Forecast */}
          <div className="p-8 border-b">
            <h2 className="text-2xl font-semibold mb-4">
              {dict.features.weather}
            </h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-lg mb-2">
                {tripPlan.itinerary.weatherForecast.summary}
              </p>
              <p className="text-gray-600">
                Temperature:{" "}
                {tripPlan.itinerary.weatherForecast.temperature.min}°C -{" "}
                {tripPlan.itinerary.weatherForecast.temperature.max}°C
              </p>
              <p className="text-gray-600">
                Precipitation:{" "}
                {tripPlan.itinerary.weatherForecast.precipitation}
              </p>
            </div>
          </div>

          {/* Daily Plans */}
          <div className="p-8 border-b">
            <h2 className="text-2xl font-semibold mb-6">Daily Schedule</h2>
            <div className="space-y-8">
              {tripPlan.itinerary.dailyPlans.map((day) => (
                <div key={day.day} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">
                    {dict.planner.day} {day.day}
                  </h3>
                  <div className="space-y-4">
                    {day.activities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-20 text-gray-500">
                          {activity.time}
                        </div>
                        <div>
                          <p className="font-medium">{activity.activity}</p>
                          <p className="text-sm text-gray-600">
                            {activity.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Recommendations</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Restaurants */}
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {dict.features.food}
                </h3>
                <div className="space-y-4">
                  {tripPlan.itinerary.recommendations.restaurants.map(
                    (restaurant, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium">{restaurant.name}</p>
                        <p className="text-sm text-gray-600">
                          {restaurant.type}
                        </p>
                        <p className="text-sm text-gray-600">
                          Rating: {restaurant.rating}/5
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Attractions */}
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {dict.features.attractions}
                </h3>
                <div className="space-y-4">
                  {tripPlan.itinerary.recommendations.attractions.map(
                    (attraction, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium">{attraction.name}</p>
                        <p className="text-sm text-gray-600">
                          {attraction.type}
                        </p>
                        <p className="text-sm text-gray-600">
                          Rating: {attraction.rating}/5
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
