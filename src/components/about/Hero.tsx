"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dictionary } from "@/types/dictionary";
import aboutBg from "@/assets/img/about-bg.jpg";

interface HeroProps {
  dict: Dictionary;
}

export default function Hero({ dict }: HeroProps) {
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = aboutBg.src;
    img.onload = () => setBgLoaded(true);
  }, []);

  return (
    <section className="chero">
      <div
        className="chero__bg"
        style={{
          backgroundImage: bgLoaded ? `url(${aboutBg.src})` : "none",
          backgroundPosition: "center right",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: bgLoaded ? 1 : 0,
          transition: "opacity 0.8s ease-in-out",
        }}
      ></div>
      <div className="chero__overlay"></div>
      <div className="chero__body container">
        <div className="chero__content">
          <div className="chero__content__headline-wrapper">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: bgLoaded ? 1 : 0, y: bgLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="chero__subtitle"
            >
              {dict.planner.subtitle}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: bgLoaded ? 1 : 0, y: bgLoaded ? 0 : 20 }}
              transition={{ duration: 0.8 }}
              className="chero__title"
            >
              {dict.planner.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: bgLoaded ? 1 : 0, y: bgLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="chero__description"
            >
              {dict.planner.description}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
