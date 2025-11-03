"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dictionary } from "@/types/dictionary";
import { TripPlan } from "@/types/results";
import { useRouter, usePathname } from "next/navigation";
import { usePDFGenerator } from "@/utils/pdfGenerator";
import TripResultsHeader from "./components/TripResultsHeader";
import TripResultsSummary from "./components/TripResultsSummary";
import TripResultsCard from "./components/TripResultsCard";
import EmptyState from "./components/EmptyState";
import LoadingState from "./components/LoadingState";

interface TripResultsProps {
  dict: Dictionary;
  destination: string;
}

export default function TripResults({ dict, destination }: TripResultsProps) {
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { downloadPDF } = usePDFGenerator();
  const currentLang = pathname.split("/")[1] || "en";

  useEffect(() => {
    const storedPlan = localStorage.getItem("tripPlan");
    if (storedPlan) {
      try {
        setTripPlan(JSON.parse(storedPlan));
      } catch (error) {
        console.error("Error parsing trip plan:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const handleDownloadPDF = async () => {
    try {
      const elementId = "trip-results-content";
      const fileName = `trip-plan-${destination
        .replace(/\s+/g, "-")
        .toLowerCase()}`;
      const title = `${dict.planner.customizedItinerary} - ${destination}`;
      await downloadPDF(elementId, fileName, title);
    } catch (error) {
      console.error("PDF download error:", error);
    }
  };

  if (isLoading) return <LoadingState dict={dict} />;
  if (!tripPlan || tripPlan.itineraries.length === 0)
    return <EmptyState dict={dict} router={router} currentLang={currentLang} />;

  return (
    <div className="trip-results" id="trip-results-content">
      <div className="container">
        <TripResultsHeader dict={dict} onDownload={handleDownloadPDF} />
        {tripPlan.formData && (
          <TripResultsSummary dict={dict} formData={tripPlan.formData} />
        )}
        {tripPlan.itineraries.map((itinerary, idx) => (
          <TripResultsCard
            key={idx}
            itinerary={itinerary}
            dict={dict}
            delay={0.2 + idx * 0.1}
          />
        ))}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + tripPlan.itineraries.length * 0.1 }}
          className="trip-results__actions"
        >
          <button
            onClick={() => router.push(`/${currentLang}/planner`)}
            className="trip-results__action-button trip-results__action-button--secondary"
          >
            {dict.common.planYourTrip || "Create New Plan"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
