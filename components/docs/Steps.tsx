import * as React from "react";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Steps: numbered installation steps. CSS counter drives the step numbers
// so no client-side JS or manual numbering is required.
// ---------------------------------------------------------------------------

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

export function Steps({ children, className }: StepsProps) {
  return (
    <ol
      className={cn(
        "flex flex-col gap-0 border-l border-border ml-4 [counter-reset:step]",
        className
      )}
    >
      {children}
    </ol>
  );
}

// ---------------------------------------------------------------------------
// Step: a single numbered step inside <Steps>
// ---------------------------------------------------------------------------

interface StepProps {
  title: string;
  children: React.ReactNode;
}

export function Step({ title, children }: StepProps) {
  return (
    <li className="relative pl-8 pb-8 last:pb-0 [counter-increment:step]">
      {/* Step number bubble, driven by CSS counter via ::before pseudo */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute -left-3.5 flex size-7 items-center justify-center rounded-full",
          "border border-border bg-background",
          "text-xs font-semibold text-foreground select-none",
          "before:content-[counter(step)]"
        )}
      />
      <h3 className="font-display text-base font-semibold text-foreground mb-3 mt-0.5">
        {title}
      </h3>
      <div className="flex flex-col gap-3 text-sm text-muted-foreground leading-relaxed">
        {children}
      </div>
    </li>
  );
}
