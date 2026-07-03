"use client";

import * as React from "react";
import { Rows2, Rows4 } from "lucide-react";

import { cn } from "@/lib/utils";

const STORAGE_KEY = "layout-ui-density";

function applyDensity(compact: boolean) {
  if (compact) {
    document.documentElement.setAttribute("data-density", "compact");
  } else {
    document.documentElement.removeAttribute("data-density");
  }
}

const OPTIONS = [
  { compact: false, label: "Comfortable density", Icon: Rows2 },
  { compact: true, label: "Compact density", Icon: Rows4 },
] as const;

export function DensityToggle() {
  const [compact, setCompact] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const isCompact = stored === "compact";
    setCompact(isCompact);
    applyDensity(isCompact);
  }, []);

  function select(next: boolean) {
    if (next === compact) return;
    setCompact(next);
    applyDensity(next);
    localStorage.setItem(STORAGE_KEY, next ? "compact" : "comfortable");
  }

  return (
    <div
      role="group"
      aria-label="Density"
      className="inline-flex items-center rounded-md border border-border bg-muted p-0.5 gap-0.5"
    >
      {OPTIONS.map(({ compact: value, label, Icon }) => (
        <button
          key={label}
          type="button"
          onClick={() => select(value)}
          aria-pressed={compact === value}
          aria-label={label}
          title={label}
          className={cn(
            "rounded p-1.5 transition-all duration-[var(--layout-duration-base)] ease-out cursor-pointer",
            compact === value
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon aria-hidden="true" className="size-3.5" />
        </button>
      ))}
    </div>
  );
}
