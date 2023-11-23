"use client";

import { OrdersSelect } from "@/db/schema";
import { Orders } from "@/lib/types";
import { capitalize, priceFormat } from "@/lib/util";

const ListingClient = ({ orders }: { orders: OrdersSelect[] }) => {
  return (
    <div>
      <div className="mb-10 flex gap-2 items-end justify-between">
        <div className="flex items-end gap-2">
          <h2 className="font-semibold text-4xl inline-block">
            Filtered Results
          </h2>
          <span className="inline-block pb-1 text-neutral-400">
            {orders.length}
          </span>
        </div>
        <span className="text-neutral-400 pb-1">Query Took 100ms</span>
      </div>
      <div className="grid grid-cols-2 gap-8">
        {orders.map((order) => (
          <div key={order.orderId} className="border-b-4 border-neutral-600">
            <span className="w-full block bg-neutral-300 px-7 py-3 text-xl font-bold -mb-0.5 text-neutral-900">
              Order ID : {"#" + order.orderId.slice(0, 7).toUpperCase()}
            </span>
            <div
              key={order.orderId}
              className="bg-neutral-800 grid grid-cols-2 px-7 py-6 gap-1.5"
            >
              <span className="font-medium">Order Status</span>
              <span>{capitalize(order.orderStatus)}</span>
              <span className="font-medium">Remaining time</span>
              <span>{order.deliveryTime} minutes</span>
              <span className="font-medium">Total Bill</span>
              <span>{priceFormat(order.totalBill)}</span>
              <span className="font-medium">Order Date</span>
              <span>
                {new Intl.DateTimeFormat("en-US").format(
                  order.orderTimeStampMs
                )}
              </span>
              <span className="font-medium">Customer Name</span>
              <span>{order.fullName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ListingClient;
