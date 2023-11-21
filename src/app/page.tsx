import OrderListing from "@/components/orders/listing";
import OrderDateRange from "@/components/orders/order-date-range";
import OrderSortSelect from "@/components/orders/order-sort-select";
import OrderStatusCheckbox from "@/components/orders/order-status-checkbox";
import { Button } from "@/components/ui/button";
import { getData } from "@/lib/data";

export default async function Home() {
  const data = (await getData())?.slice(0, 10);
  return (
    <section>
      <div className="w-full flex items-start justify-start gap-x-16 gap-y-8 flex-wrap mb-36">
        <OrderStatusCheckbox />
        <div>
          <h3 className="mb-4 font-semibold text-2xl">Sort by</h3>
          <OrderSortSelect />
        </div>
        <div>
          <h3 className="mb-4 font-semibold text-2xl">Date Range</h3>
          <OrderDateRange />
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-4xl mb-10">Filtered Results</h2>
        {data && <OrderListing orders={data} />}
      </div>
    </section>
  );
}
