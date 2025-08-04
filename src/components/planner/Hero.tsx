"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dictionary } from "@/types/dictionary";
import plannerBg from "@/assets/img/planner-bg.jpg";

interface HeroProps {
  dict: Dictionary;
}

export default function Hero({ dict }: HeroProps) {
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = plannerBg.src;
    img.onload = () => setBgLoaded(true);
  }, []);

  return (
    <section className="planner">
      <div
        className="planner__bg"
        style={{
          backgroundImage: bgLoaded ? `url(${plannerBg.src})` : "none",
          backgroundPosition: "center right",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: bgLoaded ? 1 : 0,
          transition: "opacity 0.8s ease-in-out",
        }}
      ></div>
      <div className="planner__overlay"></div>
      <div className="planner__body container">
        <div className="planner__content">
          <div className="planner__content__headline-wrapper">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: bgLoaded ? 1 : 0, y: bgLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="planner__subtitle"
            >
              {dict.planner.subtitle}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: bgLoaded ? 1 : 0, y: bgLoaded ? 0 : 20 }}
              transition={{ duration: 0.8 }}
              className="planner__title"
            >
              {dict.planner.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: bgLoaded ? 1 : 0, y: bgLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="planner__description"
            >
              {dict.planner.description}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
