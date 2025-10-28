import type { TestimonialItem } from "@/types/testimonial";

import Author1 from "@/assets/testimonial/author1.jpg";
import Author2 from "@/assets/testimonial/author2.jpg";
import Author3 from "@/assets/testimonial/author3.jpg";
import Author4 from "@/assets/testimonial/author4.jpg";

export const TESTIMONIALS: TestimonialItem[] = [
  {
    nameKey: "testimonials.user1.name",
    commentKey: "testimonials.user1.comment",
    locationKey: "testimonials.user1.location",
    photo: Author1,
  },
  {
    nameKey: "testimonials.user2.name",
    commentKey: "testimonials.user2.comment",
    locationKey: "testimonials.user2.location",
    photo: Author2,
  },
  {
    nameKey: "testimonials.user3.name",
    commentKey: "testimonials.user3.comment",
    locationKey: "testimonials.user3.location",
    photo: Author3,
  },
  {
    nameKey: "testimonials.user4.name",
    commentKey: "testimonials.user4.comment",
    locationKey: "testimonials.user4.location",
    photo: Author4,
  },
];