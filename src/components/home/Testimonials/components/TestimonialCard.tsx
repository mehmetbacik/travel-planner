"use client";

import Image from "next/image";
import { Dictionary } from "@/types/dictionary";
import { getNestedValue } from "@/utils/getNestedValue";
import type { TestimonialItem } from "@/types/testimonial";

interface TestimonialCardProps {
  item: TestimonialItem;
  dict: Dictionary;
}

export default function TestimonialCard({ item, dict }: TestimonialCardProps) {
  return (
    <div className="testimonials__card">
      <div className="testimonials__img">
        <Image src={item.photo} alt="Author" width={64} height={64} />
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
  );
}
