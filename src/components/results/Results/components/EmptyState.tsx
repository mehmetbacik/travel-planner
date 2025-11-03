"use client";
import { Dictionary } from "@/types/dictionary";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function EmptyState({
  dict,
  router,
  currentLang,
}: {
  dict: Dictionary;
  router: AppRouterInstance;
  currentLang: string;
}) {
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
