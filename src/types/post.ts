import { StaticImageData } from "next/image";

export interface InstagramPost {
  id: number;
  username: string;
  location: string;
  image: StaticImageData;
  caption: string;
}