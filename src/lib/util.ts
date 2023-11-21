import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const capitalize = (str: string) =>
  str.at(0)?.toUpperCase() + str.slice(1).toLowerCase();

export const priceFormat = (priceInNumber: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(priceInNumber);
};
