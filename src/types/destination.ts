import type { StaticImageData } from "next/image";

export interface DestinationCard {
  name: string;
  country: string;
  days: number;
  cost: string;
  img: StaticImageData;
}
