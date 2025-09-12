export interface InstagramPost {
  id: number;
  username: string;
  location: string;
  image: string;
  caption: string;
}

export const instagramPosts: InstagramPost[] = [
  {
    id: 1,
    username: "traveler_01",
    location: "Paris, France",
    image: "/images/instagram/paris.jpg",
    caption: "Exploring the city of lights ✨ #ParisTrip",
  },
  {
    id: 2,
    username: "wanderlust_92",
    location: "Tokyo, Japan",
    image: "/images/instagram/tokyo.jpg",
    caption: "A taste of Tokyo nights 🌸",
  },
  {
    id: 3,
    username: "explorer_life",
    location: "New York, USA",
    image: "/images/instagram/nyc.jpg",
    caption: "Central Park mornings 🗽",
  },
];
