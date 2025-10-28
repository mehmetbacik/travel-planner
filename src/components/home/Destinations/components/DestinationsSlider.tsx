"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { DESTINATIONS } from "@/services/data/destinations";
import DestinationCard from "./DestinationCard";
import { Dictionary } from "@/types/dictionary";

interface DestinationsSliderProps {
  dict: Dictionary;
}

export default function DestinationsSlider({ dict }: DestinationsSliderProps) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={32}
      slidesPerView={4}
      pagination={{ clickable: true }}
      breakpoints={{
        0: { slidesPerView: 1 },
        600: { slidesPerView: 3 },
        900: { slidesPerView: 4 },
      }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
    >
      {DESTINATIONS.map((dest) => (
        <SwiperSlide key={dest.name}>
          <DestinationCard destination={dest} dict={dict} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
