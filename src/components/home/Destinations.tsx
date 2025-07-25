"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { Dictionary } from "@/types/dictionary";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import IstanbulImg from "@/assets/destination/istanbul.jpg";
import ParisImg from "@/assets/destination/paris.jpg";
import BarcelonaImg from "@/assets/destination/barcelona.jpg";
import BerlinImg from "@/assets/destination/berlin.jpg";
import LondonImg from "@/assets/destination/london.jpg";
import MadridImg from "@/assets/destination/madrid.jpg";

interface DestinationCard {
  name: string;
  country: string;
  days: number;
  cost: string;
  img: StaticImageData;
}

const DESTINATIONS: DestinationCard[] = [
  {
    name: "istanbul",
    country: "turkiye",
    days: 5,
    cost: "$700 - $1100",
    img: IstanbulImg,
  },
  {
    name: "paris",
    country: "france",
    days: 5,
    cost: "$1200 - $1800",
    img: ParisImg,
  },
  {
    name: "barcelona",
    country: "spain",
    days: 4,
    cost: "$900 - $1400",
    img: BarcelonaImg,
  },
  {
    name: "berlin",
    country: "germany",
    days: 3,
    cost: "$800 - $1200",
    img: BerlinImg,
  },
  {
    name: "london",
    country: "england",
    days: 4,
    cost: "$1300 - $2000",
    img: LondonImg,
  },
  {
    name: "madrid",
    country: "spain",
    days: 3,
    cost: "$850 - $1300",
    img: MadridImg,
  },
];

interface DestinationsProps {
  dict: Dictionary;
}

export default function Destinations({ dict }: DestinationsProps) {
  const router = useRouter();

  const handleCardClick = (destination: DestinationCard) => {
    const dummyPlan = {
      itineraries: [
        {
          destination: destination.name,
          duration: destination.days,
          dailyPlans: [
            {
              day: 1,
              activities: [
                {
                  time: "09:00",
                  activity: "City Tour",
                  location:
                    dict.destinations.cities[destination.name] + " Center",
                },
              ],
            },
            {
              day: 2,
              activities: [
                {
                  time: "10:00",
                  activity: "Museum Visit",
                  location:
                    dict.destinations.cities[destination.name] + " Center",
                },
              ],
            },
          ],
          weatherForecast: {
            summary: "Sunny",
            temperature: { min: 18, max: 27 },
            precipitation: "10%",
          },
          recommendations: {
            restaurants: [
              { name: destination.name + " Bistro", type: "Food", rating: 4.5 },
            ],
            attractions: [
              {
                name: destination.name + " Museum",
                type: "Culture",
                rating: 4.7,
              },
            ],
          },
        },
      ],
    };
    localStorage.setItem("tripPlan", JSON.stringify(dummyPlan));
    router.push(
      `/tr/results?destination=${encodeURIComponent(destination.name)}`
    );
  };

  return (
    <section className="destinations" aria-labelledby="destinations">
      <div className="destinations__body container">
        <div className="destinations__header">
          <h2 id="destinations-title" className="destinations__title">
            {dict.destinations.title}
          </h2>
          <p className="destinations__description">
            {dict.destinations.description}
          </p>
        </div>
        <div className="destinations__slider">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={32}
            slidesPerView={4}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 3 },
              900: { slidesPerView: 4 },
            }}
          >
            {DESTINATIONS.map((dest) => (
              <SwiperSlide key={dest.name}>
                <div
                  className="destinations__card"
                  onClick={() => handleCardClick(dest)}
                >
                  <div className="destinations__img">
                    <Image
                      src={dest.img}
                      alt={dest.country}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="destinations__info">
                    <div className="destinations__headline">
                      <span>{dict.destinations.cities[dest.name]},</span>
                      <p>{dict.destinations.countries[dest.country]}</p>
                    </div>
                    <div className="destinations__summary">
                      <span>
                        {dest.days} {dict.planner.day}
                      </span>
                      <span>{dest.cost}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
