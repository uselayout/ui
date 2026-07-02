import { DocsPage, DocsSection } from "@/components/docs/DocsPage";

function Code({ children }: { children: string }) {
  return (
    <pre className="rounded-lg bg-muted font-mono text-sm p-4 overflow-x-auto border border-border">
      <code className="text-foreground leading-relaxed whitespace-pre">{children}</code>
    </pre>
  );
}

// ---------------------------------------------------------------------------
// Callout
// ---------------------------------------------------------------------------

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-muted/40 px-5 py-4 text-sm text-muted-foreground leading-relaxed">
      {children}
    </div>
  );
}

import * as React from "react";

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AIAgentsPage() {
  return (
    <DocsPage
      title="For AI agents"
      description="Layout UI is designed to be consumed by AI coding agents. Every component ships machine-readable rules, and the Layout MCP server gives agents verified, up-to-date context."
    >
      <DocsSection title="The problem with generic component libraries">
        <p className="text-sm text-muted-foreground leading-relaxed">
          AI coding agents (Claude Code, Cursor, Copilot, Windsurf) write a lot of UI code. The
          problem is they often reach for hard-coded colours, arbitrary spacing, or wrong component
          variants because they have no structured understanding of the rules governing your specific
          design system.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Layout UI solves this by treating rules as first-class data. Every registry item carries
          structured{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">meta</code>{" "}
          that agents can read, and the Layout MCP server exposes both context retrieval and
          compliance validation as callable tools.
        </p>
      </DocsSection>

      <DocsSection title="Registry meta rules">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Every component in the Layout registry ships three structured rule fields alongside its
          code:
        </p>
        <div className="flex flex-col gap-3 my-1">
          <div className="flex gap-3">
            <code className="font-mono text-xs bg-muted px-2 py-1 rounded text-foreground shrink-0 h-fit">
              meta.usage
            </code>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A prose rule explaining when to use the component, which variant to prefer, and how
              to compose it with other components.
            </p>
          </div>
          <div className="flex gap-3">
            <code className="font-mono text-xs bg-muted px-2 py-1 rounded text-foreground shrink-0 h-fit">
              meta.never
            </code>
            <p className="text-sm text-muted-foreground leading-relaxed">
              An array of explicit prohibitions: things an agent must never do with this component.
              These map directly to compliance check rules.
            </p>
          </div>
          <div className="flex gap-3">
            <code className="font-mono text-xs bg-muted px-2 py-1 rounded text-foreground shrink-0 h-fit">
              meta.tokens
            </code>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The canonical{" "}
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
                --layout-*
              </code>{" "}
              tokens consumed by this component. Agents use this to understand which kit tokens
              affect a given component.
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Here is the Button&apos;s full meta block from{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            registry.json
          </code>
          :
        </p>
        <Code>{`{
  "name": "button",
  "type": "registry:ui",
  "title": "Button",
  "description": "Button with six intent variants and four sizes. Polymorphic via the Base UI render prop.",
  "meta": {
    "usage": "Primary actions use the default variant; one default button per view section. Secondary and outline are for supporting actions, ghost for toolbars and dense UI, destructive only for irreversible actions, link for inline navigation. Use render={<a href/>} to render as a link.",
    "never": [
      "Never hardcode colours; variants already map to intent tokens",
      "Never place two default-variant buttons in the same action group",
      "Never use destructive for cancel/dismiss actions",
      "Never override border-radius directly; it derives from --layout-radius"
    ],
    "tokens": [
      "--layout-primary",
      "--layout-primary-fg",
      "--layout-secondary",
      "--layout-secondary-fg",
      "--layout-accent",
      "--layout-accent-fg",
      "--layout-danger",
      "--layout-danger-fg",
      "--layout-input",
      "--layout-ring",
      "--layout-radius",
      "--layout-shadow-xs",
      "--layout-duration-base"
    ]
  }
}`}</Code>
      </DocsSection>

      <DocsSection title="layout.md context files">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Layout kits from{" "}
          <a
            href="https://layout.design"
            className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            layout.design
          </a>{" "}
          include a{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            layout.md
          </code>{" "}
          file: a structured, LLM-optimised context document that combines:
        </p>
        <ul className="flex flex-col gap-1.5 pl-5 list-disc text-sm text-muted-foreground">
          <li>All design tokens with their values and purposes</li>
          <li>Typography scale, spacing system, and shape rules</li>
          <li>Component inventory with usage and anti-patterns</li>
          <li>Brand-specific overrides and intent mapping</li>
          <li>Anti-pattern rules (what never to do)</li>
        </ul>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Place{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            layout.md
          </code>{" "}
          in your{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            .layout/
          </code>{" "}
          directory and the Layout MCP server surfaces it to any connected agent automatically.
        </p>
      </DocsSection>

      <DocsSection title="The Layout MCP server">
        <p className="text-sm text-muted-foreground leading-relaxed">
          The{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">
            @layoutdesign/context
          </code>{" "}
          MCP server runs alongside your editor and exposes your design system to any agent that
          supports the Model Context Protocol (Claude Code, Cursor, Windsurf).
        </p>

        <Code>{`# Install and initialise
npx @layoutdesign/context init
npx @layoutdesign/context serve`}</Code>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Key MCP tools available to agents:
        </p>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-semibold text-foreground">Tool</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">What it does</th>
              </tr>
            </thead>
            <tbody>
              {[
                { tool: "get_design_system", desc: "Returns the full layout.md context document for the current kit." },
                { tool: "get_design_section", desc: "Returns a single section (colours, typography, spacing, components…)." },
                { tool: "get_tokens", desc: "Returns all CSS custom properties by category, ready to paste." },
                { tool: "get_component", desc: "Returns a component's code, usage rules, and never rules by name." },
                { tool: "get_component_with_context", desc: "Component code plus resolved token values and brand-specific guidelines." },
                { tool: "list_components", desc: "Full component inventory with metadata, tags, and token usage." },
                { tool: "check_compliance", desc: "Validates a code snippet against design system rules. Returns violations." },
              ].map((row, i) => (
                <tr key={row.tool} className={i % 2 === 0 ? "" : "bg-muted/20"}>
                  <td className="px-4 py-2.5 font-mono text-xs text-foreground align-top">
                    {row.tool}
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground align-top">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Callout>
          The{" "}
          <code className="font-mono text-xs bg-background px-1.5 py-0.5 rounded">
            check_compliance
          </code>{" "}
          tool is the key differentiator: before an agent commits generated code it can call
          this tool and receive a list of rule violations (hardcoded colours, wrong variants,
          missing aria attributes) resolved against your specific kit&apos;s token values.
        </Callout>
      </DocsSection>

      <DocsSection title="Recommended agent workflow">
        <p className="text-sm text-muted-foreground leading-relaxed">
          The recommended pattern for agents building UI with Layout UI:
        </p>
        <Code>{`# 1. Fetch design context before writing UI
get_design_system()           # load layout.md into context

# 2. Look up the component you need
get_component("button")       # rules + code for the button

# 3. Generate the component code
# ... agent writes the UI ...

# 4. Validate before finishing
check_compliance(code)        # returns violations if any

# 5. Fix any violations and re-validate
# ... agent iterates until compliance passes ...`}</Code>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This loop means agents produce on-brand, rule-compliant UI on the first pass rather
          than requiring manual correction after the fact.
        </p>
      </DocsSection>
    </DocsPage>
  );
}
