"use client";

import * as React from "react";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { ChevronDown } from "lucide-react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ root */

const NavigationMenuRoot = React.forwardRef<
  HTMLElement,
  NavigationMenu.Root.Props
>(({ className, ...props }, ref) => (
  <NavigationMenu.Root
    ref={ref}
    data-slot="navigation-menu"
    className={cn(
      "relative flex items-center justify-center",
      className,
    )}
    {...props}
  >
    {props.children}
    <NavigationMenuViewport />
  </NavigationMenu.Root>
));
NavigationMenuRoot.displayName = "NavigationMenu";

/* ------------------------------------------------------------------ list */

const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  NavigationMenu.List.Props
>(({ className, ...props }, ref) => (
  <NavigationMenu.List
    ref={ref}
    data-slot="navigation-menu-list"
    className={cn(
      "group flex flex-1 list-none items-center justify-center gap-1",
      className,
    )}
    {...props}
  />
));
NavigationMenuList.displayName = "NavigationMenuList";

/* ------------------------------------------------------------------ item */

const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  NavigationMenu.Item.Props
>(({ className, ...props }, ref) => (
  <NavigationMenu.Item
    ref={ref}
    data-slot="navigation-menu-item"
    className={cn("relative", className)}
    {...props}
  />
));
NavigationMenuItem.displayName = "NavigationMenuItem";

/* -------------------------------------------------------------- trigger style */

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center gap-1 rounded-md px-4 py-2 text-sm font-medium outline-none transition-colors duration-[var(--layout-duration-base)] ease-out hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[popup-open]:bg-accent/50 disabled:pointer-events-none disabled:opacity-50",
);

/* --------------------------------------------------------------- trigger */

const NavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  NavigationMenu.Trigger.Props
>(({ className, children, ...props }, ref) => (
  <NavigationMenu.Trigger
    ref={ref}
    data-slot="navigation-menu-trigger"
    className={cn(navigationMenuTriggerStyle(), className)}
    {...props}
  >
    {children}
    <ChevronDown
      className="relative top-[1px] ml-1 size-3 transition-transform duration-[var(--layout-duration-base)] ease-out group-data-[popup-open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenu.Trigger>
));
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

/* --------------------------------------------------------------- content */

const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  NavigationMenu.Content.Props
>(({ className, ...props }, ref) => (
  <NavigationMenu.Content
    ref={ref}
    data-slot="navigation-menu-content"
    className={cn(
      "top-0 left-0 w-full md:absolute md:w-auto",
      "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
      "transition-opacity duration-[var(--layout-duration-base)] ease-out",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = "NavigationMenuContent";

/* --------------------------------------------------------------- viewport */

const NavigationMenuViewport = React.forwardRef<
  HTMLDivElement,
  NavigationMenu.Viewport.Props
>(({ className, ...props }, ref) => (
  <NavigationMenu.Portal>
    <NavigationMenu.Positioner className="absolute top-full left-0 flex justify-center">
      <NavigationMenu.Popup>
        <NavigationMenu.Viewport
          ref={ref}
          data-slot="navigation-menu-viewport"
          className={cn(
            "bg-popover text-popover-foreground relative mt-1.5 h-[var(--available-height)] w-full overflow-hidden rounded-md border shadow-md",
            "md:w-[var(--available-width)]",
            "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
            "transition-[opacity,width,height] duration-[var(--layout-duration-base)] ease-out",
            className,
          )}
          {...props}
        />
      </NavigationMenu.Popup>
    </NavigationMenu.Positioner>
  </NavigationMenu.Portal>
));
NavigationMenuViewport.displayName = "NavigationMenuViewport";

/* ------------------------------------------------------------------ link */

const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  NavigationMenu.Link.Props
>(({ className, ...props }, ref) => (
  <NavigationMenu.Link
    ref={ref}
    data-slot="navigation-menu-link"
    className={cn(
      "block select-none rounded-md p-3 leading-none no-underline outline-none",
      "transition-colors duration-[var(--layout-duration-base)] ease-out",
      "hover:bg-accent hover:text-accent-foreground",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[active]:font-medium",
      className,
    )}
    {...props}
  />
));
NavigationMenuLink.displayName = "NavigationMenuLink";

export {
  NavigationMenuRoot as NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
};
