export type CounterKey = "plannedTrips" | "visitedCities" | "happyTravelers";

export interface CounterItem {
  key: CounterKey;
  value: number;
}