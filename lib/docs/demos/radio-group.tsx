"use client";

import * as React from "react";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/registry/layout/radio-group/radio-group";
import { Label } from "@/registry/layout/label/label";

export const importLine = `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`;

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

function ControlledDemo() {
  const [plan, setPlan] = React.useState("pro");

  return (
    <RadioGroup value={plan} onValueChange={(v) => setPlan(v as string)}>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="starter" id="starter" />
        <Label htmlFor="starter">Starter · free forever</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="pro" id="pro" />
        <Label htmlFor="pro">Pro · £12/month</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="team" id="team" />
        <Label htmlFor="team">Team · £49/month</Label>
      </div>
    </RadioGroup>
  );
}

export const demos: Demo[] = [
  {
    title: "Default",
    component: (
      <RadioGroup defaultValue="comfortable">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="compact" id="compact" />
          <Label htmlFor="compact">Compact</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="comfortable" id="comfortable" />
          <Label htmlFor="comfortable">Comfortable</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="spacious" id="spacious" />
          <Label htmlFor="spacious">Spacious</Label>
        </div>
      </RadioGroup>
    ),
    code: `<RadioGroup defaultValue="comfortable">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="compact" id="compact" />
    <Label htmlFor="compact">Compact</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="comfortable" id="comfortable" />
    <Label htmlFor="comfortable">Comfortable</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="spacious" id="spacious" />
    <Label htmlFor="spacious">Spacious</Label>
  </div>
</RadioGroup>`,
  },
  {
    title: "Controlled",
    component: <ControlledDemo />,
    code: `const [plan, setPlan] = React.useState("pro");

<RadioGroup value={plan} onValueChange={setPlan}>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="starter" id="starter" />
    <Label htmlFor="starter">Starter · free forever</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="pro" id="pro" />
    <Label htmlFor="pro">Pro · £12/month</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="team" id="team" />
    <Label htmlFor="team">Team · £49/month</Label>
  </div>
</RadioGroup>`,
  },
  {
    title: "Horizontal layout",
    component: (
      <RadioGroup defaultValue="card" className="flex flex-row gap-6">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card">Card</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="paypal" id="paypal" />
          <Label htmlFor="paypal">PayPal</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="bank" id="bank" />
          <Label htmlFor="bank">Bank transfer</Label>
        </div>
      </RadioGroup>
    ),
    code: `<RadioGroup defaultValue="card" className="flex flex-row gap-6">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="card" id="card" />
    <Label htmlFor="card">Card</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="paypal" id="paypal" />
    <Label htmlFor="paypal">PayPal</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="bank" id="bank" />
    <Label htmlFor="bank">Bank transfer</Label>
  </div>
</RadioGroup>`,
  },
  {
    title: "Disabled",
    component: (
      <RadioGroup defaultValue="a" disabled>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="a" id="r-a" />
          <Label htmlFor="r-a" className="opacity-50 cursor-not-allowed">Option A</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="b" id="r-b" />
          <Label htmlFor="r-b" className="opacity-50 cursor-not-allowed">Option B</Label>
        </div>
      </RadioGroup>
    ),
    code: `<RadioGroup defaultValue="a" disabled>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="a" id="r-a" />
    <Label htmlFor="r-a" className="opacity-50 cursor-not-allowed">Option A</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="b" id="r-b" />
    <Label htmlFor="r-b" className="opacity-50 cursor-not-allowed">Option B</Label>
  </div>
</RadioGroup>`,
  },
];
