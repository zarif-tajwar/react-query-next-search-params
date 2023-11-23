export type SearchParamServerValue = string | string[] | undefined;

export type SearchParamsServer = {
  [key: string]: SearchParamServerValue;
};

export const orderFilterSearchParamKeys = [
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
