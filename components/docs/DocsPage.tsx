import * as React from "react";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// DocsPage: wraps every doc page with a consistent title + description block
// ---------------------------------------------------------------------------

interface DocsPageProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function DocsPage({ title, description, children, className }: DocsPageProps) {
  return (
    <div className={cn("min-w-0 flex-1", className)}>
      <div className="mb-8 border-b border-border pb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-10">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DocsSection: an h2-anchored section within a doc page
// ---------------------------------------------------------------------------

interface DocsSectionProps {
  title: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export function DocsSection({ title, id, children, className }: DocsSectionProps) {
  const slug = id ?? title.toLowerCase().replace(/\s+/g, "-");
  return (
    <section id={slug} className={cn("flex flex-col gap-4 scroll-mt-20", className)}>
      <h2 className="font-display text-xl font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}
