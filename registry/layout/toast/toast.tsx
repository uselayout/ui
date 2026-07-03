"use client";

import * as React from "react";
import { Toast as BaseToast } from "@base-ui/react/toast";
import { CheckCircle, AlertCircle, AlertTriangle, X } from "lucide-react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

// ─── Imperative toast manager ──────────────────────────────────────────────

const toastManager = BaseToast.createToastManager();

type ToastVariant = "default" | "success" | "warning" | "destructive";

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

function toast(options: ToastOptions & { type?: ToastVariant } = {}) {
  return toastManager.add({
    title: options.title,
    description: options.description,
    timeout: options.duration ?? 5000,
    type: options.type ?? "default",
    actionProps: options.action
      ? { onClick: options.action.onClick, children: options.action.label }
      : undefined,
  });
}

toast.success = (options: ToastOptions) =>
  toast({ ...options, type: "success" });
toast.warning = (options: ToastOptions) =>
  toast({ ...options, type: "warning" });
toast.destructive = (options: ToastOptions) =>
  toast({ ...options, type: "destructive" });
toast.dismiss = (id?: string) => toastManager.close(id);

// ─── Variant styling ───────────────────────────────────────────────────────

const toastVariants = cva(
  [
    "relative flex w-full items-start gap-3 rounded-lg border px-4 py-3 shadow-md",
    "transition-all duration-[var(--layout-duration-base)] ease-out",
    "data-[ending-style]:translate-y-2 data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
    "data-[starting-style]:translate-y-2 data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-popover text-popover-foreground border-border",
        success: "bg-success/10 text-popover-foreground border-success/30",
        warning: "bg-warning/10 text-popover-foreground border-warning/30",
        destructive:
          "bg-destructive/10 text-popover-foreground border-destructive/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const toastIconMap: Record<string, React.ReactNode> = {
  success: <CheckCircle className="mt-0.5 size-4 shrink-0 text-success" />,
  warning: <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" />,
  destructive: (
    <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
  ),
};

// ─── Inner toasts list (must be inside Provider context) ──────────────────

function ToastList() {
  const { toasts } = BaseToast.useToastManager();

  return (
    <>
      {toasts.map((t) => {
        const variant = (t.type as ToastVariant) ?? "default";
        const icon = toastIconMap[variant];

        return (
          <BaseToast.Root
            key={t.id}
            toast={t}
            data-slot="toast"
            className={cn(toastVariants({ variant }))}
          >
            {icon && <span aria-hidden>{icon}</span>}
            <BaseToast.Content
              data-slot="toast-content"
              className="min-w-0 flex-1"
            >
              {t.title && (
                <BaseToast.Title
                  data-slot="toast-title"
                  className="text-sm font-semibold leading-tight"
                />
              )}
              {t.description && (
                <BaseToast.Description
                  data-slot="toast-description"
                  className="mt-0.5 text-sm text-muted-foreground"
                />
              )}
              {t.actionProps && (
                <BaseToast.Action
                  data-slot="toast-action"
                  className="mt-2 text-xs font-medium underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                  {...t.actionProps}
                />
              )}
            </BaseToast.Content>
            <BaseToast.Close
              data-slot="toast-close"
              aria-label="Dismiss"
              className="ml-auto shrink-0 rounded-sm p-0.5 opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <X className="size-4" />
            </BaseToast.Close>
          </BaseToast.Root>
        );
      })}
    </>
  );
}

// ─── Toaster (mount once in root layout) ──────────────────────────────────

function Toaster() {
  return (
    <BaseToast.Provider toastManager={toastManager}>
      <BaseToast.Viewport
        data-slot="toast-viewport"
        className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 outline-none"
      >
        <ToastList />
      </BaseToast.Viewport>
    </BaseToast.Provider>
  );
}

export { Toaster, toast };
