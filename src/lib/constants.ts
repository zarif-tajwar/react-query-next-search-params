export const orderStatuses = ["pending", "in progress", "delivered"] as const;
export type OrderStatus = (typeof orderStatuses)[number];
