"use client";

import * as React from "react";

import { Checkbox } from "@/registry/layout/checkbox/checkbox";
import { Label } from "@/registry/layout/label/label";

export const importLine = `import { Checkbox } from "@/components/ui/checkbox"`;

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

function BasicDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}

function CheckedByDefaultDemo() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="newsletter" defaultChecked />
        <Label htmlFor="newsletter">Subscribe to newsletter</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="updates" defaultChecked />
        <Label htmlFor="updates">Receive product updates</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="marketing" />
        <Label htmlFor="marketing">Allow marketing emails</Label>
      </div>
    </div>
  );
}

function IndeterminateDemo() {
  const [checked, setChecked] = React.useState<boolean | "mixed">("mixed");

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="indeterminate"
        indeterminate={checked === "mixed"}
        checked={checked === true}
        onCheckedChange={(c) => setChecked(c)}
      />
      <Label htmlFor="indeterminate">Select all items</Label>
    </div>
  );
}

export const demos: Demo[] = [
  {
    title: "Default",
    component: <BasicDemo />,
    code: `<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`,
  },
  {
    title: "Pre-checked list",
    component: <CheckedByDefaultDemo />,
    code: `<div className="flex flex-col gap-3">
  <div className="flex items-center gap-2">
    <Checkbox id="newsletter" defaultChecked />
    <Label htmlFor="newsletter">Subscribe to newsletter</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="updates" defaultChecked />
    <Label htmlFor="updates">Receive product updates</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="marketing" />
    <Label htmlFor="marketing">Allow marketing emails</Label>
  </div>
</div>`,
  },
  {
    title: "Indeterminate state",
    component: <IndeterminateDemo />,
    code: `const [checked, setChecked] = React.useState<boolean | "mixed">("mixed");

<div className="flex items-center gap-2">
  <Checkbox
    id="indeterminate"
    indeterminate={checked === "mixed"}
    checked={checked === true}
    onCheckedChange={(c) => setChecked(c)}
  />
  <Label htmlFor="indeterminate">Select all items</Label>
</div>`,
  },
  {
    title: "Disabled",
    component: (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Checkbox id="disabled-unchecked" disabled />
          <Label htmlFor="disabled-unchecked" className="opacity-50 cursor-not-allowed">
            Unavailable option
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="disabled-checked" disabled defaultChecked />
          <Label htmlFor="disabled-checked" className="opacity-50 cursor-not-allowed">
            Read-only selection
          </Label>
        </div>
      </div>
    ),
    code: `<div className="flex flex-col gap-3">
  <div className="flex items-center gap-2">
    <Checkbox id="disabled-unchecked" disabled />
    <Label htmlFor="disabled-unchecked" className="opacity-50 cursor-not-allowed">
      Unavailable option
    </Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="disabled-checked" disabled defaultChecked />
    <Label htmlFor="disabled-checked" className="opacity-50 cursor-not-allowed">
      Read-only selection
    </Label>
  </div>
</div>`,
  },
];
