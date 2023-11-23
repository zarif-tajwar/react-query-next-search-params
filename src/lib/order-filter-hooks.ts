"use client";

import {
  ParserBuilder,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "next-usequerystate";
import { useCallback, useMemo } from "react";
import { searchParamSeperators } from "./constants";
import { quickSortByReference } from "./util";
import { parseDate, CalendarDate } from "@internationalized/date";
import { DateRange } from "react-aria-components";
import { z } from "zod";
import {
  getCalendarDateRange,
  parseDoubleNumberRangeFromStr,
  safeParseDate,
} from "./validation";
import { getOrdersData } from "./actions";
import { OrderFilterSearchParams } from "./types";

export const useSelectQueryState = (
  key: string,
  values: string[],
  defaultValue: string
) => {
  const [queryState, setQueryState] = useQueryState(key);

  const isParamValid = values.some((v) => v === queryState);

  const value: string = queryState && isParamValid ? queryState : defaultValue;

  const handleChange = useCallback(
    (changedValue: string) => {
      const newParamValue = changedValue === defaultValue ? null : changedValue;
      setQueryState(newParamValue);
    },
    [defaultValue, setQueryState]
  );

  return { value, handleChange };
};

export const useMultiCheckboxQueryState = (key: string, values: string[]) => {
  const [queryState, setQueryState] = useQueryState(key);

  const parsedChecked = queryState
    ?.split(searchParamSeperators.multipleOption)
    .filter((value) => values.some((x) => x === value));

  const checkedOptions =
    !parsedChecked ||
    parsedChecked.length === values.length ||
    parsedChecked.length === 0
      ? values
      : parsedChecked;

  const handleChange = useCallback(
    (changedValues: string[]) => {
      const sortedValues = quickSortByReference(changedValues, values);
      setQueryState(
        changedValues.length === values.length || changedValues.length === 0
          ? null
          : sortedValues.join(searchParamSeperators.multipleOption)
      );
    },
    [values, setQueryState]
  );

  return { checkedOptions, handleChange };
};

export const useDoubleRangeSliderQueryState = (
  key: string,
  defaultRangeValue: number[]
) => {
  const [queryState, setQueryState] = useQueryState(key);

  const rangeValue =
    parseDoubleNumberRangeFromStr(queryState, defaultRangeValue) ||
    defaultRangeValue;

  const handleChange = useCallback(
    (range: number[]) => {
      const isDefault =
        range[0] === defaultRangeValue[0] && range[1] === defaultRangeValue[1];

      setQueryState(
        isDefault ? null : range.map(String).join(searchParamSeperators.range)
      );
    },
    [defaultRangeValue, setQueryState]
  );

  return { rangeValue, handleChange };
};

export const useDateRangeQueryState = (startKey: string, endKey: string) => {
  const [queryState, setDateRangeParamState] = useQueryStates({
    [startKey]: parseAsString,
    [endKey]: parseAsString,
  });

  let dateRangeValue: { start: CalendarDate; end: CalendarDate } | undefined =
    getCalendarDateRange(queryState[startKey]!, queryState[endKey]!);

  const handleChange = (value: DateRange | undefined) => {
    const newParamState = {
      [startKey]: value && value.start ? value.start.toString() : null,
      [endKey]: value && value.end ? value.end.toString() : null,
    };

    setDateRangeParamState(newParamState);
  };

  return { dateRangeValue, handleChange };
};
