"use client";

import * as React from "react";
import { Tabs } from "@base-ui/react/tabs";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ root */

const TabsRoot = React.forwardRef<HTMLDivElement, Tabs.Root.Props>(
  ({ className, ...props }, ref) => (
    <Tabs.Root
      ref={ref}
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  ),
);
TabsRoot.displayName = "Tabs";

/* ------------------------------------------------------------------ list */

const TabsList = React.forwardRef<HTMLDivElement, Tabs.List.Props>(
  ({ className, ...props }, ref) => (
    <Tabs.List
      ref={ref}
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
);
TabsList.displayName = "TabsList";

/* --------------------------------------------------------------- trigger */

const TabsTrigger = React.forwardRef<HTMLButtonElement, Tabs.Tab.Props>(
  ({ className, ...props }, ref) => (
    <Tabs.Tab
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium",
        "ring-offset-background outline-none",
        "transition-all duration-[var(--layout-duration-base)] ease-out",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow-xs",
        className,
      )}
      {...props}
    />
  ),
);
TabsTrigger.displayName = "TabsTrigger";

/* --------------------------------------------------------------- content */

const TabsContent = React.forwardRef<HTMLDivElement, Tabs.Panel.Props>(
  ({ className, ...props }, ref) => (
    <Tabs.Panel
      ref={ref}
      data-slot="tabs-content"
      className={cn(
        "ring-offset-background outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  ),
);
TabsContent.displayName = "TabsContent";

export {
  TabsRoot as Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
};
