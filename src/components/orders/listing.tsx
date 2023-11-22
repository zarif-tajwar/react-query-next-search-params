import { Orders } from "@/lib/data";
import { capitalize } from "@/lib/util";

const OrderListing = ({ orders }: { orders: Orders }) => {
  return (
    <div className="grid grid-cols-2 gap-8">
      {orders.map((order) => (
        <div key={order.order_id} className="border-b-4 border-neutral-600">
          <span className="w-full block bg-neutral-300 px-7 py-3 text-xl font-bold -mb-0.5 text-neutral-900">
            Order ID : {order.order_id}
          </span>
          <div
            key={order.order_id}
            className="bg-neutral-800 grid grid-cols-2 px-7 py-6 gap-1.5"
          >
            <span className="font-medium">Order Status</span>
            <span>{capitalize(order.order_status)}</span>
            <span className="font-medium">Remaining time</span>
            <span>{order.delivery_time} minutes</span>
            <span className="font-medium">Order Date</span>
            <span>
              {new Intl.DateTimeFormat("en-US").format(order.order_date)}
            </span>
            <span className="font-medium">Customer Name</span>
            <span>{order.customer_name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default OrderListing;
