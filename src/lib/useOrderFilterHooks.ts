"use client";

import {
  parseAsString,
  useQueryState,
  useQueryStates,
} from "next-usequerystate";
import { useCallback, useMemo } from "react";
import { searchParamSeperators } from "./constants";
import { quickSortByReference } from "./util";

export const useOrderFilter = () => {
  const [queryStates, setQueryStates] = useQueryStates({
    sort_by: parseAsString,
    order_status: parseAsString,
  });

  return { queryStates, setQueryStates, lol: 10 };
};

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
    !parsedChecked || parsedChecked.length === values.length
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
