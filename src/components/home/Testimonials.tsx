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

import Author1 from "@/assets/testimonial/author1.jpg";
import Author2 from "@/assets/testimonial/author2.jpg";
import Author3 from "@/assets/testimonial/author3.jpg";
import Author4 from "@/assets/testimonial/author4.jpg";


interface TestimonialsProps {
  dict: Dictionary;
}

export default function Testimonials({ dict }: TestimonialsProps) {
  const router = useRouter();

  return (
    <section className="testimonials" aria-labelledby="testimonials">
      <div className="testimonials__body container">
        <div className="testimonials__header">
          <h2 id="testimonials-title" className="testimonials__title">
            {dict.testimonials.title}
          </h2>
          <p className="testimonials__description">
            {dict.testimonials.description}
          </p>
        </div>
      </div>
    </section>
  );
}
