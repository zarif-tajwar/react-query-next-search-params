import { z } from "zod";
import { zDataArr } from "./validation";

export type Orders = z.infer<typeof zDataArr>;

export type SearchParamServerValue = string | string[] | undefined;

export type SearchParamsServer = {
  [key: string]: SearchParamServerValue;
};

const orderFilterSearchParamKeys = [
  "bill_range",
  "order_status",
  "sort_by",
  "start_date",
  "end_date",
] as const;

export type OrderFilterSearchParamKeys =
  (typeof orderFilterSearchParamKeys)[number];

export type OrderFilterSearchParamsServer = Record<
  OrderFilterSearchParamKeys,
  SearchParamServerValue
>;

export type OrderFilterSearchParams = Record<
  OrderFilterSearchParamKeys,
  string | undefined
>;

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };
type Cast<X, Y> = X extends Y ? X : Y;
export type FromEntries<T> = T extends [infer Key, any][]
  ? { [K in Cast<Key, string>]: Extract<ArrayElement<T>, [K, any]>[1] }
  : { [key in string]: any };

export type FromEntriesWithReadOnly<T> = FromEntries<DeepWriteable<T>>;
