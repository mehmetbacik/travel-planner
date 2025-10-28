"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Dictionary } from "@/types/dictionary";
import { TESTIMONIALS } from "@/services/data/testimonials";
import TestimonialCard from "./TestimonialCard";

interface TestimonialsSliderProps {
  dict: Dictionary;
}

export default function TestimonialsSlider({ dict }: TestimonialsSliderProps) {
  return (
    <div className="testimonials__slider">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
      >
        {TESTIMONIALS.map((item, idx) => (
          <SwiperSlide key={idx}>
            <TestimonialCard item={item} dict={dict} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
