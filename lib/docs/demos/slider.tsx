"use client";

import * as React from "react";

import { Slider } from "@/registry/layout/slider/slider";

export const importLine = `import { Slider } from "@/components/ui/slider"`;

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

function ControlledDemo() {
  const [value, setValue] = React.useState(40);

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Volume</span>
        <span>{value}%</span>
      </div>
      <Slider
        min={0}
        max={100}
        value={value}
        onValueChange={(v) => setValue(v as number)}
      />
    </div>
  );
}

function RangeDemo() {
  const [range, setRange] = React.useState<readonly number[]>([20, 80]);

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Price range</span>
        <span>£{range[0]} – £{range[1]}</span>
      </div>
      <Slider
        min={0}
        max={200}
        value={range}
        onValueChange={(v) => setRange(v as readonly number[])}
      />
    </div>
  );
}

export const demos: Demo[] = [
  {
    title: "Default",
    component: (
      <div className="w-full max-w-sm">
        <Slider defaultValue={50} min={0} max={100} />
      </div>
    ),
    code: `<Slider defaultValue={50} min={0} max={100} />`,
  },
  {
    title: "Controlled with value display",
    component: <ControlledDemo />,
    code: `const [value, setValue] = React.useState(40);

<div className="flex flex-col gap-3 w-full max-w-sm">
  <div className="flex justify-between text-sm text-muted-foreground">
    <span>Volume</span>
    <span>{value}%</span>
  </div>
  <Slider
    min={0}
    max={100}
    value={value}
    onValueChange={(v) => setValue(v as number)}
  />
</div>`,
  },
  {
    title: "Range slider",
    component: <RangeDemo />,
    code: `const [range, setRange] = React.useState<readonly number[]>([20, 80]);

<Slider
  min={0}
  max={200}
  value={range}
  onValueChange={(v) => setRange(v as readonly number[])}
/>`,
  },
  {
    title: "Disabled",
    component: (
      <div className="w-full max-w-sm">
        <Slider defaultValue={60} min={0} max={100} disabled />
      </div>
    ),
    code: `<Slider defaultValue={60} min={0} max={100} disabled />`,
  },
];
