import { UseFormReturn } from "react-hook-form";
import { TripFormData } from "@/schemas/tripSchema";
import { Dictionary } from "@/types/dictionary";
import getLocalizedError from "../helpers/getLocalizedError";
import { interestOptions } from "../helpers/interestOptions";

interface Props {
  form: UseFormReturn<TripFormData>;
  dict: Dictionary;
}

export default function InterestsSelector({ form, dict }: Props) {
  const { register, formState: { errors } } = form;

  return (
    <div className="trip-planner__field">
      <label className="trip-planner__label">{dict.common.interests}</label>
      <div className="trip-planner__checkbox-grid">
        {interestOptions(dict).map((opt) => (
          <label key={opt.value} className="trip-planner__checkbox-label">
            <input
              type="checkbox"
              value={opt.value}
              {...register("interests")}
              className="trip-planner__checkbox"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      {errors.interests && (
        <p className="trip-planner__error-text">
          {getLocalizedError(errors.interests.message, dict)}
        </p>
      )}
    </div>
  );
}
