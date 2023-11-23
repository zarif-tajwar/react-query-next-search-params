import z from "zod";

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
