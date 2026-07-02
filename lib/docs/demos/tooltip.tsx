"use client";

import * as React from "react";
import { Copy, Download, Trash2, Info } from "lucide-react";

import { Button } from "@/registry/layout/button/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/registry/layout/tooltip/tooltip";

export const importLine = `import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"`;

function BasicTooltips() {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger render={<Button size="icon" variant="outline" aria-label="Copy"><Copy /></Button>} />
          <TooltipContent>Copy to clipboard</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button size="icon" variant="outline" aria-label="Download"><Download /></Button>} />
          <TooltipContent>Export bundle</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button size="icon" variant="outline" aria-label="Delete"><Trash2 /></Button>} />
          <TooltipContent>Delete project</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

function SideTooltips() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-3">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger render={<Button variant="outline" size="sm">{side}</Button>} />
            <TooltipContent side={side}>Appears on the {side}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

function InlineTooltip() {
  return (
    <TooltipProvider>
      <p className="text-sm text-muted-foreground">
        Design tokens follow the{" "}
        <Tooltip>
          <TooltipTrigger
            render={
              <span className="inline-flex cursor-help items-center gap-0.5 underline underline-offset-2 decoration-dashed">
                W3C DTCG format
                <Info className="size-3" />
              </span>
            }
          />
          <TooltipContent>
            W3C Design Token Community Group — the emerging standard for sharing
            design tokens across tools.
          </TooltipContent>
        </Tooltip>
        {" "}for cross-tool compatibility.
      </p>
    </TooltipProvider>
  );
}

export const demos = [
  {
    title: "Icon buttons",
    component: <BasicTooltips />,
    code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button size="icon" variant="outline" aria-label="Copy"><Copy /></Button>} />
    <TooltipContent>Copy to clipboard</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
  },
  {
    title: "Positioning",
    component: <SideTooltips />,
    code: `<TooltipProvider>
  {(["top", "right", "bottom", "left"] as const).map((side) => (
    <Tooltip key={side}>
      <TooltipTrigger render={<Button variant="outline" size="sm">{side}</Button>} />
      <TooltipContent side={side}>Appears on the {side}</TooltipContent>
    </Tooltip>
  ))}
</TooltipProvider>`,
  },
  {
    title: "Inline help text",
    component: <InlineTooltip />,
    code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<span className="cursor-help underline decoration-dashed">W3C DTCG format</span>} />
    <TooltipContent>
      W3C Design Token Community Group — the emerging standard for sharing
      design tokens across tools.
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
  },
];
