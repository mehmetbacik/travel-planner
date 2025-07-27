"use client";

import type { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Dictionary } from "@/types/dictionary";

import Author1 from "@/assets/testimonial/author1.jpg";
import Author2 from "@/assets/testimonial/author2.jpg";
import Author3 from "@/assets/testimonial/author3.jpg";
import Author4 from "@/assets/testimonial/author4.jpg";

function getNestedValue(obj: any, path: string): string {
  return path
    .split(".")
    .reduce((o, k) => (o && o[k] !== undefined ? o[k] : ""), obj) as string;
}

interface TestimonialItem {
  nameKey: string;
  commentKey: string;
  locationKey: string;
  photo: StaticImageData;
}

const TESTIMONIALS: TestimonialItem[] = [
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

interface TestimonialsProps {
  dict: Dictionary;
}

export default function Testimonials({ dict }: TestimonialsProps) {
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
        <div className="testimonials__slider">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
          >
            {TESTIMONIALS.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="testimonials__card">
                  <div className="testimonials__img">
                    <Image
                      src={item.photo}
                      alt="Author"
                      width={64}
                      height={64}
                    />
                  </div>
                  <div className="testimonials__content">
                    <div className="testimonials__meta">
                      <span className="testimonials__name">
                        {getNestedValue(dict, item.nameKey)}
                      </span>
                      <span className="testimonials__location">
                        {getNestedValue(dict, item.locationKey)}
                      </span>
                    </div>
                    <p className="testimonials__comment">
                      {getNestedValue(dict, item.commentKey)}
                    </p>
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
