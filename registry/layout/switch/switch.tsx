"use client";

import * as React from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";

import { cn } from "@/lib/utils";

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof BaseSwitch.Root> {
  className?: string;
}

function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
        "bg-input transition-[background-color,box-shadow] duration-[var(--layout-duration-base)] ease-out",
        "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:border-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[checked]:bg-primary",
        className
      )}
      {...props}
    >
      <BaseSwitch.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-4 rounded-full bg-background shadow-xs",
          "transition-transform duration-[var(--layout-duration-base)] ease-out",
          "translate-x-0 data-[checked]:translate-x-4"
        )}
      />
    </BaseSwitch.Root>
  );
}

export { Switch, type SwitchProps };
