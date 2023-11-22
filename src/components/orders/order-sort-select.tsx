"use client";

import { sortSelectOptions, sortSelectValues } from "@/lib/constants";
import { buttonVariants } from "../ui/button";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import type { Key } from "react-aria-components";
import { cn } from "@/lib/util";
import { useQueryState } from "next-usequerystate";

const OrderSortSelect = () => {
  const defaultSortValue = sortSelectOptions[0].value;
  const [sortSelectParamState, setSortSelectParamState] =
    useQueryState("sort_by");

  const isParamValid =
    sortSelectOptions.findIndex((v) => v.value === sortSelectParamState) !== -1;

  const selected2: Key =
    sortSelectParamState && isParamValid
      ? sortSelectParamState
      : defaultSortValue;

  const handleChange = (changedValue: Key) => {
    const newParamValue =
      changedValue === defaultSortValue ? null : (changedValue as string);
    setSortSelectParamState(newParamValue);
  };

  return (
    <Select
      // selectedKey={selected}
      defaultSelectedKey={selected2}
      onSelectionChange={handleChange}
      className="flex flex-col"
    >
      {({ isOpen }) => (
        <>
          <Label className="mb-4 font-semibold text-2xl inline-block">
            Sort by
          </Label>
          <Button
            className={cn(
              buttonVariants(),
              "min-w-[12rem] min-h-[3rem] justify-between border-none outline-none",
              isOpen && "opacity-70"
            )}
          >
            <SelectValue />
            <span className="inline-block -mr-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Button>
          <Popover offset={2} className={"shadow-2xl"}>
            <ListBox
              items={sortSelectOptions}
              className="bg-neutral-800 w-[12rem] p-2"
            >
              {sortSelectOptions.map((option) => {
                return (
                  <ListBoxItem
                    key={option.value}
                    id={option.value}
                    className={({ isFocused }) =>
                      cn(
                        "border-none outline-none cursor-pointer",
                        "p-2",
                        isFocused && "bg-neutral-200 text-neutral-900"
                      )
                    }
                  >
                    {option.label}
                  </ListBoxItem>
                );
              })}
            </ListBox>
          </Popover>
        </>
      )}
    </Select>
  );
};
export default OrderSortSelect;
