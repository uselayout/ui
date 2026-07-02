"use client";

import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

function Select<Value = string>(
  props: React.ComponentPropsWithoutRef<typeof BaseSelect.Root<Value>> & {
    children?: React.ReactNode;
  }
) {
  return <BaseSelect.Root {...props} />;
}

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger> {
  placeholder?: string;
}

function SelectTrigger({
  className,
  children,
  placeholder,
  ...props
}: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "transition-[color,box-shadow] duration-[var(--layout-duration-base)] ease-out",
        "whitespace-nowrap",
        className
      )}
      {...props}
    >
      <SelectValue placeholder={placeholder} />
      <BaseSelect.Icon className="ml-auto shrink-0 text-muted-foreground">
        <ChevronsUpDown className="size-4" />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

function SelectValue({
  className,
  placeholder,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseSelect.Value> & {
  placeholder?: string;
}) {
  return (
    <BaseSelect.Value
      data-slot="select-value"
      placeholder={placeholder ?? "Select…"}
      className={cn("flex-1 truncate text-left data-[placeholder]:text-muted-foreground", className)}
      {...props}
    />
  );
}

function SelectContent({
  className,
  children,
  sideOffset = 4,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseSelect.Positioner> & {
  sideOffset?: number;
}) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        data-slot="select-positioner"
        sideOffset={sideOffset}
        {...props}
      >
        <BaseSelect.Popup
          data-slot="select-content"
          className={cn(
            "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
            "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
            "transition-opacity duration-[var(--layout-duration-base)] ease-out",
            className
          )}
        >
          <BaseSelect.List className="p-1">
            {children}
          </BaseSelect.List>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item
      data-slot="select-item"
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
        <BaseSelect.ItemIndicator>
          <Check className="size-4" />
        </BaseSelect.ItemIndicator>
      </span>
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

function SelectGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseSelect.Group>) {
  return (
    <BaseSelect.Group
      data-slot="select-group"
      className={cn("p-1", className)}
      {...props}
    />
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel>) {
  return (
    <BaseSelect.GroupLabel
      data-slot="select-label"
      className={cn(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<"hr">) {
  return (
    <hr
      data-slot="select-separator"
      className={cn("-mx-1 my-1 border-border", className)}
      {...props}
    />
  );
}

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectValue,
};
