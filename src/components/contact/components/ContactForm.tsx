"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { Dictionary } from "@/types/dictionary";

interface ContactFormProps {
  dict: Dictionary;
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <motion.form
      className="contact__form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div
        className="contact__form-group"
        data-tooltip={dict.contact.form.nametooltip}
      >
        <input
          type="text"
          name="name"
          placeholder={dict.contact.form.name}
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div
        className="contact__form-group"
        data-tooltip={dict.contact.form.emailtooltip}
      >
        <input
          type="email"
          name="email"
          placeholder={dict.contact.form.email}
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div
        className="contact__form-group"
        data-tooltip={dict.contact.form.messagetooltip}
      >
        <textarea
          name="message"
          placeholder={dict.contact.form.message}
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="contact__button">
        {dict.contact.form.send}
      </button>

      {submitted && (
        <p className="contact__success">{dict.contact.form.successmessage}</p>
      )}
    </motion.form>
  );
}
