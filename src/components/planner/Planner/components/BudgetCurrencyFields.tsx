import { UseFormReturn } from "react-hook-form";
import { TripFormData } from "@/schemas/tripSchema";
import { Dictionary } from "@/types/dictionary";
import getLocalizedError from "../helpers/getLocalizedError";

export default function BudgetCurrencyFields({
  form,
  dict,
}: {
  form: UseFormReturn<TripFormData & { currency: string }>;
  dict: Dictionary;
}) {
  const { register, formState: { errors } } = form;

  const currencyOptions = [
    { value: "TRY", label: "₺ (TRY)" },
    { value: "USD", label: "$ (USD)" },
    { value: "EUR", label: "€ (EUR)" },
    { value: "GBP", label: "£ (GBP)" },
  ];

  return (
    <div className="trip-planner__field">
      <div className="trip-planner__date-grid">
        <div className="trip-planner__field">
          <label className="trip-planner__label">{dict.common.budget}</label>
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
  );
}
