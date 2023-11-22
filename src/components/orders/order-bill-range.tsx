"use client";

import { defaultTotalBillRange, searchParamSeperators } from "@/lib/constants";
import { cn, priceFormat } from "@/lib/util";
import { useQueryState } from "next-usequerystate";
import { useState } from "react";
import {
  Label,
  Slider,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from "react-aria-components";

const OrderBillRangeSlider = () => {
  const [rangeParamState, setRangeParamState] = useQueryState("bill-range");
  const parsedRange = rangeParamState
    ?.split(searchParamSeperators.range)
    .map((str) => Number(str))
    .filter((num) => !Number.isNaN(num));

  const range = parsedRange ? parsedRange : defaultTotalBillRange;
  const handleChange = (range: number[]) => {
    const isDefault =
      range[0] === defaultTotalBillRange[0] &&
      range[1] === defaultTotalBillRange[1];

    setRangeParamState(
      isDefault ? null : range.map(String).join(searchParamSeperators.range)
    );
  };

  return (
    <Slider
      defaultValue={range}
      onChangeEnd={handleChange}
      minValue={defaultTotalBillRange[0]}
      maxValue={defaultTotalBillRange[1]}
    >
      <div className="flex flex-col">
        <Label className="mb-4 font-semibold text-2xl inline-block">
          Order Bill Range
        </Label>
        <SliderOutput className={"inline-block text-base"}>
          {({ state }) =>
            state.values
              .map((_, i) => priceFormat(state.getThumbValue(i)))
              .join(" – ")
          }
        </SliderOutput>
      </div>

      <SliderTrack className={"min-w-[20rem] h-6 mt-6 cursor-pointer"}>
        {({ state }) => {
          const minProgress = state.getThumbPercent(0) * 100;
          const activeTrackWidth = state.getThumbPercent(1) * 100 - minProgress;
          return (
            <div className="bg-neutral-600 h-0.5 relative top-1/2 -translate-y-1/2">
              {state.values.map((_, i) => (
                <SliderThumb
                  key={i}
                  index={i}
                  className={({ isFocusVisible, isDragging, isHovered }) =>
                    cn(
                      "w-5 h-5 bg-neutral-200 z-20 cursor-grab",
                      isHovered &&
                        "ring-offset-2 ring-offset-neutral-900 ring-2 ring-neutral-500",
                      (isFocusVisible || isDragging) &&
                        "ring-offset-2 ring-offset-neutral-900 ring-2 ring-neutral-200"
                    )
                  }
                  aria-label={i === 0 ? "Minimum Bill" : "Maximum Bill"}
                ></SliderThumb>
              ))}
              <span
                className="inline-block h-full w-1/2 absolute top-0 bg-neutral-200 z-10"
                style={{
                  width: activeTrackWidth + "%",
                  left: `${minProgress}%`,
                }}
              />
            </div>
          );
        }}
      </SliderTrack>
    </Slider>
  );
};
export default OrderBillRangeSlider;
