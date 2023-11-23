export const orderStatuses = [
  "pending",
  "in progress",
  "delivered",
  "cancelled",
];
export type OrderStatus = "pending" | "in progress" | "delivered" | "cancelled";

export const sortSelectOptions = [
  { label: "Order Date (desc)", value: "order-date-desc" },
  { label: "Order Date (asc)", value: "order-date-asc" },
  { label: "Total Price (desc)", value: "price-desc" },
  { label: "Total Price (asc)", value: "price-asc" },
  { label: "Delivery ETA (desc)", value: "delivery-eta-desc" },
  { label: "Delivery ETA (asc)", value: "delivery-eta-asc" },
] as const;

export const defaultSortOption = sortSelectOptions.find(
  (x) => x.value === "order-date-desc"
);

export const sortSelectValues = sortSelectOptions.map((o) => o.value);

export type SortSelectValue = (typeof sortSelectValues)[number];

export const defaultTotalBillRange = [5, 1000];

export const searchParamSeperators = {
  range: "-",
  multipleOption: ",",
  date: "-",
};
