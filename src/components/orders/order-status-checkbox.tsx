"use client";

import { capitalize, cn } from "@/lib/util";
import { buttonVariants } from "../ui/button";
import { OrderStatus, orderStatuses } from "@/lib/constants";
import { CheckboxGroup, Checkbox, Label } from "react-aria-components";
import { useState } from "react";

const OrderStatusCheckbox = () => {
  const [selected, setSelected] = useState<OrderStatus[]>([
    "delivered",
    "in progress",
    "pending",
  ]);
  return (
    <CheckboxGroup
      value={selected}
      onChange={(value) => setSelected(value as OrderStatus[])}
      className="flex flex-col"
    >
      <Label className="mb-4 font-semibold text-2xl inline-block">
        Order Status
      </Label>
      <div className="flex items-center justify-start gap-2.5 flex-wrap">
        {orderStatuses.map((status) => {
          return (
            <Checkbox
              key={status}
              id={status}
              value={status}
              className={({ isSelected }) =>
                cn(
                  buttonVariants({
                    variant: isSelected ? "filled" : "unchecked",
                  }),
                  "cursor-pointer group min-h-[3rem]",
                  isSelected && "hover:bg-neutral-300"
                )
              }
            >
              {({ isSelected }) => (
                <>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "inline-block p-1 ring-1 -ml-2 transition-colors duration-100",
                      isSelected && "ring-neutral-900 ring-1 bg-neutral-200",
                      !isSelected &&
                        "bg-transparent ring-neutral-300 text-neutral-300"
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>{capitalize(status)}</span>
                </>
              )}
            </Checkbox>
          );
        })}
      </div>
    </CheckboxGroup>
  );
};
export default OrderStatusCheckbox;
