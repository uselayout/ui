"use client";

import * as React from "react";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

function Drawer(props: BaseDrawer.Root.Props) {
  return <BaseDrawer.Root {...props} />;
}

function DrawerTrigger(props: BaseDrawer.Trigger.Props) {
  return <BaseDrawer.Trigger data-slot="drawer-trigger" {...props} />;
}

interface DrawerContentProps extends BaseDrawer.Popup.Props {
  showClose?: boolean;
}

function DrawerContent({
  className,
  children,
  showClose = true,
  ...props
}: DrawerContentProps) {
  return (
    <BaseDrawer.Portal>
      <BaseDrawer.Backdrop
        data-slot="drawer-backdrop"
        className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-[var(--layout-duration-base)] ease-out data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
      />
      <BaseDrawer.Popup
        data-slot="drawer-content"
        className={cn(
          "fixed inset-x-0 bottom-0 z-50",
          "flex flex-col",
          "bg-popover text-popover-foreground",
          "rounded-t-xl border-t border-border shadow-lg",
          "px-6 pb-8 pt-4",
          "outline-none",
          "max-h-[90dvh] overflow-y-auto",
          "transition-transform duration-[var(--layout-duration-slow)] ease-out",
          "data-[starting-style]:translate-y-full",
          "data-[ending-style]:translate-y-full",
          className
        )}
        {...props}
      >
        {/* Drag handle */}
        <div
          data-slot="drawer-handle"
          className="mx-auto mb-4 h-1.5 w-12 shrink-0 rounded-full bg-muted-foreground/30"
          aria-hidden
        />
        {children}
        {showClose && (
          <BaseDrawer.Close
            data-slot="drawer-close-x"
            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none"
            aria-label="Close"
          >
            <X className="size-4" />
          </BaseDrawer.Close>
        )}
      </BaseDrawer.Popup>
    </BaseDrawer.Portal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-2 pb-4 text-left", className)}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "mt-auto flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }: BaseDrawer.Title.Props) {
  return (
    <BaseDrawer.Title
      data-slot="drawer-title"
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: BaseDrawer.Description.Props) {
  return (
    <BaseDrawer.Description
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function DrawerClose({ className, ...props }: BaseDrawer.Close.Props) {
  return (
    <BaseDrawer.Close
      data-slot="drawer-close"
      className={cn(className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
};
