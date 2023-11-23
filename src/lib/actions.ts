"use server";

import { z } from "zod";
import {
  OrderFilterSearchParams,
  OrderFilterSearchParamsServer,
  SearchParamsServer,
} from "./types";
import {
  cleanArraysFromServerSearchParams,
  getCalendarDateRange,
  parseDoubleNumberRangeFromStr,
} from "./validation";
import { orderStatuses, searchParamSeperators } from "./constants";
import { db } from "@/db";
import { orders } from "@/db/schema";

const staticSearchParams = {
  bill_range: "151-652",
  order_status: "pending,delivered,cancelled",
  sort_by: "order-date-asc",
  start_date: "2023-11-16",
  end_date: "2023-11-23",
};

export const getOrdersData = async (searchParams: OrderFilterSearchParams) => {
  // let data = await getData();

  // if (searchParams.bill_range) {
  //   const range = parseDoubleNumberRangeFromStr(searchParams.bill_range);
  //   if (range) {
  //     data = data?.filter(
  //       (order) =>
  //         order.order_total >= range.at(0)! && order.order_total <= range.at(1)!
  //     );
  //   }
  // }

  // if (searchParams.order_status) {
  //   const options = searchParams.order_status
  //     .split(searchParamSeperators.multipleOption)
  //     .filter((value) => orderStatuses.some((x) => x === value));

  //   if (options.length > 0) {
  //     data = data?.filter((order) =>
  //       options.some((x) => x === order.order_status)
  //     );
  //   }
  // }

  // return data;

  let query = await db.select().from(orders);

  console.log(query);

  return query;
};
