"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type Brand = "default" | "stripe" | "linear" | "notion";

const BRANDS: { value: Brand; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "stripe", label: "Stripe" },
  { value: "linear", label: "Linear" },
  { value: "notion", label: "Notion" },
];

const STORAGE_KEY = "layout-ui-brand";

function applyBrand(brand: Brand) {
  if (brand === "default") {
    document.documentElement.removeAttribute("data-brand");
  } else {
    document.documentElement.setAttribute("data-brand", brand);
  }
}

export function BrandSwitcher() {
  const [active, setActive] = React.useState<Brand>("default");

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Brand | null;
    if (stored && BRANDS.some((b) => b.value === stored)) {
      setActive(stored);
      applyBrand(stored);
    }
  }, []);

  function handleSelect(brand: Brand) {
    setActive(brand);
    applyBrand(brand);
    localStorage.setItem(STORAGE_KEY, brand);
  }

  return (
    <div
      role="group"
      aria-label="Brand theme"
      className="inline-flex items-center rounded-md border border-border bg-muted p-0.5 gap-0.5"
    >
      {BRANDS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => handleSelect(value)}
          aria-pressed={active === value}
          className={cn(
            "rounded px-2.5 py-1 text-xs font-medium transition-all duration-[var(--layout-duration-base)] ease-out cursor-pointer",
            active === value
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
