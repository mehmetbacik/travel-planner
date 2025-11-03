"use client";
import { motion } from "framer-motion";
import { Dictionary } from "@/types/dictionary";
import WeatherSection from "./WeatherSection";
import AIRecommendationsSection from "./AIRecommendationsSection";
import DailyPlansSection from "./DailyPlansSection";
import RecommendationsSection from "./RecommendationsSection";

interface TripResultsCardProps {
  itinerary: any;
  dict: Dictionary;
  delay?: number;
}

export default function TripResultsCard({
  itinerary,
  dict,
  delay = 0,
}: TripResultsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="trip-results__card"
    >
      <div className="trip-results__card-header">
        <h2 className="trip-results__destination-title">
          {itinerary.destination}
        </h2>
        <p className="trip-results__duration">
          {itinerary.duration} {dict.planner.day}
        </p>
      </div>

      {itinerary.weatherForecast && (
        <WeatherSection forecast={itinerary.weatherForecast} dict={dict} />
      )}
      {itinerary.aiRecommendations && (
        <AIRecommendationsSection
          ai={itinerary.aiRecommendations}
          dict={dict}
        />
      )}
      {itinerary.dailyPlans && itinerary.dailyPlans.length > 0 && (
        <DailyPlansSection dailyPlans={itinerary.dailyPlans} dict={dict} />
      )}
      {itinerary.recommendations && (
        <RecommendationsSection recs={itinerary.recommendations} dict={dict} />
      )}
    </motion.div>
  );
}
