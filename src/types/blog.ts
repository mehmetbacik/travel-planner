import { StaticImageData } from "next/image";
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  thumbnail: StaticImageData;
}
