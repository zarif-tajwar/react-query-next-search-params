import { getOrdersData } from "@/lib/actions";
import ListingClient from "./listing-client";

const OrderListing = async () => {
  const orders = (await getOrdersData())?.slice(0, 10) || [];

  return <ListingClient orders={orders} />;
};
export default OrderListing;
