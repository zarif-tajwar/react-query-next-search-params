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
  return (
    <div className="lds-grid">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
export default LoadingSpinner;
