"use client";

import React, { useState } from "react";
import { Dictionary } from "@/types/dictionary";
import { Locale } from "@/app/i18n/settings";
import { motion } from "framer-motion";
import ContactHeader from "./components/ContactHeader";
import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";
import ContactMap from "./components/ContactMap";

interface ContactProps {
  lang: Locale;
  dict: Dictionary;
}

export default function Contact({ lang, dict }: ContactProps) {
  return (
    <section className="contact" aria-labelledby="contact">
      <div className="contact__body container">
        <ContactHeader dict={dict} />

        <div className="contact__content">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            <ContactInfo />
          </motion.div>

          <ContactForm />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ marginTop: "2rem" }}
          >
            <ContactMap />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
