"use client";

import * as React from "react";
import { ContextMenu } from "@base-ui/react/context-menu";
import { Menu } from "@base-ui/react/menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ root */

function ContextMenuRoot(props: ContextMenu.Root.Props) {
  return <ContextMenu.Root {...props} />;
}

/* --------------------------------------------------------------- trigger */

const ContextMenuTrigger = React.forwardRef<
  HTMLDivElement,
  ContextMenu.Trigger.Props
>(({ className, ...props }, ref) => (
  <ContextMenu.Trigger
    ref={ref}
    data-slot="context-menu-trigger"
    className={cn("outline-none", className)}
    {...props}
  />
));
ContextMenuTrigger.displayName = "ContextMenuTrigger";

/* --------------------------------------------------------------- content */

const ContextMenuContent = React.forwardRef<
  HTMLDivElement,
  Menu.Popup.Props
>(({ className, ...props }, ref) => (
  <Menu.Portal>
    <Menu.Positioner>
      <Menu.Popup
        ref={ref}
        data-slot="context-menu-content"
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
ContextMenuContent.displayName = "ContextMenuContent";

/* ----------------------------------------------------------------- group */

function ContextMenuGroup(props: Menu.Group.Props) {
  return <Menu.Group data-slot="context-menu-group" {...props} />;
}

/* ------------------------------------------------------------------ item */

interface ContextMenuItemProps extends Menu.Item.Props {
  inset?: boolean;
  variant?: "default" | "destructive";
}

const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ className, inset, variant = "default", ...props }, ref) => (
    <Menu.Item
      ref={ref}
      data-slot="context-menu-item"
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
ContextMenuItem.displayName = "ContextMenuItem";

/* --------------------------------------------------------- checkbox item */

const ContextMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  Menu.CheckboxItem.Props
>(({ className, children, ...props }, ref) => (
  <Menu.CheckboxItem
    ref={ref}
    data-slot="context-menu-checkbox-item"
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
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

/* ---------------------------------------------------------- radio group */

function ContextMenuRadioGroup(props: Menu.RadioGroup.Props) {
  return <Menu.RadioGroup data-slot="context-menu-radio-group" {...props} />;
}

/* ----------------------------------------------------------- radio item */

const ContextMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  Menu.RadioItem.Props
>(({ className, children, ...props }, ref) => (
  <Menu.RadioItem
    ref={ref}
    data-slot="context-menu-radio-item"
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
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

/* ----------------------------------------------------------------- label */

const ContextMenuLabel = React.forwardRef<
  HTMLDivElement,
  Menu.GroupLabel.Props & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <Menu.GroupLabel
    ref={ref}
    data-slot="context-menu-label"
    className={cn(
      "px-2 py-1.5 text-xs font-semibold text-muted-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuLabel.displayName = "ContextMenuLabel";

/* --------------------------------------------------------------- separator */

function ContextMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      data-slot="context-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

/* --------------------------------------------------------------- shortcut */

function ContextMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  );
}

/* ----------------------------------------------------------------- sub */

function ContextMenuSub(props: Menu.SubmenuRoot.Props) {
  return <Menu.SubmenuRoot {...props} />;
}

/* --------------------------------------------------------- sub trigger */

const ContextMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  Menu.SubmenuTrigger.Props & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <Menu.SubmenuTrigger
    ref={ref}
    data-slot="context-menu-sub-trigger"
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
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";

/* ------------------------------------------------------- sub content */

const ContextMenuSubContent = React.forwardRef<
  HTMLDivElement,
  Menu.Popup.Props
>(({ className, ...props }, ref) => (
  <Menu.Portal>
    <Menu.Positioner side="right" sideOffset={4}>
      <Menu.Popup
        ref={ref}
        data-slot="context-menu-sub-content"
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
ContextMenuSubContent.displayName = "ContextMenuSubContent";

export {
  ContextMenuRoot as ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
};
