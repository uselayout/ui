"use client";

import * as React from "react";
import { Progress as BaseProgress } from "@base-ui/react/progress";

import { cn } from "@/lib/utils";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof BaseProgress.Root> {
  className?: string;
}

function Progress({ className, value, ...props }: ProgressProps) {
  return (
    <BaseProgress.Root
      data-slot="progress"
      value={value}
      className={cn("relative w-full", className)}
      {...props}
    >
      <BaseProgress.Track
        data-slot="progress-track"
        className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20"
      >
        <BaseProgress.Indicator
          data-slot="progress-indicator"
          className="h-full w-full flex-1 rounded-full bg-primary transition-all duration-[var(--layout-duration-slow)] ease-out"
          style={{
            transform:
              value == null
                ? undefined
                : `translateX(-${100 - Math.min(100, Math.max(0, value))}%)`,
          }}
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}

export { Progress };
