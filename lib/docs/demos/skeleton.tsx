import * as React from "react";

import { Skeleton } from "@/registry/layout/skeleton/skeleton";

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "Profile row",
    component: (
      <div className="flex w-full max-w-sm items-center gap-4">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-3/5 rounded" />
          <Skeleton className="h-3 w-4/5 rounded" />
        </div>
      </div>
    ),
    code: `<div className="flex items-center gap-4">
  <Skeleton className="size-10 rounded-full" />
  <div className="flex flex-1 flex-col gap-2">
    <Skeleton className="h-4 w-3/5 rounded" />
    <Skeleton className="h-3 w-4/5 rounded" />
  </div>
</div>`,
  },
  {
    title: "Card skeleton",
    component: (
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-1/3 rounded" />
          <Skeleton className="h-3.5 w-2/3 rounded" />
        </div>
        <Skeleton className="h-24 w-full rounded-lg" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
    ),
    code: `<div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
  <div className="flex flex-col gap-2">
    <Skeleton className="h-5 w-1/3 rounded" />
    <Skeleton className="h-3.5 w-2/3 rounded" />
  </div>
  <Skeleton className="h-24 w-full rounded-lg" />
  <div className="flex gap-2">
    <Skeleton className="h-8 w-24 rounded-md" />
    <Skeleton className="h-8 w-20 rounded-md" />
  </div>
</div>`,
  },
  {
    title: "Table skeleton",
    component: (
      <div className="w-full max-w-sm flex flex-col gap-2">
        <Skeleton className="h-8 w-full rounded" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-10 w-full rounded" />
        ))}
      </div>
    ),
    code: `<div className="flex flex-col gap-2">
  <Skeleton className="h-8 w-full rounded" />
  <Skeleton className="h-10 w-full rounded" />
  <Skeleton className="h-10 w-full rounded" />
  <Skeleton className="h-10 w-full rounded" />
</div>`,
  },
];
