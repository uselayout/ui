import * as React from "react";
import Link from "next/link";

import { BrandSwitcher } from "@/components/docs/BrandSwitcher";
import { ThemeToggle } from "@/components/docs/ThemeToggle";
import { DensityToggle } from "@/components/docs/DensityToggle";
import { DocsSidebar, MobileNav } from "@/components/docs/DocsSidebar";

// ---------------------------------------------------------------------------
// Docs top bar
// ---------------------------------------------------------------------------

function DocsTopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-screen-xl items-center gap-4 px-4 py-3 lg:px-6">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-display text-base font-semibold tracking-tight text-foreground shrink-0"
        >
          Layout UI
        </Link>

        {/* Nav links */}
        <nav
          aria-label="Site navigation"
          className="hidden md:flex items-center gap-1 ml-2"
        >
          <Link
            href="/docs"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors duration-[var(--layout-duration-base)] ease-out"
          >
            Docs
          </Link>
          <Link
            href="/docs/components/button"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors duration-[var(--layout-duration-base)] ease-out"
          >
            Components
          </Link>
          <Link
            href="/docs/theming"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors duration-[var(--layout-duration-base)] ease-out"
          >
            Themes
          </Link>
          <a
            href="https://layout.design"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors duration-[var(--layout-duration-base)] ease-out"
          >
            layout.design
            <span aria-hidden="true" className="ml-1 opacity-50">↗</span>
          </a>
        </nav>

        {/* Right controls */}
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:block">
            <BrandSwitcher />
          </div>
          <DensityToggle />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Docs shell layout
// ---------------------------------------------------------------------------

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DocsTopBar />
      <div className="mx-auto flex max-w-screen-xl w-full gap-0 px-4 lg:px-6">
        {/* Left sidebar: sticky, hidden on mobile */}
        <aside className="hidden lg:block shrink-0 w-56 xl:w-64">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 pr-4">
            <DocsSidebar />
          </div>
        </aside>

        {/* Content: max-w-3xl prose column */}
        <main className="min-w-0 flex-1 py-10 lg:pl-10 xl:pl-14 max-w-3xl">
          {children}
        </main>
      </div>
    </>
  );
}
