"use client";
import { Dictionary } from "@/types/dictionary";
import { Icon } from "@iconify/react";

export default function RecommendationsSection({
  recs,
  dict,
}: {
  recs: any;
  dict: Dictionary;
}) {
  return (
    <div className="trip-results__section">
      <div className="trip-results__section-header">
        <Icon icon="mdi:map-marker-outline" width="24" height="24" />
        <h3 className="trip-results__section-title">
          {dict.common.recommendations}
        </h3>
      </div>

      <div className="trip-results__recommendations-grid">
        {recs.restaurants?.length > 0 && (
          <div className="trip-results__recommendations-box">
            <h4 className="trip-results__recommendations-subtitle">
              {dict.features.food}
            </h4>
            <div className="trip-results__recommendations-list">
              {recs.restaurants.map((restaurant: any, index: number) => (
                <div key={index} className="trip-results__recommendation-card">
                  <div className="trip-results__recommendation-card-header">
                    <p className="trip-results__recommendation-card-name">
                      {restaurant.name}
                    </p>
                    <div className="trip-results__rating">
                      <Icon icon="mdi:star" width="24" height="24" />
                      {restaurant.rating}
                    </div>
                  </div>
                  <p className="trip-results__recommendation-card-type">
                    {restaurant.type}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {recs.attractions?.length > 0 && (
          <div className="trip-results__recommendations-box">
            <h4 className="trip-results__recommendations-subtitle">
              {dict.features.attractions}
            </h4>
            <div className="trip-results__recommendations-list">
              {recs.attractions.map((attraction: any, index: number) => (
                <div key={index} className="trip-results__recommendation-card">
                  <div className="trip-results__recommendation-card-header">
                    <p className="trip-results__recommendation-card-name">
                      {attraction.name}
                    </p>
                    <div className="trip-results__rating">
                      <Icon icon="mdi:star" width="24" height="24" />
                      {attraction.rating}
                    </div>
                  </div>
                  <p className="trip-results__recommendation-card-type">
                    {attraction.type}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
