"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Locale } from "@/app/i18n/settings";
import { motion } from "framer-motion";
import { Dictionary } from "@/types/dictionary";
import homeBg from "@/assets/img/home-bg.jpg";

interface HeroProps {
  currentLang: Locale;
  dict: Dictionary;
}

export default function Hero({ currentLang, dict }: HeroProps) {
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
      <div className="hero__body container">
        <div className="hero__content">
          <div className="hero__content__headline-wrapper">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: bgLoaded ? 1 : 0, y: bgLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero__subtitle"
            >
              {dict.home.hero.subtitle}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: bgLoaded ? 1 : 0, y: bgLoaded ? 0 : 20 }}
              transition={{ duration: 0.8 }}
              className="hero__title"
            >
              {dict.home.hero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: bgLoaded ? 1 : 0, y: bgLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero__description"
            >
              {dict.home.hero.description}
            </motion.p>
          </div>
          <div className="hero__content__action-wrapper">
            <Link href={`/${currentLang}/planner`}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: bgLoaded ? 1 : 0, y: bgLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hero__cta"
              >
                {dict.home.hero.cta.primary}
              </motion.span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
