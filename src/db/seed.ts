import { db } from "@/db";
import { OrdersInsert, orders } from "@/db/schema";
import { OrderStatus, orderStatuses } from "@/lib/constants";
import { faker } from "@faker-js/faker";
import crypto from "crypto";

async function execute() {
  console.log("⏳ Running ...");

  const start = performance.now();

  const valuesForInsert: OrdersInsert[] = [...Array(1000).keys()].map(() => ({
    fullName: faker.person.fullName(),
    orderId: crypto.randomUUID(),
    orderStatus: faker.helpers.arrayElement(orderStatuses) as OrderStatus,
    totalBill: faker.number.float({ min: 5, max: 1000, precision: 2 }),
    deliveryTime: faker.number.int({ min: 5, max: 60 }),
    orderTimeStampMs: faker.date.between({
      from: "2023-01-01",
      to: "2023-11-01",
    }),
  }));

  const insertedValues = await db
    .insert(orders)
    .values(valuesForInsert)
    .returning();

  console.log(insertedValues);

  const end = performance.now();

  console.log(`✅ Completed in ${end - start}ms`);

  process.exit(0);
}

execute().catch((err) => {
  console.error("❌ Task failed");
  console.error(err);
  process.exit(1);
});
