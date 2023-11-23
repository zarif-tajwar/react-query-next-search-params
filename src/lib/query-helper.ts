import { getOrdersData } from "./actions";
import { OrderFilterSearchParams } from "./types";

export const getFilterQueryKey = (
  filteredSearchParams: OrderFilterSearchParams
) => ["ordersFilter", filteredSearchParams];

export const filterQueryFunc = async (ctx: {
  queryKey: (string | OrderFilterSearchParams)[];
  signal: AbortSignal;
  meta: Record<string, unknown> | undefined;
}) => {
  const start = performance.now();
  const targetParam = ctx.queryKey[1];
  const data = await getOrdersData(targetParam as OrderFilterSearchParams);
  const perf = performance.now() - start;
  return { data: data || [], perf };
};
