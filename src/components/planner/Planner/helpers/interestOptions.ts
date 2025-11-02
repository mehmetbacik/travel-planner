import { Dictionary } from "@/types/dictionary";

export const interestOptions = (dict: Dictionary) => [
  { value: "culture", label: dict.common.interestOptions.culture },
  { value: "nature", label: dict.common.interestOptions.nature },
  { value: "food", label: dict.common.interestOptions.food },
  { value: "shopping", label: dict.common.interestOptions.shopping },
  { value: "nightlife", label: dict.common.interestOptions.nightlife },
  { value: "relaxation", label: dict.common.interestOptions.relaxation },
  { value: "adventure", label: dict.common.interestOptions.adventure },
  { value: "art", label: dict.common.interestOptions.art },
];
