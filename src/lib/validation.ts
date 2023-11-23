import { CalendarDate, parseDate } from "@internationalized/date";
import z from "zod";
import { SearchParamServerValue } from "./types";
import { type Entries } from "type-fest";
import { searchParamSeperators } from "./constants";

export const safeParseDate = (str: string) => {
  let out: CalendarDate | undefined = undefined;
  try {
    out = parseDate(str);
  } catch (error) {
    console.error(
      `Invalid date string: ${str}. Please input valid ISO-8601 date string.`
    );
  }
  return out;
};

export const getCalendarDateRange = (start?: string, end?: string) => {
  let dateRangeValue: { start: CalendarDate; end: CalendarDate } | undefined =
    undefined;

  if (!start || !end) return dateRangeValue;

  const startDate = safeParseDate(start);
  const endDate = safeParseDate(end);

  if (startDate && endDate) {
    if (endDate.compare(startDate) < 0) {
      console.error(
        `Start Date (${startDate.toString()}) can't be greater than End Date (${end.toString()})`
      );
    } else {
      dateRangeValue = { start: startDate, end: endDate };
    }
  }

  return dateRangeValue;
};

export const cleanArraysFromServerSearchParams = <
  T extends Record<string, SearchParamServerValue>,
  R extends Record<keyof T, string | undefined>
>(
  searchParams: T
): R => {
  const entries = Object.entries(searchParams);
  const filteredEntries: [keyof T, string | undefined][] = entries.map(
    ([key, value]) => {
      if (Array.isArray(value)) {
        return [key, value.at(0)];
      }
      return [key, value];
    }
  );
  return Object.fromEntries(filteredEntries) as R;
};

export const parseDoubleNumberRangeFromStr = (
  str: string | null | undefined,
  defaultRangeValue?: number[]
) => {
  const parsedRange = str
    ?.split(searchParamSeperators.range)
    .map((str) => Number(str))
    .filter((num) => !Number.isNaN(num));

  let rangeValue = defaultRangeValue;

  if (!parsedRange) return rangeValue;

  if (parsedRange !== undefined && parsedRange.length !== 0) {
    if (defaultRangeValue) {
      if (
        parsedRange.length === 1 &&
        parsedRange.at(0)! <= defaultRangeValue.at(1)! &&
        parsedRange.at(0)! >= defaultRangeValue.at(0)!
      ) {
        rangeValue = [parsedRange.at(0)!, parsedRange.at(0)!];
      } else if (
        parsedRange.length === 2 &&
        parsedRange.at(0)! <= parsedRange.at(1)! &&
        parsedRange.at(0)! >= defaultRangeValue.at(0)! &&
        parsedRange.at(1)! <= defaultRangeValue.at(1)!
      ) {
        rangeValue = [parsedRange.at(0)!, parsedRange.at(1)!];
      }
    } else {
      if (parsedRange.length === 1) {
        rangeValue = [parsedRange.at(0)!, parsedRange.at(0)!];
      } else if (
        parsedRange.length === 2 &&
        parsedRange.at(0)! <= parsedRange.at(1)!
      ) {
        rangeValue = [parsedRange.at(0)!, parsedRange.at(1)!];
      }
    }
  }

  return rangeValue;
};
