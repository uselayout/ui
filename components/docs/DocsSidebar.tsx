"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  getAllComponentSlugs,
  getComponentDoc,
} from "@/lib/docs/components-meta";

// ---------------------------------------------------------------------------
// Sidebar nav data
// ---------------------------------------------------------------------------

interface NavItem {
  label: string;
  href: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

// Derived from registry.json so new components appear automatically.
const COMPONENTS: NavItem[] = getAllComponentSlugs()
  .map((slug) => {
    const doc = getComponentDoc(slug);
    return { label: doc?.title ?? slug, href: `/docs/components/${slug}` };
  })
  .sort((a, b) => a.label.localeCompare(b.label));

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Getting started",
    items: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Theming", href: "/docs/theming" },
      { label: "For AI agents", href: "/docs/ai-agents" },
    ],
  },
  {
    title: "Installation",
    items: [
      { label: "Next.js", href: "/docs/installation/next" },
      { label: "Vite", href: "/docs/installation/vite" },
      { label: "Laravel", href: "/docs/installation/laravel" },
      { label: "React Router", href: "/docs/installation/react-router" },
      { label: "Astro", href: "/docs/installation/astro" },
      { label: "TanStack Start", href: "/docs/installation/tanstack" },
    ],
  },
  {
    title: "Components",
    items: COMPONENTS,
  },
];

// ---------------------------------------------------------------------------
// NavLink
// ---------------------------------------------------------------------------

function NavLink({ href, label }: NavItem) {
  const pathname = usePathname();
  // Exact match for /docs; prefix match for everything else
  const isActive =
    href === "/docs" ? pathname === "/docs" : pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "block rounded-md px-3 py-1.5 text-sm transition-colors duration-[var(--layout-duration-base)] ease-out",
        isActive
          ? "bg-accent text-accent-foreground font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
      )}
    >
      {label}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// DocsSidebar (desktop)
// ---------------------------------------------------------------------------

export function DocsSidebar({ className }: { className?: string }) {
  return (
    <nav
      aria-label="Documentation navigation"
      className={cn("flex flex-col gap-6", className)}
    >
      {NAV_GROUPS.map((group) => (
        <div key={group.title}>
          <p className="mb-1.5 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
            {group.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => (
              <li key={item.href}>
                <NavLink {...item} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// MobileNav: disclosure panel for small screens
// ---------------------------------------------------------------------------

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Close when route changes
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className={cn(
          "inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5",
          "text-sm text-muted-foreground hover:text-foreground",
          "transition-colors duration-[var(--layout-duration-base)] ease-out"
        )}
      >
        <svg
          aria-hidden="true"
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        Menu
      </button>

      {open && (
        <div
          id="mobile-nav"
          className={cn(
            "absolute left-0 right-0 z-50 border-b border-border bg-background",
            "px-4 py-6 shadow-md"
          )}
        >
          <DocsSidebar />
        </div>
      )}
    </div>
  );
}
