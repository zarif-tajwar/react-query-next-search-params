import { CalendarDate, parseDate } from "@internationalized/date";
import z from "zod";
import { SearchParamServerValue } from "./types";
import { type Entries } from "type-fest";

export const zOrderStatus = z.enum([
  "pending",
  "in progress",
  "delivered",
  "cancelled",
]);

export const zData = z.object({
  order_id: z.number(),
  order_date: z.string().transform((str) => {
    return new Date(str);
  }),
  order_total: z.number(),
  delivery_time: z.number(),
  order_status: zOrderStatus,
  customer_name: z.string(),
});

export const zDataArr = z.array(zData);

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

  if (start === undefined || end === undefined) return dateRangeValue;

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
