"use client";

import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type SheetSide = "top" | "right" | "bottom" | "left";

const sheetSideStyles: Record<SheetSide, string> = {
  top: [
    "inset-x-0 top-0 rounded-b-xl",
    "data-[starting-style]:-translate-y-full data-[starting-style]:opacity-0",
    "data-[ending-style]:-translate-y-full data-[ending-style]:opacity-0",
  ].join(" "),
  right: [
    "inset-y-0 right-0 h-full w-3/4 max-w-sm rounded-l-xl",
    "data-[starting-style]:translate-x-full data-[starting-style]:opacity-0",
    "data-[ending-style]:translate-x-full data-[ending-style]:opacity-0",
  ].join(" "),
  bottom: [
    "inset-x-0 bottom-0 rounded-t-xl",
    "data-[starting-style]:translate-y-full data-[starting-style]:opacity-0",
    "data-[ending-style]:translate-y-full data-[ending-style]:opacity-0",
  ].join(" "),
  left: [
    "inset-y-0 left-0 h-full w-3/4 max-w-sm rounded-r-xl",
    "data-[starting-style]:-translate-x-full data-[starting-style]:opacity-0",
    "data-[ending-style]:-translate-x-full data-[ending-style]:opacity-0",
  ].join(" "),
};

function Sheet(props: BaseDialog.Root.Props) {
  return <BaseDialog.Root {...props} />;
}

function SheetTrigger(props: BaseDialog.Trigger.Props) {
  return <BaseDialog.Trigger data-slot="sheet-trigger" {...props} />;
}

interface SheetContentProps extends BaseDialog.Popup.Props {
  side?: SheetSide;
  showClose?: boolean;
}

function SheetContent({
  className,
  children,
  side = "right",
  showClose = true,
  ...props
}: SheetContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop
        data-slot="sheet-backdrop"
        className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-[var(--layout-duration-base)] ease-out data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
      />
      <BaseDialog.Popup
        data-slot="sheet-content"
        className={cn(
          "fixed z-50 flex flex-col",
          "bg-popover text-popover-foreground",
          "border-border shadow-lg",
          "transition-all duration-[var(--layout-duration-slow)] ease-out",
          "outline-none p-6",
          sheetSideStyles[side],
          className
        )}
        {...props}
      >
        {children}
        {showClose && (
          <BaseDialog.Close
            data-slot="sheet-close-x"
            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none"
            aria-label="Close"
          >
            <X className="size-4" />
          </BaseDialog.Close>
        )}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-2 pb-4", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "mt-auto flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: BaseDialog.Title.Props) {
  return (
    <BaseDialog.Title
      data-slot="sheet-title"
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }: BaseDialog.Description.Props) {
  return (
    <BaseDialog.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function SheetClose({ className, ...props }: BaseDialog.Close.Props) {
  return (
    <BaseDialog.Close
      data-slot="sheet-close"
      className={cn(className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
};
