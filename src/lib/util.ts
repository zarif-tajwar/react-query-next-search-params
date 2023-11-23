import { clsx, type ClassValue } from "clsx";
import { DateRange } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { searchParamSeperators } from "./constants";
import { CalendarDate, parseDate } from "@internationalized/date";
import { faker } from "@faker-js/faker";

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

export const quickSortByReference = <T>(
  values: T[],
  referenceValues: T[]
): T[] => {
  if (values.length <= 1) {
    return values;
  }

  const pivotIndex = Math.floor(values.length / 2);
  const pivot = values[pivotIndex] as T;

  const less = values.filter((value, index) => {
    if (index === pivotIndex) return false;
    return referenceValues.indexOf(value) < referenceValues.indexOf(pivot);
  });

  const greater = values.filter((value, index) => {
    if (index === pivotIndex) return false;
    return referenceValues.indexOf(value) > referenceValues.indexOf(pivot);
  });

  return [
    ...quickSortByReference(less, referenceValues),
    pivot,
    ...quickSortByReference(greater, referenceValues),
  ];
};

export const wait = async (delayInMs: number) =>
  new Promise((res) => setInterval(res, delayInMs));
