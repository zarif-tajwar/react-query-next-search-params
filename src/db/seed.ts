import { db } from "@/db";
import { OrdersInsert, orders } from "@/db/schema";
import { OrderStatus, orderStatuses } from "@/lib/constants";
import { faker } from "@faker-js/faker";
import crypto from "crypto";

export const generateRandomDate = (from: string | Date, to: string | Date) => {
  const dateWithTimeComponents = faker.date.between({
    from,
    to,
  });
  const year = dateWithTimeComponents.getFullYear();
  const month = dateWithTimeComponents.getMonth() + 1;
  const day = dateWithTimeComponents.getDate();
  return new Date(`${year}-${month}-${day}`);
};

const seed = async () => {
  const valuesForInsert: OrdersInsert[] = [...Array(1000).keys()].map(() => {
    const date = generateRandomDate("2023-01-01", "2023-11-01");
    console.log(date.toISOString());
    return {
      fullName: faker.person.fullName(),
      orderId: crypto.randomUUID(),
      orderStatus: faker.helpers.arrayElement(orderStatuses) as OrderStatus,
      totalBill: faker.number.float({ min: 5, max: 1000, precision: 2 }),
      deliveryTime: faker.number.int({ min: 5, max: 60 }),
      orderTimeStampMs: date,
    };
  });

  const insertedValues = await db
    .insert(orders)
    .values(valuesForInsert)
    .returning();

  console.log(insertedValues);
};

const clean = async () => {
  await db.delete(orders);
};

async function execute() {
  console.log("⏳ Running ...");

  const start = performance.now();

  // await seed();

  // await clean();

  const end = performance.now();

  console.log(`✅ Completed in ${end - start}ms`);

  process.exit(0);
}

execute().catch((err) => {
  console.error("❌ Task failed");
  console.error(err);
  process.exit(1);
});
