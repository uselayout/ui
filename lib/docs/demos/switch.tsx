"use client";

import * as React from "react";

import { Switch } from "@/registry/layout/switch/switch";
import { Label } from "@/registry/layout/label/label";

export const importLine = `import { Switch } from "@/components/ui/switch"`;

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

function ControlledDemo() {
  const [enabled, setEnabled] = React.useState(false);

  return (
    <div className="flex items-center gap-3">
      <Switch
        id="airplane"
        checked={enabled}
        onCheckedChange={setEnabled}
      />
      <Label htmlFor="airplane">
        Airplane mode {enabled ? "on" : "off"}
      </Label>
    </div>
  );
}

export const demos: Demo[] = [
  {
    title: "Default",
    component: (
      <div className="flex items-center gap-3">
        <Switch id="notifications" />
        <Label htmlFor="notifications">Enable notifications</Label>
      </div>
    ),
    code: `<div className="flex items-center gap-3">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>`,
  },
  {
    title: "Controlled",
    component: <ControlledDemo />,
    code: `const [enabled, setEnabled] = React.useState(false);

<div className="flex items-center gap-3">
  <Switch
    id="airplane"
    checked={enabled}
    onCheckedChange={setEnabled}
  />
  <Label htmlFor="airplane">
    Airplane mode {enabled ? "on" : "off"}
  </Label>
</div>`,
  },
  {
    title: "Settings list",
    component: (
      <div className="flex flex-col gap-4 w-full max-w-sm">
        {[
          { id: "s-dark", label: "Dark mode", defaultChecked: false },
          { id: "s-2fa", label: "Two-factor authentication", defaultChecked: true },
          { id: "s-beta", label: "Join beta programme", defaultChecked: false },
        ].map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <Label htmlFor={item.id}>{item.label}</Label>
            <Switch id={item.id} defaultChecked={item.defaultChecked} />
          </div>
        ))}
      </div>
    ),
    code: `<div className="flex flex-col gap-4 w-full max-w-sm">
  <div className="flex items-center justify-between">
    <Label htmlFor="dark">Dark mode</Label>
    <Switch id="dark" />
  </div>
  <div className="flex items-center justify-between">
    <Label htmlFor="two-fa">Two-factor authentication</Label>
    <Switch id="two-fa" defaultChecked />
  </div>
  <div className="flex items-center justify-between">
    <Label htmlFor="beta">Join beta programme</Label>
    <Switch id="beta" />
  </div>
</div>`,
  },
  {
    title: "Disabled",
    component: (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Switch id="dis-off" disabled />
          <Label htmlFor="dis-off" className="opacity-50 cursor-not-allowed">
            Disabled off
          </Label>
        </div>
        <div className="flex items-center gap-3">
          <Switch id="dis-on" disabled defaultChecked />
          <Label htmlFor="dis-on" className="opacity-50 cursor-not-allowed">
            Disabled on
          </Label>
        </div>
      </div>
    ),
    code: `<Switch id="dis-off" disabled />
<Switch id="dis-on" disabled defaultChecked />`,
  },
];
