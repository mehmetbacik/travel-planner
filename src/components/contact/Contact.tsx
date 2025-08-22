"use client";

import React from "react";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="contact" aria-labelledby="contact">
      <div className="contact__body container">
        <div className="contact__header">
          <h2 id="contact-title" className="contact__title">
            Contact
          </h2>
          <p className="contactv__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="contact__content">
          <motion.div
            className="contact__info"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            {[
              {
                icon: "mdi:email-outline",
                title: "Email",
                value: "support@travelplanner.com",
              },
              {
                icon: "mdi:phone-outline",
                title: "Phone",
                value: "+90 555 123 4567",
              },
              {
                icon: "mdi:map-marker-outline",
                title: "Address",
                value: "Istanbul, Turkey",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="contact__card"
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.4 }}
              >
                <Icon icon={item.icon} className="contact__icon" />
                <h3>{item.title}</h3>
                <p>{item.value}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.form
            className="contact__form"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="contact__form-group">
              <input type="text" name="name" placeholder="Your Name" required />
            </div>
            <div className="contact__form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="contact__form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                required
              />
            </div>
            <button type="submit" className="contact__button">
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
