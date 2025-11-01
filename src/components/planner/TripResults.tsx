"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dictionary } from "@/types/dictionary";
import { useRouter, usePathname } from "next/navigation";
import { usePDFGenerator } from "@/utils/pdfGenerator";

interface TripResultsProps {
  dict: Dictionary;
  destination: string;
}

interface TripPlan {
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

export default function TripResults({ dict, destination }: TripResultsProps) {
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { downloadPDF } = usePDFGenerator();
  
  // Extract language from pathname
  const currentLang = pathname.split('/')[1] || 'en';

  useEffect(() => {
    const storedPlan = localStorage.getItem("tripPlan");
    if (storedPlan) {
      try {
        setTripPlan(JSON.parse(storedPlan));
      } catch (error) {
        console.error("Error parsing trip plan:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const handleDownloadPDF = async () => {
    try {
      const elementId = "trip-results-content";
      const fileName = `trip-plan-${destination.replace(/\s+/g, '-').toLowerCase()}`;
      const title = `${dict.planner.customizedItinerary} - ${destination}`;
      await downloadPDF(elementId, fileName, title);
    } catch (error) {
      console.error("PDF download error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="trip-results trip-results--loading">
        <div className="trip-results__loader">
          <div className="trip-results__spinner"></div>
          <p className="trip-results__loading-text">{dict.planner.loading}</p>
        </div>
      </div>
    );
  }

  if (!tripPlan || !tripPlan.itineraries || tripPlan.itineraries.length === 0) {
    return (
      <div className="trip-results trip-results--empty">
        <div className="trip-results__empty-state">
          <div className="trip-results__empty-icon">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <h2 className="trip-results__empty-title">
            {dict.planner.errors || "No Trip Plan Found"}
          </h2>
          <p className="trip-results__empty-description">
            Please create a new trip plan to see results.
          </p>
          <button
            onClick={() => router.push(`/${currentLang}/planner`)}
            className="trip-results__empty-button"
          >
            {dict.common.planYourTrip || "Plan Your Trip"}
          </button>
        </div>
      </div>
    );
  }

  const currency = tripPlan.formData?.currency || "USD";
  const currencySymbol = currency === "TRY" ? "₺" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "$";
  const budget = tripPlan.formData?.budget || 0;

  return (
    <div className="trip-results" id="trip-results-content">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="trip-results__header"
        >
          <div className="trip-results__header-content">
            <div>
              <h1 className="trip-results__title">
                {dict.planner.customizedItinerary}
              </h1>
              <p className="trip-results__subtitle">
                {dict.planner.subtitle || "Your personalized travel plan is ready!"}
              </p>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="trip-results__pdf-button"
              aria-label={dict.common.downloadPDF}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{dict.common.downloadPDF}</span>
            </button>
          </div>
        </motion.div>

        {tripPlan.formData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="trip-results__summary"
          >
            <div className="trip-results__summary-item">
              <span className="trip-results__summary-label">{dict.common.budget}:</span>
              <span className="trip-results__summary-value">
                {currencySymbol} {budget.toLocaleString()}
              </span>
            </div>
            {tripPlan.formData.interests && tripPlan.formData.interests.length > 0 && (
              <div className="trip-results__summary-item">
                <span className="trip-results__summary-label">{dict.common.interests}:</span>
                <div className="trip-results__summary-tags">
                  {tripPlan.formData.interests.map((interest, idx) => (
                    <span key={idx} className="trip-results__tag">
                      {dict.common.interestOptions[interest as keyof typeof dict.common.interestOptions] || interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {tripPlan.itineraries.map((itinerary, idx) => (
          <motion.div
            key={`${itinerary.destination}-${idx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            className="trip-results__card"
          >
            <div className="trip-results__card-header">
              <div>
                <h2 className="trip-results__destination-title">
                  {itinerary.destination}
                </h2>
                <p className="trip-results__duration">
                  {itinerary.duration} {dict.planner.day || "Day"}
                </p>
              </div>
            </div>
            {itinerary.weatherForecast && (
              <div className="trip-results__section trip-results__weather">
                <div className="trip-results__section-header">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                  </svg>
                  <h3 className="trip-results__section-title">
                    {dict.features.weather}
                  </h3>
                </div>
                <div className="trip-results__weather-content">
                  <p className="trip-results__weather-summary">
                    {itinerary.weatherForecast.summary}
                  </p>
                  <div className="trip-results__weather-details">
                    <span>
                      {itinerary.weatherForecast.temperature.min}°C - {itinerary.weatherForecast.temperature.max}°C
                    </span>
                    <span>
                      {dict.common.weatherInfo || "Precipitation"}: {itinerary.weatherForecast.precipitation}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {itinerary.aiRecommendations && (
              <div className="trip-results__ai-section">
                <h3 className="trip-results__ai-title">
                  {dict.common.recommendations || "Recommendations"}
                </h3>
                {itinerary.aiRecommendations.activities.length > 0 && (
                  <div className="trip-results__recommendation-box">
                    <h4 className="trip-results__recommendation-title">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      {dict.common.activities}
                    </h4>
                    <ul className="trip-results__recommendation-list">
                      {itinerary.aiRecommendations.activities.map((activity, i) => (
                        <li key={i} className="trip-results__recommendation-item">
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="trip-results__tips-grid">
                  {itinerary.aiRecommendations.localTips.length > 0 && (
                    <div className="trip-results__recommendation-box">
                      <h4 className="trip-results__recommendation-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        {dict.common.localTips}
                      </h4>
                      <ul className="trip-results__recommendation-list">
                        {itinerary.aiRecommendations.localTips.map((tip, i) => (
                          <li key={i} className="trip-results__recommendation-item">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {itinerary.aiRecommendations.budgetTips.length > 0 && (
                    <div className="trip-results__recommendation-box">
                      <h4 className="trip-results__recommendation-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="1" x2="12" y2="23" />
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        {dict.common.budgetTips}
                      </h4>
                      <ul className="trip-results__recommendation-list">
                        {itinerary.aiRecommendations.budgetTips.map((tip, i) => (
                          <li key={i} className="trip-results__recommendation-item">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
            {itinerary.dailyPlans && itinerary.dailyPlans.length > 0 && (
              <div className="trip-results__section">
                <div className="trip-results__section-header">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <h3 className="trip-results__section-title">
                    {dict.planner.day || "Daily"}
                  </h3>
                </div>
                <div className="trip-results__daily-plans">
                  {itinerary.dailyPlans.map((day) => (
                    <div key={day.day} className="trip-results__day-card">
                      <div className="trip-results__day-header">
                        <span className="trip-results__day-number">
                          {dict.planner.day} {day.day}
                        </span>
                      </div>
                      <div className="trip-results__day-activities">
                        {day.activities.map((activity, actIdx) => (
                          <div key={actIdx} className="trip-results__activity">
                            <div className="trip-results__activity-time">
                              {activity.time}
                            </div>
                            <div className="trip-results__activity-content">
                              <p className="trip-results__activity-name">
                                {activity.activity}
                              </p>
                              {activity.location && (
                                <p className="trip-results__activity-location">
                                  📍 {activity.location}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {itinerary.recommendations && (
              <div className="trip-results__section">
                <div className="trip-results__section-header">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <h3 className="trip-results__section-title">
                    {dict.common.recommendations || "Recommendations"}
                  </h3>
                </div>
                <div className="trip-results__recommendations-grid">
                  {itinerary.recommendations.restaurants &&
                    itinerary.recommendations.restaurants.length > 0 && (
                      <div className="trip-results__recommendations-box">
                        <h4 className="trip-results__recommendations-subtitle">
                          {dict.features.food}
                        </h4>
                        <div className="trip-results__recommendations-list">
                          {itinerary.recommendations.restaurants.map(
                            (restaurant, index) => (
                              <div
                                key={index}
                                className="trip-results__recommendation-card"
                              >
                                <div className="trip-results__recommendation-card-header">
                                  <p className="trip-results__recommendation-card-name">
                                    {restaurant.name}
                                  </p>
                                  <div className="trip-results__rating">
                                    ⭐ {restaurant.rating}
                                  </div>
                                </div>
                                <p className="trip-results__recommendation-card-type">
                                  {restaurant.type}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  {itinerary.recommendations.attractions &&
                    itinerary.recommendations.attractions.length > 0 && (
                      <div className="trip-results__recommendations-box">
                        <h4 className="trip-results__recommendations-subtitle">
                          {dict.features.attractions}
                        </h4>
                        <div className="trip-results__recommendations-list">
                          {itinerary.recommendations.attractions.map(
                            (attraction, index) => (
                              <div
                                key={index}
                                className="trip-results__recommendation-card"
                              >
                                <div className="trip-results__recommendation-card-header">
                                  <p className="trip-results__recommendation-card-name">
                                    {attraction.name}
                                  </p>
                                  <div className="trip-results__rating">
                                    ⭐ {attraction.rating}
                                  </div>
                                </div>
                                <p className="trip-results__recommendation-card-type">
                                  {attraction.type}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            )}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + tripPlan.itineraries.length * 0.1 }}
          className="trip-results__actions"
        >
          <button
            onClick={() => router.push(`/${currentLang}/planner`)}
            className="trip-results__action-button trip-results__action-button--secondary"
          >
            {dict.common.planYourTrip || "Create New Plan"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
