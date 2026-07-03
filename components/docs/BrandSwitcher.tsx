"use client";

import * as React from "react";
import { ChevronDown, Palette } from "lucide-react";

import { cn } from "@/lib/utils";
import { useBrand, setBrand } from "@/lib/docs/brand-store";
import brandsManifest from "@/lib/docs/brands.json";

interface BrandEntry {
  slug: string;
  name: string;
  mode: string;
}

const BRANDS = brandsManifest as BrandEntry[];

export function BrandSwitcher() {
  const active = useBrand();

  const activeName =
    active === "default"
      ? "Default"
      : BRANDS.find((b) => b.slug === active)?.name ?? active;

  return (
    <label
      className={cn(
        "relative inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border border-border bg-muted",
        "pl-2.5 pr-2 text-xs font-medium text-foreground",
        "transition-colors duration-[var(--layout-duration-base)] ease-out hover:bg-accent"
      )}
    >
      <Palette aria-hidden="true" className="size-3.5 text-muted-foreground" />
      <span className="max-w-24 truncate">{activeName}</span>
      <ChevronDown aria-hidden="true" className="size-3 text-muted-foreground" />
      <select
        aria-label="Preview brand (compiled from layout.design gallery kits)"
        value={active}
        onChange={(event) => setBrand(event.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
      >
        <option value="default">Default</option>
        {BRANDS.map((brand) => (
          <option key={brand.slug} value={brand.slug}>
            {brand.name}
            {brand.mode === "dark" ? " (dark)" : ""}
          </option>
        ))}
      </select>
    </label>
  );
}
