"use client";

import * as React from "react";
import { OTPField } from "@base-ui/react/otp-field";
import { Minus } from "lucide-react";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// InputOTP: root wrapper
// ---------------------------------------------------------------------------

interface InputOTPProps
  extends React.ComponentPropsWithoutRef<typeof OTPField.Root> {
  className?: string;
  containerClassName?: string;
}

function InputOTP({
  className,
  containerClassName,
  children,
  ...props
}: InputOTPProps) {
  return (
    <OTPField.Root
      data-slot="input-otp"
      className={cn("flex items-center gap-2", containerClassName)}
      {...props}
    >
      {children}
    </OTPField.Root>
  );
}

// ---------------------------------------------------------------------------
// InputOTPGroup: groups a set of slots visually
// ---------------------------------------------------------------------------

interface InputOTPGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function InputOTPGroup({ className, ...props }: InputOTPGroupProps) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// InputOTPSlot: a single character input rendered by Base UI
// ---------------------------------------------------------------------------

interface InputOTPSlotProps
  extends React.ComponentPropsWithoutRef<typeof OTPField.Input> {
  className?: string;
  /**
   * Pass `index` when rendering multiple slots manually outside the automatic
   * loop; Base UI needs it to know which character to show.
   */
  index?: number;
}

function InputOTPSlot({ className, ...props }: InputOTPSlotProps) {
  return (
    <OTPField.Input
      data-slot="input-otp-slot"
      className={cn(
        "relative flex h-9 w-9 items-center justify-center",
        "border-y border-r border-input bg-transparent text-sm font-medium text-foreground",
        "first:rounded-l-md first:border-l last:rounded-r-md",
        "transition-[box-shadow,border-color] duration-[var(--layout-duration-base)] ease-out",
        "outline-none",
        "focus:z-10 focus:border-ring focus:ring-[3px] focus:ring-ring/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[filled]:text-foreground",
        className
      )}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// InputOTPSeparator: visual divider between groups
// ---------------------------------------------------------------------------

interface InputOTPSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function InputOTPSeparator({ className, ...props }: InputOTPSeparatorProps) {
  return (
    <div
      role="separator"
      data-slot="input-otp-separator"
      className={cn("flex items-center text-muted-foreground", className)}
      {...props}
    >
      <Minus className="size-4" />
    </div>
  );
}

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  type InputOTPProps,
  type InputOTPGroupProps,
  type InputOTPSlotProps,
  type InputOTPSeparatorProps,
};
