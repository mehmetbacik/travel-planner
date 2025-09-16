"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { instagramPosts } from "@/services/data/instagramPosts";
import { Dictionary } from "@/types/dictionary";

interface AboutContentProps {
  dict: Dictionary;
}

export default function InstagramSlider({ dict }: AboutContentProps) {
  return (
    <div className="about__instagram">
      <div className="about__instagram-header">
        <h2 className="about__instagram-title">
          {dict.about.content.storiesTitle}
        </h2>
        <p className="about__instagram-description">
          {dict.about.content.storiesSubTitle}
        </p>
      </div>
      <div className="about__instagram-slider">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={32}
          slidesPerView={4}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
        >
          {instagramPosts.map((post) => (
            <SwiperSlide className="about__instagram-post" key={post.id}>
              <div className="about__instagram-postHeader">
                <span className="about__instagram-username">
                  @{post.username}
                </span>
                <span className="about__instagram-location">
                  {post.location}
                </span>
              </div>
              <div className="about__instagram-image">
                <Image src={post.image} alt={post.caption} />
              </div>
              <div className="about__instagram-caption">{post.caption}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
