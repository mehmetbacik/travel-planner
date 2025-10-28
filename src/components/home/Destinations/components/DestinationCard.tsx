"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { DestinationCard as DestinationType } from "@/types/destination";
import { Dictionary } from "@/types/dictionary";

interface DestinationCardProps {
  destination: DestinationType;
  dict: Dictionary;
}

export default function DestinationCard({
  destination,
  dict,
}: DestinationCardProps) {
  const router = useRouter();

  const handleClick = () => {
    const dummyPlan = {
      itineraries: [
        {
          destination: destination.name,
          duration: destination.days,
          dailyPlans: [
            {
              day: 1,
              activities: [
                {
                  time: "09:00",
                  activity: "City Tour",
                  location:
                    dict.destinations.cities[destination.name] + " Center",
                },
              ],
            },
            {
              day: 2,
              activities: [
                {
                  time: "10:00",
                  activity: "Museum Visit",
                  location:
                    dict.destinations.cities[destination.name] + " Center",
                },
              ],
            },
          ],
          weatherForecast: {
            summary: "Sunny",
            temperature: { min: 18, max: 27 },
            precipitation: "10%",
          },
          recommendations: {
            restaurants: [
              { name: destination.name + " Bistro", type: "Food", rating: 4.5 },
            ],
            attractions: [
              {
                name: destination.name + " Museum",
                type: "Culture",
                rating: 4.7,
              },
            ],
          },
        },
      ],
    };

    localStorage.setItem("tripPlan", JSON.stringify(dummyPlan));
    router.push(
      `/tr/results?destination=${encodeURIComponent(destination.name)}`
    );
  };

  return (
    <div className="destinations__card" onClick={handleClick}>
      <div className="destinations__img">
        <Image
          src={destination.img}
          alt={destination.country}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="destinations__info">
        <div className="destinations__headline">
          <span>{dict.destinations.cities[destination.name]},</span>
          <p>{dict.destinations.countries[destination.country]}</p>
        </div>
        <div className="destinations__summary">
          <span>
            {destination.days} {dict.planner.day}
          </span>
          <span>{destination.cost}</span>
        </div>
      </div>
    </div>
  );
}
