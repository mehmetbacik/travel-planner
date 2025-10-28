import type { Feature } from "@/types/feature";

export const FEATURES: Feature[] = [
  { icon: "mdi:weather-sunny", key: "weather", descriptionKey: "weatherdesc" },
  { icon: "mdi:map-marker-outline", key: "attractions", descriptionKey: "attractionsdesc" },
  { icon: "mdi:car", key: "transportation", descriptionKey: "transportationdesc" },
  { icon: "mdi:silverware-fork-knife", key: "food", descriptionKey: "fooddesc" },
];
