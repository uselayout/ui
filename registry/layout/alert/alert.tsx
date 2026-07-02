import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative grid w-full grid-cols-[auto_1fr] items-start gap-x-3 gap-y-0.5 rounded-lg border bg-card px-4 py-3 text-sm transition-colors duration-[var(--layout-duration-base)] ease-out [&>svg]:mt-0.5 [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-border text-foreground [&>svg]:text-foreground",
        destructive:
          "border-destructive/40 text-destructive [&>svg]:text-destructive dark:border-destructive/60",
        success:
          "border-success/40 text-success [&>svg]:text-success dark:border-success/60",
        warning:
          "border-warning/40 text-warning [&>svg]:text-warning dark:border-warning/60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface AlertProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof alertVariants> {}

function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant, className }))}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 font-medium leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 text-sm leading-relaxed [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, alertVariants, type AlertProps };
