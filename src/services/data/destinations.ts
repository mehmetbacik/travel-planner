import type { DestinationCard } from "@/types/destination";
import IstanbulImg from "@/assets/destination/istanbul.jpg";
import ParisImg from "@/assets/destination/paris.jpg";
import BarcelonaImg from "@/assets/destination/barcelona.jpg";
import BerlinImg from "@/assets/destination/berlin.jpg";
import LondonImg from "@/assets/destination/london.jpg";
import MadridImg from "@/assets/destination/madrid.jpg";

export const DESTINATIONS: DestinationCard[] = [
  { name: "istanbul", country: "turkiye", days: 5, cost: "$700 - $1100", img: IstanbulImg },
  { name: "paris", country: "france", days: 5, cost: "$1200 - $1800", img: ParisImg },
  { name: "barcelona", country: "spain", days: 4, cost: "$900 - $1400", img: BarcelonaImg },
  { name: "berlin", country: "germany", days: 3, cost: "$800 - $1200", img: BerlinImg },
  { name: "london", country: "england", days: 4, cost: "$1300 - $2000", img: LondonImg },
  { name: "madrid", country: "spain", days: 3, cost: "$850 - $1300", img: MadridImg },
];
