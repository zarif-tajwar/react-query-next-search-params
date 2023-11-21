import { cn } from "@/lib/util";
import { SVGProps } from "react";

interface SvgIconProps extends SVGProps<SVGSVGElement> {}

export const CalendarIcon = ({ ...props }: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={cn("w-4 h-4", props.className)}
    viewBox="0 0 16 16"
    fill="currentColor"
    {...props}
  >
    <path
      d="m3.25,10c0-.2.08-.39.22-.53.14-.14.33-.22.53-.22h.01c.2,0,.39.08.53.22.14.14.22.33.22.53h0c0,.21-.08.4-.22.54-.14.14-.33.22-.53.22h-.01c-.2,0-.39-.08-.53-.22-.14-.14-.22-.33-.22-.53h0Zm.75,1.25c-.2,0-.39.08-.53.22-.14.14-.22.33-.22.53h0c0,.42.34.76.75.76h.01c.2,0,.39-.08.53-.22.14-.14.22-.33.22-.53h0c0-.21-.08-.4-.22-.54-.14-.14-.33-.22-.53-.22h-.01Zm1.25-1.25c0-.2.08-.39.22-.53.14-.14.33-.22.53-.22h.01c.2,0,.39.08.53.22.14.14.22.33.22.53h0c0,.21-.08.4-.22.54-.14.14-.33.22-.53.22h-.01c-.2,0-.39-.08-.53-.22-.14-.14-.22-.33-.22-.53h0Zm.75,1.25c-.2,0-.39.08-.53.22-.14.14-.22.33-.22.53h0c0,.42.34.76.75.76h.01c.2,0,.39-.08.53-.22.14-.14.22-.33.22-.53h0c0-.21-.08-.4-.22-.54-.14-.14-.33-.22-.53-.22h-.01Zm1.25-3.25c0-.2.08-.39.22-.53.14-.14.33-.22.53-.22h.01c.2,0,.39.08.53.22.14.14.22.33.22.53h0c0,.21-.08.4-.22.54-.14.14-.33.22-.53.22h-.01c-.2,0-.39-.08-.53-.22-.14-.14-.22-.33-.22-.53h0Zm.75,1.25c-.2,0-.39.08-.53.22-.14.14-.22.33-.22.53h0c0,.42.34.76.75.76h.01c.2,0,.39-.08.53-.22.14-.14.22-.33.22-.53h0c0-.21-.08-.4-.22-.54-.14-.14-.33-.22-.53-.22h-.01Zm-.75,2.75c0-.2.08-.39.22-.53.14-.14.33-.22.53-.22h.01c.2,0,.39.08.53.22.14.14.22.33.22.53h0c0,.21-.08.4-.22.54-.14.14-.33.22-.53.22h-.01c-.2,0-.39-.08-.53-.22-.14-.14-.22-.33-.22-.53h0Zm2.75-4.75c-.2,0-.39.08-.53.22-.14.14-.22.33-.22.53h0c0,.42.34.76.75.76h.01c.2,0,.39-.08.53-.22.14-.14.22-.33.22-.53h0c0-.21-.08-.4-.22-.54-.14-.14-.33-.22-.53-.22h-.01Zm-.75,2.75c0-.2.08-.39.22-.53.14-.14.33-.22.53-.22h.01c.2,0,.39.08.53.22.14.14.22.33.22.53h0c0,.21-.08.4-.22.54-.14.14-.33.22-.53.22h-.01c-.2,0-.39-.08-.53-.22-.14-.14-.22-.33-.22-.53h0Zm.75,1.25c-.2,0-.39.08-.53.22-.14.14-.22.33-.22.53h0c0,.42.34.76.75.76h.01c.2,0,.39-.08.53-.22.14-.14.22-.33.22-.53h0c0-.21-.08-.4-.22-.54-.14-.14-.33-.22-.53-.22h-.01Zm1.25-3.25c0-.2.08-.39.22-.53.14-.14.33-.22.53-.22h.01c.2,0,.39.08.53.22.14.14.22.33.22.53h0c0,.21-.08.4-.22.54-.14.14-.33.22-.53.22h-.01c-.2,0-.39-.08-.53-.22-.14-.14-.22-.33-.22-.53h0Zm.75,1.25c-.2,0-.39.08-.53.22-.14.14-.22.33-.22.53h0c0,.42.34.76.75.76h.01c.2,0,.39-.08.53-.22.14-.14.22-.33.22-.53h0c0-.21-.08-.4-.22-.54-.14-.14-.33-.22-.53-.22h-.01Z"
      strokeWidth="0"
    />
    <path
      d="m3.75,0c.2,0,.39.08.53.22.14.14.22.33.22.53v1.25h7V.75c0-.2.08-.39.22-.53.14-.14.33-.22.53-.22s.39.08.53.22c.14.14.22.33.22.53v1.25h.25c.73,0,1.43.29,1.94.81.52.52.81,1.22.81,1.94v11.25H0V4.75c0-.73.29-1.43.81-1.94.52-.52,1.22-.81,1.94-.81h.25V.75c0-.2.08-.39.22-.53.14-.14.33-.22.53-.22Zm10.75,5.5H1.5v9h13V5.5Z"
      strokeWidth="0"
    />
  </svg>
);

export const ChevronLeft = ({ ...props }: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={cn("w-5 h-5", props.className)}
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
      clipRule="evenodd"
    />
  </svg>
);

export const ChevronUpDown = ({ ...props }: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={cn("w-5 h-5", props.className)}
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
      clipRule="evenodd"
    />
  </svg>
);
