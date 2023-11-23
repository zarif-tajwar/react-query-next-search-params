import ListingClient from "./listing-client";
import {
  OrderFilterSearchParams,
  OrderFilterSearchParamsServer,
  SearchParamsServer,
} from "@/lib/types";
import { cleanArraysFromServerSearchParams } from "@/lib/validation";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { filterQueryFunc, getFilterQueryKey } from "@/lib/query-helper";

const OrderListing = async ({
  serverSearchParams,
}: {
  serverSearchParams: SearchParamsServer;
}) => {
  const searchParams = serverSearchParams as OrderFilterSearchParamsServer;
  const filteredSearchParams: OrderFilterSearchParams =
    cleanArraysFromServerSearchParams(searchParams);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: getFilterQueryKey(filteredSearchParams),
    queryFn: filterQueryFunc,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListingClient />
    </HydrationBoundary>
  );
};
export default OrderListing;
