"use client";

import { cn } from "@/lib/util";
import { useEffect, useState } from "react";

const LoadingSpinner = ({
  size = 20,
  speed = 130,
}: {
  size?: number;
  speed?: number;
}) => {
  // not 0 based
  const [hightlightedIndex, setHighlightedIndex] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex((curr) => {
        if (curr === 9) return 1;
        if (curr === 4) return 6;
        return curr + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <span
      className="grid grid-cols-3 w-max"
      style={{ gap: `${size / 4 / 16}rem` }}
      aria-hidden={"true"}
    >
      {[...Array(9).keys()].map((_, i) => {
        return (
          <span
            className={cn(
              "inline-block aspect-square text-xs bg-neutral-600",
              i + 1 === 5 && "bg-transparent",
              hightlightedIndex - 1 === i && "bg-neutral-400",
              i + 1 == 4 && "row-start-2 row-end-2 col-start-3 col-end-3",
              i + 1 == 6 && "row-start-3 row-end-3 col-start-3 col-end-3",
              i + 1 == 7 && "row-start-3 row-end-3 col-start-2 col-end-2",
              i + 1 == 8 && "row-start-3 row-end-3 col-start-1 col-end-1",
              i + 1 == 9 && "row-start-2 row-end-2 col-start-1 col-end-1"
            )}
            style={{ width: `${size / 16}rem`, height: `${size / 16}rem` }}
            key={i}
          ></span>
        );
      })}
    </span>
  );
};
export default LoadingSpinner;
