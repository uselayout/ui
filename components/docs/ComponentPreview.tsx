"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { BrandScope } from "@/components/docs/BrandScope";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  className?: string;
}

type Tab = "preview" | "code";

export function ComponentPreview({
  children,
  code,
  className,
}: ComponentPreviewProps) {
  const [active, setActive] = React.useState<Tab>("preview");

  return (
    <div className={cn("flex flex-col gap-0 rounded-xl border border-border", className)}>
      {/* Tab bar */}
      <div className="flex items-center gap-1 border-b border-border px-3 pt-2">
        {(["preview", "code"] as Tab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={cn(
              "relative px-3 py-1.5 text-sm font-medium capitalize transition-colors duration-[var(--layout-duration-base)] ease-out outline-none",
              "focus-visible:ring-2 focus-visible:ring-ring rounded-md",
              active === tab
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
            {active === tab && (
              <span className="absolute inset-x-0 -bottom-[1px] h-px bg-foreground" />
            )}
          </button>
        ))}
      </div>

      {/* Content: the preview surface is brand-scoped so the switcher
          reskins components without affecting the docs chrome. */}
      {active === "preview" ? (
        <BrandScope className="min-h-[180px] rounded-b-xl p-8 flex items-center justify-center">
          {children}
        </BrandScope>
      ) : (
        <div className="rounded-b-xl overflow-hidden">
          <CodeBlock
            code={code}
            language="tsx"
            className="rounded-t-none border-0"
          />
        </div>
      )}
    </div>
  );
}
