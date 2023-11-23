"use server";

import { getData } from "./data";

export const getOrdersData = async () => {
  return await getData();
};
