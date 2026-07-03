"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

import { cn } from "@/lib/utils";

function TooltipProvider(props: BaseTooltip.Provider.Props) {
  return <BaseTooltip.Provider {...props} />;
}

function Tooltip(props: BaseTooltip.Root.Props) {
  return <BaseTooltip.Root {...props} />;
}

function TooltipTrigger(props: BaseTooltip.Trigger.Props) {
  return <BaseTooltip.Trigger data-slot="tooltip-trigger" {...props} />;
}

interface TooltipContentProps extends BaseTooltip.Popup.Props {
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 6,
  ...props
}: TooltipContentProps) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner side={side} sideOffset={sideOffset}>
        <BaseTooltip.Popup
          data-slot="tooltip-content"
          className={cn(
            "z-50 rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground",
            "transition-all duration-[var(--layout-duration-fast)] ease-out",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            className
          )}
          {...props}
        />
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };
