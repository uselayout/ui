"use client";

import * as React from "react";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

function Combobox<Value = string>(
  props: React.ComponentPropsWithoutRef<typeof BaseCombobox.Root<Value>> & {
    children?: React.ReactNode;
  }
) {
  return <BaseCombobox.Root {...props} />;
}

interface ComboboxTriggerProps extends React.ComponentProps<"div"> {
  placeholder?: string;
  disabled?: boolean;
}

/**
 * The trigger surface: a styled wrapper containing the search input and chevron
 * icon. Must be a direct child of `Combobox`.
 */
function ComboboxTrigger({
  className,
  placeholder = "Search…",
  disabled,
  ...props
}: ComboboxTriggerProps) {
  return (
    <div
      data-slot="combobox-trigger"
      className={cn(
        "flex h-9 w-full items-center rounded-md border border-input bg-transparent shadow-xs",
        "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/40",
        "transition-[color,box-shadow] duration-[var(--layout-duration-base)] ease-out",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
    >
      <BaseCombobox.Input
        data-slot="combobox-input"
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "h-full min-w-0 flex-1 bg-transparent px-3 py-1 text-sm text-foreground outline-none",
          "placeholder:text-muted-foreground",
          "selection:bg-primary selection:text-primary-foreground",
          "disabled:cursor-not-allowed"
        )}
      />
      <BaseCombobox.Icon className="mr-2 shrink-0 text-muted-foreground">
        <ChevronsUpDown className="size-4" />
      </BaseCombobox.Icon>
    </div>
  );
}

function ComboboxContent({
  className,
  children,
  sideOffset = 4,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCombobox.Positioner> & {
  sideOffset?: number;
}) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner
        data-slot="combobox-positioner"
        sideOffset={sideOffset}
        align="start"
        className="z-50"
        {...props}
      >
        <BaseCombobox.Popup
          data-slot="combobox-content"
          className={cn(
            "relative z-50 w-[var(--anchor-width)] min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
            "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
            "transition-opacity duration-[var(--layout-duration-base)] ease-out",
            className
          )}
        >
          <BaseCombobox.List className="max-h-60 overflow-y-auto p-1">
            {children}
          </BaseCombobox.List>
          <BaseCombobox.Empty className="py-6 text-center text-sm text-muted-foreground" />
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

function ComboboxItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCombobox.Item>) {
  return (
    <BaseCombobox.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "transition-colors duration-[var(--layout-duration-fast)]",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <BaseCombobox.ItemIndicator>
          <Check className="size-4" />
        </BaseCombobox.ItemIndicator>
      </span>
      {children}
    </BaseCombobox.Item>
  );
}

function ComboboxGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCombobox.Group>) {
  return (
    <BaseCombobox.Group
      data-slot="combobox-group"
      className={cn("p-1", className)}
      {...props}
    />
  );
}

function ComboboxLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseCombobox.GroupLabel>) {
  return (
    <BaseCombobox.GroupLabel
      data-slot="combobox-label"
      className={cn(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function ComboboxSeparator({ className, ...props }: React.ComponentProps<"hr">) {
  return (
    <hr
      data-slot="combobox-separator"
      className={cn("-mx-1 my-1 border-border", className)}
      {...props}
    />
  );
}

export {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
};
