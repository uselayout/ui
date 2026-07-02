"use client";

import * as React from "react";

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/registry/layout/field/field";
import { Input } from "@/registry/layout/input/input";
import { Checkbox } from "@/registry/layout/checkbox/checkbox";

export const importLine = `import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"`;

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "Basic field",
    component: (
      <Field className="w-full max-w-sm">
        <FieldLabel>Email address</FieldLabel>
        <Input type="email" placeholder="you@example.com" />
        <FieldDescription>
          We will only use this to send you important updates.
        </FieldDescription>
      </Field>
    ),
    code: `<Field>
  <FieldLabel>Email address</FieldLabel>
  <Input type="email" placeholder="you@example.com" />
  <FieldDescription>
    We will only use this to send you important updates.
  </FieldDescription>
</Field>`,
  },
  {
    title: "With validation",
    component: (
      <Field
        className="w-full max-w-sm"
        name="username"
        validate={(v) => {
          if (!v) return "Username is required.";
          if (String(v).length < 3) return "Must be at least 3 characters.";
          return null;
        }}
      >
        <FieldLabel>Username</FieldLabel>
        <Input placeholder="your-handle" />
        <FieldError />
        <FieldDescription>Letters, numbers and hyphens only.</FieldDescription>
      </Field>
    ),
    code: `<Field
  name="username"
  validate={(v) => {
    if (!v) return "Username is required.";
    if (String(v).length < 3) return "Must be at least 3 characters.";
    return null;
  }}
>
  <FieldLabel>Username</FieldLabel>
  <Input placeholder="your-handle" />
  <FieldError />
  <FieldDescription>Letters, numbers and hyphens only.</FieldDescription>
</Field>`,
  },
  {
    title: "With checkbox",
    component: (
      <Field className="w-full max-w-sm flex-row items-start gap-3">
        <Checkbox id="terms-field" />
        <div className="flex flex-col gap-1">
          <FieldLabel htmlFor="terms-field">
            I agree to the terms of service
          </FieldLabel>
          <FieldDescription>
            By checking this you accept our privacy policy.
          </FieldDescription>
        </div>
      </Field>
    ),
    code: `<Field className="flex-row items-start gap-3">
  <Checkbox id="terms-field" />
  <div className="flex flex-col gap-1">
    <FieldLabel htmlFor="terms-field">
      I agree to the terms of service
    </FieldLabel>
    <FieldDescription>
      By checking this you accept our privacy policy.
    </FieldDescription>
  </div>
</Field>`,
  },
  {
    title: "Disabled",
    component: (
      <Field className="w-full max-w-sm" disabled>
        <FieldLabel>Organisation name</FieldLabel>
        <Input defaultValue="Acme Corp" />
        <FieldDescription>
          Contact support to change your organisation name.
        </FieldDescription>
      </Field>
    ),
    code: `<Field disabled>
  <FieldLabel>Organisation name</FieldLabel>
  <Input defaultValue="Acme Corp" />
  <FieldDescription>
    Contact support to change your organisation name.
  </FieldDescription>
</Field>`,
  },
];
