import { InstagramPost } from "@/types/post";

import InstagramImg1 from "@/assets/instagram/paris.jpg";
import InstagramImg2 from "@/assets/instagram/tokyo.jpg";
import InstagramImg3 from "@/assets/instagram/nyc.jpg";
import InstagramImg4 from "@/assets/instagram/rome.jpg";
import InstagramImg5 from "@/assets/instagram/santorini.jpg";
import InstagramImg6 from "@/assets/instagram/alps.jpg";
import InstagramImg7 from "@/assets/instagram/dubai.jpg";
import InstagramImg8 from "@/assets/instagram/bali.jpg";
import InstagramImg9 from "@/assets/instagram/cappadocia.jpg";
import InstagramImg10 from "@/assets/instagram/iceland.jpg";

export const instagramPosts: InstagramPost[] = [
  {
    id: 1,
    username: "traveler_01",
    location: "Paris, France",
    image: InstagramImg1,
    caption: "Exploring the city of lights ✨ #ParisTrip",
  },
  {
    id: 2,
    username: "wanderlust_92",
    location: "Tokyo, Japan",
    image: InstagramImg2,
    caption: "A taste of Tokyo nights 🌸",
  },
  {
    id: 3,
    username: "explorer_life",
    location: "New York, USA",
    image: InstagramImg3,
    caption: "Central Park mornings 🗽",
  },
  {
    id: 4,
    username: "nomad_journey",
    location: "Rome, Italy",
    image: InstagramImg4,
    caption: "Walking through history at the Colosseum 🏛️",
  },
  {
    id: 5,
    username: "sunset_chaser",
    location: "Santorini, Greece",
    image: InstagramImg5,
    caption: "Golden sunsets over the Aegean 🌅",
  },
  {
    id: 6,
    username: "mountain_spirit",
    location: "Swiss Alps, Switzerland",
    image: InstagramImg6,
    caption: "Hiking above the clouds 🏔️",
  },
  {
    id: 7,
    username: "desert_dreamer",
    location: "Dubai, UAE",
    image: InstagramImg7,
    caption: "City of the future rising from the desert 🌆",
  },
  {
    id: 8,
    username: "jungle_vibes",
    location: "Bali, Indonesia",
    image: InstagramImg8,
    caption: "Finding peace in the rice terraces 🌿",
  },
  {
    id: 9,
    username: "safari_travels",
    location: "Cappadocia, Turkiye",
    image: InstagramImg9,
    caption: "Magic mornings with hot air balloons 🎈",
  },

  {
    id: 10,
    username: "polar_explorer",
    location: "Reykjavik, Iceland",
    image: InstagramImg10,
    caption: "Chasing the northern lights ❄️",
  },
];
