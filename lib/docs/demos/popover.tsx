"use client";

import * as React from "react";
import { useState } from "react";
import { Settings2, Info } from "lucide-react";

import { Button } from "@/registry/layout/button/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/registry/layout/popover/popover";

export const importLine = `import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"`;

function FilterPopover() {
  const [selected, setSelected] = useState<string[]>([]);
  const options = ["Colours", "Typography", "Spacing", "Components", "Effects"];

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline">
            <Settings2 />
            Filter
            {selected.length > 0 && (
              <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                {selected.length}
              </span>
            )}
          </Button>
        }
      />
      <PopoverContent>
        <p className="mb-3 text-sm font-semibold">Filter by section</p>
        <div className="flex flex-col gap-2">
          {options.map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={(e) =>
                  setSelected((prev) =>
                    e.target.checked ? [...prev, opt] : prev.filter((x) => x !== opt)
                  )
                }
                className="rounded"
              />
              {opt}
            </label>
          ))}
        </div>
        {selected.length > 0 && (
          <button
            onClick={() => setSelected([])}
            className="mt-3 text-xs text-muted-foreground underline-offset-2 hover:underline"
          >
            Clear all
          </button>
        )}
      </PopoverContent>
    </Popover>
  );
}

function InfoPopover() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <button className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40">
            <Info className="size-4" />
            <span className="sr-only">More information</span>
          </button>
        }
      />
      <PopoverContent side="right">
        <p className="text-sm font-semibold">Design token contract</p>
        <p className="mt-1 text-xs text-muted-foreground">
          All colour utilities resolve through a fallback chain so your shadcn
          or tweakcn theme always takes precedence over Layout defaults.
        </p>
      </PopoverContent>
    </Popover>
  );
}

function SideDemoPopover() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger render={<Button variant="outline" size="sm">{side}</Button>} />
          <PopoverContent side={side}>
            <p className="text-sm">Positioned to the <strong>{side}</strong>.</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}

export const demos = [
  {
    title: "Filter popover",
    component: <FilterPopover />,
    code: `<Popover>
  <PopoverTrigger render={<Button variant="outline"><Settings2 />Filter</Button>} />
  <PopoverContent>
    <p className="mb-3 text-sm font-semibold">Filter by section</p>
    {options.map((opt) => (
      <label key={opt} className="flex items-center gap-2 text-sm">
        <input type="checkbox" />
        {opt}
      </label>
    ))}
  </PopoverContent>
</Popover>`,
  },
  {
    title: "Info icon",
    component: (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        Token contract
        <InfoPopover />
      </div>
    ),
    code: `<Popover>
  <PopoverTrigger render={<button aria-label="More information"><Info className="size-4" /></button>} />
  <PopoverContent side="right">
    <p className="text-sm font-semibold">Design token contract</p>
    <p className="mt-1 text-xs text-muted-foreground">
      All colour utilities resolve through a fallback chain.
    </p>
  </PopoverContent>
</Popover>`,
  },
  {
    title: "Positioning",
    component: <SideDemoPopover />,
    code: `{(["top", "right", "bottom", "left"] as const).map((side) => (
  <Popover key={side}>
    <PopoverTrigger render={<Button variant="outline" size="sm">{side}</Button>} />
    <PopoverContent side={side}>
      <p className="text-sm">Positioned to the <strong>{side}</strong>.</p>
    </PopoverContent>
  </Popover>
))}`,
  },
];
