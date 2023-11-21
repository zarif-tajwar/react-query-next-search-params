import * as fs from "fs";
import z from "zod";

export const orderStatuses = ["pending", "in progress", "delivered"] as const;

const zOrderStatus = z.enum(orderStatuses);

type OrderStatus = (typeof orderStatuses)[number];

const zData = z.object({
  order_id: z.number(),
  order_date: z.string().transform((str) => {
    return new Date(str);
  }),
  order_total: z.number(),
  delivery_time: z.number(),
  order_status: zOrderStatus,
  customer_name: z.string(),
});

const zDataArr = z.array(zData);

export const getData = async () => {
  const jsonString = fs.readFileSync("src/lib/data.json", {
    encoding: "utf-8",
    flag: "r",
  });

  const jsonData: unknown = JSON.parse(jsonString);

  const zParse = zDataArr.safeParse(jsonData);

  if (zParse.success) {
    return zParse.data;
  }
  if (zParse.error) {
    console.log(zParse.error);
  }

  return undefined;
};
