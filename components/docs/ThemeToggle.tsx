"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

const STORAGE_KEY = "layout-ui-theme";

function applyTheme(dark: boolean) {
  if (dark) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

export function ThemeToggle() {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const isDark = stored === "dark";
    setDark(isDark);
    applyTheme(isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground",
        "transition-all duration-[var(--layout-duration-base)] ease-out",
        "hover:bg-accent hover:text-accent-foreground cursor-pointer"
      )}
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
