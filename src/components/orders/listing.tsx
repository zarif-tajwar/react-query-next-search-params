import { getOrdersData } from "@/lib/actions";
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

  return <ListingClient orders={orders} />;
};
export default OrderListing;
