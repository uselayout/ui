import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { ThemeBuilder } from "./ThemeBuilder";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Create your theme · Layout UI",
  description:
    "Start from any layout.design gallery kit and customise the primary colour, radius, density, fonts, and shadows. Copy the CSS overrides and install commands to use in your own project.",
};

// ---------------------------------------------------------------------------
// Top bar (minimal, own chrome)
// ---------------------------------------------------------------------------

function CreateTopBar() {
  return (
    <header className="flex h-12 shrink-0 items-center gap-4 border-b border-border bg-card px-4 lg:px-6">
      <Link
        href="/"
        aria-label="Back to home"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-[var(--layout-duration-base)] ease-out"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        <span className="font-display font-semibold tracking-tight text-foreground">
          Layout UI
        </span>
      </Link>

      <span className="text-border select-none">/</span>

      <span className="text-sm text-muted-foreground">Create</span>

      <div className="ml-auto hidden sm:flex items-center gap-4">
        <a
          href="https://layout.design/gallery"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-[var(--layout-duration-base)] ease-out"
        >
          Browse gallery kits
          <span aria-hidden="true" className="ml-1 opacity-50">↗</span>
        </a>
        <Link
          href="/docs"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-[var(--layout-duration-base)] ease-out"
        >
          Docs
        </Link>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Client wrapper that reads search params
// ---------------------------------------------------------------------------

// ThemeBuilder is already a client component ("use client" at the top of
// ThemeBuilder.tsx). We pass nothing here and let it read window.location
// on mount — that avoids needing useSearchParams in a Server Component tree
// and keeps the Suspense boundary simple.
//
// If Next.js opts this page out of static rendering due to dynamic params
// that is fine: it's an interactive builder, not a cacheable page.

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CreatePage() {
  return (
    <div className="flex h-svh flex-col overflow-hidden bg-background text-foreground">
      <CreateTopBar />
      <main className="flex-1 min-h-0 overflow-hidden">
        <Suspense fallback={<div className="flex h-full items-center justify-center text-sm text-muted-foreground">Loading theme builder…</div>}>
          <ThemeBuilder />
        </Suspense>
      </main>
    </div>
  );
}
