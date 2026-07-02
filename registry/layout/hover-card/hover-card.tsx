"use client";

import * as React from "react";
import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";

import { cn } from "@/lib/utils";

function HoverCard(props: BasePreviewCard.Root.Props) {
  return <BasePreviewCard.Root {...props} />;
}

function HoverCardTrigger(props: BasePreviewCard.Trigger.Props) {
  return (
    <BasePreviewCard.Trigger data-slot="hover-card-trigger" {...props} />
  );
}

interface HoverCardContentProps extends BasePreviewCard.Popup.Props {
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

function HoverCardContent({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  ...props
}: HoverCardContentProps) {
  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Positioner
        data-slot="hover-card-positioner"
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <BasePreviewCard.Popup
          data-slot="hover-card-content"
          className={cn(
            "z-50 w-64 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none",
            "transition-all duration-[var(--layout-duration-base)] ease-out",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            className
          )}
          {...props}
        />
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
