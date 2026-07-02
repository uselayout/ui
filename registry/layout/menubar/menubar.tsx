"use client";

import * as React from "react";
import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { Menu } from "@base-ui/react/menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

/* --------------------------------------------------------------- menubar */

const Menubar = React.forwardRef<HTMLDivElement, BaseMenubar.Props>(
  ({ className, ...props }, ref) => (
    <BaseMenubar
      ref={ref}
      data-slot="menubar"
      className={cn(
        "flex h-9 items-center gap-1 rounded-md border bg-background px-1 shadow-xs",
        className,
      )}
      {...props}
    />
  ),
);
Menubar.displayName = "Menubar";

/* ---------------------------------------------------------- menubar menu */

function MenubarMenu(props: Menu.Root.Props) {
  return <Menu.Root {...props} />;
}

/* ------------------------------------------------------- menubar trigger */

const MenubarTrigger = React.forwardRef<HTMLButtonElement, Menu.Trigger.Props>(
  ({ className, ...props }, ref) => (
    <Menu.Trigger
      ref={ref}
      data-slot="menubar-trigger"
      className={cn(
        "flex cursor-default select-none items-center gap-1 rounded-xs px-3 py-1.5 text-sm font-medium outline-none",
        "transition-colors duration-[var(--layout-duration-base)] ease-out",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground",
        className,
      )}
      {...props}
    />
  ),
);
MenubarTrigger.displayName = "MenubarTrigger";

/* ------------------------------------------------------- menubar content */

const MenubarContent = React.forwardRef<
  HTMLDivElement,
  Menu.Popup.Props & { sideOffset?: number }
>(({ className, sideOffset = 8, ...props }, ref) => (
  <Menu.Portal>
    <Menu.Positioner sideOffset={sideOffset} align="start">
      <Menu.Popup
        ref={ref}
        data-slot="menubar-content"
        className={cn(
          "bg-popover text-popover-foreground z-50 min-w-[12rem] overflow-hidden rounded-md border shadow-md",
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
MenubarContent.displayName = "MenubarContent";

/* ----------------------------------------------------------- menubar item */

interface MenubarItemProps extends Menu.Item.Props {
  inset?: boolean;
  variant?: "default" | "destructive";
}

const MenubarItem = React.forwardRef<HTMLDivElement, MenubarItemProps>(
  ({ className, inset, variant = "default", ...props }, ref) => (
    <Menu.Item
      ref={ref}
      data-slot="menubar-item"
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
MenubarItem.displayName = "MenubarItem";

/* ------------------------------------------------- menubar checkbox item */

const MenubarCheckboxItem = React.forwardRef<
  HTMLDivElement,
  Menu.CheckboxItem.Props
>(({ className, children, ...props }, ref) => (
  <Menu.CheckboxItem
    ref={ref}
    data-slot="menubar-checkbox-item"
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
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

/* --------------------------------------------------- menubar radio group */

function MenubarRadioGroup(props: Menu.RadioGroup.Props) {
  return <Menu.RadioGroup data-slot="menubar-radio-group" {...props} />;
}

/* ---------------------------------------------------- menubar radio item */

const MenubarRadioItem = React.forwardRef<HTMLDivElement, Menu.RadioItem.Props>(
  ({ className, children, ...props }, ref) => (
    <Menu.RadioItem
      ref={ref}
      data-slot="menubar-radio-item"
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
  ),
);
MenubarRadioItem.displayName = "MenubarRadioItem";

/* --------------------------------------------------------- menubar label */

const MenubarLabel = React.forwardRef<
  HTMLDivElement,
  Menu.GroupLabel.Props & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <Menu.GroupLabel
    ref={ref}
    data-slot="menubar-label"
    className={cn(
      "px-2 py-1.5 text-xs font-semibold text-muted-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
MenubarLabel.displayName = "MenubarLabel";

/* ------------------------------------------------------ menubar separator */

function MenubarSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      data-slot="menubar-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

/* ------------------------------------------------------- menubar shortcut */

function MenubarShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  );
}

/* ----------------------------------------------------------- menubar sub */

function MenubarSub(props: Menu.SubmenuRoot.Props) {
  return <Menu.SubmenuRoot {...props} />;
}

/* ------------------------------------------------------ menubar sub trigger */

const MenubarSubTrigger = React.forwardRef<
  HTMLDivElement,
  Menu.SubmenuTrigger.Props & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <Menu.SubmenuTrigger
    ref={ref}
    data-slot="menubar-sub-trigger"
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
MenubarSubTrigger.displayName = "MenubarSubTrigger";

/* --------------------------------------------------- menubar sub content */

const MenubarSubContent = React.forwardRef<HTMLDivElement, Menu.Popup.Props>(
  ({ className, ...props }, ref) => (
    <Menu.Portal>
      <Menu.Positioner side="right" sideOffset={4}>
        <Menu.Popup
          ref={ref}
          data-slot="menubar-sub-content"
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
  ),
);
MenubarSubContent.displayName = "MenubarSubContent";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};
