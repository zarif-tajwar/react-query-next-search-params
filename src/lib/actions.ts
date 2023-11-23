"use server";

import { z } from "zod";
import { getData } from "./data";
import {
  OrderFilterSearchParams,
  OrderFilterSearchParamsServer,
  SearchParamsServer,
} from "./types";
import {
  cleanArraysFromServerSearchParams,
  getCalendarDateRange,
} from "./validation";

const staticSearchParams = {
  bill_range: "151-652",
  order_status: "pending,delivered,cancelled",
  sort_by: "order-date-asc",
  start_date: "2023-11-16",
  end_date: "2023-11-23",
};

export const getOrdersData = async (searchParams: OrderFilterSearchParams) => {
  console.log(searchParams, "SEARCH PARAMS");

  const dateRange = getCalendarDateRange(
    searchParams.start_date,
    searchParams.end_date
  );

  console.log(dateRange?.start.toString());
  console.log(dateRange?.end.toString());

  return await getData();
};
