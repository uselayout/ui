"use client";

import * as React from "react";
import { Separator as BaseSeparator } from "@base-ui/react/separator";

import { cn } from "@/lib/utils";

interface SeparatorProps extends React.ComponentProps<typeof BaseSeparator> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <BaseSeparator
      data-slot="separator"
      aria-orientation={decorative ? undefined : orientation}
      role={decorative ? "none" : "separator"}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border transition-colors duration-[var(--layout-duration-base)] ease-out",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  );
}

export { Separator, type SeparatorProps };
