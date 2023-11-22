import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/util";

const buttonVariants = cva(
  "inline-flex items-center justify-center disabled:pointer-events-none disabled:opacity-30 duration-200",
  {
    variants: {
      variant: {
        outline:
          "ring-white ring-1 hover:bg-neutral-700 text-neutral-100 focus-visible:ring-2 focus-visible:ring-neutral-50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-400",
        filled:
          "bg-neutral-300 text-neutral-800 ring-transparent hover:bg-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900",
        unchecked:
          "ring-1 ring-neutral-300 text-neutral-300 bg-transparent hover:bg-white/10 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-50",
      },
      size: {
        default: "px-4 py-2 gap-2 w-max",
      },
      roundness: {},
      align: {},
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, roundness, align, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, roundness, align, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
