import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DocsPage, DocsSection } from "@/components/docs/DocsPage";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Add Layout UI components to your project via the shadcn registry CLI. Choose your framework: Next.js, Vite, Astro, React Router, TanStack Start, or Laravel.",
  alternates: {
    canonical: `${SITE_URL}/docs/installation`,
  },
};

// ---------------------------------------------------------------------------
// Inline code block for terminal / JSON snippets
// ---------------------------------------------------------------------------

function Code({ children, language }: { children: string; language?: string }) {
  return (
    <pre className="rounded-lg bg-muted font-mono text-sm p-4 overflow-x-auto border border-border">
      <code className="text-foreground leading-relaxed whitespace-pre">{children}</code>
    </pre>
  );
}

// ---------------------------------------------------------------------------
// Framework link card
// ---------------------------------------------------------------------------

function FrameworkCard({ href, name, description }: { href: string; name: string; description: string }) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3 rounded-xl border border-border bg-card p-5 no-underline transition-colors duration-[var(--layout-duration-base)] ease-out hover:border-ring/40 hover:bg-accent/30"
    >
      <div className="flex-1 min-w-0">
        <p className="font-display text-sm font-semibold text-foreground">{name}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
      <ArrowRight className="mt-0.5 size-4 text-muted-foreground shrink-0 transition-transform duration-[var(--layout-duration-base)] group-hover:translate-x-0.5" />
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function InstallationPage() {
  return (
    <DocsPage
      title="Installation"
      description="Layout UI components are installed via the shadcn registry CLI. No package to npm-install, no hidden peer dependencies beyond what each component explicitly declares."
    >
      <DocsSection title="Registry setup">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Add the Layout registry to your project&apos;s{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            components.json
          </code>{" "}
          so the{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            shadcn
          </code>{" "}
          CLI resolves{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            @layout/*
          </code>{" "}
          component references:
        </p>
        <Code language="json">{`{
  "registries": {
    "@layout": "${SITE_URL}/r/{name}.json"
  }
}`}</Code>
      </DocsSection>

      <DocsSection title="Installing components">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Once the registry is configured, install any component with the{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            shadcn add
          </code>{" "}
          command:
        </p>
        <Code language="bash">{`npx shadcn add @layout/button`}</Code>
        <p className="text-sm text-muted-foreground leading-relaxed">
          You can also use the direct registry URL form without configuring{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            components.json
          </code>{" "}
          first:
        </p>
        <Code language="bash">{`npx shadcn add ${SITE_URL}/r/button.json`}</Code>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Install the theme alongside your first component to get the full token contract,
          including success, warning, shadow, and motion tokens that the shadcn default theme
          does not cover:
        </p>
        <Code language="bash">{`npx shadcn add @layout/theme-layout`}</Code>
      </DocsSection>

      <DocsSection title="Layout CLI">
        <p className="text-sm text-muted-foreground leading-relaxed">
          The Layout CLI (
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            @layoutdesign/context
          </code>
          ) installs components with zero configuration: no components.json needed. It
          resolves component dependencies, installs npm packages with your package manager,
          and injects the theme variables. If your project has no Layout theme yet, the
          default theme is included automatically on first use.
        </p>
        <Code language="bash">{`npx @layoutdesign/context add button`}</Code>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Useful flags:{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            --dry-run
          </code>{" "}
          to preview,{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            --overwrite
          </code>{" "}
          to replace existing files, and{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            --css
          </code>{" "}
          to point at a specific stylesheet. The same package provides the MCP server that
          gives AI agents the design system context and compliance checks.
        </p>
      </DocsSection>

      <DocsSection title="Framework guides">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Choose your framework for a step-by-step setup guide, from project creation through
          installing your first Layout UI component.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <FrameworkCard
            href="/docs/installation/next"
            name="Next.js"
            description="App Router with Tailwind v4 and TypeScript"
          />
          <FrameworkCard
            href="/docs/installation/vite"
            name="Vite"
            description="React + Vite with Tailwind v4 and TypeScript"
          />
          <FrameworkCard
            href="/docs/installation/laravel"
            name="Laravel"
            description="Inertia.js + React stack with Tailwind v4"
          />
          <FrameworkCard
            href="/docs/installation/react-router"
            name="React Router"
            description="React Router v7 with Vite and Tailwind v4"
          />
          <FrameworkCard
            href="/docs/installation/astro"
            name="Astro"
            description="Astro with React integration and Tailwind v4"
          />
          <FrameworkCard
            href="/docs/installation/tanstack"
            name="TanStack Start"
            description="TanStack Start with full-stack React and Tailwind v4"
          />
        </div>
      </DocsSection>
    </DocsPage>
  );
}
