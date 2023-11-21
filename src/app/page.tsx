import OrderListing from "@/components/orders/listing";
import OrderDateRange from "@/components/orders/order-date-range";
import OrderBillRangeSlider from "@/components/orders/order-bill-range";
import OrderSortSelect from "@/components/orders/order-sort-select";
import OrderStatusCheckbox from "@/components/orders/order-status-checkbox";
import { Button } from "@/components/ui/button";
import { getData } from "@/lib/data";

export default async function Home() {
  const data = (await getData())?.slice(0, 10);
  return (
    <section>
      <div className="w-full flex items-start justify-start gap-x-12 gap-y-10 flex-wrap mb-36">
        <div>
          <OrderStatusCheckbox />
        </div>
        <div>
          <OrderSortSelect />
        </div>
        <div>
          <OrderDateRange />
        </div>
        <div>
          <OrderBillRangeSlider />
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-4xl mb-10">Filtered Results</h2>
        {data && <OrderListing orders={data} />}
      </div>
    </section>
  );
}
