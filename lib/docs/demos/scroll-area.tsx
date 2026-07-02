import * as React from "react";

import { ScrollArea, ScrollBar } from "@/registry/layout/scroll-area/scroll-area";

export const importLine =
  `import { ScrollArea, ScrollBar } from "@/registry/layout/scroll-area/scroll-area";`;

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

const tags = Array.from({ length: 50 }, (_, i) => `Tag ${i + 1}`);

export const demos: Demo[] = [
  {
    title: "Vertical list",
    component: (
      <ScrollArea className="h-64 w-48 rounded-md border p-4">
        <div className="flex flex-col gap-1">
          {tags.map((tag) => (
            <div key={tag} className="text-sm">
              {tag}
            </div>
          ))}
        </div>
      </ScrollArea>
    ),
    code: `<ScrollArea className="h-64 w-48 rounded-md border p-4">
  <div className="flex flex-col gap-1">
    {tags.map((tag) => (
      <div key={tag} className="text-sm">{tag}</div>
    ))}
  </div>
</ScrollArea>`,
  },
  {
    title: "Horizontal scroll",
    component: (
      <ScrollArea className="w-64 rounded-md border" orientation="horizontal">
        <div className="flex gap-3 p-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="flex size-16 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium"
            >
              {i + 1}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    ),
    code: `<ScrollArea className="w-64 rounded-md border" orientation="horizontal">
  <div className="flex gap-3 p-4">
    {items.map((item) => (
      <div key={item} className="flex size-16 shrink-0 items-center justify-center rounded-md bg-muted text-sm">
        {item}
      </div>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
  },
  {
    title: "Changelog panel",
    component: (
      <ScrollArea className="h-64 w-72 rounded-md border">
        <div className="p-4">
          <h4 className="mb-3 text-sm font-semibold">Changelog</h4>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="mb-4 last:mb-0">
              <p className="text-sm font-medium">v1.{i}.0</p>
              <p className="text-xs text-muted-foreground">
                Bug fixes and performance improvements.
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    ),
    code: `<ScrollArea className="h-64 w-72 rounded-md border">
  <div className="p-4">
    <h4 className="mb-3 text-sm font-semibold">Changelog</h4>
    {versions.map((v) => (
      <div key={v} className="mb-4 last:mb-0">
        <p className="text-sm font-medium">{v}</p>
        <p className="text-xs text-muted-foreground">Bug fixes and improvements.</p>
      </div>
    ))}
  </div>
</ScrollArea>`,
  },
];
