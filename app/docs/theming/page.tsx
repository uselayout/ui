import { DocsPage, DocsSection } from "@/components/docs/DocsPage";
import { Button } from "@/registry/layout/button/button";
import { Badge } from "@/registry/layout/badge/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/layout/card/card";
import { Input } from "@/registry/layout/input/input";
import { Label } from "@/registry/layout/label/label";

// ---------------------------------------------------------------------------
// Inline code block
// ---------------------------------------------------------------------------

function Code({ children }: { children: string }) {
  return (
    <pre className="rounded-lg bg-muted font-mono text-sm p-4 overflow-x-auto border border-border">
      <code className="text-foreground leading-relaxed whitespace-pre">{children}</code>
    </pre>
  );
}

// ---------------------------------------------------------------------------
// Token table row
// ---------------------------------------------------------------------------

interface TokenRow {
  token: string;
  resolves: string;
  description: string;
}

function TokenTable({ rows }: { rows: TokenRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-left font-semibold text-foreground">Token</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Tailwind utility resolves to</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Purpose</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.token}
              className={i % 2 === 0 ? "" : "bg-muted/20"}
            >
              <td className="px-4 py-2.5 font-mono text-xs text-foreground align-top">
                {row.token}
              </td>
              <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground align-top">
                {row.resolves}
              </td>
              <td className="px-4 py-2.5 text-muted-foreground align-top">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Live brand demo: server component wraps each brand scope
// ---------------------------------------------------------------------------

function BrandDemo({ brand, label }: { brand: string; label: string }) {
  return (
    <div data-brand={brand} className="flex flex-col gap-3 rounded-xl border border-border bg-background p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="secondary">Secondary</Button>
        <Button size="sm" variant="outline">Outline</Button>
        <Badge>Default</Badge>
        <Badge variant="success">Success</Badge>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your email to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Label htmlFor={`email-${brand}`}>Email</Label>
            <Input id={`email-${brand}`} type="email" placeholder="you@example.com" />
          </div>
        </CardContent>
        <CardFooter>
          <Button size="sm">Continue</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ThemingPage() {
  return (
    <DocsPage
      title="Theming"
      description="The Layout UI token contract: how --layout-* canonical tokens, shadcn compatibility, dark mode, brand scoping, and density all fit together."
    >
      <DocsSection title="The token contract">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Layout UI defines a canonical{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            --layout-*
          </code>{" "}
          token namespace. Components never reference raw values or arbitrary colours. They
          always reference intent tokens like{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            --layout-primary
          </code>{" "}
          or{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            --layout-border
          </code>
          . Because no component hard-codes a value, changing a token changes every surface
          that consumes it.
        </p>

        <TokenTable
          rows={[
            // Colour: surfaces
            { token: "--layout-bg", resolves: "bg-background", description: "Page background" },
            { token: "--layout-fg", resolves: "text-foreground", description: "Primary body text" },
            { token: "--layout-surface", resolves: "bg-card", description: "Raised surface (cards)" },
            { token: "--layout-overlay", resolves: "bg-popover", description: "Floating layers" },
            // Colour: intent
            { token: "--layout-primary", resolves: "bg-primary / text-primary", description: "Primary actions, CTAs" },
            { token: "--layout-primary-fg", resolves: "text-primary-foreground", description: "Text on primary" },
            { token: "--layout-secondary", resolves: "bg-secondary", description: "Secondary actions" },
            { token: "--layout-muted", resolves: "bg-muted", description: "Subdued fills" },
            { token: "--layout-muted-fg", resolves: "text-muted-foreground", description: "Secondary text" },
            { token: "--layout-accent", resolves: "bg-accent", description: "Hover fills, tonal containers" },
            { token: "--layout-danger", resolves: "bg-destructive", description: "Destructive / error state" },
            { token: "--layout-success", resolves: "bg-success", description: "Success state" },
            { token: "--layout-warning", resolves: "bg-warning", description: "Warning state" },
            // Chrome
            { token: "--layout-border", resolves: "border-border", description: "All borders and dividers" },
            { token: "--layout-input", resolves: "border-input", description: "Form field borders" },
            { token: "--layout-ring", resolves: "ring, outline-color", description: "Focus ring colour" },
            // Shape
            { token: "--layout-radius", resolves: "--radius-lg (base)", description: "Base border-radius; all variants derive from this" },
            // Elevation
            { token: "--layout-shadow-sm", resolves: "shadow-sm", description: "Card-level elevation" },
            { token: "--layout-shadow-md", resolves: "shadow-md", description: "Dropdown elevation" },
            // Motion
            { token: "--layout-duration-fast", resolves: "duration-[var(--layout-duration-fast)]", description: "Quick micro-interactions (100ms)" },
            { token: "--layout-duration-base", resolves: "duration-[var(--layout-duration-base)]", description: "Standard transitions (150ms)" },
            { token: "--layout-ease-out", resolves: "ease-out", description: "Deceleration easing" },
            // Density
            { token: "--layout-space-unit", resolves: "--spacing (Tailwind base)", description: "All spacing utilities scale from this unit" },
          ]}
        />
      </DocsSection>

      <DocsSection title="shadcn compatibility">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Every Tailwind utility in Layout UI resolves through a fallback chain. For example,{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            bg-background
          </code>{" "}
          maps to:
        </p>
        <Code>{`--color-background: var(--background, var(--layout-bg));`}</Code>
        <p className="text-sm text-muted-foreground leading-relaxed">
          If a shadcn or tweakcn theme sets{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            --background
          </code>
          , that value wins. Without one, the{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            --layout-bg
          </code>{" "}
          default drives the colour. You can drop Layout UI components into any shadcn project
          without any token conflict. The host theme simply takes precedence.
        </p>
      </DocsSection>

      <DocsSection title="Dark mode">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Dark mode is applied by adding{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            .dark
          </code>{" "}
          or{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            data-theme="dark"
          </code>{" "}
          to the{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            {"<html>"}
          </code>{" "}
          element. The Layout token contract ships dark values for every token out of the box.
          Use the{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            ThemeToggle
          </code>{" "}
          component from this site as a reference implementation.
        </p>
        <Code>{`/* globals.css, auto-included with @layout/theme-layout */
@custom-variant dark (
  &:where(.dark, .dark *, [data-theme="dark"], [data-theme="dark"] *)
);

[data-theme="dark"] {
  --layout-bg: oklch(0.17 0.004 95);
  --layout-primary: oklch(0.93 0.004 95);
  /* ... all tokens redefined for dark ... */
}`}</Code>
      </DocsSection>

      <DocsSection title="Brands and scoped reskinning">
        <p className="text-sm text-muted-foreground leading-relaxed">
          A brand is simply a CSS block that redefines{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            --layout-*
          </code>{" "}
          tokens under a{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            [data-brand]
          </code>{" "}
          selector. Set the attribute on{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            {"<html>"}
          </code>{" "}
          to reskin the entire app, or on any wrapper element to scope the reskin to that
          subtree.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The three demos below are rendered on the server with scoped{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            data-brand
          </code>{" "}
          wrappers: the same Button, Card, Badge, and Input components, zero changes:
        </p>
        <div className="grid grid-cols-1 gap-4">
          <BrandDemo brand="stripe" label='data-brand="stripe" · Stripe kit' />
          <BrandDemo brand="linear" label='data-brand="linear" · Linear kit' />
          <BrandDemo brand="notion" label='data-brand="notion" · Notion kit' />
        </div>
        <Code>{`/* How a brand is defined in themes.css */
[data-brand="stripe"] {
  --layout-bg: #f6f9fc;
  --layout-primary: #635bff;
  --layout-primary-fg: #ffffff;
  --layout-radius: 0.375rem;
  --layout-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  /* ... all tokens ... */
}`}</Code>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Layout kits from{" "}
          <a
            href="https://layout.design"
            className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            layout.design
          </a>{" "}
          are compiled from design tokens and style profiles extracted from real products.
          Install a kit and apply its brand attribute to instantly reskin your project.
        </p>
      </DocsSection>

      <DocsSection title="Density">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Density is controlled by a single CSS custom property,{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            --layout-space-unit
          </code>
          , which maps to Tailwind&apos;s{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            --spacing
          </code>{" "}
          base unit. Every spacing utility (
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            p-4
          </code>
          ,{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            gap-2
          </code>
          ,{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            h-9
          </code>
          ) scales proportionally, with no per-component overrides needed.
        </p>
        <Code>{`/* Comfortable (default) */
:where(:root) {
  --layout-space-unit: 0.25rem;   /* 1 spacing unit = 4px */
}

/* Compact */
[data-density="compact"] {
  --layout-space-unit: 0.215rem;  /* ~14% tighter across all UI */
}`}</Code>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Apply compact density by setting{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            data-density="compact"
          </code>{" "}
          on{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            {"<html>"}
          </code>
          . The{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            DensityToggle
          </code>{" "}
          in this site&apos;s top bar is a working example.
        </p>
      </DocsSection>
    </DocsPage>
  );
}
