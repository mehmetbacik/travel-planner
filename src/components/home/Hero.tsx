"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dictionary } from "@/types/dictionary";
import homeBg from "@/assets/img/home-bg.jpg";

interface HeroProps {
  dict: Dictionary;
}

export default function Hero({ dict }: HeroProps) {
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = homeBg.src;
    img.onload = () => setBgLoaded(true);
  }, []);

  return (
    <section className="hero">
      <div
        className="hero__bg"
        style={{
          backgroundImage: bgLoaded ? `url(${homeBg.src})` : "none",
          backgroundPosition: "center right",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: bgLoaded ? 1 : 0,
          transition: "opacity 0.8s ease-in-out",
        }}
      ></div>
      <div className="hero__overlay"></div>
      <div className="hero__container">
        <div className="hero__content">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: bgLoaded ? 1 : 0, y: bgLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero__subtitle"
            >
              {dict.planner.subtitle}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: bgLoaded ? 1 : 0, y: bgLoaded ? 0 : 20 }}
              transition={{ duration: 0.8 }}
              className="hero__title"
            >
              {dict.planner.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: bgLoaded ? 1 : 0, y: bgLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero__description"
            >
              {dict.planner.description}
            </motion.p>
          </div>
          <div>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: bgLoaded ? 1 : 0, y: bgLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hero__cta"
            >
              {dict.common.getStarted}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
