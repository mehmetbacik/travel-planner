"use client";

import { motion } from "framer-motion";
import { Dictionary } from "@/types/dictionary";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripSchema, TripFormData } from "@/schemas/tripSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { getDummyTripPlan } from "./dummyTripPlan";
import { z } from "zod";

interface TripPlannerProps {
  dict: Dictionary;
  lang: string;
}

function getLocalizedError(message: string | undefined, dict: Dictionary) {
  if (!message) return "";
  if (
    dict.common.validation?.[message as keyof typeof dict.common.validation]
  ) {
    return dict.common.validation[
      message as keyof typeof dict.common.validation
    ];
  }
  if (message.includes(".")) {
    const last = message.split(".").pop()!;
    if (dict.common.validation?.[last as keyof typeof dict.common.validation]) {
      return dict.common.validation[
        last as keyof typeof dict.common.validation
      ];
    }
  }
  if (message === "Expected array, received boolean") {
    return dict.common.validation?.expectedArrayReceivedBoolean || message;
  }
  if (message === "Expected number, received nan") {
    return dict.common.validation?.["budget.nan"] || message;
  }
  return message;
}

export default function TripPlanner({ dict, lang }: TripPlannerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripFormData & { currency: string }>({
    resolver: zodResolver(
      tripSchema.extend({
        currency: z.string().min(1, "validation.currency.required"),
      })
    ),
  });

  const interestOptions = [
    { value: "culture", label: dict.common.interestOptions.culture },
    { value: "nature", label: dict.common.interestOptions.nature },
    { value: "food", label: dict.common.interestOptions.food },
    { value: "shopping", label: dict.common.interestOptions.shopping },
    { value: "nightlife", label: dict.common.interestOptions.nightlife },
    { value: "relaxation", label: dict.common.interestOptions.relaxation },
  ];

  const currencyOptions = [
    { value: "TRY", label: "₺ (TRY)" },
    { value: "USD", label: "$ (USD)" },
    { value: "EUR", label: "€ (EUR)" },
    { value: "GBP", label: "£ (GBP)" },
  ];

  const onSubmit = async (data: TripFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // TODO: API connection
      // const response = await fetch("/api/trip", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });
      // if (!response.ok) {
      //   throw new Error("Failed to generate trip plan");
      // }
      // const result = await response.json();

      const result = getDummyTripPlan(dict, data);
      localStorage.setItem(
        "tripPlan",
        JSON.stringify({ ...result, currency: data.currency })
      );
      router.push(
        `/${lang}/results?destination=${encodeURIComponent(data.destination)}`
      );
    } catch (err) {
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
        {/* Tab structure */}
        <div className="trip-planner__tab-wrapper">
          <button
            type="button"
            className="trip-planner__tab-wrapper--tab trip-planner__tab-wrapper--tab--active"
          >
            {dict.common.planYourTrip || "Planner"}
          </button>
          <button
            type="button"
            className="trip-planner__tab-wrapper--tab trip-planner__tab-wrapper--tab--disabled"
            disabled
          >
            {dict.common.comingSoon || "Coming Soon"}
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="trip-planner__card"
        >
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
            <div
              className="trip-planner__field trip-planner__field--budget-currency"
              style={{ display: "flex", gap: 12, alignItems: "center" }}
            >
              <div style={{ flex: 2 }}>
                <label className="trip-planner__label">
                  {dict.common.budget}
                </label>
                <input
                  {...register("budget", { valueAsNumber: true })}
                  type="number"
                  min={0}
                  placeholder="1000"
                  className={`trip-planner__input ${
                    errors.budget ? "trip-planner__input--error" : ""
                  }`}
                />
                {errors.budget && (
                  <p className="trip-planner__error-text">
                    {getLocalizedError(errors.budget.message, dict)}
                  </p>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <label className="trip-planner__label">
                  {dict.common.currency || "Currency"}
                </label>
                <select
                  {...register("currency")}
                  className={`trip-planner__input ${
                    errors.currency ? "trip-planner__input--error" : ""
                  }`}
                  defaultValue="TRY"
                >
                  <option value="" disabled>
                    {dict.common.currencySelect || "Select currency"}
                  </option>
                  {currencyOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.currency && (
                  <p className="trip-planner__error-text">
                    {getLocalizedError(errors.currency.message, dict)}
                  </p>
                )}
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
