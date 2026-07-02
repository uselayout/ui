import * as React from "react";

import { Label } from "@/registry/layout/label/label";
import { Input } from "@/registry/layout/input/input";
import { Textarea } from "@/registry/layout/textarea/textarea";

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "With input",
    component: (
      <div className="flex w-full max-w-sm flex-col gap-2">
        <Label htmlFor="label-demo-name">Project name</Label>
        <Input id="label-demo-name" placeholder="My design system" />
      </div>
    ),
    code: `<div className="flex flex-col gap-2">
  <Label htmlFor="project-name">Project name</Label>
  <Input id="project-name" placeholder="My design system" />
</div>`,
  },
  {
    title: "With textarea",
    component: (
      <div className="flex w-full max-w-sm flex-col gap-2">
        <Label htmlFor="label-demo-notes">Notes</Label>
        <Textarea id="label-demo-notes" placeholder="Optional notes…" rows={3} />
      </div>
    ),
    code: `<div className="flex flex-col gap-2">
  <Label htmlFor="notes">Notes</Label>
  <Textarea id="notes" placeholder="Optional notes…" rows={3} />
</div>`,
  },
  {
    title: "Disabled peer",
    component: (
      <div className="flex w-full max-w-sm flex-col gap-2">
        <Label htmlFor="label-demo-disabled">API key</Label>
        <Input
          id="label-demo-disabled"
          defaultValue="sk-layout-••••••••"
          disabled
          className="peer"
        />
        <p className="text-xs text-muted-foreground peer-disabled:opacity-50">
          Managed by your organisation. Contact an admin to rotate.
        </p>
      </div>
    ),
    code: `<div className="flex flex-col gap-2">
  <Label htmlFor="api-key">API key</Label>
  <Input
    id="api-key"
    defaultValue="sk-layout-••••••••"
    disabled
    className="peer"
  />
  <p className="text-xs text-muted-foreground peer-disabled:opacity-50">
    Managed by your organisation.
  </p>
</div>`,
  },
];
