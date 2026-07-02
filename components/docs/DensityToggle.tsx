"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const STORAGE_KEY = "layout-ui-density";

function applyDensity(compact: boolean) {
  if (compact) {
    document.documentElement.setAttribute("data-density", "compact");
  } else {
    document.documentElement.removeAttribute("data-density");
  }
}

export function DensityToggle() {
  const [compact, setCompact] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const isCompact = stored === "compact";
    setCompact(isCompact);
    applyDensity(isCompact);
  }, []);

  function toggle() {
    const next = !compact;
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
      <button
        type="button"
        onClick={() => !compact || toggle()}
        aria-pressed={!compact}
        className={cn(
          "rounded px-2.5 py-1 text-xs font-medium transition-all duration-[var(--layout-duration-base)] ease-out cursor-pointer",
          !compact
            ? "bg-background text-foreground shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Comfortable
      </button>
      <button
        type="button"
        onClick={() => compact || toggle()}
        aria-pressed={compact}
        className={cn(
          "rounded px-2.5 py-1 text-xs font-medium transition-all duration-[var(--layout-duration-base)] ease-out cursor-pointer",
          compact
            ? "bg-background text-foreground shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Compact
      </button>
    </div>
  );
}
