"use client";

import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ root */

function DropdownMenu(props: Menu.Root.Props) {
  return <Menu.Root {...props} />;
}

/* --------------------------------------------------------------- trigger */

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  Menu.Trigger.Props
>(({ className, ...props }, ref) => (
  <Menu.Trigger
    ref={ref}
    data-slot="dropdown-menu-trigger"
    className={cn("outline-none", className)}
    {...props}
  />
));
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

/* --------------------------------------------------------------- content */

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  Menu.Popup.Props & { sideOffset?: number }
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Menu.Portal>
    <Menu.Positioner sideOffset={sideOffset}>
      <Menu.Popup
        ref={ref}
        data-slot="dropdown-menu-content"
        className={cn(
          "bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
          "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
          "data-[starting-style]:scale-95 data-[ending-style]:scale-95",
          "transition-[opacity,transform] duration-[var(--layout-duration-base)] ease-out",
          "origin-[var(--transform-origin)]",
          "p-1",
          className,
        )}
        {...props}
      />
    </Menu.Positioner>
  </Menu.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

/* ----------------------------------------------------------------- group */

function DropdownMenuGroup(props: Menu.Group.Props) {
  return <Menu.Group data-slot="dropdown-menu-group" {...props} />;
}

/* ------------------------------------------------------------------ item */

interface DropdownMenuItemProps extends Menu.Item.Props {
  inset?: boolean;
  variant?: "default" | "destructive";
}

const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, inset, variant = "default", ...props }, ref) => (
    <Menu.Item
      ref={ref}
      data-slot="dropdown-menu-item"
      data-variant={variant}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-xs px-2 py-1.5 text-sm outline-none",
        "transition-colors duration-[var(--layout-duration-base)] ease-out",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:data-[highlighted]:bg-destructive/10",
        "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  ),
);
DropdownMenuItem.displayName = "DropdownMenuItem";

/* --------------------------------------------------------- checkbox item */

const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  Menu.CheckboxItem.Props
>(({ className, children, ...props }, ref) => (
  <Menu.CheckboxItem
    ref={ref}
    data-slot="dropdown-menu-checkbox-item"
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-xs py-1.5 pl-8 pr-2 text-sm outline-none",
      "transition-colors duration-[var(--layout-duration-base)] ease-out",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
      <Menu.CheckboxItemIndicator>
        <Check className="size-4" />
      </Menu.CheckboxItemIndicator>
    </span>
    {children}
  </Menu.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

/* ---------------------------------------------------------- radio group */

function DropdownMenuRadioGroup(props: Menu.RadioGroup.Props) {
  return <Menu.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

/* ----------------------------------------------------------- radio item */

const DropdownMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  Menu.RadioItem.Props
>(({ className, children, ...props }, ref) => (
  <Menu.RadioItem
    ref={ref}
    data-slot="dropdown-menu-radio-item"
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-xs py-1.5 pl-8 pr-2 text-sm outline-none",
      "transition-colors duration-[var(--layout-duration-base)] ease-out",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
      <Menu.RadioItemIndicator>
        <Circle className="size-2 fill-current" />
      </Menu.RadioItemIndicator>
    </span>
    {children}
  </Menu.RadioItem>
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

/* ----------------------------------------------------------------- label */

// Plain div, not Menu.GroupLabel: Base UI's GroupLabel throws when used
// outside <Menu.Group>, but the shadcn-familiar API allows a bare Label.
const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="dropdown-menu-label"
    className={cn(
      "px-2 py-1.5 text-xs font-semibold text-muted-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

/* --------------------------------------------------------------- separator */

function DropdownMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

/* --------------------------------------------------------------- shortcut */

function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  );
}

/* ----------------------------------------------------------------- sub */

function DropdownMenuSub(props: Menu.SubmenuRoot.Props) {
  return <Menu.SubmenuRoot {...props} />;
}

/* --------------------------------------------------------- sub trigger */

const DropdownMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  Menu.SubmenuTrigger.Props & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <Menu.SubmenuTrigger
    ref={ref}
    data-slot="dropdown-menu-sub-trigger"
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-xs px-2 py-1.5 text-sm outline-none",
      "transition-colors duration-[var(--layout-duration-base)] ease-out",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
      "data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground",
      "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto size-4" />
  </Menu.SubmenuTrigger>
));
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

/* ------------------------------------------------------- sub content */

const DropdownMenuSubContent = React.forwardRef<
  HTMLDivElement,
  Menu.Popup.Props
>(({ className, ...props }, ref) => (
  <Menu.Portal>
    <Menu.Positioner side="right" sideOffset={4}>
      <Menu.Popup
        ref={ref}
        data-slot="dropdown-menu-sub-content"
        className={cn(
          "bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
          "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
          "data-[starting-style]:scale-95 data-[ending-style]:scale-95",
          "transition-[opacity,transform] duration-[var(--layout-duration-base)] ease-out",
          "origin-[var(--transform-origin)]",
          "p-1",
          className,
        )}
        {...props}
      />
    </Menu.Positioner>
  </Menu.Portal>
));
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
