export type CounterKey =
  | "plannedTrips"
  | "visitedCities"
  | "happyTravelers"
  | "countriesExplored"
  | "localExperiences"
  | "culturalEvents"
  | "photosCaptured"
  | "reviewsCollected";

export interface CounterItem {
  key: CounterKey;
  value: number;
  icon: string;
}
