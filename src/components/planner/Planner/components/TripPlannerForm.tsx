import { UseFormReturn, UseFieldArrayReturn } from "react-hook-form";
import { Dictionary } from "@/types/dictionary";
import { TripFormData } from "@/schemas/tripSchema";
import DestinationFields from "./DestinationFields";
import InterestsSelector from "./InterestsSelector";
import BudgetCurrencyFields from "./BudgetCurrencyFields";

interface TripPlannerFormProps {
  form: UseFormReturn<TripFormData & { currency: string }>;
  fieldArray: UseFieldArrayReturn<TripFormData>;
  dict: Dictionary;
  isSubmitting: boolean;
  onSubmit: (data: TripFormData & { currency: string }) => void;
  multiDestination: boolean;
  setMultiDestination: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TripPlannerForm({
  form,
  fieldArray,
  dict,
  isSubmitting,
  onSubmit,
  multiDestination,
  setMultiDestination,
}: TripPlannerFormProps) {
  const { handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="trip-planner__form">
      <DestinationFields
        form={form}
        fieldArray={fieldArray}
        dict={dict}
        multiDestination={multiDestination}
        setMultiDestination={setMultiDestination}
      />

      <InterestsSelector form={form} dict={dict} />

      <BudgetCurrencyFields form={form} dict={dict} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="trip-planner__submit"
      >
        {isSubmitting ? dict.planner.loading : dict.common.generateItinerary}
      </button>
    </form>
  );
}
