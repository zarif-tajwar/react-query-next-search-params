"use client";

import { defaultTotalBillRange } from "@/lib/constants";
import { cn, priceFormat } from "@/lib/util";
import { useState } from "react";
import {
  Label,
  Slider,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from "react-aria-components";

const OrderBillRangeSlider = () => {
  const [range, setRange] = useState([330, 660]);
  return (
    <Slider
      value={range}
      onChange={setRange}
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
          console.log(state.getThumbPercent(0), "MIN");
          console.log(state.getThumbPercent(1), "MAX");
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
