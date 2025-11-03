"use client";
import { Dictionary } from "@/types/dictionary";

export default function LoadingState({ dict }: { dict: Dictionary }) {
  return (
    <div className="trip-results trip-results--loading">
      <div className="trip-results__loader">
        <div className="trip-results__spinner"></div>
        <p className="trip-results__loading-text">{dict.planner.loading}</p>
      </div>
    </div>
  );
}
