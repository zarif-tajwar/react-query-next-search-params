export const orderStatuses = [
  "pending",
  "in progress",
  "delivered",
  "cancelled",
];
export type OrderStatus = "pending" | "in progress" | "delivered" | "cancelled";

export const sortSelectOptions = [
  { label: "Total Price (asc)", value: "price-asc" },
  { label: "Total Price (desc)", value: "price-desc" },
  { label: "Delivery ETA (asc)", value: "delivery-eta-asc" },
  { label: "Delivery ETA (desc)", value: "delivery-eta-desc" },
  { label: "Order Date (asc)", value: "order-date-asc" },
  { label: "Order Date (desc)", value: "order-date-desc" },
] as const;

export const sortSelectValues = sortSelectOptions.map((o) => o.value);

export type SortSelectValue = (typeof sortSelectValues)[number];

export const defaultTotalBillRange = [5, 1000];

export const searchParamSeperators = {
  range: "-",
  multipleOption: ",",
  date: "-",
};
