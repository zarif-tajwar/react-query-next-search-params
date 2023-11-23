import { getDataFromDb, getOrdersData } from "@/lib/actions";
import ListingClient from "./listing-client";
import { OrderFilterSearchParamsServer, SearchParamsServer } from "@/lib/types";
import { cleanArraysFromServerSearchParams } from "@/lib/validation";

const OrderListing = async ({
  serverSearchParams,
}: {
  serverSearchParams: SearchParamsServer;
}) => {
  const searchParams = serverSearchParams as OrderFilterSearchParamsServer;
  const cleanSearchParams = cleanArraysFromServerSearchParams(searchParams);
  const orders = (await getOrdersData(cleanSearchParams)) || [];

  const dataDB = await getDataFromDb();

  console.log(dataDB, "SQLITE");

  return <ListingClient orders={orders} />;
};
export default OrderListing;
