"use client";

import * as React from "react";
import { Collapsible } from "@base-ui/react/collapsible";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ root */

const CollapsibleRoot = React.forwardRef<HTMLDivElement, Collapsible.Root.Props>(
  ({ className, ...props }, ref) => (
    <Collapsible.Root
      ref={ref}
      data-slot="collapsible"
      className={cn("w-full", className)}
      {...props}
    />
  ),
);
CollapsibleRoot.displayName = "Collapsible";

/* --------------------------------------------------------------- trigger */

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  Collapsible.Trigger.Props
>(({ className, ...props }, ref) => (
  <Collapsible.Trigger
    ref={ref}
    data-slot="collapsible-trigger"
    className={cn(
      "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xs",
      className,
    )}
    {...props}
  />
));
CollapsibleTrigger.displayName = "CollapsibleTrigger";

/* --------------------------------------------------------------- content */

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  Collapsible.Panel.Props
>(({ className, ...props }, ref) => (
  <Collapsible.Panel
    ref={ref}
    data-slot="collapsible-content"
    className={cn(
      "overflow-hidden",
      "h-[var(--collapsible-panel-height,0)] data-[open]:h-[var(--collapsible-panel-height)]",
      "transition-[height] duration-[var(--layout-duration-base)] ease-out",
      className,
    )}
    {...props}
  />
));
CollapsibleContent.displayName = "CollapsibleContent";

export {
  CollapsibleRoot as Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
};
