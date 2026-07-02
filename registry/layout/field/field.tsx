"use client";

import * as React from "react";
import { Field as BaseField } from "@base-ui/react/field";

import { cn } from "@/lib/utils";

interface FieldProps
  extends React.ComponentPropsWithoutRef<typeof BaseField.Root> {
  className?: string;
}

function Field({ className, ...props }: FieldProps) {
  return (
    <BaseField.Root
      data-slot="field"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

interface FieldLabelProps
  extends React.ComponentPropsWithoutRef<typeof BaseField.Label> {
  className?: string;
}

function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <BaseField.Label
      data-slot="field-label"
      className={cn(
        "text-sm font-medium leading-none text-foreground",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
}

interface FieldDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof BaseField.Description> {
  className?: string;
}

function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <BaseField.Description
      data-slot="field-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

interface FieldErrorProps
  extends React.ComponentPropsWithoutRef<typeof BaseField.Error> {
  className?: string;
}

function FieldError({ className, ...props }: FieldErrorProps) {
  return (
    <BaseField.Error
      data-slot="field-error"
      className={cn("text-sm text-destructive", className)}
      {...props}
    />
  );
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  type FieldProps,
  type FieldLabelProps,
  type FieldDescriptionProps,
  type FieldErrorProps,
};
