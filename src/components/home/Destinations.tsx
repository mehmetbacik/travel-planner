"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Dictionary } from "@/types/dictionary";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface DestinationCard {
  name: string;
  country: string;
  days: number;
  cost: string;
  flag: string;
}

const DESTINATIONS: DestinationCard[] = [
  {
    name: "Paris",
    country: "France",
    days: 5,
    cost: "$1200 - $1800",
    flag: "/src/assets/flags/fr.png",
  },
  {
    name: "Barcelona",
    country: "Spain",
    days: 4,
    cost: "$900 - $1400",
    flag: "/src/assets/flags/es.png",
  },
  {
    name: "Berlin",
    country: "Germany",
    days: 3,
    cost: "$800 - $1200",
    flag: "/src/assets/flags/de.png",
  },
  {
    name: "Istanbul",
    country: "Turkiye",
    days: 5,
    cost: "$700 - $1100",
    flag: "/src/assets/flags/tr.png",
  },
  {
    name: "London",
    country: "England",
    days: 4,
    cost: "$1300 - $2000",
    flag: "/src/assets/flags/en.png",
  },
  {
    name: "Madrid",
    country: "Spain",
    days: 3,
    cost: "$850 - $1300",
    flag: "/src/assets/flags/es.png",
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
            { day: 1, activities: [{ time: "09:00", activity: "City Tour", location: destination.name + " Center" }] },
            { day: 2, activities: [{ time: "10:00", activity: "Museum Visit", location: destination.name + " Museum" }] },
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
              { name: destination.name + " Museum", type: "Culture", rating: 4.7 },
            ],
          },
        },
      ],
    };
    localStorage.setItem("tripPlan", JSON.stringify(dummyPlan));
    router.push(`/tr/results?destination=${encodeURIComponent(destination.name)}`);
  };

  return (
    <section className="destinations" aria-labelledby="destinations">
      <div className="destinations__header">
        <h2>{dict.home.features.cards.destination.title}</h2>
        <p>{dict.home.features.cards.destination.description}</p>
      </div>
      <div className="destinations__slider">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
          }}
          style={{ width: "100%", padding: "1rem 0" }}
        >
          {DESTINATIONS.map((dest) => (
            <SwiperSlide key={dest.name}>
              <div
                className="destinations__card"
                onClick={() => handleCardClick(dest)}
                style={{ height: "100%" }}
              >
                <div className="destinations__flag">
                  <Image src={dest.flag} alt={dest.country} width={32} height={24} />
                </div>
                <div className="destinations__info">
                  <h3>{dest.name}</h3>
                  <p>{dest.country}</p>
                  <div className="destinations__meta">
                    <span>{dest.days} {dict.planner.day}</span>
                    <span>{dest.cost}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
