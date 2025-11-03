"use client";
import { Dictionary } from "@/types/dictionary";
import { Icon } from "@iconify/react";

export default function WeatherSection({
  forecast,
  dict,
}: {
  forecast: any;
  dict: Dictionary;
}) {
  return (
    <div className="trip-results__section trip-results__weather">
      <div className="trip-results__section-header">
        <Icon icon="mdi:cloud-outline" width="24" height="24" />
        <h3 className="trip-results__section-title">{dict.features.weather}</h3>
      </div>
      <div className="trip-results__weather-content">
        <p className="trip-results__weather-summary">{forecast.summary}</p>
        <div className="trip-results__weather-details">
          <span>
            {forecast.temperature.min}°C - {forecast.temperature.max}°C
          </span>
          <span>
            {dict.common.weatherInfo || "Precipitation"}:{" "}
            {forecast.precipitation}
          </span>
        </div>
      </div>
    </div>
  );
}
