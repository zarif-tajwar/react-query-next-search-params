import OrderListing from "@/components/orders/listing";
import OrderDateRange from "@/components/orders/order-date-range";
import OrderBillRangeSlider from "@/components/orders/order-bill-range";
import OrderSortSelect from "@/components/orders/order-sort-select";
import OrderStatusCheckbox from "@/components/orders/order-status-checkbox";
import { SearchParamsServer } from "@/lib/types";

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParamsServer;
}) {
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
      <OrderListing serverSearchParams={searchParams} />
    </section>
  );
}
