"use client";
import { Dictionary } from "@/types/dictionary";
import { Icon } from "@iconify/react";

export default function DailyPlansSection({
  dailyPlans,
  dict,
}: {
  dailyPlans: any[];
  dict: Dictionary;
}) {
  return (
    <div className="trip-results__section">
      <div className="trip-results__section-header">
        <Icon icon="mdi:calendar-month-outline" width="24" height="24" />
        <h3 className="trip-results__section-title">{dict.planner.day}</h3>
      </div>
      <div className="trip-results__daily-plans">
        {dailyPlans.map((day) => (
          <div key={day.day} className="trip-results__day-card">
            <div className="trip-results__day-header">
              <span className="trip-results__day-number">
                {dict.planner.day} {day.day}
              </span>
            </div>
            <div className="trip-results__day-activities">
              {day.activities.map((activity: any, actIdx: number) => (
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
                        <Icon icon="mdi:map-marker" width="20" height="20" />
                        {activity.location}
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
  );
}
