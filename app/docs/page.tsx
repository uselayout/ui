import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DocsPage, DocsSection } from "@/components/docs/DocsPage";

// ---------------------------------------------------------------------------
// Quick-link card
// ---------------------------------------------------------------------------

function QuickLink({
  href,
  title,
  description,
  external,
}: {
  href: string;
  title: string;
  description: string;
  external?: boolean;
}) {
  const inner = (
    <div className="group flex flex-col gap-1 rounded-xl border border-border bg-card p-5 transition-colors duration-[var(--layout-duration-base)] ease-out hover:border-ring/40 hover:bg-accent/30">
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-semibold text-foreground group-hover:text-foreground">
          {title}
        </span>
        <ArrowRight className="size-3.5 text-muted-foreground transition-transform duration-[var(--layout-duration-base)] group-hover:translate-x-0.5" />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block no-underline">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className="block no-underline">
      {inner}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Principle card
// ---------------------------------------------------------------------------

function Principle({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="font-mono text-xs font-semibold text-muted-foreground/60 pt-0.5 shrink-0 w-5">
        {number}
      </span>
      <div>
        <p className="font-display text-sm font-semibold text-foreground mb-1">{title}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function IntroductionPage() {
  return (
    <DocsPage
      title="Introduction"
      description="Layout UI is a token-contracted, reskinnable component system built for the AI agent era."
    >
      <DocsSection title="What is Layout UI?">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Layout UI is a component library with a single job: every component consumes only
          semantic design tokens, never primitives. That contract means you can swap a{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            data-brand
          </code>{" "}
          attribute, derived from a{" "}
          <a
            href="https://layout.design"
            className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            layout.md
          </a>{" "}
          kit, and every component re-skins instantly, with no markup changes and no
          component rewrites.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Components are shadcn-compatible: install via the shadcn registry CLI, and they slot
          into any project that already has a shadcn or tweakcn theme. The Layout token
          fallback chain means the shadcn theme wins when it is present; Layout tokens drive
          everything when it is not.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Every component ships with machine-readable{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            meta.usage
          </code>
          ,{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            meta.never
          </code>
          , and{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            meta.tokens
          </code>{" "}
          rules in the registry JSON. AI coding agents read those rules via the Layout MCP
          server, then the{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            check_compliance
          </code>{" "}
          tool validates generated code before it lands in your codebase.
        </p>
      </DocsSection>

      <DocsSection title="Three principles">
        <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6">
          <Principle
            number="01"
            title="Semantic tokens only"
            description="Components reference intent tokens (--layout-primary, --layout-border, --layout-muted-fg) not raw values. Changing a token changes every surface that uses it. No per-component overrides, no colour leaks."
          />
          <div className="h-px bg-border" />
          <Principle
            number="02"
            title="Reskin via layout.md kits and brands"
            description="A layout.md kit from layout.design sets --layout-* values globally or under a data-brand attribute. The same Button, Card, and Badge components become Stripe-purple, Linear-indigo, or Notion-blue without touching the component code."
          />
          <div className="h-px bg-border" />
          <Principle
            number="03"
            title="Rules agents can follow and validate"
            description="Every registry item carries structured meta rules: what it is for, what it must never do, and which tokens it touches. These rules power AI agent context (via layout.md + MCP) and automated compliance checks."
          />
        </div>
      </DocsSection>

      <DocsSection title="Quick links">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <QuickLink
            href="/docs/installation"
            title="Installation"
            description="Add components to your project via the shadcn registry CLI."
          />
          <QuickLink
            href="/docs/theming"
            title="Theming"
            description="Understand the token contract, dark mode, brands, and density."
          />
          <QuickLink
            href="/docs/ai-agents"
            title="For AI agents"
            description="How the registry meta, layout.md, and MCP tools fit together."
          />
          <QuickLink
            href="/docs/components/button"
            title="Components"
            description="Browse the 12 components, their variants, and installation commands."
          />
          <QuickLink
            href="https://layout.design"
            title="layout.design"
            description="Get layout.md kits and explore the full design system platform."
            external
          />
          <QuickLink
            href="https://github.com/uselayout/app"
            title="GitHub"
            description="The source code for Layout UI and the web app."
            external
          />
        </div>
      </DocsSection>
    </DocsPage>
  );
}
