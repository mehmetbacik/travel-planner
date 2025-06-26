"use client";

import { motion } from "framer-motion";
import { Dictionary } from "@/types/dictionary";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripSchema, TripFormData } from "@/schemas/tripSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

interface TripPlannerProps {
  dict: Dictionary;
}

const interestOptions = [
  { value: "culture", label: "Culture & History" },
  { value: "nature", label: "Nature & Outdoors" },
  { value: "food", label: "Food & Dining" },
  { value: "shopping", label: "Shopping" },
  { value: "nightlife", label: "Nightlife" },
  { value: "relaxation", label: "Relaxation & Wellness" },
];

function getLocalizedError(message: string | undefined, dict: Dictionary) {
  if (!message) return "";
  if (dict.common.validation?.[message as keyof typeof dict.common.validation]) {
    return dict.common.validation[message as keyof typeof dict.common.validation];
  }
  if (message.includes(".")) {
    const last = message.split(".").pop()!;
    if (dict.common.validation?.[last as keyof typeof dict.common.validation]) {
      return dict.common.validation[last as keyof typeof dict.common.validation];
    }
  }
  if (message === "Expected array, received boolean") {
    return dict.common.validation?.expectedArrayReceivedBoolean || message;
  }
  return message;
}

export default function TripPlanner({ dict }: TripPlannerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
  });

  const onSubmit = async (data: TripFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to generate trip plan");
      }

      const result = await response.json();

      localStorage.setItem("tripPlan", JSON.stringify(result));
      router.push(
        `/results?destination=${encodeURIComponent(data.destination)}`
      );
    } catch (err) {
      console.error("Error:", err);
      setError(
        dict.planner.errors || "Failed to generate trip plan. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="trip-planner">
      <div className="trip-planner__container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="trip-planner__card"
        >
          <h2 className="trip-planner__title">{dict.common.planYourTrip}</h2>
          {error && <div className="trip-planner__error">{error}</div>}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="trip-planner__form"
          >
            <div className="trip-planner__field">
              <label className="trip-planner__label">
                {dict.common.destination}
              </label>
              <input
                {...register("destination")}
                type="text"
                placeholder={dict.planner.destinationPlaceholder}
                className={`trip-planner__input ${
                  errors.destination ? "trip-planner__input--error" : ""
                }`}
              />
              {errors.destination && (
                <p className="trip-planner__error-text">
                  {getLocalizedError(errors.destination.message, dict)}
                </p>
              )}
            </div>
            <div className="trip-planner__field">
              <label className="trip-planner__label">
                {dict.common.interests}
              </label>
              <div className="trip-planner__checkbox-grid">
                {interestOptions.map((option) => (
                  <label
                    key={option.value}
                    className="trip-planner__checkbox-label"
                  >
                    <input
                      type="checkbox"
                      value={option.value}
                      {...register("interests")}
                      className="trip-planner__checkbox"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.interests && (
                <p className="trip-planner__error-text">
                  {getLocalizedError(errors.interests.message, dict)}
                </p>
              )}
            </div>
            <div className="trip-planner__field">
              <label className="trip-planner__label">
                {dict.common.travelDates}
              </label>
              <div className="trip-planner__date-grid">
                <div>
                  <input
                    {...register("startDate")}
                    type="date"
                    className={`trip-planner__input ${
                      errors.startDate ? "trip-planner__input--error" : ""
                    }`}
                  />
                  {errors.startDate && (
                    <p className="trip-planner__error-text">
                      {getLocalizedError(errors.startDate.message, dict)}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("endDate")}
                    type="date"
                    className={`trip-planner__input ${
                      errors.endDate ? "trip-planner__input--error" : ""
                    }`}
                  />
                  {errors.endDate && (
                    <p className="trip-planner__error-text">
                      {getLocalizedError(errors.endDate.message, dict)}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="trip-planner__submit"
            >
              {isSubmitting
                ? dict.planner.loading
                : dict.common.generateItinerary}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
