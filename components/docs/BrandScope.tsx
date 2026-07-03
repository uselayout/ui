"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useBrand } from "@/lib/docs/brand-store";

/**
 * Applies the selected gallery-kit brand to its children only.
 * Preview surfaces wrap their content in this so the brand switcher
 * reskins components without touching the docs chrome.
 */
export function BrandScope({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const brand = useBrand();

  return (
    <div
      data-brand={brand !== "default" ? brand : undefined}
      className={cn("bg-background text-foreground", className)}
    >
      {children}
    </div>
  );
}
