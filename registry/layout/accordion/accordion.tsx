"use client";

import * as React from "react";
import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ root */

const AccordionRoot = React.forwardRef<HTMLDivElement, Accordion.Root.Props>(
  ({ className, ...props }, ref) => (
    <Accordion.Root
      ref={ref}
      data-slot="accordion"
      className={cn("w-full", className)}
      {...props}
    />
  ),
);
AccordionRoot.displayName = "Accordion";

/* ------------------------------------------------------------------ item */

const AccordionItem = React.forwardRef<HTMLDivElement, Accordion.Item.Props>(
  ({ className, ...props }, ref) => (
    <Accordion.Item
      ref={ref}
      data-slot="accordion-item"
      className={cn("border-b border-border", className)}
      {...props}
    />
  ),
);
AccordionItem.displayName = "AccordionItem";

/* --------------------------------------------------------------- trigger */

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  Accordion.Trigger.Props
>(({ className, children, ...props }, ref) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      ref={ref}
      data-slot="accordion-trigger"
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium",
        "transition-all duration-[var(--layout-duration-base)] ease-out",
        "hover:underline outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xs",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[panel-open]:[&>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-[var(--layout-duration-base)] ease-out" />
    </Accordion.Trigger>
  </Accordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

/* --------------------------------------------------------------- content */

const AccordionContent = React.forwardRef<HTMLDivElement, Accordion.Panel.Props>(
  ({ className, children, ...props }, ref) => (
    <Accordion.Panel
      ref={ref}
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-sm",
        "h-[var(--accordion-panel-height,0)] data-[open]:h-[var(--accordion-panel-height)]",
        "transition-[height] duration-[var(--layout-duration-base)] ease-out",
        className,
      )}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </Accordion.Panel>
  ),
);
AccordionContent.displayName = "AccordionContent";

export {
  AccordionRoot as Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
};
