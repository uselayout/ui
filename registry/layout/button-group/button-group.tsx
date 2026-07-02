import * as React from "react";

import { cn } from "@/lib/utils";

interface ButtonGroupProps extends React.ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical";
}

function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: ButtonGroupProps) {
  return (
    <div
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        "inline-flex",
        orientation === "horizontal" && [
          "flex-row",
          // Remove inner horizontal radii so buttons appear fused
          "[&>*:not(:first-child)]:rounded-l-none",
          "[&>*:not(:last-child)]:rounded-r-none",
          // Collapse adjacent left borders to avoid doubled borders
          "[&>*:not(:first-child)]:-ml-px",
          // Raise z-index on focus/hover so the ring shows above neighbours
          "[&>*]:relative [&>*:hover]:z-10 [&>*:focus-visible]:z-10",
        ],
        orientation === "vertical" && [
          "flex-col",
          "[&>*:not(:first-child)]:rounded-t-none",
          "[&>*:not(:last-child)]:rounded-b-none",
          "[&>*:not(:first-child)]:-mt-px",
          "[&>*]:relative [&>*:hover]:z-10 [&>*:focus-visible]:z-10",
        ],
        className
      )}
      {...props}
    />
  );
}

export { ButtonGroup };
