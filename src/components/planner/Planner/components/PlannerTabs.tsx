import { Dictionary } from "@/types/dictionary";

export default function PlannerTabs({ dict }: { dict: Dictionary }) {
  return (
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
  );
}
