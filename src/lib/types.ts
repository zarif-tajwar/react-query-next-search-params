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
