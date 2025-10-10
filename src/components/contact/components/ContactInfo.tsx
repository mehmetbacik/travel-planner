"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { contactItems } from "@/services/data/contactItems";
import { Dictionary } from "@/types/dictionary";

interface ContactInfoProps {
  dict: Dictionary;
}

export default function ContactInfo({ dict }: ContactInfoProps) {

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
          <h3>{dict.contact.info[item.titleContact] ?? item.titleContact}</h3>
          <p>{item.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
