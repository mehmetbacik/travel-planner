"use client";

import { motion } from "framer-motion";
import { Dictionary } from "@/types/dictionary";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripSchema, TripFormData } from "@/schemas/tripSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getDummyTripPlan } from "./dummyTripPlan";
import { z } from "zod";
import { useFieldArray } from "react-hook-form";

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
  const [multiDestination, setMultiDestination] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TripFormData & { currency: string }>({
    resolver: zodResolver(
      tripSchema.extend({
        currency: z.string().min(1, "validation.currency.required"),
      })
    ),
    defaultValues: {
      destinations: [{ destination: "", startDate: "", endDate: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "destinations",
  });

  const interestOptions = [
    { value: "culture", label: dict.common.interestOptions.culture },
    { value: "nature", label: dict.common.interestOptions.nature },
    { value: "food", label: dict.common.interestOptions.food },
    { value: "shopping", label: dict.common.interestOptions.shopping },
    { value: "nightlife", label: dict.common.interestOptions.nightlife },
    { value: "relaxation", label: dict.common.interestOptions.relaxation },
    { value: "adventure", label: dict.common.interestOptions.adventure },
    { value: "art", label: dict.common.interestOptions.art },
  ];

  const currencyOptions = [
    { value: "TRY", label: "₺ (TRY)" },
    { value: "USD", label: "$ (USD)" },
    { value: "EUR", label: "€ (EUR)" },
    { value: "GBP", label: "£ (GBP)" },
  ];

  const onSubmit = async (data: TripFormData & { currency: string }) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Generate static trip plan
      const result = getDummyTripPlan(dict, data);

      localStorage.setItem("tripPlan", JSON.stringify(result));
      router.push(
        `/${lang}/results?destination=${encodeURIComponent(
          data.destinations[0].destination
        )}`
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
      <div className="trip-planner__body container">
        {/* Tab structure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="trip-planner__tab-wrapper"
        >
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
        </motion.div>
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
              <div className="trip-planner__destination-header">
                <label className="trip-planner__label">
                  {dict.common.destination}
                </label>
                <div className="trip-planner__multi-destination-bar">
                  <div
                    className={`trip-planner__toggle${
                      multiDestination ? " trip-planner__toggle--active" : ""
                    }`}
                    onClick={() => setMultiDestination((v) => !v)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={multiDestination}
                  >
                    <div className="trip-planner__toggle-circle" />
                  </div>
                  <span
                    style={{
                      fontWeight: 600,
                      color: multiDestination ? "#FF5A5F" : "#666",
                    }}
                  >
                    {dict.common.multiDestination}
                  </span>
                </div>
              </div>
              {(multiDestination ? fields : [fields[0]]).map((field, idx) => (
                <div key={field.id} className="trip-planner__destination-box">
                  <input
                    {...register(`destinations.${idx}.destination` as const)}
                    type="text"
                    placeholder={dict.planner.destinationPlaceholder}
                    className={`trip-planner__input ${
                      errors.destinations?.[idx]?.destination
                        ? "trip-planner__input--error"
                        : ""
                    }`}
                  />
                  <div className="trip-planner__date-grid">
                    <input
                      {...register(`destinations.${idx}.startDate` as const)}
                      type="date"
                      className={`trip-planner__input ${
                        errors.destinations?.[idx]?.startDate
                          ? "trip-planner__input--error"
                          : ""
                      }`}
                    />
                    <input
                      {...register(`destinations.${idx}.endDate` as const)}
                      type="date"
                      className={`trip-planner__input ${
                        errors.destinations?.[idx]?.endDate
                          ? "trip-planner__input--error"
                          : ""
                      }`}
                    />
                  </div>
                  {multiDestination && fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(idx)}
                      className="trip-planner__button trip-planner__button--remove"
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="#fff"
                          strokeWidth="2"
                          d="M6 6l12 12M6 18L18 6"
                        />
                      </svg>
                    </button>
                  )}
                  {(errors.destinations?.[idx]?.destination ||
                    errors.destinations?.[idx]?.startDate ||
                    errors.destinations?.[idx]?.endDate) && (
                    <p className="trip-planner__error-text">
                      {getLocalizedError(
                        errors.destinations?.[idx]?.destination?.message,
                        dict
                      ) ||
                        getLocalizedError(
                          errors.destinations?.[idx]?.startDate?.message,
                          dict
                        ) ||
                        getLocalizedError(
                          errors.destinations?.[idx]?.endDate?.message,
                          dict
                        )}
                    </p>
                  )}
                </div>
              ))}
              {multiDestination && (
                <button
                  type="button"
                  onClick={() =>
                    append({ destination: "", startDate: "", endDate: "" })
                  }
                  className="trip-planner__button trip-planner__button--add"
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path stroke="#fff" strokeWidth="2" d="M12 5v14M5 12h14" />
                  </svg>
                  {dict.common.addDestination}
                </button>
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
              <div className="trip-planner__date-grid">
                <div className="trip-planner__field">
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
                <div className="trip-planner__field">
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
            </div>
            <motion.button
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
