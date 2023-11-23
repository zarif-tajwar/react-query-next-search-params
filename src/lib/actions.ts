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
import {
  OrderStatus,
  SortSelectValue,
  defaultSortOption,
  orderStatuses,
  searchParamSeperators,
  sortSelectValues,
} from "./constants";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { SQL, and, between, inArray, sql } from "drizzle-orm";
import { getLocalTimeZone } from "@internationalized/date";

const staticSearchParams = {
  bill_range: "151-652",
  order_status: "pending,delivered,cancelled",
  sort_by: "order-date-asc",
  start_date: "2023-11-16",
  end_date: "2023-11-23",
};

const sortMethods: Record<SortSelectValue, SQL> = {
  "price-asc": sql`${orders.totalBill} NULLS LAST, ${orders.orderId}`,
  "price-desc": sql`${orders.totalBill} DESC NULLS LAST, ${orders.orderId}`,
  "delivery-eta-asc": sql`${orders.deliveryTime} NULLS LAST, ${orders.orderId}`,
  "delivery-eta-desc": sql`${orders.deliveryTime} DESC NULLS LAST, ${orders.orderId}`,
  "order-date-asc": sql`${orders.orderTimeStampMs} NULLS LAST, ${orders.orderId}`,
  "order-date-desc": sql`${orders.orderTimeStampMs} DESC NULLS LAST, ${orders.orderId}`,
};

export const getOrdersData = async (searchParams: OrderFilterSearchParams) => {
  const conditionals: SQL[] = [];
  let sortMethod = sortMethods[defaultSortOption?.value!];

  if (searchParams.bill_range) {
    const range = parseDoubleNumberRangeFromStr(searchParams.bill_range);
    if (range) {
      const [min, max] = range;
      if (min && max) conditionals.push(between(orders.totalBill, min, max));
    }
  }

  if (searchParams.order_status) {
    const options = searchParams.order_status
      .split(searchParamSeperators.multipleOption)
      .filter((value) =>
        orderStatuses.some((x) => x === value)
      ) as OrderStatus[];

    if (options.length > 0) {
      conditionals.push(inArray(orders.orderStatus, options));
    }
  }

  if (searchParams.start_date && searchParams.end_date) {
    const dateRange = getCalendarDateRange(
      searchParams.start_date,
      searchParams.end_date
    );
    if (dateRange) {
      conditionals.push(
        between(
          orders.orderTimeStampMs,
          new Date(searchParams.start_date),
          new Date(searchParams.end_date)
        )
      );
    }
  }

  if (
    searchParams.sort_by &&
    sortSelectValues.some((x) => x === searchParams.sort_by)
  ) {
    const sortKey = searchParams.sort_by as SortSelectValue;
    sortMethod = sortMethods[sortKey];
  }

  let query = db
    .select()
    .from(orders)
    .where(and(...conditionals))
    .orderBy(sortMethod);

  const data = await query;

  return data;
};
