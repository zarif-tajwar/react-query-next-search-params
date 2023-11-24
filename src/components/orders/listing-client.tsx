"use client";

import { OrdersSelect } from "@/db/schema";
import { getOrdersData } from "@/lib/actions";
import {
  OrderFilterSearchParamKeys,
  OrderFilterSearchParams,
  orderFilterSearchParamKeys,
} from "@/lib/types";
import { capitalize, priceFormat, wait } from "@/lib/util";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ParserBuilder,
  parseAsString,
  useQueryStates,
} from "next-usequerystate";
import LoadingSpinner from "../ui/loading-spinner";
import { filterQueryFunc, getFilterQueryKey } from "@/lib/query-helper";

const ListingClient = () => {
  const searchParamsClientSchema = Object.fromEntries(
    orderFilterSearchParamKeys.map((key) => [key, parseAsString])
  ) as Record<OrderFilterSearchParamKeys, ParserBuilder<string>>;

  const [searchParamsClient] = useQueryStates(searchParamsClientSchema);

  const filteredSearchParams = Object.fromEntries(
    Object.entries(searchParamsClient).filter(([_, value]) => value !== null)
  ) as OrderFilterSearchParams;

  const { data: queryData, isLoading } = useQuery({
    queryKey: getFilterQueryKey(filteredSearchParams),
    queryFn: filterQueryFunc,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const orders = queryData?.data;

  return (
    <div>
      {isLoading && (
        <div className="min-h-[19rem] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && orders && (
        <>
          <div className="mb-10 flex gap-2 items-end justify-between">
            <div className="flex items-end gap-2">
              <h2 className="font-semibold text-4xl inline-block">
                Filtered Results
              </h2>
              <span className="inline-block pb-1 text-neutral-400">
                {orders.length}
              </span>
            </div>
            <span className="text-neutral-400 pb-1">
              Database Query Took {Math.round(queryData.perf)}ms
            </span>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="border-b-4 border-neutral-600"
              >
                <div className="w-full flex gap-3 bg-neutral-300 px-7 py-3 text-xl font-bold -mb-0.5 text-neutral-900">
                  <dt>Order ID</dt>
                  <dd>{"#" + order.orderId.slice(0, 7).toUpperCase()}</dd>
                </div>
                <div
                  key={order.orderId}
                  className="bg-neutral-800 grid grid-cols-2 px-7 py-6 gap-1.5"
                >
                  <dt className="font-medium">Order Status</dt>
                  <dd>{capitalize(order.orderStatus)}</dd>
                  <dt className="font-medium">Remaining time</dt>
                  <dd>{order.deliveryTime} minutes</dd>
                  <dt className="font-medium">Total Bill</dt>
                  <dd>{priceFormat(order.totalBill)}</dd>
                  <dt className="font-medium">Order Date</dt>
                  <dd>
                    {new Intl.DateTimeFormat("en-US").format(
                      order.orderTimeStampMs
                    )}
                  </dd>
                  <dt className="font-medium">Customer Name</dt>
                  <dd>{order.fullName}</dd>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default ListingClient;
