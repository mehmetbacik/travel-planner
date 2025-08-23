"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "12px",
};

const center = { lat: 41.0082, lng: 28.9784 };

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="contact" aria-labelledby="contact">
      <div className="contact__body container">
        {/* Header */}
        <div className="contact__header">
          <h2 id="contact-title" className="contact__title">
            Contact
          </h2>
          <p className="contact__description">
            Reach out to us for planning your next adventure. We’d love to hear
            from you!
          </p>
        </div>

        {/* Info & Form */}
        <div className="contact__content">
          {/* Contact Info Cards */}
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

          {/* Contact Form */}
          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="contact__form-group"
              data-tooltip="Enter your full name"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div
              className="contact__form-group"
              data-tooltip="Provide a valid email"
            >
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div
              className="contact__form-group"
              data-tooltip="Write your message"
            >
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="contact__button"
            >
              Send Message
            </motion.button>
            {submitted && (
              <p className="contact__success">Message sent successfully!</p>
            )}
          </motion.form>

          {/* Google Map */}
          <motion.div
            className="contact__map"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ marginTop: "2rem" }}
          >
            <LoadScript
              googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
