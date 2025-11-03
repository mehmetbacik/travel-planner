import { UseFormReturn, UseFieldArrayReturn } from "react-hook-form";
import { TripFormData } from "@/schemas/tripSchema";
import { Dictionary } from "@/types/dictionary";
import getLocalizedError from "../helpers/getLocalizedError";
import { Icon } from "@iconify/react";

interface Props {
  form: UseFormReturn<TripFormData & { currency: string }>;
  fieldArray: UseFieldArrayReturn<TripFormData>;
  dict: Dictionary;
  multiDestination: boolean;
  setMultiDestination: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DestinationFields({
  form,
  fieldArray,
  dict,
  multiDestination,
  setMultiDestination,
}: Props) {
  const { register, formState: { errors } } = form;
  const { fields, append, remove } = fieldArray;

  return (
    <div className="trip-planner__field">
      <div className="trip-planner__destination-header">
        <label className="trip-planner__label">{dict.common.destination}</label>
        <div className="trip-planner__multi-destination-bar">
          <div
            className={`trip-planner__toggle${
              multiDestination ? " trip-planner__toggle--active" : ""
            }`}
            onClick={() => setMultiDestination((v) => !v)}
            role="button"
            tabIndex={0}
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
              <Icon icon="mdi:close" width="20" height="20" />
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
          + {dict.common.addDestination}
        </button>
      )}
    </div>
  );
}
