import { Dictionary } from "@/types/dictionary";
import TestimonialsSlider from "./components/TestimonialsSlider";

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
        <TestimonialsSlider dict={dict} />
      </div>
    </section>
  );
}
