"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripSchema, TripFormData } from "@/schemas/tripSchema";
import { getDummyTripPlan } from "../../results/dummyTripPlan";
import { Dictionary } from "@/types/dictionary";
import PlannerTabs from "./components/PlannerTabs";
import TripPlannerForm from "./components/TripPlannerForm";
import ErrorMessage from "./components/ErrorMessage";
import { z } from "zod";

interface TripPlannerProps {
  dict: Dictionary;
  lang: string;
}

export default function TripPlanner({ dict, lang }: TripPlannerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [multiDestination, setMultiDestination] = useState(false);
  const router = useRouter();

  const form = useForm<TripFormData & { currency: string }>({
    resolver: zodResolver(
      tripSchema.extend({
        currency: z.string().min(1, "validation.currency.required"),
      })
    ),
    defaultValues: {
      destinations: [{ destination: "", startDate: "", endDate: "" }],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "destinations",
  });

  const onSubmit = async (data: TripFormData & { currency: string }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = getDummyTripPlan(dict, data);
      localStorage.setItem("tripPlan", JSON.stringify(result));

      router.push(
        `/${lang}/results?destination=${encodeURIComponent(
          data.destinations[0].destination
        )}`
      );
    } catch {
      setError(dict.planner.errors || "Failed to generate trip plan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="trip-planner">
      <div className="trip-planner__body container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <PlannerTabs dict={dict} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="trip-planner__card"
        >
          {error && <ErrorMessage message={error} />}
          <TripPlannerForm
            form={form}
            fieldArray={fieldArray}
            dict={dict}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            multiDestination={multiDestination}
            setMultiDestination={setMultiDestination}
          />
        </motion.div>
      </div>
    </section>
  );
}
