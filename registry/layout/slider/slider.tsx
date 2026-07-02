"use client";

import * as React from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof BaseSlider.Root> {
  className?: string;
}

function Slider({ className, ...props }: SliderProps) {
  return (
    <BaseSlider.Root
      data-slot="slider"
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      {...props}
    >
      <BaseSlider.Control
        data-slot="slider-control"
        className="relative flex w-full cursor-pointer items-center"
      >
        <BaseSlider.Track
          data-slot="slider-track"
          className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted"
        >
          <BaseSlider.Indicator
            data-slot="slider-indicator"
            className="absolute h-full bg-primary"
          />
        </BaseSlider.Track>
        <BaseSlider.Thumb
          data-slot="slider-thumb"
          className={cn(
            "block size-4 rounded-full border-2 border-primary bg-background shadow-sm",
            "transition-[box-shadow,color] duration-[var(--layout-duration-fast)] ease-out",
            "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        />
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}

export { Slider, type SliderProps };
