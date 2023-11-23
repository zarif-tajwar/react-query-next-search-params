import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const orders = sqliteTable("orders", {
  orderId: integer("order_id").primaryKey(),
  orderTimeStampMs: integer("order_time_stamp_ms", { mode: "timestamp_ms" }),
  totalBill: real("total_bill"),
  deliveryTime: integer("delivery_time"),
  orderStatus: text("order_status", {
    enum: ["pending", "in progress", "delivered", "cancelled"],
  }),
  fullName: text("full_name"),
});
