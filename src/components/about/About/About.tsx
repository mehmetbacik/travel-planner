"use client";

import React from "react";
import { Dictionary } from "@/types/dictionary";
import AboutHeader from "./components/AboutHeader";
import AboutContent from "./components/AboutContent";
import InstagramSlider from "./components/InstagramSlider";
import AboutStats from "./components/AboutStats";

interface AboutProps {
  dict: Dictionary;
}

export default function About({ dict }: AboutProps) {
  return (
    <section className="about" aria-labelledby="about">
      <div className="about__body container">
        <AboutHeader dict={dict} />
        <AboutContent dict={dict} />
        <InstagramSlider />
        <AboutStats dict={dict} />
      </div>
    </section>
  );
}
