"use client";

import * as React from "react";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Radio as BaseRadio } from "@base-ui/react/radio";

import { cn } from "@/lib/utils";

interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof BaseRadioGroup> {
  className?: string;
}

function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <BaseRadioGroup
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof BaseRadio.Root> {
  className?: string;
}

function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
  return (
    <BaseRadio.Root
      data-slot="radio-group-item"
      className={cn(
        "inline-flex aspect-square size-4 shrink-0 items-center justify-center rounded-full border border-input bg-transparent",
        "transition-[color,background-color,border-color,box-shadow] duration-[var(--layout-duration-base)] ease-out",
        "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:border-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[checked]:border-primary",
        className
      )}
      {...props}
    >
      <BaseRadio.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
      >
        <span className="size-2 rounded-full bg-primary" />
      </BaseRadio.Indicator>
    </BaseRadio.Root>
  );
}

export { RadioGroup, RadioGroupItem, type RadioGroupProps, type RadioGroupItemProps };
