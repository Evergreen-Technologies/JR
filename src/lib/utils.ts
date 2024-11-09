import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: (string | ClassValue)[]) {
  if (inputs.every((input) => typeof input === "string")) {
    return inputs.filter(Boolean).join(" ");
  } else {
    return twMerge(clsx(inputs));
  }
}
