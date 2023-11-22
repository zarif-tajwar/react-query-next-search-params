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
  const parsedRange = queryState
    ?.split(searchParamSeperators.range)
    .map((str) => Number(str))
    .filter((num) => !Number.isNaN(num));

  let rangeValue = defaultRangeValue;

  if (parsedRange !== undefined && parsedRange.length !== 0) {
    if (
      parsedRange.length === 1 &&
      parsedRange.at(0)! <= defaultRangeValue.at(1)! &&
      parsedRange.at(0)! >= defaultRangeValue.at(0)!
    ) {
      rangeValue = [parsedRange.at(0)!, parsedRange.at(0)!];
    } else if (
      parsedRange.length === 2 &&
      parsedRange.at(0)! < parsedRange.at(1)! &&
      parsedRange.at(0)! >= defaultRangeValue.at(0)! &&
      parsedRange.at(1)! <= defaultRangeValue.at(1)!
    ) {
      rangeValue = [parsedRange.at(0)!, parsedRange.at(1)!];
    }
  }

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
    undefined;

  try {
    dateRangeValue = {
      start: parseDate(queryState[startKey]!),
      end: parseDate(queryState[endKey]!),
    };
  } catch (error) {}

  const handleChange = (value: DateRange) => {
    const newParamState = {
      [startKey]: value.start ? value.start.toString() : null,
      [endKey]: value.end ? value.end.toString() : null,
    };

    setDateRangeParamState(newParamState);
  };

  return { dateRangeValue, handleChange };
};
