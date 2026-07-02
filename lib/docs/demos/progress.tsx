"use client";

import * as React from "react";

import { Progress } from "@/registry/layout/progress/progress";

export const importLine =
  `import { Progress } from "@/registry/layout/progress/progress";`;

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

function AnimatedProgress() {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setValue(66), 300);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={value} className="w-full" />;
}

export const demos: Demo[] = [
  {
    title: "Determinate",
    component: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Progress value={33} />
        <Progress value={66} />
        <Progress value={100} />
      </div>
    ),
    code: `<Progress value={33} />
<Progress value={66} />
<Progress value={100} />`,
  },
  {
    title: "Animated on mount",
    component: (
      <div className="w-full max-w-sm">
        <AnimatedProgress />
      </div>
    ),
    code: `function AnimatedProgress() {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    const timer = setTimeout(() => setValue(66), 300);
    return () => clearTimeout(timer);
  }, []);
  return <Progress value={value} />;
}`,
  },
  {
    title: "Indeterminate",
    component: <Progress value={null} className="w-full max-w-sm" />,
    code: `<Progress value={null} />`,
  },
  {
    title: "With label",
    component: (
      <div className="w-full max-w-sm space-y-1.5">
        <div className="flex items-center justify-between text-sm">
          <span>Uploading files…</span>
          <span className="text-muted-foreground">72%</span>
        </div>
        <Progress value={72} />
      </div>
    ),
    code: `<div className="space-y-1.5">
  <div className="flex items-center justify-between text-sm">
    <span>Uploading files…</span>
    <span className="text-muted-foreground">72%</span>
  </div>
  <Progress value={72} />
</div>`,
  },
];
