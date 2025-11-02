import { Dictionary } from "@/types/dictionary";

export default function getLocalizedError(
  message: string | undefined,
  dict: Dictionary
) {
  if (!message) return "";

  if (dict.common.validation?.[message as keyof typeof dict.common.validation])
    return dict.common.validation[
      message as keyof typeof dict.common.validation
    ];

  if (message.includes(".")) {
    const last = message.split(".").pop()!;
    if (dict.common.validation?.[last as keyof typeof dict.common.validation])
      return dict.common.validation[last as keyof typeof dict.common.validation];
  }

  if (message === "Expected array, received boolean")
    return dict.common.validation?.expectedArrayReceivedBoolean || message;

  if (message === "Expected number, received nan")
    return dict.common.validation?.["budget.nan"] || message;

  return message;
}
