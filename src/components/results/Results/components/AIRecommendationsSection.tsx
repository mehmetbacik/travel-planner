"use client";
import { Dictionary } from "@/types/dictionary";
import { Icon } from "@iconify/react";

export default function AIRecommendationsSection({
  ai,
  dict,
}: {
  ai: any;
  dict: Dictionary;
}) {
  return (
    <div className="trip-results__ai-section">
      <h3 className="trip-results__ai-title">{dict.common.recommendations}</h3>

      {ai.activities.length > 0 && (
        <div className="trip-results__recommendation-box">
          <h4 className="trip-results__recommendation-title">
            <Icon icon="mdi:check-circle-outline" width="20" height="20" />
            {dict.common.activities}
          </h4>
          <ul className="trip-results__recommendation-list">
            {ai.activities.map((activity: string, i: number) => (
              <li key={i} className="trip-results__recommendation-item">
                {activity}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="trip-results__tips-grid">
        {ai.localTips.length > 0 && (
          <div className="trip-results__recommendation-box">
            <h4 className="trip-results__recommendation-title">
              <Icon icon="mdi:shield-outline" width="20" height="20" />
              {dict.common.localTips}
            </h4>
            <ul>
              {ai.localTips.map((tip: string, i: number) => (
                <li key={i} className="trip-results__recommendation-item">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
        {ai.budgetTips.length > 0 && (
          <div className="trip-results__recommendation-box">
            <h4 className="trip-results__recommendation-title">
              <Icon icon="mdi:cash-multiple" width="20" height="20" />
              {dict.common.budgetTips}
            </h4>
            <ul>
              {ai.budgetTips.map((tip: string, i: number) => (
                <li key={i} className="trip-results__recommendation-item">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
