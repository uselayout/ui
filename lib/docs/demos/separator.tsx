import * as React from "react";

import { Separator } from "@/registry/layout/separator/separator";

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "Horizontal",
    component: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <div>
          <p className="text-sm font-medium text-foreground">Design tokens</p>
          <p className="text-sm text-muted-foreground">
            Extracted colour, typography and spacing.
          </p>
        </div>
        <Separator />
        <div>
          <p className="text-sm font-medium text-foreground">Component library</p>
          <p className="text-sm text-muted-foreground">
            12 components, token-contracted and brand-ready.
          </p>
        </div>
      </div>
    ),
    code: `<div className="flex flex-col gap-4">
  <div>
    <p className="text-sm font-medium">Design tokens</p>
    <p className="text-sm text-muted-foreground">…</p>
  </div>
  <Separator />
  <div>
    <p className="text-sm font-medium">Component library</p>
    <p className="text-sm text-muted-foreground">…</p>
  </div>
</div>`,
  },
  {
    title: "Vertical",
    component: (
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>Docs</span>
        <Separator orientation="vertical" className="h-4" />
        <span>Components</span>
        <Separator orientation="vertical" className="h-4" />
        <span>Themes</span>
      </div>
    ),
    code: `<div className="flex items-center gap-4 text-sm text-muted-foreground">
  <span>Docs</span>
  <Separator orientation="vertical" className="h-4" />
  <span>Components</span>
  <Separator orientation="vertical" className="h-4" />
  <span>Themes</span>
</div>`,
  },
  {
    title: "Semantic (decorative=false)",
    component: (
      <div className="flex w-full max-w-sm flex-col gap-3">
        <p className="text-sm font-medium text-foreground">Section A</p>
        <Separator decorative={false} />
        <p className="text-sm font-medium text-foreground">Section B</p>
      </div>
    ),
    code: `<div className="flex flex-col gap-3">
  <p className="text-sm font-medium">Section A</p>
  <Separator decorative={false} />
  <p className="text-sm font-medium">Section B</p>
</div>`,
  },
];
