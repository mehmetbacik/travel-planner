"use client";

import { motion } from "framer-motion";
import { Dictionary } from "@/types/dictionary";
import heroBg from "@/assets/img/hero-bg.png";

interface HeroProps {
  dict: Dictionary;
}

export default function Hero({ dict }: HeroProps) {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${heroBg.src})`,
        backgroundPosition: "center right",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero__content">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero__title"
        >
          {dict.planner.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero__description"
        >
          {dict.planner.subtitle}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero__cta"
        >
          {dict.common.getStarted}
        </motion.button>
      </div>
    </section>
  );
}
