import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Wraps an input (or textarea) with leading/trailing addons inside a single
 * bordered shell. Attach `InputGroupAddon` with the appropriate `align` prop
 * to place content at any edge of the field.
 */
function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "flex w-full items-stretch rounded-md border border-input bg-transparent shadow-xs",
        "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/40",
        "has-[input[aria-invalid]]:border-destructive has-[input[aria-invalid]]:ring-destructive/20",
        "has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50",
        "transition-[color,box-shadow] duration-[var(--layout-duration-base)] ease-out",
        className
      )}
    >
      {props.children}
    </div>
  );
}

interface InputGroupAddonProps extends React.ComponentProps<"div"> {
  /**
   * Which edge of the field shell this addon occupies.
   * `inline-start` = left, `inline-end` = right, `block-start` = top,
   * `block-end` = bottom (use with InputGroupTextarea).
   */
  align?: "inline-start" | "inline-end" | "block-start" | "block-end";
}

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        "flex shrink-0 items-center",
        (align === "inline-start" || align === "block-start") && "order-first",
        (align === "inline-end" || align === "block-end") && "order-last",
        className
      )}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={cn(
        "inline-flex items-center px-3 text-sm text-muted-foreground select-none",
        className
      )}
      {...props}
    />
  );
}

function InputGroupButton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group-button"
      className={cn(
        "flex shrink-0 items-center [&>button]:rounded-none [&>button]:shadow-none [&>button]:border-0",
        // Restore end-cap radii on whichever side this sits
        "first:[&>button]:rounded-l-[calc(var(--radius-md)-1px)]",
        "last:[&>button]:rounded-r-[calc(var(--radius-md)-1px)]",
        className
      )}
      {...props}
    />
  );
}

function InputGroupInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input-group-input"
      className={cn(
        "flex h-9 min-w-0 flex-1 bg-transparent px-3 py-1 text-sm text-foreground outline-none",
        "placeholder:text-muted-foreground",
        "selection:bg-primary selection:text-primary-foreground",
        "disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="input-group-textarea"
      className={cn(
        "min-h-16 min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-foreground outline-none",
        "placeholder:text-muted-foreground",
        "selection:bg-primary selection:text-primary-foreground",
        "disabled:cursor-not-allowed",
        "field-sizing-content resize-none",
        className
      )}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
