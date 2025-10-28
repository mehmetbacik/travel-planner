import type { StaticImageData } from "next/image";

export interface TestimonialItem {
  nameKey: string;
  commentKey: string;
  locationKey: string;
  photo: StaticImageData;
}