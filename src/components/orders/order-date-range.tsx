"use client";

import { cn } from "@/lib/util";
import { CalendarIcon, ChevronLeft, ChevronUpDown } from "../icons";
import { buttonVariants } from "../ui/button";
import {
  Button,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DateRangePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
  RangeCalendar,
} from "react-aria-components";
import { useState } from "react";
import { parseDate, type CalendarDate } from "@internationalized/date";
import { parseAsString, useQueryStates } from "next-usequerystate";

const OrderDateRange = () => {
  const [date, setDate] = useState({
    start: parseDate("2020-02-03"),
    end: parseDate("2020-02-08"),
  });
  const [dateRangeParamState, setDateRangeParamState] = useQueryStates({
    start_date: parseAsString,
    end_date: parseAsString,
  });
  const dateRange =
    dateRangeParamState["start_date"] && dateRangeParamState["end_date"]
      ? {
          start: parseDate(dateRangeParamState["start_date"]),
          end: parseDate(dateRangeParamState["end_date"]),
        }
      : undefined;

  return (
    <DateRangePicker
      defaultValue={dateRange}
      onChange={(value) => {
        const newParamState = {
          start_date: value.start ? value.start.toString() : null,
          end_date: value.end ? value.end.toString() : null,
        };

        setDateRangeParamState(newParamState);
      }}
    >
      <Label className="mb-4 font-semibold text-2xl flex flex-col">
        Date Range
      </Label>
      <Group
        className={cn(
          "flex whitespace-nowrap w-fit min-w-[17.5rem] items-center max-w-full",
          "px-4 ring-1 ring-neutral-200 py-2 gap-0"
        )}
      >
        <DateInput slot="start" className={"inline-flex"}>
          {(segment) => (
            <DateSegment
              className={
                "outline-none border-none focus:bg-neutral-200 focus:text-neutral-900"
              }
              segment={segment}
            />
          )}
        </DateInput>
        <span aria-hidden="true" className="inline-block mx-1">
          -
        </span>
        <DateInput slot="end" className={"inline-flex mr-3"}>
          {(segment) => (
            <DateSegment
              segment={segment}
              className={
                "outline-none border-none focus:bg-neutral-200 focus:text-neutral-900"
              }
            />
          )}
        </DateInput>
        <Button
          className={
            "inline-flex items-center justify-center ml-auto -mr-2 bg-neutral-300 text-neutral-900 border-none outline-none focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 hover:bg-neutral-100 transition-colors duration-100 focus-visible:ring-offset-neutral-900 w-8 h-8"
          }
        >
          <ChevronUpDown />
        </Button>
      </Group>
      <Popover offset={8} placement="bottom right" className={"shadow-2xl"}>
        <Dialog>
          <RangeCalendar className={"bg-neutral-800 p-4 min-w-[20rem]"}>
            <header className="flex items-center justify-between gap-4 mb-6">
              <Button
                slot="previous"
                className={
                  "w-8 h-8 inline-flex items-center justify-center bg-neutral-400 text-neutral-900 border-none focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-200 outline-none hover:bg-neutral-300 transition-colors duration-100"
                }
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Heading />
              <Button
                slot="next"
                className={
                  "w-8 h-8 inline-flex items-center justify-center bg-neutral-400 text-neutral-900 border-none focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-200 outline-none hover:bg-neutral-300 transition-colors duration-100"
                }
              >
                <ChevronLeft className="w-5 h-5 rotate-180" />
              </Button>
            </header>
            <CalendarGrid className="w-full">
              <CalendarGridHeader className="bg-white/5">
                {(day) => (
                  <CalendarHeaderCell className="py-2">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <div className="w-full h-6" aria-hidden="true"></div>
              <CalendarGridBody className="">
                {(date) => (
                  <CalendarCell
                    date={date}
                    className={
                      "flex items-start justify-start pl-2.5 selected:bg-neutral-200 outside-month:cursor-default selected:text-neutral-800 hover:bg-neutral-700 border-none outline-none py-2 focus-visible:ring-1 focus-visible:ring-neutral-200 focus-visible:selected:ring-offset-2 focus-visible:selected:ring-offset-neutral-700 transition-colors duration-100"
                    }
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </RangeCalendar>
        </Dialog>
      </Popover>
    </DateRangePicker>
  );
};
export default OrderDateRange;
