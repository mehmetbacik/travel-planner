export type CounterKey =
  | "plannedTrips"
  | "visitedCities"
  | "happyTravelers"
  | "countriesExplored"
  | "travelGuidesShared"
  | "localExperiences"
  | "culturalEvents"
  | "photosCaptured"
  | "reviewsCollected";

export interface CounterItem {
  key: CounterKey;
  value: number;
}
