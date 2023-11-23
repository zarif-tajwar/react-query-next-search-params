import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const orders = sqliteTable("orders", {
  orderId: text("order_id").primaryKey(),
  orderTimeStampMs: integer("order_time_stamp_ms", {
    mode: "timestamp_ms",
  }).notNull(),
  totalBill: real("total_bill").notNull(),
  deliveryTime: integer("delivery_time").notNull(),
  orderStatus: text("order_status", {
    enum: ["pending", "in progress", "delivered", "cancelled"],
  }).notNull(),
  fullName: text("full_name").notNull(),
});

export type OrdersInsert = typeof orders.$inferInsert;
export type OrdersSelect = typeof orders.$inferSelect;
