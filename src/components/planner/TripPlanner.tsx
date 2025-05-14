"use client";

import { motion } from "framer-motion";
import { Dictionary } from "@/types/dictionary";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripSchema, TripFormData } from "@/schemas/tripSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

      // Store the result in localStorage for the results page
      localStorage.setItem("tripPlan", JSON.stringify(result));

      // Redirect to results page
      router.push(
        `/results?destination=${encodeURIComponent(data.destination)}`
      );
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to generate trip plan. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            {dict.common.planYourTrip}
          </h2>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {dict.common.destination}
              </label>
              <input
                {...register("destination")}
                type="text"
                placeholder={dict.planner.destinationPlaceholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.destination && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.destination.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {dict.common.interests}
              </label>
              <div className="grid grid-cols-2 gap-4">
                {interestOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      value={option.value}
                      {...register("interests")}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.interests && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.interests.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {dict.common.travelDates}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    {...register("startDate")}
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.startDate.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("endDate")}
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.endDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.endDate.message}
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
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
