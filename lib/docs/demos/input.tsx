import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "@/registry/layout/input/input";
import { Label } from "@/registry/layout/label/label";

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "Default",
    component: (
      <div className="flex w-full max-w-sm flex-col gap-2">
        <Label htmlFor="input-default">Email address</Label>
        <Input id="input-default" type="email" placeholder="you@example.com" />
      </div>
    ),
    code: `<div className="flex flex-col gap-2">
  <Label htmlFor="email">Email address</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`,
  },
  {
    title: "Error state",
    component: (
      <div className="flex w-full max-w-sm flex-col gap-2">
        <Label htmlFor="input-error">Email address</Label>
        <Input
          id="input-error"
          type="email"
          defaultValue="not-an-email"
          aria-invalid
        />
        <p className="text-xs text-destructive">
          Please enter a valid email address.
        </p>
      </div>
    ),
    code: `<div className="flex flex-col gap-2">
  <Label htmlFor="email">Email address</Label>
  <Input
    id="email"
    type="email"
    defaultValue="not-an-email"
    aria-invalid
  />
  <p className="text-xs text-destructive">
    Please enter a valid email address.
  </p>
</div>`,
  },
  {
    title: "Disabled",
    component: (
      <div className="flex w-full max-w-sm flex-col gap-2">
        <Label htmlFor="input-disabled">API key</Label>
        <Input
          id="input-disabled"
          defaultValue="sk-layout-••••••••••••••••"
          disabled
        />
        <p className="text-xs text-muted-foreground">
          Rotate your key in settings to change it.
        </p>
      </div>
    ),
    code: `<div className="flex flex-col gap-2">
  <Label htmlFor="api-key">API key</Label>
  <Input
    id="api-key"
    defaultValue="sk-layout-••••••••••••••••"
    disabled
  />
  <p className="text-xs text-muted-foreground">
    Rotate your key in settings to change it.
  </p>
</div>`,
  },
  {
    title: "Search input",
    component: (
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <Input placeholder="Search components…" className="pl-9" />
      </div>
    ),
    code: `<div className="relative">
  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
  <Input placeholder="Search components…" className="pl-9" />
</div>`,
  },
];
