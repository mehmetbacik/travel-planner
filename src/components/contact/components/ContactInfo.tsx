import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const contactItems = [
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
];

export default function ContactInfo() {
  return (
    <div className="contact__info">
      {contactItems.map((item, index) => (
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
    </div>
  );
}
