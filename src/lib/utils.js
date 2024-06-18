import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const ROLES = {
  CLIENT: "Client",
  SALESPERSON: "Salesperson",
  ADMINISTRATOR: "Administrator",
};